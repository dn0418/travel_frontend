// @flow strict

import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { NextPageWithLayout } from '../../../src/types/page-props';

const HotelType: NextPageWithLayout = () => {
  return (
    <div className='flex justify-center'>

    </div>
  );
};

HotelType.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default HotelType;