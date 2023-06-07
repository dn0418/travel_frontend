// @flow strict

import dynamic from "next/dynamic";
import { HomePageProps } from "../../../types/page-props";

const FilterSection = dynamic(() => import('./filter-section'));
const HeroSection = dynamic(() => import('./hero-section'));
const PaymentMethod = dynamic(() => import('./payment-method'));
const Qualities = dynamic(() => import('./qualities'));
const RidePlanContact = dynamic(() => import('./ride-plan-contact'));
const Testimonial = dynamic(() => import('./testimonial'));
const TourSection = dynamic(() => import('./tours-section'));

function Homepage({ reviews, tours }: HomePageProps) {

  return (
    <>
      <HeroSection />
      <FilterSection />
      <TourSection tours={tours} />
      <RidePlanContact />
      <Qualities />
      <Testimonial reviews={reviews} />
      <PaymentMethod />
    </>
  );
}

export default Homepage;
