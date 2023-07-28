// @flow strict

import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { HotelDataType } from "../../../../types/services";


function HotelDetailsMaps({ hotel }: { hotel: HotelDataType }) {
  const { locale } = useRouter();

  return (
    <div className="tour-details-maps my-5 md:my-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div dangerouslySetInnerHTML={{
        __html: (`<p className="text-[#5e5e5e]  md:w-3/4 font-rubik">
          ${locale === 'ru' ? hotel.longDescription_ru :
            (locale === 'hy' ? hotel.longDescription_hy : hotel.longDescription)
          }
        </p>`)
      }
      }>
      </div>
      <div className="regular-shadow rounded-lg h-[432px] lg:w-[432px] p-4 md:mx-5">
        <Image
          src="https://i.ibb.co/CV5BmRc/Mapsicle-Map.png"
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

export default HotelDetailsMaps;