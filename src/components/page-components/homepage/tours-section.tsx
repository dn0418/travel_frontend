// @flow strict

import { Card, Container } from "@mui/material";
import Slider from "react-slick";
import { TourType } from "../../../types/tour";
import TourCard from "../../cards/tour-card";
import SectionTitle from "../../common/section-title";


function TourSection({ tours }: { tours: TourType[] }) {


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="my-3 md:my-6 w-screen">
      <Container className="grid grid-cols-1 md:grid-cols-3  mb-12 gap-4 md:gap-8">
        <div className="home-tours-section">
          <SectionTitle title='Top Suggestion' />
          <Card
            className='p-1 regular-shadow rounded-lg'
          >
            <Slider
              {...settings}>
              {
                tours.map((tour, index) => (
                  <TourCard tour={tour} key={index} />
                ))
              }
            </Slider>
          </Card>
        </div>
        <div className="home-tours-section">
          <SectionTitle title='One Day' />
          <Card
            className='p-1 regular-shadow rounded-lg'
          >
            <Slider
              {...settings}>
              {
                tours.map((tour, index) => (
                  <TourCard tour={tour} key={index} />
                ))
              }
            </Slider>
          </Card>
        </div>
        <div className="home-tours-section">
          <SectionTitle title='Fixed Date' />
          <Card
            className='p-1 regular-shadow rounded-lg'
          >
            <Slider
              {...settings}>
              {
                tours.map((tour, index) => (
                  <TourCard tour={tour} key={index} />
                ))
              }
            </Slider>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default TourSection;