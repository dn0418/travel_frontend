// @flow strict

import dynamic from "next/dynamic";
import GeneralLayout from "../../../src/components/layouts/_general";
import { NextPageWithLayout } from "../../../src/types/page-props";
const HotelsUI = dynamic(() => import("../../../src/components/page-components/hotels"));


const Hotels: NextPageWithLayout = () => {

  return (
    <>
      <HotelsUI />
    </>
  );
};

Hotels.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Hotels;