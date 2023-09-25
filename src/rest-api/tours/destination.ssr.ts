import type { GetServerSideProps } from "next";
import tourClient from "../client/tour-client";

export const getServerSideProps: GetServerSideProps = async () => {
  const destinationData = await tourClient.tourDestination.all();

  return {
    props: {
      destinationData: destinationData
    },
  };
};
