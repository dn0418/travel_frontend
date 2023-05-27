// @flow strict

import GeneralLayout from "../../src/components/layouts/_general";
import TourDetailsUI from "../../src/components/page-components/tour-details-page";
import { NextPageWithLayout } from "../../src/types/page-props";


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