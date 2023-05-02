import type { NextPage } from "next";

import { Button } from "@mui/material";
import MySwitch from "../components/MyButton";

const Home: NextPage = () => {
  return (
    <div className='container mx-auto p-10 flex items-center justify-center gap-5'>
      <MySwitch />
      <MySwitch defaultChecked />
      <MySwitch disabled />
      <MySwitch defaultChecked disabled />
      <Button className='text-white bg-blue-500'>New</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
    </div>
  );
};

export default Home;
