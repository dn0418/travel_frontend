import type { GetStaticProps, GetStaticPropsContext } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import client from "./client";
import { API_ENDPOINTS } from "./client/api-endpoints";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.TOURS], client.tours?.all);
  await queryClient.prefetchQuery([API_ENDPOINTS.REVIEWS], client.reviews?.all);

  const { queries } = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  const toursState = queries.find(
    (item: any) => item.queryKey[0] === API_ENDPOINTS.TOURS,
  );

  const tours = toursState?.state?.data?.data ?? null;

  const reviewState = queries.find(
    (item: any) => item.queryKey[0] === API_ENDPOINTS.REVIEWS,
  );

  const reviews = reviewState?.state?.data?.data ?? null;

  return {
    props: {
      tours: tours,
      reviews: reviews
    },
    revalidate: 120,
  };
};
