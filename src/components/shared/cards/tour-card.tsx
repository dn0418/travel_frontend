// @flow strict

import { Button, Rating } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { AiOutlineHeart } from 'react-icons/ai';
import { BiCalendar } from 'react-icons/bi';
import { BsCarFrontFill } from 'react-icons/bs';
import { IoMdMan } from 'react-icons/io';
import { RiHotelLine } from 'react-icons/ri';
import { TourType } from '../../../types';

function TourCard({ tour }: { tour: TourType }) {
  const {
    thumbnail,
    title,
    activities,
    dayLength,
    nightLength,
    startedDate,
    endDate,
    hotel,
    car,
    tourDetails,
    price,
    discountedPrice,
    reviewsRating
  } = tour;

  return (
    <div className="bg-white p-3">
      <Image
        src={thumbnail}
        alt={title}
        className="rounded-lg"
        width={600}
        height={220}
        layout="responsive"
      />
      <div className="p-3">
        <div className="flex items-center justify-between">
          <Link href={`/tour-details/${tour.id}`}>
            <p className="text-xl font-medium my-2 text-black">{title}</p>
          </Link>
          {reviewsRating &&
            <div className="flex items-center gap-1">
              <Rating
                max={1}
                size="small"
                name="half-rating"
                readOnly
                defaultValue={reviewsRating}
                precision={0.1}
              />
              <span className="text-[#5E5E5E] text-sm">{reviewsRating}</span>
            </div>
          }
        </div>
        <div className="flex items-center justify-between">
          <p className="my-2 text-[#5E5E5E] text-sm">
            {dayLength + ' Days' + ' ' + nightLength + ' Nights'}
          </p>
          <Button className="min-w-fit p-0">
            <AiOutlineHeart className="text-xl font-semibold text-[#EDA592]" />
          </Button>
        </div>
        <p className="my-2 flex items-center gap-1">
          <BiCalendar className="text-[#5a5a5a] text-sm" />
          <span className="text-[#5e5e5e] text-sm">{new Date(startedDate).toDateString()}</span>
        </p>
        <p className="my-2 flex items-center gap-1">
          <BiCalendar className="text-[#5a5a5a] text-sm" />
          <span className="text-[#5e5e5e] text-sm">{new Date(endDate).toDateString()}</span>
        </p>
        <div className="mt-5 md:mt-8 flex items-center justify-between">
          <div className="flex flex-col items-center justify-start">
            <RiHotelLine />
            <p className="text-sm text-[#5e5e5e] my-2">{hotel} Hotel</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <BsCarFrontFill />
            <p className="text-sm text-[#5e5e5e] my-2">{car ? "Car" : ""}</p>
          </div>
          <div className="flex flex-col items-center justify-start">
            <IoMdMan />
            <p className="text-sm text-[#5e5e5e] my-2">{activities} Activities</p>
          </div>
        </div>
        <p className="text-sm line-clamp-3 text-[#5e5e5e] my-3">{tourDetails}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <p className="text-sm text-[#5e5e5e] my-2 line-through">${price}</p>
            <p className="text-base font-semibold my-2">${discountedPrice}</p>
          </div>
          <Button className="rounded-lg" variant='contained'>Submit</Button>
        </div>
      </div>
    </div>
  );
};

export default TourCard;
