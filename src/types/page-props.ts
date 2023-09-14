import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import React from "react";
import { BlogType, EventType, VacancyType } from "./armenia";
import { AirportTransportType, CarWithDriverType, CarWithOutType } from "./car-type";
import { FoodAndDrinksType, PaginationType, ReviewTypes, SurroundingType, ThingToSeeType } from "./index";
import { MiceTypes, TourAccessoryType } from "./services";
import { TourDestinationType, TourType } from "./tour";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface HomePageProps {
  reviews: ReviewTypes[];
  tours: TourType[];
  fixedDateTour: TourType[];
  oneDayTour: TourType[];
  destinations: TourDestinationType[];
}

export interface BlogPageProps {
  dataState: any;
  tours: any;
}

export interface ToursPageProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabIndex: any;
  tabs: any;
  title: string;
  tours: any;
  handlePageChange: any;
  handleSearch: any;
  meta: {
    page: number;
    totalPages: number;
    limit: number;
  }
}

export interface SearchPageProps {
  tours: any;
  handlePageChange: any;
  handleSearch: any;
  meta: {
    page: number;
    totalPages: number;
    limit: number;
  };
  destinations: TourDestinationType[];
  typeItems: any;
}

export interface TransportPageProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  currentTab: any;
  carsWithoutDriver: CarWithOutType[];
  carsWithDriver: CarWithDriverType;
  airportTransport: AirportTransportType;
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
}

export interface ThingToSeePageProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  currentTab: {
    title: string;
    value: string;
  };
  tabs: {
    title: string;
    value: string;
    icon: React.ReactNode;
  }[];
  things: ThingToSeeType[];
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
  findTab: any;
}

export interface SurroundingPageProps {
  surroundings: SurroundingType[];
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
}

export interface EventsPageProps {
  events: EventType[];
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
}

export interface BlogsPageProps {
  blogs: BlogType[];
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
}

export interface FoodAndDrinkPageProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  currentTab: {
    title: string;
    value: string;
    icon: React.ReactNode
  } | null;
  tabs: {
    title: string;
    value: string;
    icon: React.ReactNode;
  }[];
  findTab: any;
  foodAndDrinks: FoodAndDrinksType[];
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
}

export interface AccessoriesPageProps {
  accessories: TourAccessoryType[];
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
}

export interface MicePageProps {
  mices: MiceTypes[];
  handleSearch: any;
  handlePageChange: any;
  metaData: any;
}

export interface AboutUsUIProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabIndex: any;
  reviews: ReviewTypes[];
  vacancies: VacancyType[];
  reviewsPagination: PaginationType;
  vacanciesPagination: PaginationType;
  findStaticPage: any;
}


