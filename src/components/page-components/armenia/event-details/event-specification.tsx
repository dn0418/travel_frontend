// @flow strict

import { useRouter } from "next/router";
import { BiCalendar, BiCategory } from "react-icons/bi";
import { IoLocation } from "react-icons/io5";
import {
  MdEventAvailable,
  MdNestCamWiredStand,
  MdPayment,
} from "react-icons/md";
import { EventType } from "../../../../types/armenia";
import { formatDate } from "../../../../utils/formate-date";
import { localizationData } from "../../../../utils/locales";

function EventSpecification({ event }: { event: EventType }) {
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;


  return (
    <div className="px-4 md:px-12">
      <h3 className="text-[#000000] text-xl font-semibold mt-0">
        {event.name}
      </h3>
      <p className="flex items-center gap-3">
        <IoLocation className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.address_text}
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? event.address_ru
            : locale === "hy"
              ? event.address_hy
              : event.address}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <BiCategory className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">{localData.type_text}:</span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {
            locale === 'ru' ? event?.type_ru : (locale === 'hy' ? event?.type_hy : event?.type)
          }
        </span>
      </p>

      <p className="flex items-center gap-3">
        <BiCalendar className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.date_title}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {formatDate(event.date)}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdNestCamWiredStand className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.the_nearest_settlement_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? event.neatestSettlement_ru
            : locale === "hy"
              ? event.neatestSettlement_hy
              : event.neatestSettlement}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdEventAvailable className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          Language:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? event.language_ru
            : locale === "hy"
              ? event.language_hy
              : event.language}
        </span>
      </p>

      <p className="flex items-center gap-3">
        <MdPayment className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.entrance_text}:
        </span>
        <span className="text-base text-[#5e5e5e] font-medium">
          {locale === "ru"
            ? event.entrance_ru
            : locale === "hy"
              ? event.entrance_hy
              : event.entrance}
        </span>
      </p>
    </div>
  );
}

export default EventSpecification;
