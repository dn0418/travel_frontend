import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { toast } from "react-toastify";

import { TourType } from "../../types/tour";
import CheckBox from "./CheckBox";
import CommonInput from "./CommonInput";


interface IProps {
  buttonText: string;
  tour: TourType;
}

function TourModal({ buttonText, tour }: IProps) {
  const [openContactModal, setOpenContactModal] = useState(false);

  const [inputData, setInputData] = useState({
    firstName: "",
    email: "",
    startDate: tour.startDate || '',
    endDate: tour.endDate || '',
    checkbox1: false,
    checkbox2: false,
    adult: 0,
  });
  const theme = useTheme();

  const handleChangeInput = (name: string, value: string | boolean): void => {
    setInputData((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    });
  };

  const handleChangeModal = () => {
    setOpenContactModal(!openContactModal);
  };

  const handleSubmit = async () => {
    if (!inputData.email) {
      toast.error("First name, email and country are required");
      return;
    }
    try {
      console.log(inputData);
    } catch (error) {

    }
    setOpenContactModal(false);
  };

  const formStyles = {
    modalContainer: {
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "75%",
      bgcolor: "background.paper",
      boxShadow: 24,
      px: "12%",
      py: 5,
      borderRadius: "12px",
      overflowY: "scroll",
      maxHeight: "96vh",
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
      mt: "24px",
      [theme.breakpoints.down("md")]: {
        gridTemplateColumns: "repeat(1, 1fr)",
        gap: "8px",
        mt: "12px",
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
      <Button
        className="px-8 md:px-12 rounded-lg bg-black text-white"
        variant="contained"
        onClick={handleChangeModal}
      >
        {buttonText}
      </Button>
      <Modal
        open={openContactModal}
        onClose={handleChangeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={formStyles.modalContainer}>
          <Typography
            sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}
          >
            Tour Page
          </Typography>
          <Box sx={formStyles.gridContainer}>
            <CommonInput handleChangeInput={handleChangeInput} />
            <TextField
              label="Adult"
              type="number"
              onChange={(e) => handleChangeInput("adult", e.target.value)}
              value={inputData.adult}
              variant="outlined"
              required
            />
            <TextField
              label="Child"
              type="number"
              onChange={(e) => handleChangeInput("child", e.target.value)}
              maxRows={1}
              variant="outlined"
              required
            />
            <TextField
              label="Tour Name"
              type="text"
              onChange={(e) => handleChangeInput("tourName", e.target.value)}
              variant="outlined"
              value={tour.title}
              disabled
            />

            <TextField
              sx={formStyles.noteArea}
              onChange={(e) => handleChangeInput("additionalInfo", e.target.value)}
              label="Additional Information"
              multiline
              rows={4}
            />
          </Box>

          <CheckBox
            fieldName={"checkbox1"}
            labelName={"I'm not robot"}
            handleChangeInput={handleChangeInput}
          />
          <br />

          <CheckBox
            fieldName={"checkbox2"}
            labelName={"I agree with the booking terms of this site"}
            handleChangeInput={handleChangeInput}
          />

          <div style={formStyles.buttonContainer}>
            <Button variant="outlined" onClick={handleChangeModal}>
              Cancel
            </Button>
            <Button
              disabled={!inputData.checkbox1 || !inputData.checkbox2}
              onClick={handleSubmit}
              variant="contained"
            >
              Submit
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default TourModal;
