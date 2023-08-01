// @flow strict

import { Button, Rating } from "@mui/material";
import { useRouter } from "next/router";
import { BiHash } from "react-icons/bi";
import { CarWithOutType } from "../../../../types/car-type";
import { localizationData } from "../../../../utils/locales";
import CarThumbnailSection from "./thumbnail-section";
import CarModel from "../../../modal/CarModal";

function CarSpecification({ car }: { car: CarWithOutType }) {
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
      ? localizationData.hy
      : localizationData.en;

  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <CarThumbnailSection car={car} />
        <div className="px-4 md:px-12">
          <h3 className="text-[#000000] text-xl font-semibold mt-0">
            {locale === "ru"
              ? car.name_ru
              : locale === "hy"
              ? car.name_hy
              : car.name}
          </h3>
          {car.totalReview > 0 && (
            <p className="flex items-center gap-2">
              <Rating
                max={1}
                size="small"
                name="half-rating"
                readOnly
                defaultValue={car.rating}
                precision={0.1}
              />
              <span className="text-sm text-[#5e5e5e]">
                {car.rating.toFixed(1) +
                  " " +
                  localData.star_text +
                  " | " +
                  car.totalReview +
                  " " +
                  localData.people_text}
              </span>
            </p>
          )}
          <p className="flex items-center gap-3">
            <span className="text-sm text-[#5e5e5e]">
              {localData.start_from}
            </span>
            <span className="text-base text-[#000000] font-bold">
              ${car.price}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">{localData.free_cancelation}</span>
            <span>
              {car.freeCancellation
                ? localData.transportData.yes_text
                : localData.transportData.no_text}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              {localData.transportData.pickup_text}
            </span>
            <span>
              {locale === "ru"
                ? car.pickup_ru
                : locale === "hy"
                ? car.pickup_hy
                : car.pickup}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              {localData.transportData.fuel_text}
            </span>
            <span>
              {locale === "ru"
                ? car.fuel_ru
                : locale === "hy"
                ? car.fuel_hy
                : car.fuel}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              {localData.transportData.year_text}
            </span>
            <span>{car.year}</span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              {localData.transportData.seat_text}
            </span>
            <span>{car.seatNo}</span>
          </p>
          <div className="md:mt-8">
            <CarModel buttonText={localData.submit_text} car={car} />
          </div>
        </div>
      </div>
      <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div
          dangerouslySetInnerHTML={{
            __html: `<p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
          ${
            locale === "ru"
              ? car.description_ru
              : locale === "hy"
              ? car.description_hy
              : car.description
          }
        </p>`,
          }}
        ></div>
        <div></div>
      </div>
    </div>
  );
}

export default CarSpecification;
