import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "./client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;
  const type = query["type"] || "";
  const search = query["search"] || "";
  const month = query["month"] || "";
  const destination = query["destination"] || "";
  const days = query["days"] || "";

  const tours = await client.tours?.sortedTour(+page, type, search, month, destination, days);
  const destinationData = await client.tourDestination.all();

  return {
    props: {
      toursData: tours,
      destinationData: destinationData,
    },
  };
};
