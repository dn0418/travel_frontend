// @flow strict

import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../../../src/components/layouts/_general";
import HotelDetailsPage from "../../../src/components/page-components/hotel-details-page";
import { getStaticPaths, getStaticProps } from "../../../src/rest-api/server/hotel-details.ssr";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const HotelDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const hotelDetails = props.hotelDetails?.data;
  const allHotel = props?.allHotel?.data;
  const reviews = props?.hotelReviews?.data;
  const metadata = props?.hotelReviews?.meta;

  return (
    <>
      <HotelDetailsPage
        hotel={hotelDetails}
        allHotel={allHotel}
        reviews={reviews}
        metadata={metadata}
      />
    </>
  );
};

HotelDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default HotelDetails;