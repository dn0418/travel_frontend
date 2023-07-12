// @flow strict

import { Button, Rating } from '@mui/material';
import { BiHash } from 'react-icons/bi';
import { IoMdPricetags } from 'react-icons/io';
import { TiCancelOutline } from 'react-icons/ti';
import { CarType, TourAccessoryType } from '../../../../types';
import AccessoryThumbnailSection from './thumbnail-section';

interface PropsType {
  car: CarType;
  accessoryDetails: TourAccessoryType;
  metadata: {
    avarage: number;
    total: number;
  }
}

function AccessorySpecification({ accessoryDetails, metadata }: PropsType) {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <AccessoryThumbnailSection accessoryDetails={accessoryDetails} />
        <div className="px-4 md:px-12">
          <h3 className="text-[#000000] text-xl font-semibold mt-0">
            {accessoryDetails.title}
          </h3>
          {
            accessoryDetails.type &&
            <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
              <BiHash className="text-base text-[#EDA592]  font-bold" />
              <span className="font-medium">
                Type:
              </span>
              <span>{accessoryDetails.type.name}</span>
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
          <p className="flex items-center gap-2">
            <IoMdPricetags className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base font-medium text-[#5e5e5e]">Starts From</span>
            <span className="text-base text-[#000000] font-bold">
              $ {accessoryDetails.price}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              Available:
            </span>
            <span>{accessoryDetails.available}</span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              Per pax:
            </span>
            <span>{accessoryDetails.perPax}</span>
          </p>

          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <TiCancelOutline className="text-xl text-[#EDA592] font-bold" />
            <span className="font-medium">
              Free Cancelation:
            </span>
            <span> {accessoryDetails.freeCancellation ? "Yes" : "No"}</span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              Rent from:
            </span>
            <span>{accessoryDetails.rentFrom} days</span>
          </p>
          <div className="md:mt-8">
            <Button
              className="px-8 md:px-12 rounded-lg bg-black text-white"
              variant="contained">Submit</Button>
          </div>
        </div>
      </div>
      <div className="tour-details-maps my-5 md:my-8 gap-5">
        <div className="">
          <p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
            {accessoryDetails.longDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessorySpecification;