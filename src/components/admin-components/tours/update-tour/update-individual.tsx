// @flow strict


import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import tourClient from "../../../../rest-api/client/tour-client";

interface PropsType {
  handleCancelModal: any;
  price: any;
  setPricing: any;
}

const UpdateIndividualPrice = forwardRef<HTMLDivElement, PropsType>(({ handleCancelModal, price, setPricing }, ref) => {
  const [priceInput, setPriceInput] = useState({
    pax2_3: price?.pax2_3 || '',
    pax4_6: price?.pax4_6 || '',
    pax7_18: price?.pax7_18 || '',
    pax20_more: price?.pax20_more || '',
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
    if (!priceInput.pax2_3 || !priceInput.pax4_6 || !priceInput.pax7_18 || !priceInput.pax20_more) {
      toast.error("All fields are required!");
      return;
    }
    try {
      const res = await tourClient.individualPricing.update(price.id, priceInput);
      toast.success("Price updated successfully!");
      setPricing((prev: any) => {
        const temp = JSON.parse(JSON.stringify(prev));
        const index = temp.findIndex((item: any) => item.id === price.id);
        temp[index] = {
          ...priceInput,
          id: price.id,
        };
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
        Update Individual Price
      </Typography>
      <Box
        sx={formStyles.gridContainer}>
        <TextField
          label='Pax 2-3'
          name="pax2_3"
          value={priceInput?.pax2_3}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          type='number'
          variant='outlined'
        />
        <TextField
          label='Pax 4-6'
          name="pax4_6"
          value={priceInput?.pax4_6}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          type='number'
          variant='outlined'
        />
        <TextField
          label='Pax 7-18'
          name="pax7_18"
          value={priceInput?.pax7_18}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          type='number'
          variant='outlined'
        />
        <TextField
          label='Pax 20 More'
          name="pax20_more"
          value={priceInput?.pax20_more}
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

UpdateIndividualPrice.displayName = 'UpdateIndividualPrice';


export default UpdateIndividualPrice;