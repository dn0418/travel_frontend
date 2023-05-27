// @flow strict

import { Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import { testimonials } from "../../../utils/data/testimonial-data";

export function NextArrow(props: { onClick: any }) {
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

export function PrevArrow(props: { onClick: any; currentSlide: number }) {
  const { onClick, currentSlide } = props;

  return (
    <div className='flex items-center  m-0 p-0'>
      {currentSlide === 0 ? (
        <Button
          className='min-w-fit m-0 p-0 text-xl font-bold text-transparent'
          disabled>
          <AiOutlineLeft />
        </Button>
      ) : (
        <Button
          className='min-w-fit m-0 p-0 text-xl font-bold text-[#5E5E5E]'
          onClick={onClick}>
          <AiOutlineLeft />
        </Button>
      )}
    </div>
  );
}

function ThumbnailSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={undefined} />,
    prevArrow: <PrevArrow currentSlide={currentSlide} onClick={undefined} />,
  };

  return (
    <div className="thumbnails-section">
      <Image
        src="https://i.ibb.co/k62N0GN/jad-limcaco-NT1m-JPgni6-A-unsplash.png"
        height={340}
        width={1000}
        layout="responsive"
        className="rounded-lg"
        alt="tour-details" />
      <Slider
        className='flex'
        afterChange={(e) => setCurrentSlide(e)}
        {...settings}>
        {testimonials.map((item, i) => (
          <Image
            key={i}
            src="https://i.ibb.co/k62N0GN/jad-limcaco-NT1m-JPgni6-A-unsplash.png"
            height={80}
            width={1000}
            layout="responsive"
            className="rounded-lg"
            alt="tour-details" />
        ))}
      </Slider>
    </div>
  );
};

export default ThumbnailSection;