// @flow strict

import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useRouter } from "next/router";
import { ThingToSeeType } from "../../../../types";

function SeeDetailsMaps({ thing }: { thing: ThingToSeeType }) {
  const { locale } = useRouter();

  return (
    <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="" dangerouslySetInnerHTML={{
        __html: `<p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
          ${locale === "ru" ? thing.description_ru :
            (locale === "hy" ? thing.description_hy : thing.description)}
        </p>`
      }
      } />

      <div className="regular-shadow rounded-lg h-[432px] lg:w-[432px] p-4 md:mx-5">
        {
          thing.lat && thing.lng &&
          <GoogleMap
            mapContainerStyle={{ borderRadius: "8px", width: "100%", height: "100%" }}
            center={{
              lat: thing?.lat,
              lng: thing?.lng,
            }}
            zoom={10}
          >
            <MarkerF
              position={{
                lat: thing?.lat,
                lng: thing?.lng,
              }}
            >
            </MarkerF>
          </GoogleMap>
        }
      </div>
    </div>
  );
};

export default SeeDetailsMaps;