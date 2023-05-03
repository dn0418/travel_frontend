import { Button } from "@mui/material";
import MySwitch from "../src/components/MyButton";
import HomeLayout from "../src/components/layouts/_home";
import { NextPageWithLayout } from "../src/types";

const Home: NextPageWithLayout = () => {
  return (
    <div className='container mx-auto p-10 flex flex-col items-center justify-center gap-5'>
      <MySwitch />
      <MySwitch defaultChecked />
      <MySwitch disabled />
      <MySwitch defaultChecked disabled />
      <Button className='text-white bg-blue-500'>New</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
      <Button className='text-white bg-emerald-500'>Another</Button>
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
