import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { LocaleDataItems } from "../../utils/locales/types";

interface IProps {
  handleChangeInput: (fieldName: string, value: string) => void;
  inputData: {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    startDate: string;
    endDate: string;
  };
  localData: LocaleDataItems;
}
export default function CommonInput({
  handleChangeInput,
  inputData,
  localData,
}: IProps) {
  return (
    <>
      <TextField
        onChange={(e) => handleChangeInput("firstName", e.target.value)}
        label={localData.firstName}
        variant="outlined"
        aria-required
        value={inputData.firstName}
        required
      />
      <TextField
        label={localData.lastName}
        onChange={(e) => handleChangeInput("lastName", e.target.value)}
        variant="outlined"
        value={inputData.lastName}
        required
      />
      <TextField
        label={localData.email_text + " " + localData.address_text}
        onChange={(e) => handleChangeInput("email", e.target.value)}
        variant="outlined"
        value={inputData.email}
        required
      />
      <TextField
        label={localData.telephone_text}
        type="tel"
        inputProps={{ maxLength: 11 }}
        onChange={(e) => handleChangeInput("telephone", e.target.value)}
        variant="outlined"
        value={inputData.telephone}
        required
      />
      <DatePicker
        label={localData.startDate}
        value={inputData?.startDate ? dayjs(inputData?.startDate) : null}
        views={["day", "month", "year"]}
        onChange={(value) =>
          handleChangeInput("startDate", value?.toDate().toLocaleDateString()!)
        }
        format="DD/MM/YYYY"
      />
      <DatePicker
        label={localData.endDate}
        value={inputData?.endDate ? dayjs(inputData?.endDate) : null}
        views={["day", "month", "year"]}
        onChange={(value) =>
          handleChangeInput("endDate", value?.toDate().toLocaleDateString()!)
        }
        format="DD/MM/YYYY"
      />
    </>
  );
}
