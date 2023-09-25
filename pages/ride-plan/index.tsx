// @flow strict

import { InferGetServerSidePropsType } from "next";
import GeneralLayout from "../../src/components/layouts/_general";
import RidePlanUI from "../../src/components/page-components/ride-plan";
import { getServerSideProps } from "../../src/rest-api/tours/destination.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
import { TourDestinationType } from "../../src/types/tour";
export { getServerSideProps };

const RidePlan: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const destinations: TourDestinationType[] = props?.destinationData?.data;

  return (
    <>
      <RidePlanUI destinations={destinations} />
    </>
  );
};


RidePlan.getLayout = function getLayout(page) {
  return <GeneralLayout footer={false} >{page}</GeneralLayout>;
};

export default RidePlan;