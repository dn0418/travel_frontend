// @flow strict

import Link from 'next/link';
import GeneralLayout from '../../../src/components/layouts/_general';
import { NextPageWithLayout } from '../../../src/types/page-props';

const Brochure: NextPageWithLayout = () => {

  return (
    <div>
      <h1>Hello</h1>
      <Link target='_blank' href="https://s3.ap-southeast-1.amazonaws.com/dgraphy.pics/dev/ef1c2453-e4ac-4b92-945f-125979c7f263-ResumeofABUSAID2023.pdf" download={true}>Download</Link>
    </div>
  );
};


Brochure.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Brochure;