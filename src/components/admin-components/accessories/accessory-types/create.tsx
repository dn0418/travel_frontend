// @flow strict

import { Box, Button, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import serviceClient from "../../../../rest-api/client/service-client";

interface PropsType {
  handleChangeModal: any;
}

const CreateAccessoryType = ({ handleChangeModal }: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [typeInput, setTypeInput] = useState({
    name: '',
    name_ru: '',
    name_hy: '',
  });
  const theme = useTheme();
  const router = useRouter();

  const handleChangeInput = (name: string, value: string) => {
    setTypeInput((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    })
  }

  const handleSubmit = async () => {
    if (!typeInput.name || !typeInput.name_ru || !typeInput.name_hy) {
      toast.error("Please fill all the fields");
      return;
    }

    setIsLoading(true);
    const payload = {
      name: typeInput.name,
      name_ru: typeInput.name_ru,
      name_hy: typeInput.name_hy,
    }

    try {
      const res = await serviceClient.accessoryType.createType(payload);
      toast.success("Accessory type created successfully");
      router.push({
        pathname: router.pathname
      });
      handleChangeModal();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error)
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
    <div tabIndex={0}>
      <Box sx={formStyles.modalContainer}>
        <Typography
          sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
          Create New Type
        </Typography>
        <Box
          sx={formStyles.gridContainer}>
          <TextField
            label='Name'
            name="name"
            value={typeInput?.name}
            onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
            variant='outlined'
          />
          <TextField
            label='Name Ru'
            name="name_ru"
            value={typeInput?.name_ru}
            onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
            variant='outlined'
          />
          <TextField
            label='Name Hy'
            name="name_hy"
            value={typeInput?.name_hy}
            onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
            variant='outlined'
          />
          <div style={formStyles.buttonContainer}>
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
              {isLoading ? "Loading..." : "Create Type"}
            </Button>
          </div>
        </Box>
      </Box>
    </div>
  );
}


CreateAccessoryType.displayName = 'CreateAccessoryType';

export default CreateAccessoryType;