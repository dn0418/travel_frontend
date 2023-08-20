import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import tourClient from "./client/tour-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query, locale } = context;
  const page = query["page"] || 1;
  const type = query["type"] || "";
  const search = query["search"] || "";
  const month = query["month"] || "";
  const destination = query["destination"] || "";
  const days = query["days"] || "";

  const tours = await tourClient.tours?.sortedTour(+page, '', search, month, destination, days, locale, type);
  const destinationData = await tourClient.tourDestination.all();

  return {
    props: {
      toursData: tours,
      destinationData: destinationData,
    },
  };
};
