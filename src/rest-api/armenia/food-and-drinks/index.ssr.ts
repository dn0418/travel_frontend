import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../../client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;
  const type = query["type"] || '';
  const search = query["search"] || "";

  const foodAndDrinks = await client.foodAndDrinks.all(page, type, search);

  return {
    props: {
      foodAndDrinks: foodAndDrinks
    },
  };
};
