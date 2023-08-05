// @flow strict

import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import { BiHash } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { IoMdPricetags } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { MdLocalAirport } from "react-icons/md";
import { TiCancelOutline } from "react-icons/ti";
import { useGlobalContext } from "../../../../context/global-context";
import { HotelDataType } from "../../../../types/services";
import { localizationData } from "../../../../utils/locales";
import HotelModal from "../../../modal/HotelModal";

interface Props {
  hotel: HotelDataType;
  metadata: {
    total: number;
    avarage: number;
  };
}

function HotelSpecification({ hotel, metadata }: Props) {
  const { convertCurrency } = useGlobalContext();

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
        {locale === "ru"
          ? hotel.name_ru
          : locale === "hy"
            ? hotel.name_hy
            : hotel.name}
      </h3>
      <p className="flex items-center gap-2">
        <IoLocationOutline className="text-base text-[#EDA592]  font-bold" />
        <span className="text-sm text-[#5e5e5e]">
          {(locale === "ru"
            ? hotel.country_ru
            : locale === "hy"
              ? hotel.country_hy
              : hotel.country) +
            "-" +
            (locale === "ru"
              ? hotel.city_ru
              : locale === "hy"
                ? hotel.city_hy
                : hotel.city)}
        </span>
      </p>
      {metadata.total > 0 && (
        <p className="flex items-center gap-2">
          <Rating
            max={1}
            size="small"
            name="half-rating"
            readOnly
            defaultValue={metadata.avarage / 5}
            precision={0.1}
          />
          <span className="text-sm text-[#5e5e5e]">
            {metadata.avarage +
              " " +
              localData.star_text +
              " | " +
              metadata.total +
              " " +
              localData.people_text}
          </span>
        </p>
      )}

      <p className="flex items-center gap-2">
        <IoMdPricetags className="text-base text-[#EDA592]  font-bold" />
        <span className="text-sm text-[#5e5e5e]">{localData.start_from}</span>
        <span className="text-base text-[#000000] font-bold">
          {convertCurrency(hotel.price)}
        </span>
      </p>
      {hotel.fromAirport && (
        <p className="flex items-center gap-4">
          <MdLocalAirport className="text-base text-[#EDA592]  font-bold" />
          <span className="text-base text-[#5e5e5e]">
            {localData.from_airport_text}
          </span>
        </p>
      )}

      {hotel.type && (
        <p className="flex items-center gap-4">
          <BiHash className="text-base text-[#EDA592]  font-bold" />
          <span className="text-base text-[#5e5e5e]">
            {localData.type_text}: {hotel.type.name}
          </span>
        </p>
      )}
      <p className="flex items-center gap-4">
        <TiCancelOutline className="text-xl text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.free_cancelation + " " + hotel.freeCancellation
            ? localData.transportData.yes_text
            : localData.transportData.no_text}
        </span>
      </p>
      <p className="flex items-center gap-4">
        <BsClock className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.checkIn_text}: {hotel.checkInTime}
        </span>
      </p>
      <p className="flex items-center gap-4">
        <BsClock className="text-base text-[#EDA592]  font-bold" />
        <span className="text-base text-[#5e5e5e]">
          {localData.checkOut_text}: {hotel.checkOutTime}
        </span>
      </p>
      <div className="md:mt-8">
        <HotelModal buttonText={localData.submit_text} />
      </div>
    </div>
  );
}

export default HotelSpecification;
