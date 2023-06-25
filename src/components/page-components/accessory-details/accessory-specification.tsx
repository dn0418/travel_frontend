// @flow strict

import { Button, Rating } from '@mui/material';
import Image from 'next/image';
import { BiHash } from 'react-icons/bi';
import { CarType, TourAccessoryType } from '../../../types';

interface PropsType {
  car: CarType;
  accessoryDetails: TourAccessoryType;
  metadata: {
    avarage: number;
    total: number;
  }
}

function AccessorySpecification({ car, accessoryDetails, metadata }: PropsType) {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <Image
          src={accessoryDetails.thumbnail}
          height={340}
          width={1000}
          layout="responsive"
          className="rounded-lg"
          alt="tour-details"
        />
        <div className="px-4 md:px-12">
          <h3 className="text-[#000000] text-xl font-semibold mt-0">
            {accessoryDetails.title}
          </h3>
          {
            accessoryDetails.type &&
            <p className="flex items-center gap-2">
              <span className="text-sm text-[#5e5e5e]">
                Type: {accessoryDetails.type.name}
              </span>
            </p>
          }
          {metadata.total > 0 && <p className="flex items-center gap-2">
            <Rating
              max={1}
              size="small"
              name="half-rating"
              readOnly
              defaultValue={metadata.avarage / 5}
              precision={0.1}
            />
            <span className="text-sm text-[#5e5e5e]">
              {metadata.avarage.toFixed(1)} Star | {metadata.total} People
            </span>
          </p>}
          <p className="text-base text-[#000000] font-bold">
            $ {accessoryDetails.price}
          </p>
          <p className="flex items-center gap-4">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base text-[#5e5e5e]">
              {accessoryDetails.specification}
            </span>
          </p>
          {/* <p className="flex items-center gap-4">
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
          </p> */}
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
            {accessoryDetails.goodsDetails}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessorySpecification;