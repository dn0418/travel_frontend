// @flow strict

import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { SurroundingType } from "../../../../types";

function SurroundingDetailsMaps({ surrounding }: { surrounding: SurroundingType }) {
  const { locale } = useRouter();

  return (
    <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="" dangerouslySetInnerHTML={{
        __html: `<p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
          ${locale === "ru" ? surrounding.description_ru :
            (locale === "hy" ? surrounding.description_hy : surrounding.description)}
        </p>`
      }
      } />

      <div className="regular-shadow rounded-lg h-[432px] lg:w-[432px] p-4 md:mx-5">
        {
          surrounding.lat && surrounding.lng &&
          <GoogleMap
            mapContainerStyle={{ borderRadius: "8px", width: "100%", height: "100%" }}
            center={{
              lat: surrounding?.lat,
              lng: surrounding?.lng,
            }}
            zoom={12}
          >
            <MarkerF
              position={{
                lat: surrounding?.lat,
                lng: surrounding?.lng,
              }}
            >
            </MarkerF>
          </GoogleMap>
        }
      </div>
    </div>
  );
};

export default SurroundingDetailsMaps;