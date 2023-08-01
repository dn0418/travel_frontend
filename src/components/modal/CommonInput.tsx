import { TextField, formLabelClasses } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";


interface IProps {
  handleChangeInput: (fieldName: string, value: string) => void; 
  inputData:{
    firstName: string,
    lastName:string
    email: string,
    telephone:string,
    startDate: string,
    endDate: string,
   
  }
}
export default function CommonInput({
  handleChangeInput,
  inputData
}: IProps) {

  
  return (
    <>
      <TextField
        onChange={(e) => handleChangeInput("firstName", e.target.value)}
        label="First Name"
        variant="outlined"
        aria-required
        value={inputData.firstName}
        required
      />
      <TextField
        label="Last Name"
        onChange={(e) => handleChangeInput("lastName", e.target.value)}
        variant="outlined"
        value={inputData.lastName}
        required
      />
      <TextField
        label="Email Address"
        onChange={(e) => handleChangeInput("email", e.target.value)}
        variant="outlined"
        value={inputData.email}
        required
      />
      <TextField
        label="Telephone"
        type="tel"
        inputProps={{ maxLength: 11 }}
        onChange={(e) => handleChangeInput("telephone", e.target.value)}
        variant="outlined"
        value={inputData.telephone}
        required
      />
      <DatePicker 
         label="Start Date" 
      value={dayjs(inputData?.startDate)}
       views={["day", "month", "year"]} 
         onChange={(value) => handleChangeInput('startDate',value?.toDate().toLocaleDateString()!)}
        format="DD/MM/YYYY"
         />
      <DatePicker
      label="End Date" 
      value={dayjs(inputData?.startDate)}
       views={["day", "month", "year"]}
       onChange={(value) => handleChangeInput('endDate',value?.toDate().toLocaleDateString()!)} 
       
        format="DD/MM/YYYY"
       />
      
    </>
  );
}
