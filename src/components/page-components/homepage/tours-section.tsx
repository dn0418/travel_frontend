// @flow strict

import { Button, Card, Container } from "@mui/material";
import { AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import { TourType } from "../../../types";
import TourCard from "../../cards/tour-card";
import SectionTitle from "../../shared/section-title";

function NextArrow(props: { onClick: any }) {
  const { onClick } = props;
  return (
    <div className='flex items-center  m-0 p-0'>
      <Button
        className='min-w-fit m-0 p-0 text-xl font-bold text-[#5E5E5E]'
        onClick={onClick}>
        <AiOutlineRight />
      </Button>
    </div>
  );
}


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