// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { ThingToSeeType } from '../../types';

interface ThingToSeeCardProps {
  thing: ThingToSeeType;
}

function ThingToDoCard({ thing }: ThingToSeeCardProps) {

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={thing.thumbnail}
          alt={thing.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/armenia/thing-to-do/${thing.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {thing.name}
              </p>
            </Link>
            {
              thing.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={thing.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{thing.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Type: {thing.type}
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Date: {thing.date}
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {thing.shortDescription}
          </p>

          <div className="flex justify-end items-end">
            <Link href={`/armenia/thing-to-do/${thing.id}`}>
              <Button className="rounded-lg bg-black text-white" variant='contained'>Submit</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ThingToDoCard;
