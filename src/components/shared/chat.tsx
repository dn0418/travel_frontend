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
import { SetStateAction, useState } from "react";
import { BsChatDots } from "react-icons/bs";

const countries = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "MX", name: "Mexico" },
  { code: "GB", name: "United Kingdom" },
  { code: "FR", name: "France" },
  { code: "DE", name: "Germany" },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

function ChatIcon() {
  const [openContactModal, setOpenContactModal] = useState(false);
  const [country, setCountry] = useState("");

  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setCountry(event.target.value);
  };

  const handleChangeModal = () => {
    setOpenContactModal(!openContactModal);
  };

  return (
    <>
      <div className='fixed bottom-10 right-5 md:right-10 md:bottom-16 w-10 h-10 md:w-16 md:h-16 rounded-full bg-[#6F7531] text-white z-50 transition-opacity duration-300 opacity-100'>
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
        <Box sx={style}>
          <Typography
            sx={{ fontSize: "24px", color: "#004C99", fontWeight: 600 }}>
            Call Back
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "16px",
              mt: "24px",
            }}>
            <TextField label='First Name' variant='outlined' />
            <TextField label='Last Name' variant='outlined' />
            <TextField label='Contact number' variant='outlined' />
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
          </Box>
        </Box>
      </Modal>
    </>
  );
}

export default ChatIcon;
