// @flow strict

import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import tourClient from "../../../../rest-api/client/tour-client";
import { TourDestinationType } from "../../../../types/tour";
import AdminGoogleMap from "../../google-maps";

interface PropsType {
  handleChangeModal: any;
  destination: TourDestinationType;
}

const UpdateDestination = forwardRef<HTMLDivElement, PropsType>(
  ({ handleChangeModal, destination }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [inputData, setInputData] = useState(destination || {});
    const theme = useTheme();
    const router = useRouter();

    const handleChangeInput = (name: string, value: string) => {
      setInputData((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[name] = value;
        return temp;
      })
    }

    const handleSubmit = async () => {
      if (!inputData.name || !inputData.name_ru || !inputData.name_hy || !inputData.country || !inputData.country_ru || !inputData.country_hy || !inputData.rideType) {
        toast.error("Please fill all the fields");
        return;
      }

      if (!inputData.lat || !inputData.lng) {
        toast.error("Please select a location");
        return;
      }

      setIsLoading(true);
      const payload = {
        name: inputData.name,
        name_ru: inputData.name_ru,
        name_hy: inputData.name_hy,
        country: inputData.country,
        country_ru: inputData.country_ru,
        country_hy: inputData.country_hy,
        lat: inputData.lat,
        lng: inputData.lng,
        rideType: inputData.rideType,
      }

      try {
        await tourClient.tourDestination.update(destination.id, payload);
        toast.success("Destination updated successfully");
        router.push({
          pathname: router.pathname
        });
        handleChangeModal();
      } catch (error) {
        toast.error("Something went wrong");
        // console.log(error)
      } finally {
        setIsLoading(false);
      }
    }

    const formStyles = {
      modalContainer: {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "60%",
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
        gridTemplateColumns: "repeat(2, 1fr)",
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
        gridColumn: "1 / -1",
      },
      mapContainer: {
        gridColumn: "1 / -1",
      }
    };

    return (
      <div className="" ref={ref} tabIndex={0}>
        <Box sx={formStyles.modalContainer}>
          <Typography
            sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}>
            Create New Location
          </Typography>
          <Box
            sx={formStyles.gridContainer}>
            <div style={formStyles.mapContainer}>
              <AdminGoogleMap
                setState={setInputData}
                state={inputData}
              />
            </div>
            <TextField
              label='Name'
              name="name"
              value={inputData?.name}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Name Ru'
              name="name_ru"
              value={inputData?.name_ru}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Name Hy'
              name="name_hy"
              value={inputData?.name_hy}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Country'
              name="country"
              value={inputData?.country}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Country Ru'
              name="country_ru"
              value={inputData?.country_ru}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Country Hy'
              name="country_hy"
              value={inputData?.country_hy}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              type='email'
              variant='outlined'
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Ride Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={inputData?.rideType}
                label="Ride Type"
                onChange={(e) => handleChangeInput("rideType", e.target.value)}
              >
                <MenuItem value="biCycle">
                  BiCycle
                </MenuItem>
                <MenuItem value="bike">
                  Bike
                </MenuItem>
                <MenuItem value="car">
                  Car
                </MenuItem>
                <MenuItem value="hiking">
                  Hiking
                </MenuItem>
              </Select>
            </FormControl>
            <div style={formStyles.buttonContainer} className="">
              <Button
                onClick={handleChangeModal}
                color="secondary"
                variant="outlined">
                Cancle
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isLoading}
                variant="contained">
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </Box>
        </Box>
      </div>
    );
  }
);

UpdateDestination.displayName = 'UpdateDestination';

export default UpdateDestination;