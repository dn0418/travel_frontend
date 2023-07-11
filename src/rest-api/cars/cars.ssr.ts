import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import client from "../client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;
  const search = query["search"] || "";

  const carWithoutDriver = await client.carWithoutDriver.all(page, search);
  const carWithDriver = await client.carWithDriver.all();
  const airportTransport = await client.airportTransport.all();

  return {
    props: {
      carsData: carWithoutDriver,
      carWithDriverData: carWithDriver,
      airportTransportData: airportTransport,
    },
  };
};
