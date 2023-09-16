// @flow strict

import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef } from "react";
import { RidePlanType } from "../../../types";
import { destinationFilterData } from "../../../utils/data/homepage-data";

interface PropsType {
  handleChangeModal: any;
  ridePlan: RidePlanType;
}

const ViewRidePlan = forwardRef<HTMLDivElement, PropsType>(
  ({ handleChangeModal, ridePlan }, ref) => {
    const theme = useTheme();
    const destinations = ridePlan.destination || [];

    const getName = (name: string) => {
      const find = destinationFilterData.find(d => d.value === name);
      return find ? find.title : "";
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
            View Ride Plan
          </Typography>
          <Box>
            <>
              <p> <span style={{ fontWeight: 500 }}>
                Name:</span> {ridePlan.name}</p>
              <p><span style={{ fontWeight: 500 }}>
                Email:</span> {ridePlan.email}</p>
              <p><span style={{ fontWeight: 500 }}>
                Phone:</span> {ridePlan.phone}</p>
              <p><span style={{ fontWeight: 500 }}>
                Address:</span> {ridePlan.address}</p>
              <p><span style={{ fontWeight: 500 }}>
                Date:</span> {ridePlan.date}</p>
              <p><span style={{ fontWeight: 500 }}>
                Adult:</span> {ridePlan.adult}</p>
              <p><span style={{ fontWeight: 500 }}>
                Child:</span> {ridePlan.child}</p>
              <p><span style={{ fontWeight: 500 }}>
                Ride Type:</span> {ridePlan.rideType}</p>
              <p><span style={{ fontWeight: 500 }}>
                Message:</span> {ridePlan.note}</p>
            </>
            <TableContainer sx={{ my: 5 }} component={Paper}>
              <Typography
                sx={{ fontSize: "20px", fontWeight: 600, p: 2 }}>
                Destinations
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="left">No.</TableCell>
                    <TableCell align="left">Name</TableCell>
                    <TableCell align="left">Duration</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    destinations?.length > 0 &&
                    destinations.map((item) => (
                      <TableRow
                        key={item.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell align="left">{item.id}</TableCell>
                        <TableCell align="left">{getName(item.name)}</TableCell>
                        <TableCell align="left">{item.duration}</TableCell>
                      </TableRow>
                    ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
            <div style={formStyles.buttonContainer}>
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

ViewRidePlan.displayName = 'ViewCallBack';

export default ViewRidePlan;