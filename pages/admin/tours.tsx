// @flow strict

import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { NextPageWithLayout } from "../../src/types/page-props";


const Tours: NextPageWithLayout = () => {
  return (
    <div>
      <h1>Hello</h1>
    </div>
  );
};

Tours.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Tours;