// @flow strict

import { Accordion, AccordionSummary, Box, InputAdornment, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { BsTelegram } from "react-icons/bs";
import { IoIosArrowDown, IoLogoWhatsapp } from "react-icons/io";
import { IoCallOutline } from "react-icons/io5";
import { MdAddIcCall } from "react-icons/md";

function PreparedContact() {
  const [isOpenContact, setIsOpenContact] = useState(true);

  return (
    <div>
      <Accordion
        sx={{ height: '56px' }}
        onChange={(e, expanded) => setIsOpenContact(expanded)}
        expanded={isOpenContact}
      >
        <AccordionSummary
          expandIcon={<IoIosArrowDown />}
        >
          <Typography>Preferred call type</Typography>
        </AccordionSummary>
      </Accordion>
      <Box
        hidden={isOpenContact}
      >
        <TextField
          sx={{ width: '100%', mt: 2 }}
          placeholder="+001234567899"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoCallOutline
                  style={{ color: '#EDA592', fontSize: '20px', marginRight: '30px' }} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          sx={{ width: '100%', mt: 2 }}
          placeholder="+001234567899"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IoLogoWhatsapp
                  style={{ color: '#60D669', fontSize: '20px', marginRight: '30px' }} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          sx={{ width: '100%', mt: 2 }}
          placeholder="+001234567899"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <BsTelegram
                  style={{ color: '#229ED9', fontSize: '20px', marginRight: '30px' }} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
        <TextField
          sx={{ width: '100%', mt: 2 }}
          placeholder="+001234567899"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MdAddIcCall
                  style={{ color: '#ED7220', fontSize: '20px', marginRight: '30px' }} />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Box>
    </div>
  );
};

export default PreparedContact;