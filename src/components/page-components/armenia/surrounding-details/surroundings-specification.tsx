// @flow strict

import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import { BiCalendar, BiCategory } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import {
  MdEventAvailable,
  MdNestCamWiredStand,
  MdPayment,
} from "react-icons/md";
import { ReviewTypes, SurroundingType } from "../../../../types";
import { formatDate } from "../../../../utils/formate-date";
import { localizationData } from "../../../../utils/locales";

function SurroundingSpecification({ surrounding }: { surrounding: SurroundingType }) {
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
        {surrounding.name}
      </h3>
      {surrounding.reviews.length > 0 && (
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
            {getReviewsAvarage(surrounding.reviews) +
              " " +
              localData.star_text +
              " | " +
              surrounding.reviews.length +
              " " +
              localData.people_text}
          </span>
        </p>
      )}
      <p className="flex items-center gap-3">
        <IoLocation className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.from_tbilisi_text}
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? surrounding.fromTbilisi_ru
            : locale === "hy"
              ? surrounding.fromTbilisi_hy
              : surrounding.fromTbilisi}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <BiCategory className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{localData.type_text}:</span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {
            locale === 'ru' ? surrounding?.type_ru : (locale === 'hy' ? surrounding?.type_hy : surrounding?.type)
          }
        </span>
      </p>

      <p className="flex items-center gap-3">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.date_title}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {formatDate(surrounding.date)}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdNestCamWiredStand className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.the_nearest_settlement_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? surrounding.neatestSettlement_ru
            : locale === "hy"
              ? surrounding.neatestSettlement_hy
              : surrounding.neatestSettlement}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdEventAvailable className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.available_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? surrounding.available_ru
            : locale === "hy"
              ? surrounding.available_hy
              : surrounding.available}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdPayment className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.entrance_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? surrounding.entrance_ru
            : locale === "hy"
              ? surrounding.entrance_hy
              : surrounding.entrance}
        </span>
      </p>
    </div>
  );
}

export default SurroundingSpecification;
