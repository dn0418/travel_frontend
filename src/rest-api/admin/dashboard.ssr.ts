import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const currencyData = await client.currency.all();

  return {
    props: {
      currencyData: currencyData
    },
  };
};
