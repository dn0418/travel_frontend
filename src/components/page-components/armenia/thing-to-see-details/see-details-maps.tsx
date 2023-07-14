// @flow strict

import Image from "next/legacy/image";
import { ThingToSeeType } from "../../../../types";

function SeeDetailsMaps({ thing }: { thing: ThingToSeeType }) {
  return (
    <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="">
        <p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
          {thing.description}
        </p>
      </div>
      <div className="regular-shadow rounded-lg h-[432px] lg:w-[432px] p-4 md:mx-5">
        <Image
          src="https://i.ibb.co/CV5BmRc/Mapsicle-Map.png"
          alt=""
          width={432}
          height={432}
          layout="responsive"
        />
      </div>
    </div>
  );
};

export default SeeDetailsMaps;