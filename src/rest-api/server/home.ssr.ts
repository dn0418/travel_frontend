import type { GetStaticProps, GetStaticPropsContext } from "next";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { API_ENDPOINTS } from "../api-endpoints";
import client from "../client";

export const getStaticProps: GetStaticProps = async (context: GetStaticPropsContext) => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.TOURS], client.tours?.all);

  const reviews = await client.reviews?.all(1, 20);

  const { queries } = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  const toursState = queries.find(
    (item: any) => item.queryKey[0] === API_ENDPOINTS.TOURS,
  );

  const tours = toursState?.state?.data?.data ?? null;

  return {
    props: {
      toursData: tours,
      reviewsData: reviews
    },
    revalidate: 120,
  };
};
