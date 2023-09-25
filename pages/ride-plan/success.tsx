// @flow strict

import { Button, Container } from "@mui/material";
import Link from "next/link";
import { BsCheckCircleFill } from 'react-icons/bs';
import GeneralLayout from "../../src/components/layouts/_general";
import { NextPageWithLayout } from "../../src/types/page-props";


const RideSuccess: NextPageWithLayout = () => {
  return (
    <Container className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="">
        <BsCheckCircleFill color="#13C39C" className="text-[64px] md:text-[96px] border-[3px] border-solid border-[#25FFAE] rounded-full" />
      </div>
      <p className="text-[#7C8691] text-2xl font-bold my-3 font-poppins">Success</p>
      <p className="text-[#7C8691] my-2  font-poppins">
        Your ride-plan request was successfully submitted.
      </p>
      <div className="flex justify-center items-center my-5">
        <Link href="/">
          <Button variant="contained" color="primary">Go To Home</Button>
        </Link>
      </div>
    </Container>
  );
};

RideSuccess.getLayout = function getLayout(page) {
  return <GeneralLayout footer={false}>{page}</GeneralLayout>;
};

export default RideSuccess;