// @flow strict

import { Box, Button, FormControl, InputLabel, MenuItem, Rating, Select, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import client from "../../../rest-api/client";
import { ReviewTypes } from "../../../types";
import { countries } from "../../../utils/data/countries";

interface PropsType {
  handleChangeModal: any;
  review: ReviewTypes;
}

const UpdateReview = forwardRef<HTMLDivElement, PropsType>(
  ({ handleChangeModal, review }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [reviewInput, setReviewInput] = useState(review || {});
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
        ...review,
        ...reviewInput
      }

      try {
        const res = await client.reviews.updateReview(review.id, payload);
        toast.success("Review updated successfully");
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
        width: "70%",
        bgcolor: "background.paper",
        boxShadow: 24,
        px: '12%',
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
      noteArea: {
        gridColumn: "1 / span 2",
        [theme.breakpoints.down("md")]: {
          gridColumn: "1",
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
            Update review
          </Typography>
          <Box
            sx={formStyles.gridContainer}>
            <TextField
              label='First Name'
              name="firstName"
              value={reviewInput?.firstName}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Last Name'
              name="lastName"
              value={reviewInput?.lastName}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Email'
              name="email"
              value={reviewInput?.email}
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              type='email'
              variant='outlined'
            />

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Country</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                value={reviewInput?.location}
                label='Country'
                name="location"
                onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.name}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Rating
                name="rating"
                value={reviewInput?.rating}
                precision={0.5}
                onChange={(event, newValue) =>
                  handleChangeInput("rating", newValue?.toString() ?? "0")
                }
              />
              <p>{" "}{reviewInput?.rating} Star</p>
            </Box>
            <TextField
              sx={formStyles.noteArea}
              value={reviewInput?.message}
              name="message"
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              className="text-area"
              label='Write your review'
            />
            <div className=""></div>
            <div style={formStyles.buttonContainer} className="">
              <Button
                onClick={handleChangeModal}
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

UpdateReview.displayName = 'UpdateReview';

export default UpdateReview;