// @flow strict

import { Button, Card, Container } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import { testimonials } from "../../../utils/data/testimonial-data";
import SectionTitle from "../../shared/section-title";

function SampleNextArrow(props: { onClick: any }) {
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

function SamplePrevArrow(props: { onClick: any; currentSlide: number }) {
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

function Testimonial() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow currentSlide={currentSlide} />,
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
    <div className='bg-[#FFF8F6] py-5 md:py-8 w-screen'>
      <Container>
        <SectionTitle title='What Travelers Think About Us' />
        <Slider
          afterChange={(e) => setCurrentSlide(e)}
          className='flex gap-4'
          {...settings}>
          {testimonials.map((item, i) => (
            <Card
              key={i}
              className='bg-white p-3 md:p-8 h-[300px] shadow-[0px_2px_10px_rgba(0,0,0,0.1)] rounded-3xl'>
              <div className='md:flex items-center gap-3 md:gap-5 md:mb-5'>
                <Image
                  src={item.imageSrc}
                  width={64}
                  height={64}
                  className='rounded-full'
                  alt={item.name}
                />
                <div className=''>
                  <p className='my-1 text-xl'>{item.name}</p>
                  <p className='my-0'>{item.location}</p>
                </div>
              </div>
              <p className='text-[#626262] my-2 line-clamp-5 md:line-clamp-6'>
                {item.message}
              </p>
            </Card>
          ))}
        </Slider>
      </Container>
    </div>
  );
}

export default Testimonial;
