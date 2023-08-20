// @flow strict
import DashboardCurrency from "./currency";
import StaticPage from "./static-page";

interface PropsType {
  findRate: (currency: string) => number;
}

function DashboardUI({ findRate }: PropsType) {


  return (
    <div>
      <h1 className="text-center">Welcome to Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 my-8 lg:my-12">
        <DashboardCurrency findRate={findRate} />
        <StaticPage />
      </div>
    </div>
  );
};

export default DashboardUI;