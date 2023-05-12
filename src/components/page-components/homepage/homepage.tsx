// @flow strict

import { Container } from "@mui/material";
import FilterSection from "./filter-section";
import HeroSection from "./hero-section";
import PaymentMethod from "./payment-method";
import RidePlanContact from "./ride-plan-contact";
import Testimonial from "./testimonial";

const qualities = [
  {
    title: "Years Of Experience",
    quantity: "2",
  },
  {
    title: "Tourist Place",
    quantity: "100",
  },
  {
    title: "Active tour",
    quantity: "50",
  },
  {
    title: "Happy Tourist",
    quantity: "10k+",
  },
];

function Homepage() {
  return (
    <>
      <HeroSection />
      <FilterSection />
      <RidePlanContact />
      <div className='w-screen'>
        <Container className='py-8 md:py-12'>
          <div className='w-full md:w-3/4 mx-auto rounded-lg home-quality-section gap-y-2 grid grid-cols-2 md:grid-cols-4'>
            {qualities.map((quality, index) => (
              <div key={index} className='text-center p-4'>
                <p className='text-4xl text-[#EDA592] my-0'>
                  {quality.quantity}
                </p>
                <p>{quality.title}</p>
              </div>
            ))}
          </div>
        </Container>
      </div>
      <Testimonial />
      <PaymentMethod />
    </>
  );
}

export default Homepage;
