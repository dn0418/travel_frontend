// @flow strict


import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import serviceClient from "../../../../rest-api/client/service-client";

interface PropsType {
  handleCancelModal: any;
  price: any;
  setPricing: any;
}

const UpdatePricing = forwardRef<HTMLDivElement, PropsType>(({ handleCancelModal, price, setPricing }, ref) => {
  const [priceInput, setPriceInput] = useState({
    destination: price.destination || '',
    destination_ru: price.destination_ru || '',
    destination_hy: price.destination_hy || '',
    sedan_3seat: price.sedan_3seat || '',
    minivan_7seat: price.minivan_7seat || '',
    minibus_18seat: price.minibus_18seat || '',
    bus_35seat: price.bus_35seat || '',
  });
  const theme = useTheme();

  const handleChangeInput = (name: string, value: string) => {
    setPriceInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    })
  }

  const handleSubmit = async () => {
    if (!priceInput.destination || !priceInput.destination_ru || !priceInput.destination_hy || !priceInput.sedan_3seat || !priceInput.minivan_7seat || !priceInput.minibus_18seat || !priceInput.bus_35seat) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res: any = await serviceClient.carWithoutDriver.updatePrice(price.id, priceInput);
      toast.success("Price updated successfully!");
      setPricing((prev: any) => {
        const temp = JSON.parse(JSON.stringify(prev));
        const index = temp.findIndex((item: any) => item.id === price.id);
        temp[index] = res.data;
        return temp;
      })
      handleCancelModal();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  }

  const formStyles = {
    modalContainer: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      bgcolor: "background.paper",
      boxShadow: 24,
      px: '32px',
      py: 5,
      borderRadius: "12px",
      overflowY: "scroll",
      maxHeight: "90vh",
      color: "#5E5E5E",
      [theme.breakpoints.down("md")]: {
        width: "95%",
        p: 3,
      },
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(1, 1fr)",
      gap: "16px",
      mt: "20px",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "8px",
        mt: "12px"
      },
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "16px",
    },
  };

  return (
    <Box tabIndex={-1} ref={ref} sx={formStyles.modalContainer}>
      <Typography
        sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}>
        Update Price
      </Typography>
      <Box
        sx={formStyles.gridContainer}>
        <TextField
          label='Destination'
          name="destination"
          value={priceInput?.destination}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Destination Ru'
          name="destination_ru"
          value={priceInput?.destination_ru}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Destination Hy'
          name="destination_hy"
          value={priceInput?.destination_hy}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Sedan 3 Seat'
          name="sedan_3seat"
          value={priceInput?.sedan_3seat}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
          type='number'
        />
        <TextField
          label='Minivan 7 Seat'
          name="minivan_7seat"
          value={priceInput?.minivan_7seat}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
          type='number'
        />
        <TextField
          label='Minibus 18 seat'
          name="minibus_18seat"
          value={priceInput?.minibus_18seat}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
          type='number'
        />
        <TextField
          label='Bus 35 seat'
          name="bus_35seat"
          value={priceInput?.bus_35seat}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
          type='number'
        />
        <div style={formStyles.buttonContainer} className="">
          <Button
            onClick={handleCancelModal}
            color="secondary"
            variant="outlined">
            Cancle
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained">
            Update
          </Button>
        </div>
      </Box>
    </Box>
  );
});

UpdatePricing.displayName = 'UpdatePricing';


export default UpdatePricing;