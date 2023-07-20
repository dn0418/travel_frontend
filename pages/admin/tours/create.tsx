// @flow strict

import TextEditor from '../../../src/components/common/SunEditor';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { NextPageWithLayout } from '../../../src/types/page-props';

const CreateTour: NextPageWithLayout = () => {
  return (
    <div className='flex justify-center'>
      <div className=" w-9/12">
        <TextEditor onChange={(e: string) => console.log(e)} />
      </div>
    </div>
  );
};

CreateTour.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CreateTour;