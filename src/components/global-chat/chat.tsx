import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { SetStateAction, useState } from "react";
import { BsChatDots } from "react-icons/bs";
import { countries } from "../../utils/data/countries";
import { timezones } from "../../utils/data/timezones";
import PreparedContact from "./prepared-contact";



function ChatIcon() {
  const [openContactModal, setOpenContactModal] = useState(false);
  const [country, setCountry] = useState("");
  const [timezone, setTimezone] = useState("Asia/Yerevan");
  const theme = useTheme();

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCountry(event.target.value);
  };

  const handleChangeModal = () => {
    setOpenContactModal(!openContactModal);
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
      px: '12%',
      py: 8,
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
    }
  };

  return (
    <>
      <div className='fixed chat-area-global bottom-10 right-5 md:right-10 md:bottom-16 w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#6F7531] text-white z-50 transition-opacity duration-300 opacity-100'>
        <div className='w-full h-full flex justify-center items-center'>
          <Button
            className='outline-none w-full h-full rounded-full border-none cursor-pointer bg-transparent text-white '
            onClick={handleChangeModal}
            aria-label='Back to top'>
            <BsChatDots className='text-xl md:text-3xl' />
          </Button>
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
            Call Back
          </Typography>
          <Box
            sx={formStyles.gridContainer}>
            <TextField label='First Name' variant='outlined' />
            <TextField label='Last Name' variant='outlined' />
            <TextField label='Contact number' variant='outlined' />
            <TextField label='Email' type='email' variant='outlined' />
            <PreparedContact />

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

            <FormControl fullWidth>
              <InputLabel id='demo-simple-select-label'>Preferred time</InputLabel>
              <Select
                labelId='demo-simple-select-label'
                value={timezone}
                label='Timezone'
                onChange={(e) => setTimezone(e.target.value)}>
                {timezones.map((country, i) => (
                  <MenuItem key={i} value={country.value}>
                    {country.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={formStyles.noteArea}
              className="text-area"
              label='Add your notes'
            />
            <div></div>
            <div style={formStyles.buttonContainer} className="">
              <Button variant="outlined">Cancle</Button>
              <Button variant="contained">Submit</Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ChatIcon;
