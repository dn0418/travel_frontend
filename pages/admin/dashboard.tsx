// @flow strict

import DashboardLayout from "../../src/components/layouts/dashboard-layout";
import { NextPageWithLayout } from "../../src/types/page-props";


const Dashboard: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Welcome to Dashboard</h1>
    </div>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;