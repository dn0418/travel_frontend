// @flow strict

import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { CarWithDriverType } from "../../../../types/car-type";
import CarWithDriverPricingTable from "./with-driver-pricing";


type Props = { carsWithDriver: CarWithDriverType }

function TransportWithDriver({ carsWithDriver: car }: Props) {
  const { locale } = useRouter();

  return (
    <div className='my-4 w-full md:my-8'>
      <h2 className="text-2xl font-medium pt-6">
        {locale === 'ru' ? car.title_ru : (locale === 'hy' ? car.title_hy : car.title)}
      </h2>
      <p className="">
        {locale === 'ru' ? car.description_ru : (locale === 'hy' ? car.description_hy : car.description)}
      </p>
      <div className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2 gap-4">
        {
          car?.images?.length > 0 &&
          car?.images.map((image, index) => (
            <Image
              key={index}
              width={1000}
              height={500}
              src={image?.url}
              className="rounded-lg"
              alt="with driver transport"
              layout="responsive"
            />
          ))
        }
      </div>
      {
        car?.pricing?.length > 0 &&
        <CarWithDriverPricingTable carsWithDriver={car} />
      }
    </div>
  );
};

export default TransportWithDriver;