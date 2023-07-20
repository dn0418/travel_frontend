// @flow strict

import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { NextPageWithLayout } from '../../../src/types/page-props';

const CreateHotel: NextPageWithLayout = () => {
  return (
    <div className='flex justify-center'>

    </div>
  );
};

CreateHotel.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateHotel;