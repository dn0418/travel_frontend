// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import CarDetailsUI from "../../../src/components/page-components/car-details-page";
import {
  getStaticPaths,
  getStaticProps
} from "../../../src/rest-api/server/car-details.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const TransportDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const carDetails = props.carsDetails?.data;
  const cars = props?.carsData?.data;
  const reviews = props?.reviews?.data;

  return (
    <>
      <CarDetailsUI
        cars={cars}
        car={carDetails}
        reviews={reviews}
      />
    </>
  );
};

TransportDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default TransportDetails;