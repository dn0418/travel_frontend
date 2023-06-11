import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;
  const limit = query["limit"] || 6;
  const type = query["type"] || "";

  const tours = await client.tours?.sortedTour(+page, +limit, type);

  const tourType = await client.tourType.all()

  return {
    props: {
      toursData: tours,
      tourType: tourType,
    },
  };
};
