import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../src/components/layouts/_general";
import Homepage from "../src/components/page-components/homepage";
import { getStaticProps } from "../src/rest-api/homepage/home.ssr";
import { NextPageWithLayout } from "../src/types/page-props";
export { getStaticProps };

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { toursData, reviewsData, destinationData } = props;
  const tours = toursData.data;
  const destinations = destinationData.data;

  return (
    <div className='container' aria-label="homepage">
      <Homepage
        tours={tours}
        reviews={reviewsData.data}
        destinations={destinations}
      />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Home;
