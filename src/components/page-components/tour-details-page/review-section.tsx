// @flow strict

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Modal, Rating, Select, TextField, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { useTheme } from "@mui/material/styles";
import { makeStyles } from '@mui/styles';
import { SetStateAction, useState } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { countries } from "../../../utils/data/countries";
import { testimonials } from "../../../utils/data/testimonial-data";
import ReviewCard from "../../shared/cards/review-card";
import ExpandedSectionTitle from "../../shared/expanded-section-title";

function ReviewSection() {
  const [isReviewShow, setIsReviewShow] = useState(false)
  const handleChangeFunction = () => {
    setIsReviewShow(!isReviewShow);
  }
  const [ratingValue, setRatingValue] = useState<number | null>(0);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [country, setCountry] = useState("");
  const theme = useTheme();

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCountry(event.target.value);
  };

  const handleChangeModal = () => {
    setOpenContactModal(!openContactModal);
  };

  const [selectedImage, setSelectedImage] = useState<null | string>(null);

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
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
    <>
      <div className="my-5">
        <ExpandedSectionTitle
          title="Reviews"
          onchange={handleChangeFunction}
        />
        <div hidden={!isReviewShow} className="transition-all duration-1000 ease-in-out ">
          <Container>
            <div className="my-5 md:my-8 flex justify-center items-center ">
              <Button
                onClick={handleChangeModal}
                className="px-24 min-w-[196px] py-3" variant="contained">
                Add reviews
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {
                testimonials.map((review, i) => (
                  <ReviewCard review={review} key={i} />
                ))
              }
            </div>
          </Container>
        </div>
      </div>
      <Modal
        open={openContactModal}
        onClose={handleChangeModal}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'>
        <Box sx={formStyles.modalContainer}>
          <Typography
            sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
            Add review
          </Typography>
          <UploadAvatar selectedImage={selectedImage} handleImageChange={handleImageChange} />
          <Box
            sx={formStyles.gridContainer}>
            <TextField label='First Name' variant='outlined' />
            <TextField label='Last Name' variant='outlined' />
            <TextField label='Email' type='email' variant='outlined' />

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Country</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                value={country}
                label='Country'
                onChange={handleChange}>
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Rating
                name="simple-controlled"
                precision={0.5}
                value={ratingValue}
                onChange={(event, newValue) => {
                  setRatingValue(newValue);
                }}
              />
              <p>{" "}{ratingValue} Star</p>
            </Box>
            <div className=""></div>
            <TextField
              sx={formStyles.noteArea}
              className="text-area"
              label='Write your review'
            />

            <div style={formStyles.buttonContainer} className="">
              <Button variant="outlined">Cancle</Button>
              <Button variant="contained">Submit</Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewSection;

const useStyles = makeStyles((theme) => ({
  avatarRoot: {
    margin: '16px 0px',
  },
  input: {
    display: 'none',
  },
  avatar: {
    width: 72,
    height: 72,
  },
  avatarInput: {
    width: 72,
    height: 72,
    backgroundColor: '#000000',
    color: '#FFFFFF',
    '&:hover': {
      color: '#000000',
    },
  },
}));

const UploadAvatar = ({ selectedImage, handleImageChange }: any) => {
  const classes = useStyles();


  return (
    <div className={classes.avatarRoot}>
      {
        selectedImage ?
          <label htmlFor="avatar-upload">
            <input
              accept="image/*"
              className={classes.input}
              id="avatar-upload"
              type="file"
              onChange={handleImageChange}
            />

            <IconButton color="primary" component="span">
              <Avatar className={classes.avatar} src={selectedImage} />
            </IconButton>
          </label>
          :
          <label htmlFor="avatar-upload">
            <input
              accept="image/*"
              className={classes.input}
              id="avatar-upload"
              type="file"
              onChange={handleImageChange}
            />
            <IconButton
              className={classes.avatarInput}
              component="span">
              <MdPhotoCamera />
            </IconButton>
          </label>
      }

    </div>
  );
};

