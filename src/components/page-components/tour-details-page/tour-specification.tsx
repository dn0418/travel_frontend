// @flow strict

import { Button, Rating } from "@mui/material";
import { useRouter } from "next/router";
import { BiCalendar, BiCategory, BiHash } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { GiCancel, GiPriceTag } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { ReviewTypes } from "../../../types";
import { TourType } from "../../../types/tour";
import { localizationData } from "../../../utils/locales";


function TourSpecification({ tour }: { tour: TourType }) {
  const { locale } = useRouter();
  const localData = locale === "ru" ? localizationData.ru :
    (locale === 'hy' ? localizationData.hy : localizationData.en);

  const getReviewsAvarage = (reviews: ReviewTypes[]) => {
    let sum = 0;
    reviews.map((review) => {
      sum += review.rating;
    });
    return (sum / reviews.length).toFixed(1);
  }

  return (
    <div className="px-4 md:px-12">
      <h3 className="text-[#000000] text-xl font-semibold mt-0">
        {
          locale === "ru" ? tour.title_ru :
            (locale === "hy" ? tour.title_hy : tour.title)
        }
      </h3>
      <p className="flex items-center gap-2">
        <IoLocationOutline className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {(
            locale === 'ru' ? tour.destination.name_ru : (locale === 'hy' ? tour.destination.name_hy : tour.destination.name)
          ) + ' - ' + (
              locale === 'ru' ? tour.destination.country_ru : (locale === 'hy' ? tour.destination.country_hy : tour.destination.country)
            )}
        </span>
      </p>
      {
        tour.reviews.length > 0 &&
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
            {getReviewsAvarage(tour.reviews)} Star | {tour.reviews.length} People
          </span>
        </p>
      }
      <p className="flex items-center gap-3">
        <GiPriceTag className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">Start From:</span>
        <span className="text-base text-[#000000] font-bold">
          $ {tour.price}
        </span>
      </p>
      <p className="flex items-center gap-3">
        <BiHash className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {tour.dayLength + ' days' + ' ' + tour.nightLength + ' night'}
        </span>
      </p>
      <p className="flex items-center gap-3">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          Best time:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {
            locale === 'ru' ? tour.bestTime_ru :
              (locale === 'hy' ? tour.bestTime_hy : tour.bestTime)
          }
        </span>
      </p>
      <p className="flex items-center gap-3">
        <BiCategory className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          Type:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {
            locale === 'ru' ? tour.childList_ru :
              (locale === 'hy' ? tour.childList_hy : tour.childList)
          }
        </span>
      </p>
      <p className="flex items-center gap-3">
        <GiCancel className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          Free Cancelation:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {tour.freeCancelation ? "Yes" : "No"}
        </span>
      </p>
      {
        tour.date &&
        <p className="flex items-center gap-4">
          <BiCalendar className="text-base text-[#EDA592]  font-bold" />
          <span className="text-base text-[#5e5e5e]">
            {tour.date}
          </span>
        </p>
      }
      <p className="flex items-center gap-4">
        <BsPerson className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{tour.activities} Activities</span>
      </p>
      <div className="md:mt-8">
        <Button
          className="px-8 md:px-12 rounded-lg bg-black text-white"
          variant="contained">{localData.submit_text}</Button>
      </div>
    </div>
  );
};

export default TourSpecification;