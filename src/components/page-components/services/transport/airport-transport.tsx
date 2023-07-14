// @flow strict

import { Button } from "@mui/material";
import Image from "next/legacy/image";
import { AirportTransportType } from "../../../../types/car-type";


function AirportTransport(
  { airportTransport }: { airportTransport: AirportTransportType }) {
  return (
    <div className='my-4 w-full md:my-8'>
      <div className="grid w-full py-5 md:py-8 grid-cols-1 md:grid-cols-2 gap-4">
        {
          airportTransport?.images?.length &&
          airportTransport?.images.map((image, i) => (
            <Image
              key={i}
              width={1000}
              height={500}
              src={image?.url}
              className="rounded-lg"
              alt="airport transport"
              layout="responsive"
            />
          ))
        }
      </div>
      <p className="">{airportTransport?.description}</p>
      <div className="flex mt-5 justify-center">
        <Button className="bg-black text-white" variant="contained">Send Request</Button>
      </div>
    </div>
  );
};

export default AirportTransport;