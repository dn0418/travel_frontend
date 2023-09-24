// @flow strict

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import serviceClient from "../../../../rest-api/client/service-client";

interface PropsType {
  handleCancelPricingTableColumnNameModal: any;
  data: any;
  hotelId: any;
  setPricingTableColumnNameData: any;
}

const UpdatePricingTableColumnName = forwardRef<HTMLDivElement, PropsType>(
  (
    {
      handleCancelPricingTableColumnNameModal,
      data,
      hotelId,
      setPricingTableColumnNameData,
    },
    ref
  ) => {
    const [newColumnNames, setNewColumnNames] = useState({
      firstPart: "",
      lastPart: "",
    });
    const theme = useTheme();

    const handleChangeInput = (name: string, value: string) => {
      setNewColumnNames((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[name] = value;
        console.log(temp);
        return temp;
      });
    };

    const handleSubmit = async () => {
      if (!newColumnNames.firstPart || !newColumnNames.lastPart) {
        toast.error("All fields are required!");
        return;
      }
      try {
        const res = await serviceClient.hotels.updateHotel(hotelId, {
          pricingTableHeaderFirstPartName: newColumnNames.firstPart,
          pricingTableHeaderLastPartName: newColumnNames.lastPart,
        });
        toast.success("Price updated successfully!");
        setPricingTableColumnNameData(
          {
            firstPart: newColumnNames.firstPart,
            lastPart: newColumnNames.lastPart,
          }
        );
        setNewColumnNames({
          firstPart: hotelId.pricingTableHeaderFirstPartName,
          lastPart: "default",
        })
        handleCancelPricingTableColumnNameModal();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong!");
      }
    };

    const formStyles = {
      modalContainer: {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "50%",
        bgcolor: "background.paper",
        boxShadow: 24,
        px: "32px",
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
          mt: "12px",
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
          sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}
        >
          Update Column Names
        </Typography>
        <Box sx={formStyles.gridContainer}>
          <TextField
            label="First Part"
            name="firstPart"
            value={newColumnNames?.firstPart}
            onChange={(e: any) =>
              handleChangeInput(e.target.name, e.target.value)
            }
            variant="outlined"
          />
          <TextField
            label="Last Part"
            name="lastPart"
            value={newColumnNames?.lastPart}
            onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
            variant="outlined"
          />
          <div style={formStyles.buttonContainer} className="">
            <Button
              onClick={handleCancelPricingTableColumnNameModal}
              color="secondary"
              variant="outlined"
            >
              Cancel
            </Button>
            <Button onClick={() => handleSubmit()} variant="contained">
              Update
            </Button>
          </div>
        </Box>
      </Box>
    );
  }
);

UpdatePricingTableColumnName.displayName = "UpdatePricingColumnName";

export default UpdatePricingTableColumnName;
