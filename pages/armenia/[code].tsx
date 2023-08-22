// @flow strict

import { InferGetStaticPropsType } from 'next';
import { useRouter } from 'next/router';
import GeneralLayout from '../../src/components/layouts/_general';
import { getStaticPaths, getStaticProps } from '../../src/rest-api/static-page/static-page.ssr';
import { StaticPageType } from '../../src/types';
import { NextPageWithLayout } from '../../src/types/page-props';
export { getStaticPaths, getStaticProps };

const Page: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const router = useRouter();
  const code = router.query["code"];
  const pageData: StaticPageType = props.pageDetails?.data;

  return (
    <div className='p-8 px-12 min-h-[40vh]'>
      <div
        dangerouslySetInnerHTML={{ __html: pageData.content }}
      />
    </div>
  );
};

Page.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Page;