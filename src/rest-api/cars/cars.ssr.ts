import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;
  const search = query["search"] || "";

  const cars = await client.cars.all(page, search);

  return {
    props: {
      carsData: cars
    },
  };
};
