// @flow strict

import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { NextPageWithLayout } from "../../src/types/page-props";


const Hotels: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

Hotels.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Hotels;