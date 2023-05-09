// @flow strict

import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { BsFillPersonFill } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import SectionTitle from "../../shared/section-title";

function RidePlanContact() {
  return (
    <div className='bg-[#FFF8F6] py-5 md:py-8 w-screen'>
      <Container>
        <SectionTitle title='Make your own ride plan with us' />
        <div className='grid md:grid-cols-2'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5'>
            <FormControl variant='outlined'>
              <InputLabel>Name</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position='end'>
                    <BsFillPersonFill className='text-xl text-black' />
                  </InputAdornment>
                }
                label='Name'
              />
            </FormControl>
            <FormControl variant='outlined'>
              <InputLabel>Email</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position='end'>
                    <SiGmail className='text-xl text-black' />
                  </InputAdornment>
                }
                label='Email'
              />
            </FormControl>
            <FormControl variant='outlined'>
              <InputLabel>Phone Number</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position='end'>
                    <IoMdCall className='text-xl text-black' />
                  </InputAdornment>
                }
                label='Phone Number'
              />
            </FormControl>
            <FormControl variant='outlined'>
              <InputLabel>Address</InputLabel>
              <OutlinedInput
                endAdornment={
                  <InputAdornment position='end'>
                    <FaRegAddressCard className='text-xl text-black' />
                  </InputAdornment>
                }
                label='Address'
              />
            </FormControl>
            <div></div>
            <Button className='bg-black text-white py-2 ' variant='contained'>
              Next
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RidePlanContact;
