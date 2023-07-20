import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import tourClient from "../client/tour-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;

  const destinationData = await tourClient.tourDestination.all();

  return {
    props: {
      destinationData: destinationData
    },
  };
};
