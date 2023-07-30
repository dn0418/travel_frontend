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
        className="text-area"
        onChange={(e) => handleChangeInput("additionalInfo", e.target.value)}
        label="Additional Information"
      />
    </>
  );
};

export default AdditionalInfo;
