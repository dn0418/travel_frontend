import type { GetStaticProps, GetStaticPropsContext } from "next";
import client from "../client";
import tourClient from "../client/tour-client";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const reviews = await client.reviews?.all(1, 20);

  const toursData = await tourClient.tours?.all();

  const destinationData = await tourClient.tourDestination.all();

  return {
    props: {
      toursData: toursData,
      reviewsData: reviews,
      destinationData: destinationData
    },
    revalidate: 120,
  };
};
