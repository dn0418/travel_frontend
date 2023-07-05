// @flow strict

import Image from "next/image";
import { TourType } from "../../../types/tour";

function TourDetailsMaps({ tour }: { tour: TourType }) {
  return (
    <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="">
        <p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
          {tour.longDescription}
        </p>
      </div>
      <div className="regular-shadow rounded-lg h-[432px] lg:w-[432px] p-4 md:mx-5">
        <Image
          src={tour.locationImg}
          alt=""
          width={432}
          height={432}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default TourDetailsMaps;