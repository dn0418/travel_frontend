// @flow strict

import { InferGetStaticPropsType } from "next";
import { useState } from "react";
import GeneralLayout from "../../../src/components/layouts/_general";
import TransportUI from "../../../src/components/page-components/transport";
import { getStaticProps } from "../../../src/rest-api/server/cars.ssr";
import { CarType } from "../../../src/types";
import { NextPageWithLayout } from "../../../src/types/page-props";
export { getStaticProps };

const tabs = [
  { title: 'Transfer to and from', value: 'all' },
  { title: 'Without driver', value: 'false' },
  { title: 'With driver', value: 'true' },
];


const Transport: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const carsData = props.carsData || [];

  const [currentTab, setCurrentTab] = useState(tabs[0]);
  const [cars, setCars] = useState(carsData || []);
  const [page, setPage] = useState(1);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    const findTab = tabs.find((tab) => tab.value === newValue);

    if (findTab) {
      setCurrentTab(findTab);
      setPage(1);
      if (newValue !== 'all') {
        const newCars = carsData.filter(
          (car: CarType) => Boolean(car.isDriver).toString() === newValue);

        setCars(newCars);
      } else {
        setCars(carsData);
      }
    }
  };

  const handleSearch = (searchText: string) => {
    const filteredCars = cars.filter((car: CarType) => {
      const nameMatch = car.name.toLowerCase().includes(searchText.toLowerCase());
      const modelMatch = car.model.toLowerCase().includes(searchText.toLowerCase());
      return nameMatch || modelMatch;
    });

    setCars(filteredCars)
  }

  return (
    <>
      <TransportUI
        currentTab={currentTab}
        handleTabChange={handleTabChange}
        tabs={tabs}
        cars={cars}
        page={page}
        setPage={setPage}
        handleSearch={handleSearch}
      />
    </>
  );
};

Transport.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Transport;