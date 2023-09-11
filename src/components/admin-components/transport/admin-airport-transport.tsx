// @flow strict

import { Button } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { AirportTransportType } from "../../../types/car-type";


function AdminAirportTransport(
  { airportTransport }: { airportTransport: AirportTransportType }) {
  return (
    <div className='my-4 w-full md:my-8'>
      <div className="flex justify-end">
        <h1 className="text-2xl font-bold">
          <Link href="/admin/transports/update-airport-transport">
            <Button variant="text" className="text-black shadow py-2.5 px-6">
              Edit Page
            </Button>
          </Link>
        </h1>
      </div>
      <div className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2 gap-4">
        {
          airportTransport?.images?.length &&
          airportTransport?.images.map((image, i) => (
            <Image
              key={i}
              height={340}
              width={560}
              src={image?.url}
              className="rounded-lg"
              alt="airport transport"
              layout="responsive"
            />
          ))
        }
      </div>
      <p className="">{airportTransport?.description}</p>
    </div>
  );
};

export default AdminAirportTransport;