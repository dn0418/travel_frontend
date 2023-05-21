import { useRouter } from "next/router";
import GeneralLayout from "../src/components/layouts/_general";
import Homepage from "../src/components/page-components/homepage";
import { NextPageWithLayout } from "../src/types/page-props";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { locales } = router;

  return (
    <div className='container'>
      <Homepage />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Home;
