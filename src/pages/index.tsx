import { Button } from "@mui/material";
import MySwitch from "../components/MyButton";
import HomeLayout from "../components/layouts/_home";
import { NextPageWithLayout } from "../types";

const Home: NextPageWithLayout = () => {
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

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
