import { useRouter } from "next/router";
import HomeLayout from "../src/components/layouts/_home";
import FilterSection from "../src/components/page-components/homepage/filter-section";
import HeroSection from "../src/components/page-components/homepage/hero-section";
import { NextPageWithLayout } from "../src/types";

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const { locales } = router;

  console.log(locales);

  return (
    <div className='container'>
      <HeroSection />
      <FilterSection />
    </div>
  );
};

Home.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default Home;
