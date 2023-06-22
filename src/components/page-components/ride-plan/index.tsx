// @flow strict

import { Container } from "@mui/material";
import SectionTitle from "../../common/section-title";
import RidePlanForm from "./ride-plan-form";
import RidePlanMap from "./ride-plan-map";


function RidePlanUI() {

  return (
    <Container className=' flex flex-col'>
      <SectionTitle title='Make your own ride plan with us' />
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <RidePlanForm />
        <RidePlanMap />
      </div>
    </Container>
  );
};

export default RidePlanUI;