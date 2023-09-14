// @flow strict

import { Container } from "@mui/material";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";
import GeneralLayout from "../../src/components/layouts/_general";
import {
  getStaticPaths,
  getStaticProps
} from "../../src/rest-api/about/vacancy-details.ssr";
import { NextPageWithLayout } from "../../src/types/page-props";
export { getStaticPaths, getStaticProps };

const VacancyDetails: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const details = props.details?.data;
  const { locale } = useRouter();

  return (
    <div className="flex flex-col my-8 tour-details-page">
      <Container>
        <div
          className="blog-content my-5"
          dangerouslySetInnerHTML={{
            __html: locale === 'ru' ? details?.description_ru :
              (locale === 'hy' ? details?.description_hy : details?.description)
          }}
        />
      </Container>
    </div>
  );
};

VacancyDetails.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default VacancyDetails;