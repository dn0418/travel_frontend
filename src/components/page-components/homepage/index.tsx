// @flow strict

import dynamic from "next/dynamic";

const FilterSection = dynamic(() => import('./filter-section'));
const HeroSection = dynamic(() => import('./hero-section'));
const PaymentMethod = dynamic(() => import('./payment-method'));
const Qualities = dynamic(() => import('./qualities'));
const RidePlanContact = dynamic(() => import('./ride-plan-contact'));
const Testimonial = dynamic(() => import('./testimonial'));
const TourSection = dynamic(() => import('./tours-section'));

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
