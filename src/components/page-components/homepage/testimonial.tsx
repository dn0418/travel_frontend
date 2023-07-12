// @flow strict

import { Button, Container } from "@mui/material";
import { Key, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import { ReviewTypes } from "../../../types";
import ReviewCard from "../../cards/review-card";
import SectionTitle from "../../common/section-title";

export function NextArrow(props: { onClick: any, }) {
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

function Testimonial({ reviews }: { reviews: ReviewTypes[] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // console.log(reviews.length)

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
    <div className='bg-[#FFF8F6] py-5 md:py-8 w-screen home-testimonial-section'>
      <Container>
        <SectionTitle title='What Travelers Think About Us' />
        {
          reviews.length > 3 ?
            <Slider
              afterChange={(e) => setCurrentSlide(e)}
              className='flex gap-4'
              {...settings}>
              {reviews.map((item: ReviewTypes, i: Key) => (
                <ReviewCard review={item} key={i} />
              ))}
            </Slider>
            :
            <div className="grid grid-cols-1 gap-2 md:gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map((item: ReviewTypes, i: Key) => (
                <ReviewCard review={item} key={i} />
              ))}
            </div>
        }
      </Container>
    </div>
  );
}

export default Testimonial;
