import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;

  const ridePlans = await client.ridePlan.allPlans(page);

  return {
    props: {
      ridePlansData: ridePlans
    },
  };
};
