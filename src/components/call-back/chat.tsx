import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { toast } from "react-toastify";
import client from "../../rest-api/client";
import { countries } from "../../utils/data/countries";
import { timezones } from "../../utils/data/timezones";
import PreparedContact from "./prepared-contact";

const initialState = {
  country: "",
  timezone: "Asia/Yerevan",
  firstName: "",
  email: "",
};

function ChatIcon() {
  const [openContactModal, setOpenContactModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState(initialState);
  const theme = useTheme();

  const handleChangeInput = (name: string, value: string) => {
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
    if (!inputData.firstName || !inputData.email || !inputData.country) {
      toast.error("First name, email and country are required");
      return;
    }
    setIsLoading(true);
    // console.log(inputData)
    try {
      const res = await client.callBack.newCallBack(inputData);
      toast.success("Your request has been successfully sent");
      setInputData(initialState);
      handleChangeModal();
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
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
      <div className="fixed chat-area-global bottom-10 right-5 md:right-10 md:bottom-16 w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#6F7531] text-white z-50 transition-opacity duration-300 opacity-100">
        <div className="w-full h-full flex justify-center items-center">
          <Button
            className="outline-none w-full h-full rounded-full border-none cursor-pointer bg-transparent text-white "
            onClick={handleChangeModal}
            aria-label="Back to top"
          >
            <BsChatDots className="text-xl md:text-3xl" />
          </Button>
        </div>
      </div>
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
            Call Back
          </Typography>
          <Box sx={formStyles.gridContainer}>
            <TextField
              onChange={(e) => handleChangeInput("firstName", e.target.value)}
              label="First Name"
              variant="outlined"
            />
            <TextField
              label="Last Name"
              onChange={(e) => handleChangeInput("lastName", e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Contact number"
              onChange={(e) => handleChangeInput("contact", e.target.value)}
              variant="outlined"
            />
            <TextField
              label="Email"
              type="email"
              onChange={(e) => handleChangeInput("email", e.target.value)}
              variant="outlined"
            />
            <PreparedContact handleChangeInput={handleChangeInput} />

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={inputData?.country}
                label="Country"
                onChange={(e) => handleChangeInput("country", e.target.value)}
              >
                {countries.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Preferred time
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={inputData?.timezone}
                label="Timezone"
                onChange={(e) => handleChangeInput("timezone", e.target.value)}
              >
                {timezones.map((country, i) => (
                  <MenuItem key={i} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={formStyles.noteArea}
              multiline
              rows={4}
              onChange={(e) => handleChangeInput("note", e.target.value)}
              label="Add your notes"
            />
            <div></div>
            <div style={formStyles.buttonContainer} className="">
              <Button
                color="secondary"
                onClick={handleChangeModal}
                variant="outlined">
                Cancel
              </Button>
              <Button
                disabled={isLoading}
                onClick={handleSubmit}
                variant="contained"
              >
                {isLoading ? "Loading..." : "Submit"}
              </Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ChatIcon;
