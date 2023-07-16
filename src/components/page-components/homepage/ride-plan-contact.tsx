// @flow strict

import {
  Button,
  Container,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaRegAddressCard } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { SiGmail } from "react-icons/si";
import SectionTitle from "../../common/section-title";

function RidePlanContact() {
  const [inputData, setInputData] = useState({})
  const router = useRouter()


  const handleOnChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInputData((prevState) => {
      const temp = JSON.parse(JSON.stringify(prevState))
      temp[e.target.name] = e.target.value;
      return temp;
    })
  }

  const handleOnClick = () => {
    const objectLength = Object.keys(inputData).length;
    if (objectLength === 0) {
      return;
    } else {
      localStorage.setItem('ridePlanContact', JSON.stringify(inputData));
      router.push('/ride-plan');
    }
  }

  return (
    <div className='bg-[#FFF8F6] py-5 md:py-8 w-screen'>
      <Container>
        <SectionTitle title='Make Your Own Ride Plan With Us' />
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
                name="name"
                onChange={handleOnChange}
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
                type="email"
                name="email"
                onChange={handleOnChange}
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
                type="tel"
                name="phoneNumber"
                onChange={handleOnChange}
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
                type="text"
                name="address"
                onChange={handleOnChange}
              />
            </FormControl>
            <div></div>
            <Button
              className='bg-black text-white py-2 '
              onClick={handleOnClick}
              variant='contained'>
              Next
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default RidePlanContact;
