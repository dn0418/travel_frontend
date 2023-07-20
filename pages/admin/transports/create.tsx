// @flow strict

import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { NextPageWithLayout } from '../../../src/types/page-props';

const CreateCar: NextPageWithLayout = () => {
  return (
    <div className='flex justify-center'>

    </div>
  );
};

CreateCar.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateCar;