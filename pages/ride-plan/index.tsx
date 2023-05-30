// @flow strict

import dynamic from "next/dynamic";
import GeneralLayout from "../../src/components/layouts/_general";
import { NextPageWithLayout } from "../../src/types/page-props";
const RidePlanUI = dynamic(() => import("../../src/components/page-components/ride-plan"));


const RidePlan: NextPageWithLayout = () => {
  return (
    <>
      <RidePlanUI />
    </>
  );
};


RidePlan.getLayout = function getLayout(page) {
  return <GeneralLayout footer={false} >{page}</GeneralLayout>;
};

export default RidePlan;