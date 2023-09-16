// @flow strict


import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import client from "../../../rest-api/client";

interface PropsType {
  handleCancelModal: any;
  selected: any;
}

const UpdateCurrency = forwardRef<HTMLDivElement, PropsType>(({ handleCancelModal, selected }, ref) => {
  const [rateValue, setRate] = useState(selected.rate);
  const router = useRouter();
  const theme = useTheme();

  const handleSubmit = async () => {
    if (!rateValue) {
      toast.error("Please enter rate");
      return;
    }

    try {
      const res = await client.currency.update({
        name: selected.currency,
        code: selected.code,
        rate: rateValue,
      });
      toast.success("Currency updated successfully!");
      handleCancelModal();
      router.reload();
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
        Update Currency Rate
      </Typography>
      <Box
        sx={formStyles.gridContainer}>
        <TextField
          label='Currency'
          value={selected.currency}
          variant='outlined'
          disabled
        />
        <TextField
          label='Code'
          value={selected.code}
          variant='outlined'
          disabled
        />
        <TextField
          label='Base Price'
          value={rateValue}
          onChange={(e) => setRate(Number(e.target.value))}
          variant='outlined'
          type='number'
        />
        <div style={formStyles.buttonContainer}>
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

UpdateCurrency.displayName = 'UpdateCurrency';


export default UpdateCurrency;