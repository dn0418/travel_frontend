// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../src/components/layouts/_general";
import TourDetailsUI from "../../src/components/page-components/tour-details-page";
import { getStaticPaths, getStaticProps } from "../../src/rest-api/tours/tour-detaild.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const TourDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { tourDetails } = props;

  return (
    <>
      <TourDetailsUI tour={tourDetails.data} />
    </>
  );
};

TourDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default TourDetails;