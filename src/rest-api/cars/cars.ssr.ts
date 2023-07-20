import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import serviceClient from "../client/service-client";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const page = query["page"] || 1;
  const search = query["search"] || "";

  const carWithoutDriver = await serviceClient.carWithoutDriver.all(page, search);
  const carWithDriver = await serviceClient.carWithDriver.all();
  const airportTransport = await serviceClient.airportTransport.all();

  return {
    props: {
      carsData: carWithoutDriver,
      carWithDriverData: carWithDriver,
      airportTransportData: airportTransport,
    },
  };
};
