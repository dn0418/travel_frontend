import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import serviceClient from "../client/service-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;

  const hotelsTypes = await serviceClient.hotelType.all();

  return {
    props: {
      hotelsTypesData: hotelsTypes
    },
  };
};
