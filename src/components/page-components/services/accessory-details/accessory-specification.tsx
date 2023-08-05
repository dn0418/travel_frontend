// @flow strict

import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import { BiHash } from "react-icons/bi";
import { IoMdPricetags } from "react-icons/io";
import { TiCancelOutline } from "react-icons/ti";
import { useGlobalContext } from "../../../../context/global-context";
import { TourAccessoryType } from "../../../../types/services";
import { localizationData } from "../../../../utils/locales";
import TourAccessoriesModal from "../../../modal/TourAccessoriesModal";
import AccessoryThumbnailSection from "./thumbnail-section";

interface PropsType {
  accessoryDetails: TourAccessoryType;
  metadata: {
    avarage: number;
    total: number;
  };
}

function AccessorySpecification({ accessoryDetails, metadata }: PropsType) {
  const { convertCurrency } = useGlobalContext();
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
        <AccessoryThumbnailSection accessoryDetails={accessoryDetails} />
        <div className="px-4 md:px-12">
          <h3 className="text-[#000000] text-xl font-semibold mt-0">
            {locale === "hy"
              ? accessoryDetails.title_hy
              : locale === "ru"
                ? accessoryDetails.title_ru
                : accessoryDetails.title}
          </h3>
          {accessoryDetails.type && (
            <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
              <BiHash className="text-base text-[#EDA592]  font-bold" />
              <span className="font-medium">{localData.type_text}:</span>
              <span>
                {locale === "hy"
                  ? accessoryDetails.type.name_hy
                  : locale === "ru"
                    ? accessoryDetails.type.name_ru
                    : accessoryDetails.type.name}
              </span>
            </p>
          )}
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
                {metadata.avarage.toFixed(1)} Star | {metadata.total} People
              </span>
            </p>
          )}
          <p className="flex items-center gap-2">
            <IoMdPricetags className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base font-medium text-[#5e5e5e]">
              {localData.start_from}
            </span>
            <span className="text-base text-[#000000] font-bold">
              {convertCurrency(accessoryDetails.price)}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">{localData.available_text}:</span>
            <span>
              {locale === "hy"
                ? accessoryDetails.available_hy
                : locale === "ru"
                  ? accessoryDetails.available_ru
                  : accessoryDetails.available}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">{localData.per_pax_text}:</span>
            <span>
              {locale === "hy"
                ? accessoryDetails.perPax_hy
                : locale === "ru"
                  ? accessoryDetails.perPax_ru
                  : accessoryDetails.perPax}
            </span>
          </p>

          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <TiCancelOutline className="text-xl text-[#EDA592] font-bold" />
            <span className="font-medium">{localData.free_cancelation}:</span>
            <span>
              {" "}
              {accessoryDetails.freeCancellation
                ? `${localData.yes_text}`
                : `${localData.no_text}`}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">{localData.rent_from_text}:</span>
            <span>
              {locale === "hy"
                ? accessoryDetails.rentFrom_hy
                : locale === "ru"
                  ? accessoryDetails.rentFrom_ru
                  : accessoryDetails.rentFrom}
              {localData.days_title}
            </span>
          </p>
          <div className="md:mt-8">
            <TourAccessoriesModal buttonText={localData.submit_text} />
          </div>
        </div>
      </div>
      <div className="tour-details-maps my-5 md:my-8 gap-5">
        <div
          dangerouslySetInnerHTML={{
            __html: `<p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
            ${locale === "hy"
                ? accessoryDetails.longDescription_hy
                : locale === "ru"
                  ? accessoryDetails.longDescription_ru
                  : accessoryDetails.longDescription
              }
          </p>`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default AccessorySpecification;
