import type { NextPage } from "next";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = {}> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export interface BlogPageProps {
  dehydratedState: any;
}

export interface ToursPageProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabIndex: any;
  tabs: {
    title: string;
    value: string;
  }[];
  title: string;
}

export interface AboutUsUIProps {
  handleTabChange: (event: React.SyntheticEvent, newValue: string) => void;
  tabIndex: any;
}
