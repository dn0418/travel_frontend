// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import HotelDetailsPage from "../../../src/components/page-components/hotel-details-page";
import { getStaticPaths, getStaticProps } from "../../../src/rest-api/server/hotel-details.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const HotelDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const caraDetails = props.carsDetails?.data;
  const hotelDetails = props.hotelDetails?.data;
  const cars = props?.carsData?.data;
  console.log(hotelDetails)

  return (
    <>
      <HotelDetailsPage hotel={hotelDetails} />
    </>
  );
};

HotelDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default HotelDetails;