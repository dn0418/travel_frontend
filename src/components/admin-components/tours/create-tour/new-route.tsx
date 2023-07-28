// @flow strict

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";

function hasEmptyString(obj: any) {
  for (const key in obj) {
    if (typeof obj[key] === "string" && obj[key].trim() === "") {
      return true;
    }
  }
  return false;
}


interface PropsType {
  handleAddModal: any;
  setRoutes: any;
}

function CreateNewRoute({ handleAddModal, setRoutes }: PropsType) {
  const [routeInput, setRouteInput] = useState({
    title: "",
    title_ru: "",
    title_hy: "",
    description: "",
    description_ru: "",
    description_hy: "",
    time: "",
    time_ru: "",
    time_hy: "",
    distance: "",
    distance_ru: "",
    distance_hy: "",
    meals: "",
    meals_ru: "",
    meals_hy: "",
    hotel: "",
    hotel_ru: "",
    hotel_hy: "",
  });
  const theme = useTheme();


  const handleChangeInput = (name: string, value: string) => {
    setRouteInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    })
  }

  const handleSubmit = async () => {
    const checkInputEmpty = hasEmptyString(routeInput);
    if (checkInputEmpty) {
      toast.error("All fields are required!");
      return;
    }
    setRoutes((previewData: any) => {
      const temp = JSON.parse(JSON.stringify(previewData));
      temp.push(routeInput);
      return temp;
    })
    handleAddModal();
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
    <Box sx={formStyles.modalContainer}>
      <Typography
        sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
        Create New Route
      </Typography>
      <Box
        sx={formStyles.gridContainer}>
        <TextField
          label='Title'
          name="title"
          value={routeInput?.title}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Title(Ru)'
          name="title_ru"
          value={routeInput?.title_ru}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Title(Hy)'
          name="title_hy"
          value={routeInput?.title_hy}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Description'
          name="description"
          value={routeInput?.description}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
          multiline
          rows={3}
        />
        <TextField
          label='Description(Ru)'
          name="description_ru"
          value={routeInput?.description_ru}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
          multiline
          rows={3}
        />
        <TextField
          label='Description(Hy)'
          name="description_hy"
          value={routeInput?.description_hy}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
          multiline
          rows={3}
        />
        <TextField
          label='Time Duration'
          name="time"
          value={routeInput?.time}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Time Duration(Ru)'
          name="time_ru"
          value={routeInput?.time_ru}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Time Duration(Hy)'
          name="time_hy"
          value={routeInput?.time_hy}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Distance'
          name="distance"
          value={routeInput?.distance}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Distance(Ru)'
          name="distance_ru"
          value={routeInput?.distance_ru}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Distance(Hy)'
          name="distance_hy"
          value={routeInput?.distance_hy}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Meal in This Time'
          name="meals"
          value={routeInput?.meals}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Meal in This Time(Ru)'
          name="meals_ru"
          value={routeInput?.meals_ru}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Meal in This Time(Hy)'
          name="meals_hy"
          value={routeInput?.meals_hy}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Hotel Name'
          name="hotel"
          value={routeInput?.hotel}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Hotel Name(Ru)'
          name="hotel_ru"
          value={routeInput?.hotel_ru}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <TextField
          label='Hotel Name(Hy)'
          name="hotel_hy"
          value={routeInput?.hotel_hy}
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          variant='outlined'
        />
        <div style={formStyles.buttonContainer}>
          <Button
            onClick={handleAddModal}
            color="secondary"
            variant="outlined">
            Cancle
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained">
            Create
          </Button>
        </div>
      </Box>
    </Box>
  );
};

export default CreateNewRoute;