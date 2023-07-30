import { TextField } from "@mui/material";
import { DateField } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

export default function CommonInput({
  handleChangeInput,
}: {
  handleChangeInput: (fieldName: string, value: string) => void;
}) {
  return (
    <>
      <TextField
        onChange={(e) => handleChangeInput("firstName", e.target.value)}
        label="First Name"
        variant="outlined"
        aria-required
      />
      <TextField
        label="Last Name"
        onChange={(e) => handleChangeInput("lastName", e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Email Address"
        onChange={(e) => handleChangeInput("email", e.target.value)}
        variant="outlined"
        required
      />
      <TextField
        label="Telephone"
        type="tel"
        inputProps={{ maxLength: 11 }}
        onChange={(e) => handleChangeInput("telephone", e.target.value)}
        variant="outlined"
        required
      />

      <DateField label="Start Date" defaultValue={dayjs("2022-04-17")} />
      <DateField
        label="End Date"
        defaultValue={dayjs("2022-04-17")}
        onChange={(newValue) => console.log(newValue)}
      />
    </>
  );
}
