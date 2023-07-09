import type { GetStaticProps, GetStaticPropsContext } from "next";
import client from "../client";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {
  const reviews = await client.reviews?.all(1, 20);

  const toursData = await client.tours?.all();

  const destinationData = await client.tourDestination.all();

  return {
    props: {
      toursData: toursData,
      reviewsData: reviews,
      destinationData: destinationData
    },
    revalidate: 120,
  };
};
