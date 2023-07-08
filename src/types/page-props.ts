import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";
import { CarType, FoodAndDrinksType, PaginationType, ReviewTypes, ThingToSeeType, TourAccessoryType } from "./index";
import { TourType } from "./tour";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface HomePageProps {
  reviews: ReviewTypes[];
  tours: TourType[];
}

export interface BlogPageProps {
  dataState: any;
  tours: any;
}

export interface ToursPageProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabIndex: any;
  tabs: {
    id: any;
    name: string;
    value: string;
  }[];
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

export interface TransportPageProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  currentTab: {
    title: string;
    value: string;
  };
  tabs: {
    title: string;
    value: string;
  }[];
  cars: CarType[];
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

export interface AboutUsUIProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabIndex: any;
  reviews: ReviewTypes[];
  reviewsPagination: PaginationType;
}


