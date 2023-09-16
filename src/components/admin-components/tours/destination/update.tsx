// @flow strict

import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import tourClient from "../../../../rest-api/client/tour-client";
import { TourDestinationType } from "../../../../types/tour";

interface PropsType {
  handleChangeModal: any;
  destination: TourDestinationType;
}

const UpdateDestination = forwardRef<HTMLDivElement, PropsType>(
  ({ handleChangeModal, destination }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [reviewInput, setReviewInput] = useState(destination || {});
    const theme = useTheme();
    const router = useRouter();

    const handleChangeInput = (name: string, value: string) => {
      setReviewInput((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[name] = value;
        return temp;
      })
    }

    const handleSubmit = async () => {
      setIsLoading(true);
      const payload = {
        name: reviewInput.name,
        name_ru: reviewInput.name_ru,
        name_hy: reviewInput.name_hy,
        country: reviewInput.country,
        country_ru: reviewInput.country_ru,
        country_hy: reviewInput.country_hy,
      }

      try {
        const res = await tourClient.tourDestination.update(destination.id, payload);
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
      <div className="" ref={ref} tabIndex={0}>
        <Box sx={formStyles.modalContainer}>
          <Typography
            sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}>
            Update Location
          </Typography>
          <Box
            sx={formStyles.gridContainer}>
            <TextField
              label='Name'
              name="name"
              value={reviewInput?.name}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Name Ru'
              name="name_ru"
              value={reviewInput?.name_ru}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Name Hy'
              name="name_hy"
              value={reviewInput?.name_hy}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Country'
              name="country"
              value={reviewInput?.country}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Country Ru'
              name="country_ru"
              value={reviewInput?.country_ru}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Country Hy'
              name="country_hy"
              value={reviewInput?.country_hy}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              type='email'
              variant='outlined'
            />
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