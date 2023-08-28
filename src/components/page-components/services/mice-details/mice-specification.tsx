// @flow strict

import { Rating } from "@mui/material";
import { useRouter } from "next/router";
import { AiOutlineTeam } from "react-icons/ai";
import { BiHash } from "react-icons/bi";
import { TiCancelOutline } from "react-icons/ti";
import { MiceTypes } from "../../../../types/services";
import { localizationData } from "../../../../utils/locales";
import MiceModal from "../../../modal/mice-modal";
import MiceThumbnailSection from "./thumbnail-section";

interface PropsType {
  mice: MiceTypes;
  metadata: {
    avarage: number;
    total: number;
  };
}

function MiceSpecification({ mice, metadata }: PropsType) {
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
        <MiceThumbnailSection mice={mice} />
        <div className="px-4 md:px-12">
          <h3 className="text-[#000000] text-xl font-semibold mt-0">
            {locale === "hy"
              ? mice.name_hy
              : locale === "ru"
                ? mice.name_ru
                : mice.name}
          </h3>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">Extra:</span>
            <span>
              {locale === "hy"
                ? mice.extra_hy
                : locale === "ru"
                  ? mice.extra_ru
                  : mice.extra}
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
                {metadata.avarage.toFixed(1)} Star | {metadata.total} People
              </span>
            </p>
          )}
          <p className="flex items-center gap-2">
            <AiOutlineTeam className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base font-medium text-[#5e5e5e]">
              Teambuilding activities:
            </span>
            <span className="text-base text-[#5e5e5e] font-medium">
              {locale === "hy"
                ? mice.activities_hy
                : locale === "ru"
                  ? mice.activities_ru
                  : mice.activities}
            </span>
          </p>
          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">Comfortable hotels and transports:</span>
            <span>
              {locale === "hy"
                ? mice.comportable_hy
                : locale === "ru"
                  ? mice.comportable_ru
                  : mice.comportable}
            </span>
          </p>
          {mice.access24 && <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <BiHash className="text-base text-[#EDA592]  font-bold" />
            <span className="font-medium">
              24 hour access </span>
          </p>
          }

          <p className="flex items-center gap-2 text-base text-[#5e5e5e]">
            <TiCancelOutline className="text-xl text-[#EDA592] font-bold" />
            <span className="font-medium">{localData.free_cancelation}</span>
            <span>
              {" "}
              {mice.freeCancellation
                ? `${localData.yes_text}`
                : `${localData.no_text}`}
            </span>
          </p>
          <div className="md:mt-8">
            <MiceModal buttonText={localData.send_request} />
          </div>
        </div>
      </div>
      <div className="tour-details-maps my-5 md:my-8 gap-5">
        <div
          dangerouslySetInnerHTML={{
            __html: `<p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
            ${locale === "hy"
                ? mice.description_hy
                : locale === "ru"
                  ? mice.description_ru
                  : mice.description
              }
          </p>`,
          }}
        ></div>
      </div>
    </div>
  );
}

export default MiceSpecification;
