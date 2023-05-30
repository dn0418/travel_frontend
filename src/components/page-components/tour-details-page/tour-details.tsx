// @flow strict

import Image from "next/image";


function TourDetailsMaps() {
  return (
    <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="">
        <ul className="text-[#5e5e5e] md:w-3/4 font-rubik list-disc">
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur. Neque odio eget sagittis consequat ac gravida porttitor. Eget lorem egestas proin et malesuada nulla eget. Quam dui tempor tellus enim hac consequat quis nec condimentum. Sed dictum enim sed orci senectus amet venenatis luctus.</li>
        </ul>
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

export default TourDetailsMaps;