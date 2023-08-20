// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import UpdateStaticPage from '../../../src/components/admin-components/dashboard/update-page';
import DashboardLayout from '../../../src/components/layouts/dashboard-layout';
import { getStaticPaths, getStaticProps } from '../../../src/rest-api/static-page/update-page.ssr';
import { NextPageWithLayout } from '../../../src/types/page-props';
export { getStaticPaths, getStaticProps };

const UpdatePage: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter();
  const code = router.query["code"];
  const pageData = props.pageDetails?.data;

  return (
    <div>
      <UpdateStaticPage pageData={pageData} code={code} />
    </div>
  );
};

UpdatePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default UpdatePage;