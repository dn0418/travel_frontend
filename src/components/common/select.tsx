import {
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from "@mui/material";

export interface CustomSelectPropsType {
  title: string;
  handleOnChange: Function;
  value: string;
  name: string;
  isHideTitle?: boolean;
  options: any[]
}

const CustomSelectInput = ({
  title,
  handleOnChange,
  value,
  name,
  isHideTitle = false,
  options
}: CustomSelectPropsType) => {


  return (
    <FormControl sx={{ m: 1, minWidth: 120 }}>
      {
        !isHideTitle &&
        <InputLabel className='text-black p-0'>{title}</InputLabel>
      }
      <Select
        onChange={(e) => handleOnChange(e)}
        name={name}
        value={value}
        className='border-0'>
        {
          options.length > 0 &&
          options.map((item, index) => (
            <MenuItem key={index} className='px-6' value={item?.value}>
              {item?.title || item.name}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};

export default CustomSelectInput;
