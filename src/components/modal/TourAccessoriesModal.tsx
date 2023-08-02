import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import client from "../../rest-api/client";
import { InputData } from "../../types/modal.type";
import { localizationData } from "../../utils/locales";
import CheckBox from "./CheckBox";
import CommonInput from "./CommonInput";

interface IProps {
  buttonText: string;
}

function TourAccessoriesModal({ buttonText }: IProps) {
  const initialInput = {
    firstName: "",
    lastName: "",
    telephone: "",
    email: "",
    startDate: "",
    endDate: "",
    checkbox1: false,
    checkbox2: false,
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
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "telephone",
      "startDate",
      "endDate",
    ];

    const missingFields = requiredFields.filter(
      (field: string) => !inputData[field]
    );
    console.log(missingFields);
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
      startDate: inputData.startDate,
      endDate: inputData.endDate,
      telephone: inputData.telephone,
    }

    try {
      const res = await client.requestMail.accessoriesMail(payload);
      toast.success("Your tour accesories request has been sent successfully");
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
            {localData.tour_accessories_text}
          </Typography>
          <Box sx={formStyles.gridContainer}>
            <CommonInput
              handleChangeInput={handleChangeInput}
              inputData={inputData}
              localData={localData}
            />

            <TextField
              sx={formStyles.noteArea}
              onChange={(e) =>
                handleChangeInput("additionalInfo", e.target.value)
              }
              label={localData.additional_info_text}
              multiline
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

export default TourAccessoriesModal;
