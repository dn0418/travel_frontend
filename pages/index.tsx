import { useRouter } from "next/router";
import HomeLayout from "../src/components/layouts/_home";
import Homepage from "../src/components/page-components/homepage/homepage";
import { NextPageWithLayout } from "../src/types";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { locales } = router;

  // console.log(locales);

  return (
    <div className='container'>
      <Homepage />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
