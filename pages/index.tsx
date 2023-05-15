import { useRouter } from "next/router";
import GeneralLayout from "../src/components/layouts/_general";
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
  return <GeneralLayout>{page}</GeneralLayout>;
};

export default Home;
