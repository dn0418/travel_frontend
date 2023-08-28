// @flow strict

import { Button, Rating } from "@mui/material";
import { useRouter } from "next/router";
import { BiCalendar, BiCategory } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import {
  MdEventAvailable,
  MdNestCamWiredStand,
  MdPayment,
} from "react-icons/md";
import { ReviewTypes, ThingToSeeType } from "../../../../types";
import { thingsSeeTypes } from "../../../../utils/data/armenia-data";
import { localizationData } from "../../../../utils/locales";

function SeeSpecification({ thing }: { thing: ThingToSeeType }) {
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  const types = locale === "ru" ? thingsSeeTypes.ru :
    (locale === "hy" ? thingsSeeTypes.hy : thingsSeeTypes.en)


  const getType = (type: string) => {
    return types.find((item) => item.value === type);
  };

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
        {thing.name}
      </h3>
      {thing.reviews.length > 0 && (
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
            {getReviewsAvarage(thing.reviews) +
              " " +
              localData.star_text +
              " | " +
              thing.reviews.length +
              " " +
              localData.people_text}
          </span>
        </p>
      )}
      <p className="flex items-center gap-3">
        <IoLocation className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.from_yerevan_text}
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? thing.fromYerevan_ru
            : locale === "hy"
              ? thing.fromYerevan_hy
              : thing.fromYerevan}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <BiCategory className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{localData.type_text}:</span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {getType(thing.type)?.title}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{localData.date_title}</span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {thing.date}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdNestCamWiredStand className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.the_nearest_settlement_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? thing.neatestSettlement_ru
            : locale === "hy"
              ? thing.neatestSettlement_hy
              : thing.neatestSettlement}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdEventAvailable className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.available_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? thing.available_ru
            : locale === "hy"
              ? thing.available_hy
              : thing.available}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdPayment className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.entrance_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? thing.entrance_ru
            : locale === "hy"
              ? thing.entrance_hy
              : thing.entrance}
        </span>
      </p>

      <div className="md:mt-8">
        <Button
          className="px-8 md:px-12 rounded-lg bg-black text-white"
          variant="contained"
        >
          {localData.submit_text}
        </Button>
      </div>
    </div>
  );
}

export default SeeSpecification;
