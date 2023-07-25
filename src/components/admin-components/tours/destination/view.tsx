// @flow strict

import { Box, Button, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";
import { TourDestination } from "../../../../types/tour";

interface PropsType {
  handleChangeModal: any;
  destination: TourDestination;
}

const ViewDestination = forwardRef<HTMLDivElement, PropsType>(
  ({ handleChangeModal, destination }, ref) => {
    const theme = useTheme();


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
            sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
            View Destination
          </Typography>
          <Box>
            <p> <span style={{ fontWeight: 500 }}>
              Name:</span> {destination.name}</p>
            <p><span style={{ fontWeight: 500 }}>
              Name Russian:</span> {destination.name_ru}</p>
            <p><span style={{ fontWeight: 500 }}>
              Name Armenian:</span> {destination.name_hy}</p>
            <p><span style={{ fontWeight: 500 }}>
              Country:</span> {destination.country}</p>
            <p><span style={{ fontWeight: 500 }}>
              Country Russian:</span> {destination.country_ru}</p>
            <p><span style={{ fontWeight: 500 }}>
              Country Armenian:</span> {destination.country_hy}</p>
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

ViewDestination.displayName = 'UpdateDestination';

export default ViewDestination;