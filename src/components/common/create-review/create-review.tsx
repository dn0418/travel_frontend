// @flow strict

import { Box, Button, FormControl, InputLabel, MenuItem, Rating, Select, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { forwardRef, useState } from "react";
import { toast } from "react-toastify";
import client from "../../../rest-api/client";
import { AddReviewPyloadType } from "../../../types";
import { countries } from "../../../utils/data/countries";
import UploadAvatar from "./upload-avatar";

interface PropsType {
  handleChangeModal: any;
  type: string;
  id: number;
}

const CreateNewReview = forwardRef<HTMLDivElement, PropsType>(
  ({ handleChangeModal, type, id }, ref) => {
    const [uploading, setUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<null | string>(null);
    const [reviewInput, setReviewInput] = useState({
      firstName: "",
      lastName: "",
      country: "",
      email: "",
      rating: "0",
      note: ""
    });
    const theme = useTheme();

    const handleChangeInput = (name: string, value: string) => {
      setReviewInput((prev) => {
        const temp = JSON.parse(JSON.stringify(prev));
        temp[name] = value;
        return temp;
      })
    }

    const checkValidation = () => {
      // Check which fields in reviewInput are empty
      const emptyFields = [];
      if (reviewInput.firstName === "") {
        emptyFields.push("firstName");
      }
      if (reviewInput.lastName === "") {
        emptyFields.push("lastName");
      }
      if (reviewInput.email === "") {
        emptyFields.push("email");
      }
      if (reviewInput.country === "") {
        emptyFields.push("country");
      }
      if (reviewInput.rating === "0") {
        emptyFields.push("rating");
      }
      if (!selectedImage) {
        emptyFields.push("thumbnail");
      }
      if (reviewInput.note === "") {
        emptyFields.push("note");
      }

      let errorMessage = "";
      // Generate error message for empty fields
      if (emptyFields.length > 0) {
        errorMessage = `${emptyFields.join(", ")} ${emptyFields.length > 1 ? "are" : "is"
          } required`;
      }
      return errorMessage;
    }

    const handleSubmit = async () => {
      const err = checkValidation();
      if (err) {
        toast.error(err);
        return;
      }

      setIsLoading(true);
      const payload: AddReviewPyloadType = {
        firstName: reviewInput.firstName,
        lastName: reviewInput.lastName,
        email: reviewInput.email,
        location: reviewInput.country,
        profilePhoto: selectedImage,
        rating: reviewInput.rating,
        message: reviewInput.note,
      }

      if (type === 'hotel') {
        payload['hotelId'] = id
      } else if (type === 'car') {
        payload['carId'] = id
      } else if (type === 'tour') {
        payload['tourId'] = id
      } else if (type === 'accessory') {
        payload['accessoryId'] = id
      } else if (type === 'thingToSee') {
        payload['thingToSeeId'] = id
      } else if (type === 'thingToDo') {
        payload['thingToDoId'] = id;
      } else if (type === 'foodAndDrink') {
        payload['foodAndDrinkId'] = id;
      }

      try {
        const res = await client.reviews.newReview(payload);

        toast.success("Review created successfully");
        handleChangeModal()
      } catch (error) {
        toast.error("Something went wrong");
        // console.log(error)
      } finally {
        setIsLoading(false);
      }
    }

    const handleImageChange = async (event: any) => {
      setUploading(true);
      const formData = new FormData();

      const file = event.target.files[0];
      formData.append("file", file);

      try {
        const response = await fetch('http://localhost:5000/file/upload', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();
        if (data?.Location) {
          setSelectedImage(data?.Location)
        }
      } catch (error) {
        // console.log(error)
      } finally {
        setUploading(false);
      }

    };

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
            Add review
          </Typography>
          <div className="">
            <UploadAvatar
              selectedImage={selectedImage}
              handleImageChange={handleImageChange}
              uploading={uploading}
            />
          </div>
          <Box
            sx={formStyles.gridContainer}>
            <TextField
              label='First Name'
              name="firstName"
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Last Name'
              name="lastName"
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              variant='outlined'
            />
            <TextField
              label='Email'
              name="email"
              onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
              type='email'
              variant='outlined'
            />

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Country</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                value={reviewInput?.country}
                label='Country'
                name="country"
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
                precision={0.5}
                value={parseInt(reviewInput?.rating)}
                onChange={(event, newValue) =>
                  handleChangeInput("rating", newValue?.toString() ?? "0")
                }
              />
              <p>{" "}{reviewInput?.rating} Star</p>
            </Box>
            <TextField
              sx={formStyles.noteArea}
              name="note"
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

CreateNewReview.displayName = 'CreateNewReview';

export default CreateNewReview;

