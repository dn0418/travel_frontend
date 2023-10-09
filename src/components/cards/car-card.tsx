// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CarWithOutType } from '../../types/car-type';
import { localizationData } from '../../utils/locales';

interface TransportCardProps {
  car: CarWithOutType;
}

function TransportCard({ car }: TransportCardProps) {
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  // console.log(car)

  return (
    <Card className="regular-shadow  w-full h-full rounded-lg flex flex-col justify-between">
      <div className="bg-white p-3  w-full h-full">
        <Image
          src={car.thumbnail}
          alt={car.name}
          className="rounded-lg w-full h-full"
          height={340}
          width={560}
          layout="responsive"
          priority
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/services/transport/${car.id}`}>
              <p className="text-xl font-medium my-2 text-black line-clamp-2">
                {locale === 'ru' ? car?.name_ru :
                  (locale === 'hy' ? car?.name_hy : car?.name)
                }
              </p>
            </Link>
            {
              car.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={car.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{car.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {
              ((locale === 'ru' ? 'Год:' : (locale === 'hy' ? 'Տարի:' : 'Year:'))
                + ' ' + car.year)
            }
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {
              ((locale === 'ru' ? 'Количество мест:' :
                (locale === 'hy' ? 'Նստատեղերի քանակը:' : 'No of Seats:'))
                + ' ' + car.seatNo)
            }
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {
              locale === 'ru' ? car?.shortDescription_ru :
                (locale === 'hy' ? car?.shortDescription_hy : car?.shortDescription)
            }
          </p>

        </div>
      </div>
      <div className="flex justify-end items-center p-3">
        <Link href={`/services/transport/${car.id}`}>
          <Button className="rounded-lg bg-black text-white" variant='contained'>
            {localData.see_more_text}
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default TransportCard;
