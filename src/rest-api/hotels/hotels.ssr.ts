import type { GetServerSideProps, GetServerSidePropsContext, GetStaticProps } from "next";
import { QueryClient, dehydrate } from "react-query";
import { API_ENDPOINTS } from "../api-endpoints";
import serviceClient from "../client/service-client";

export const getStaticProps: GetStaticProps = async () => {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery([API_ENDPOINTS.HOTELS], serviceClient.hotels?.all);

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

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, locale } = context;
  const page = query["page"] || 1;
  const type = query["type"] || '';
  const search = query["search"] || "";
  const country = query["country"] || "";
  const city = query["city"] || "";

  const hotels = await serviceClient.hotels.filtered(page, type, search, country, city, locale);
  const hotelTypes = await serviceClient.hotelType.all();

  return {
    props: {
      hotelData: hotels,
      hotelTypes: hotelTypes
    },
  };
};
