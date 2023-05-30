import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import GeneralLayout from "../src/components/layouts/_general";
import { NextPageWithLayout } from "../src/types/page-props";
const Homepage = dynamic(() => import('../src/components/page-components/homepage'));

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { locales } = router;

  return (
    <div className='container' aria-label="homepage">
      <Homepage />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Home;
