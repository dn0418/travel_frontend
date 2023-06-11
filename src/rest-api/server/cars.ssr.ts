import type { GetStaticProps } from "next";
import { QueryClient, dehydrate } from "react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import client from "../client";

export const getStaticProps: GetStaticProps = async () => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.CARS], client.cars?.all);

  const { queries } = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  const carsState = queries.find(
    (item: any) => item.queryKey[0] === API_ENDPOINTS.CARS,
  );

  const cars = carsState?.state?.data?.data ?? null;

  return {
    props: {
      carsData: cars
    },
    revalidate: 120,
  };
};
