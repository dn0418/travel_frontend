// @flow strict

import { Button } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Slider from "react-slick";
import { ThingToSeeType } from "../../../../types";

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

function DoThumbnailSection({ thing }: { thing: ThingToSeeType }) {
  const { thumbnail, images } = thing;
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: images.length > 3 ? 4 : images.length,
    slidesToScroll: 1,
    nextArrow: <NextArrow onClick={undefined} />,
    prevArrow: <PrevArrow currentSlide={currentSlide} onClick={undefined} />,
  };

  return (
    <div className="thumbnails-section">
      <Image
        src={thumbnail}
        height={340}
        width={1000}
        layout="responsive"
        className="rounded-lg"
        alt="tour-details" />
      {
        images.length > 3 ? <Slider
          className='flex'
          afterChange={(e) => setCurrentSlide(e)}
          {...settings}>
          {images.map((img, i) => (
            <Image
              key={i}
              src={img.url}
              height={80}
              width={200}
              layout="responsive"
              className="rounded-lg"
              alt="tour-details" />
          ))}
        </Slider>
          :
          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <Image
                key={i}
                src={img.url}
                height={80}
                width={300}
                layout="responsive"
                className="rounded-lg"
                alt="tour-details" />
            ))}
          </div>
      }
    </div>
  );
};

export default DoThumbnailSection;