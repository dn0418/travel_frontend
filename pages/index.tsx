import { InferGetStaticPropsType } from "next";
import GeneralLayout from "../src/components/layouts/_general";
import Homepage from "../src/components/page-components/homepage";
import { getStaticProps } from "../src/rest-api/homepage/home.ssr";
import { NextPageWithLayout } from "../src/types/page-props";
export { getStaticProps };

const Home: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  const { toursData, reviewsData, destinationData, oneDayTourData, fixedDateTourData } = props;
  const tours = toursData.data;
  const destinations = destinationData.data;
  const oneDayTour = oneDayTourData.data;
  const fixedDateTour = fixedDateTourData.data;

  return (
    <div className='container' aria-label="homepage">
      <Homepage
        tours={tours}
        reviews={reviewsData.data}
        destinations={destinations}
        oneDayTour={oneDayTour}
        fixedDateTour={fixedDateTour}
      />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Home;
