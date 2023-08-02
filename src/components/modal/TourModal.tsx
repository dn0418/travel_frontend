import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import client from "../../rest-api/client";
import { InputData } from "../../types/modal.type";
import { TourType } from "../../types/tour";
import { localizationData } from "../../utils/locales";
import CheckBox from "./CheckBox";
import CommonInput from "./CommonInput";

interface IProps {
  buttonText: string;
  tour: TourType;
}

function TourModal({ buttonText, tour }: IProps) {
  const initialInput = {
    firstName: "",
    lastName: "",
    email: "",
    telephone: "",
    startDate: tour.startDate || "",
    endDate: tour.endDate || "",
    checkbox1: false,
    checkbox2: false,
    adult: 0,
    child: 0,
    additionalInfo: "",
  }
  const [openContactModal, setOpenContactModal] = useState(false);
  const [inputData, setInputData] = useState<InputData>(initialInput);
  const theme = useTheme();

  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

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
    if (inputData.child! > 6) {
      toast.error("child should be less than 6");
      return;
    }
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "telephone",
      "startDate",
      "adult",
      "child",
    ];

    const missingFields = requiredFields.filter(
      (field: string) => !inputData[field]
    );
    if (missingFields.length > 0) {
      toast.error(
        `${missingFields.join(", ")} field${missingFields.length > 1 ? "s" : ""
        } are required`
      );
      return;
    }

    const payload = {
      firstName: inputData.firstName,
      lastName: inputData.lastName,
      email: inputData.email,
      additionalInfo: inputData.additionalInfo,
      adult: inputData.adult,
      child: inputData.child,
      startDate: inputData.startDate,
      endDate: inputData.endDate,
      telephone: inputData.telephone,
    }

    try {
      const res = await client.requestMail.tourMail(payload);
      toast.success("Your tour request has been sent successfully");
      setInputData(initialInput);
      setOpenContactModal(false);
    } catch (error: any) {
      toast.error(error.message);
    }
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
            {localData.tour_modal_title}
          </Typography>
          <Box sx={formStyles.gridContainer}>
            <CommonInput
              handleChangeInput={handleChangeInput}
              inputData={inputData}
              localData={localData}
            />
            <TextField
              label={localData.adult_text}
              type="number"
              onChange={(e) => handleChangeInput("adult", e.target.value)}
              value={inputData.adult}
              variant="outlined"
              required
            />
            <TextField
              label={localData.child_text}
              type="number"
              onChange={(e) => handleChangeInput("child", e.target.value)}
              maxRows={1}
              variant="outlined"
              value={inputData.child}
              required
            />
            <TextField
              label={localData.tour_name_text}
              type="text"
              onChange={(e) => handleChangeInput("tourName", e.target.value)}
              variant="outlined"
              value={tour.title}
              disabled
            />

            <TextField
              sx={formStyles.noteArea}
              onChange={(e) =>
                handleChangeInput("additionalInfo", e.target.value)
              }
              label={localData.additional_info_text}
              multiline
              value={inputData.additionalInfo}
              rows={4}
            />
          </Box>

          <CheckBox
            fieldName={"checkbox1"}
            labelName={localData.iam_not_robot_text}
            handleChangeInput={handleChangeInput}
          />
          <br />

          <CheckBox
            fieldName={"checkbox2"}
            labelName={localData.agree_with_terms_text}
            handleChangeInput={handleChangeInput}
          />

          <div style={formStyles.buttonContainer}>
            <Button variant="outlined" onClick={handleChangeModal}>
              {localData.cancel_text}
            </Button>
            <Button
              disabled={!inputData.checkbox1 || !inputData.checkbox2}
              onClick={handleSubmit}
              variant="contained"
            >
              {localData.submit_text}
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default TourModal;
