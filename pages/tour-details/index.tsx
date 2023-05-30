// @flow strict

import dynamic from "next/dynamic";
import GeneralLayout from "../../src/components/layouts/_general";
import { NextPageWithLayout } from "../../src/types/page-props";
const TourDetailsUI = dynamic(() => import("../../src/components/page-components/tour-details-page"))

const TourDetails: NextPageWithLayout = () => {
  return (
    <>
      <TourDetailsUI />
    </>
  );
};

TourDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default TourDetails;