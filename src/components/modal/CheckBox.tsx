import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

interface IProps {
  fieldName: string;
  labelName: string;
  handleChangeInput: (fieldName: string, value: boolean) => void;
}
const CheckBox = ({ fieldName, labelName, handleChangeInput }: IProps) => {
  return (
    <>
      <FormControlLabel
        required
        control={
          <Checkbox
            onChange={(e: { target: { checked: boolean } }) => {
              handleChangeInput(fieldName, e.target.checked);
            }}
          />
        }
        label={labelName}
      />
    </>
  );
};

export default CheckBox;
