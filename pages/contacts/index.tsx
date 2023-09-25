// @flow strict

import { Box, Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import PreparedContact from '../../src/components/call-back/prepared-contact';
import GeneralLayout from '../../src/components/layouts/_general';
import client from '../../src/rest-api/client';
import { NextPageWithLayout } from '../../src/types/page-props';
import { countries } from '../../src/utils/data/countries';
import { timezones } from '../../src/utils/data/timezones';

const initialState = {
  country: "",
  timezone: "Asia/Yerevan",
  firstName: "",
  email: "",
};

const Contact: NextPageWithLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputData, setInputData] = useState(initialState);

  const handleChangeInput = (name: string, value: string) => {
    setInputData((prev) => {
      const temp = JSON.parse(JSON.stringify(prev));
      temp[name] = value;
      return temp;
    });
  };

  const handleSubmit = async () => {
    if (!inputData.firstName || !inputData.email || !inputData.country) {
      toast.error("First name, email and country are required");
      return;
    }
    setIsLoading(true);
    // console.log(inputData)
    try {
      await client.callBack.newCallBack(inputData);
      toast.success("Your request has been successfully sent");
      setInputData(initialState);
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <Container>
      <Box className="call-back-modal-container my-8">
        <Typography
          sx={{ fontSize: "24px", color: "#081000", fontWeight: 600 }}
        >
          Contact With Us
        </Typography>
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
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
            className='md:col-span-2'
            multiline
            rows={5}
            onChange={(e) => handleChangeInput("note", e.target.value)}
            label="Write your message"
          />
          <div></div>
          <div className="flex justify-end gap-5 my-5">
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
    </Container>
  );
};

Contact.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Contact;