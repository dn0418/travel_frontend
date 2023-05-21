// @flow strict

import GeneralLayout from "../../src/components/layouts/_general";
import { NextPageWithLayout } from "../../src/types/page-props";


const RidePlan: NextPageWithLayout = () => {
  return (
    <div>

    </div>
  );
};


RidePlan.getLayout = function getLayout(page) {
  return <GeneralLayout footer={false} >{page}</GeneralLayout>;
};

export default RidePlan;