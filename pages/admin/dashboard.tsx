// @flow strict

import { InferGetServerSidePropsType } from "next";
import DashboardUI from "../../src/components/admin-components/dashboard";
import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { getServerSideProps } from "../../src/rest-api/admin/dashboard.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getServerSideProps };

const Dashboard: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = (props) => {
  const currencyData = props.currencyData?.data || [];

  const findRate = (code: string) => {
    const rate = currencyData.find((item: any) => item.code === code);
    if (rate) {
      return rate.rate;
    }
    return 1;
  };

  return (
    <>
      <DashboardUI findRate={findRate} />
    </>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;