// @flow strict

import GeneralLayout from "../../src/components/layouts/_general";
import RidePlanUI from "../../src/components/page-components/ride-plan";
import { NextPageWithLayout } from "../../src/types/page-props";


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