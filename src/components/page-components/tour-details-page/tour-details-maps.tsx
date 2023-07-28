// @flow strict

import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { TourType } from "../../../types/tour";

function TourDetailsMaps({ tour }: { tour: TourType }) {
  const { locale } = useRouter();

  return (
    <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="" dangerouslySetInnerHTML={{
        __html: `<p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
          ${locale === "ru" ? tour.longDescription_ru :
            (locale === "hy" ? tour.longDescription_hy : tour.longDescription)
          }
        </p>`
      }
      }>

      </div>
      <div className="regular-shadow rounded-lg h-[432px] lg:w-[432px] p-4 md:mx-5">
        <Image
          src={tour.locationImg}
          alt=""
          width={432}
          height={432}
          layout="responsive"
          priority
        />
      </div>
    </div>
  );
};

export default TourDetailsMaps;