// @flow strict

import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";
import { CallbackType } from "../../../types";
import { countries } from "../../../utils/data/countries";

interface PropsType {
  handleChangeModal: any;
  callback: CallbackType;
}

const ViewCallBack = forwardRef<HTMLDivElement, PropsType>(
  ({ handleChangeModal, callback }, ref) => {
    const theme = useTheme();


    const getCountry = (code: string) => {
      const find = countries.find(country => country.code === code);
      return find ? find.name : '';
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
      buttonContainer: {
        display: "flex",
        justifyContent: "flex-end",
        gap: "16px",
      },
    };

    return (
      <div className="" ref={ref} tabIndex={0}>
        <Box sx={formStyles.modalContainer}>
          <Typography
            sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}>
            View Call Back
          </Typography>
          <Box>
            <p> <span style={{ fontWeight: 500 }}>
              Name:</span> {callback.firstName + " " + callback.lastName}</p>
            <p><span style={{ fontWeight: 500 }}>
              Email:</span> {callback.email}</p>
            <p><span style={{ fontWeight: 500 }}>
              Country:</span> {getCountry(callback.country)}</p>
            <p><span style={{ fontWeight: 500 }}>
              Time Zone:</span> {callback.timezone}</p>
            <p><span style={{ fontWeight: 500 }}>
              Phone:</span> {callback.phone}</p>
            <p><span style={{ fontWeight: 500 }}>
              WhatsApp:</span> {callback.whatsapp}</p>
            <p><span style={{ fontWeight: 500 }}>
              Telegram:</span> {callback.telegram}</p>
            <p><span style={{ fontWeight: 500 }}>
              Voice:</span> {callback.voice}</p>
            <p><span style={{ fontWeight: 500 }}>
              Message:</span> {callback.note}</p>
            <div style={formStyles.buttonContainer} className="">
              <Button
                onClick={handleChangeModal}
                color="secondary"
                variant="outlined">
                Cancle
              </Button>
            </div>
          </Box>
        </Box>
      </div>
    );
  }
);

ViewCallBack.displayName = 'ViewCallBack';

export default ViewCallBack;