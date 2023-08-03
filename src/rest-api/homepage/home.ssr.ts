import type { GetStaticProps, GetStaticPropsContext } from "next";
import client from "../client";
import tourClient from "../client/tour-client";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const { locale } = context;
  const reviews = await client.reviews?.all(1, 20);

  const toursData = await tourClient.tours?.all(locale);
  const oneDayTour = await tourClient.tours.oneDayTour(locale);
  const fixedDateTour = await tourClient.tours.fixedDateTour(locale);
  const destinationData = await tourClient.tourDestination.all();

  return {
    props: {
      toursData: toursData,
      reviewsData: reviews,
      destinationData: destinationData,
      oneDayTourData: oneDayTour,
      fixedDateTourData: fixedDateTour,
    },
    revalidate: 120,
  };
};
