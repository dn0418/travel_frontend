// @flow strict

import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { NextPageWithLayout } from "../../src/types/page-props";


const Transports: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

Transports.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Transports;