// @flow strict

import { Container } from "@mui/material";
import Slider from "react-slick";
import SectionTitle from "../../shared/section-title";


function TourSection() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="my-3 md:my-5 w-screen">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <div className="home-tours-section">
          <SectionTitle title='Top Suggestion' />
          <Slider
            className='flex gap-4'
            {...settings}>
            <div className="bg-red-600 text-white">Helo</div>
            <div className="">Helo</div>
            <div className="">Helo</div>
          </Slider>
        </div>
        <div className="">
          <SectionTitle title='One Day' />

        </div>
        <div className="">
          <SectionTitle title='Fixed Date' />
        </div>
      </Container>
    </div>
  );
};

export default TourSection;