// @flow strict

import { Button, Rating } from '@mui/material';
import Image from 'next/image';
import { BiCalendar, BiHash } from 'react-icons/bi';
import { CarType } from '../../../types';

function CarSpecification({ car }: { car: CarType }) {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <Image
          src={car.thumbnail}
          height={340}
          width={1000}
          layout="responsive"
          className="rounded-lg"
          alt="tour-details"
        />
        <div className="px-4 md:px-12">
          <h3 className="text-[#000000] text-xl font-semibold mt-0">
            {car.name + ' - ' + car.model}
          </h3>
          <p className="flex items-center gap-2">
            <span className="text-sm text-[#5e5e5e]">Car No: {car.carNo}</span>
          </p>
          {car.totalReview > 0 && <p className="flex items-center gap-2">
            <Rating
              max={1}
              size="small"
              name="half-rating"
              readOnly
              defaultValue={car.rating}
              precision={0.1}
            />
            <span className="text-sm text-[#5e5e5e]">
              {car.rating} Star | {car.totalReview} People
            </span>
          </p>}
          <p className="flex items-center gap-3">
            <span className="text-sm text-[#5e5e5e] line-through">$ {car.price}</span>
            <span className="text-base text-[#000000] font-bold">
              $ {car.discountedPrice | car.price}
            </span>
          </p>
          <p className="flex items-center gap-4">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base text-[#5e5e5e]">
              {car.seatNo} seat {car.isDriver ? "with" : "without"} driver
            </span>
          </p>
          <p className="flex items-center gap-4">
            <BiCalendar className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base text-[#5e5e5e]">
              {new Date(car.startedDate).toDateString()}
            </span>
          </p>
          <p className="flex items-center gap-4">
            <BiCalendar className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base text-[#5e5e5e]">
              {new Date(car.endDate).toDateString()}
            </span>
          </p>
          <div className="md:mt-8">
            <Button
              className="px-8 md:px-12 rounded-lg"
              variant="contained">Submit</Button>
          </div>
        </div>
      </div>
      <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="">
          <p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
            {car.description}
          </p>
        </div>
        <div>

        </div>
      </div>
    </div>
  );
};

export default CarSpecification;