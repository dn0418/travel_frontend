// @flow strict

import FilterSection from "./filter-section";
import HeroSection from "./hero-section";
import PaymentMethod from "./payment-method";
import Qualities from "./qualities";
import RidePlanContact from "./ride-plan-contact";
import Testimonial from "./testimonial";
import TourSection from "./tours-section";

function Homepage() {
  return (
    <>
      <HeroSection />
      <FilterSection />
      <TourSection />
      <RidePlanContact />
      <Qualities />
      <Testimonial />
      <PaymentMethod />
    </>
  );
}

export default Homepage;
