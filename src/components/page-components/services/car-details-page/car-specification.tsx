// @flow strict

import { Button, Rating } from '@mui/material';
import { BiHash } from 'react-icons/bi';
import { CarWithOutType } from '../../../../types/car-type';
import CarThumbnailSection from './thumbnail-section';

function CarSpecification({ car }: { car: CarWithOutType }) {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <CarThumbnailSection car={car} />
        <div className="px-4 md:px-12">
          <h3 className="text-[#000000] text-xl font-semibold mt-0">
            {car.name}
          </h3>
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
              {car.rating.toFixed(1)} Star | {car.totalReview} People
            </span>
          </p>}
          <p className="flex items-center gap-3">
            <span className="text-sm text-[#5e5e5e]">Start From</span>
            <span className="text-base text-[#000000] font-bold">
              ${car.price}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              Free Cancelation:
            </span>
            <span>{car.freeCancellation ? 'Yes' : 'No'}</span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              Pick Up:
            </span>
            <span>{car.pickup}</span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              Fuel:
            </span>
            <span>{car.fuel}</span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              Year:
            </span>
            <span>{car.year}</span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              No of Seats:
            </span>
            <span>{car.seatNo}</span>
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