// @flow strict

import { Container } from "@mui/material";
import { BsCheckCircleFill } from 'react-icons/bs';


function RideSuccess() {
  return (
    <Container className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="">
        <BsCheckCircleFill color="#13C39C" className="text-[64px] md:text-[96px] border-[3px] border-solid border-[#25FFAE] rounded-full" />
      </div>
      <p className="text-[#7C8691] text-2xl font-bold my-3 font-poppins">Success</p>
      <p className="text-[#7C8691] my-2  font-poppins">
        Your ride-plan request was successfully submitted.
      </p>
    </Container>
  );
};

export default RideSuccess;