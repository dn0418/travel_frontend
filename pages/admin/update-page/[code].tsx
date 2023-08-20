// @flow strict

import { useRouter } from 'next/router';
import UpdateStaticPage from '../../../src/components/admin-components/dashboard/update-page';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { NextPageWithLayout } from '../../../src/types/page-props';

const UpdatePage: NextPageWithLayout = (props) => {
  const router = useRouter();
  const code = router.query["code"];

  return (
    <div>
      <UpdateStaticPage code={code} />
    </div>
  );
};

UpdatePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdatePage;