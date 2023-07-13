// @flow strict

import { Button } from "@mui/material";
import Image from "next/image";
import { CarWithDriverType } from "../../../types/car-type";
import WithDriverAdminPricing from "./with-driver-admin-priceing";



function AdminWithDriver(
  { carsWithDriver }: { carsWithDriver: CarWithDriverType }
) {
  // console.log(carsWithDriver)

  return (
    <div className='my-4 w-full md:my-8'>
      <div className="flex justify-end">
        <h1 className="text-2xl font-bold">
          <Button variant="text" className="text-black shadow py-2.5 px-6">
            Edit Page
          </Button>
        </h1>
      </div>
      <h2 className="text-2xl font-medium">
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
        <WithDriverAdminPricing carsWithDriver={carsWithDriver} />
      }
    </div>
  );
};

export default AdminWithDriver;