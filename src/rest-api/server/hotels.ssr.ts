import type { GetStaticProps } from "next";
import { QueryClient, dehydrate } from "react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import client from "../client";

export const getStaticProps: GetStaticProps = async () => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.HOTELS], client.hotels?.all);

  const { queries } = JSON.parse(JSON.stringify(dehydrate(queryClient)));

  const hotelState = queries.find(
    (item: any) => item.queryKey[0] === API_ENDPOINTS.HOTELS,
  );

  const hotels = hotelState?.state?.data?.data ?? null;

  return {
    props: {
      hotels: hotels
    },
    revalidate: 120,
  };
};
