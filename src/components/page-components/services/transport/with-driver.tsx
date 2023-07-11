// @flow strict

import Image from "next/image";
import { CarWithDriverType } from "../../../../types/car-type";
import CarWithDriverPricingTable from "./with-driver-pricing";


function TransportWithDriver(
  { carsWithDriver }: { carsWithDriver: CarWithDriverType }
) {
  // console.log(carsWithDriver)

  return (
    <div className='my-4 w-full md:my-8'>
      <h2 className="text-2xl font-medium pt-6">
        {carsWithDriver?.title}
      </h2>
      <p className="">{carsWithDriver?.description}</p>
      <div className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2 gap-4">
        {
          carsWithDriver?.images?.length > 0 &&
          carsWithDriver?.images.map((image, index) => (
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
        carsWithDriver?.pricing?.length > 0 &&
        <CarWithDriverPricingTable carsWithDriver={carsWithDriver} />
      }
    </div>
  );
};

export default TransportWithDriver;