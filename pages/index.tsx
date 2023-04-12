import type { NextPage } from "next";

import MySwitch from "../src/components/MyButton";

const Home: NextPage = () => {
  return (
    <div className="container mx-auto p-10">
      <MySwitch />
      <MySwitch defaultChecked />
      <MySwitch disabled />
      <MySwitch defaultChecked disabled />
    </div>
  );
};

export default Home;
