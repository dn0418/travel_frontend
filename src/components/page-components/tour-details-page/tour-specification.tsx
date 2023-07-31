// @flow strict

import { Button, Rating } from "@mui/material";
import { useRouter } from "next/router";
import { BiCalendar, BiHash } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { GiCancel, GiPriceTag } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { ReviewTypes } from "../../../types";
import { TourType } from "../../../types/tour";
import { localizationData } from "../../../utils/locales";
import { useState } from "react";
import TourModal from "../../modal/TourModal";

function TourSpecification({ tour }: { tour: TourType }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  const getReviewsAvarage = (reviews: ReviewTypes[]) => {
    let sum = 0;
    reviews.map((review) => {
      sum += review.rating;
    });
    return (sum / reviews.length).toFixed(1);
  };

  return (
    <div className="px-4 md:px-12">
      <h3 className="text-[#000000] text-xl font-semibold mt-0">
        {locale === "ru"
          ? tour.title_ru
          : locale === "hy"
            ? tour.title_hy
            : tour.title}
      </h3>
      <p className="flex items-center gap-2">
        <IoLocationOutline className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {(locale === "ru"
            ? tour.destination?.country_hy
            : locale === "hy"
              ? tour.destination?.name_hy
              : tour.destination?.name) +
            " - " +
            (locale === "ru"
              ? tour.destination?.country_ru
              : locale === "hy"
                ? tour.destination?.country_hy
                : tour.destination?.country)}
        </span>
      </p>
      {tour.reviews.length > 0 && (
        <p className="flex items-center gap-2">
          <Rating
            max={1}
            size="small"
            name="half-rating"
            readOnly
            defaultValue={1}
            precision={0.1}
          />
          <span className="text-base text-[#5e5e5e]">
            {getReviewsAvarage(tour.reviews) +
              " " +
              localData.star_text +
              " | " +
              tour.reviews.length +
              " " +
              localData.people_text}
          </span>
        </p>
      )}
      <p className="flex items-center gap-3">
        <GiPriceTag className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{localData.start_from}</span>
        <span className="text-base text-[#000000] font-bold">
          $ {tour.price}
        </span>
      </p>
      <p className="flex items-center gap-3">
        <BiHash className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {tour.dayLength +
            `${localData.days_title}` +
            " " +
            tour.nightLength +
            `${localData.night_text}`}
        </span>
      </p>
      <p className="flex items-center gap-3">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.best_time_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? tour.bestTime_ru
            : locale === "hy"
              ? tour.bestTime_hy
              : tour.bestTime}
        </span>
      </p>
      {/* <p className="flex items-center gap-3">
        <BiCategory className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{localData.type_text}:</span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? tour.childList_ru
            : locale === "hy"
            ? tour.childList_hy
            : tour.childList}
        </span>
      </p> */}
      <p className="flex items-center gap-3">
        <GiCancel className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.free_cancelation}
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {tour.freeCancelation
            ? localData.transportData.yes_text
            : localData.transportData.no_text}
        </span>
      </p>
      {/* {tour.date && (
        <p className="flex items-center gap-4">
          <BiCalendar className="text-base text-[#EDA592]  font-bold" />
          <span className="text-base text-[#5e5e5e]">{tour.date}</span>
        </p>
      )} */}
      <p className="flex items-center gap-4">
        <BsPerson className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {tour.activities + " " + localData.transportData.activities_text}{" "}
        </span>
      </p>
      <div className="md:mt-8">
        <TourModal buttonText={localData.submit_text} tourName={tour.title} />
      </div>
    </div>
  );
}

export default TourSpecification;
