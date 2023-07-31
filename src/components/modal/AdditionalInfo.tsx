import { TextField } from "@mui/material";

const AdditionalInfo = ({
  css,
  handleChangeInput,
}: {
  css: Object;
  handleChangeInput: (fieldName: string, value: string) => void;
}) => {
  return (
    <>
      <TextField
        sx={css}
        onChange={(e) => handleChangeInput("additionalInfo", e.target.value)}
        label="Additional Information"
        multiline
        rows={4}
      />
    </>
  );
};

export default AdditionalInfo;
