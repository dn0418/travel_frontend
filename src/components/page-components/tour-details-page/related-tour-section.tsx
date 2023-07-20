// @flow strict

import { Button, Card, Container } from "@mui/material";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import { TourType } from "../../../types/tour";
import TourCard from "../../cards/tour-card";
import SectionTitle from "../../common/section-title";


export function NextArrow(props: { onClick: any }) {
  const { onClick } = props;

  return (
    <div className='flex items-center  m-0 p-0'>
      <Button
        className='min-w-fit m-0 p-0 text-2xl font-bold text-[#5E5E5E]'
        onClick={onClick}>
        <AiOutlineRight />
      </Button>
    </div>
  );
}

export function PrevArrow(props: { onClick: any; currentSlide: number }) {
  const { onClick, currentSlide } = props;

  return (
    <div className='flex items-center  m-0 p-0'>
      {currentSlide === 0 ? (
        <Button
          className='min-w-fit m-0 p-0 text-2xl font-bold text-transparent'
          disabled>
          <AiOutlineLeft />
        </Button>
      ) : (
        <Button
          className='min-w-fit m-0 p-0 text-2xl font-bold text-[#5E5E5E]'
          onClick={onClick}>
          <AiOutlineLeft />
        </Button>
      )}
    </div>
  );
}

function RelatedTourSection({ tours }: { tours: TourType[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={undefined} />,
    prevArrow: <PrevArrow currentSlide={currentSlide} onClick={undefined} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="my-3 w-full related-section">
      <Container>
        <SectionTitle title='Related tours' />
        {
          tours.length > 3 ?
            <Slider
              afterChange={(e) => setCurrentSlide(e)}
              className='flex gap-4'
              {...settings}>
              {tours.map((tour, i) => (
                <Card className='regular-shadow rounded-lg' key={i}>
                  <TourCard tour={tour} />
                </Card>
              ))}
            </Slider>
            :
            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {tours.map((tour, i) => (
                <Card className='regular-shadow  w-full rounded-lg' key={i}>
                  <TourCard tour={tour} />
                </Card>
              ))}
            </div>
        }
      </Container>
    </div>
  );
};

export default RelatedTourSection;