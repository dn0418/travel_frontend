// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { HotelDataType } from '../../types/services';


function HotelCard({ hotel }: { hotel: HotelDataType }) {
  const { locale } = useRouter();

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={hotel.thumbnail}
          alt={hotel.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
          priority
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/services/hotels/${hotel.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {locale === 'ru' ? hotel?.name_ru :
                  (locale === 'hy' ? hotel?.name_hy : hotel?.name)
                }
              </p>
            </Link>
            {
              hotel.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={hotel.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">{hotel.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-[#EDA592] text-base" />
              <span className=" text-[#5E5E5E] text-sm">
                {(locale === 'ru' ? hotel?.city_ru :
                  (locale === 'hy' ? hotel?.city_hy :
                    hotel?.city)) + " - " + (locale === 'ru' ? hotel?.country_ru :
                      (locale === 'hy' ? hotel?.country_hy : hotel?.country))
                }
              </span>
            </div>
            {
              hotel.type &&
              <p className="my-0 text-[#5e5e5e] text-sm">

                {(locale === 'ru' ? 'тип:' : (locale === 'hy' ? 'տիպ:' : 'Type:'))
                  + ' ' + (locale === 'ru' ? hotel?.type.name_ru :
                    (locale === 'hy' ? hotel?.type.name_hy : hotel?.type.name))}
              </p>
            }
          </div>

          <p className="text-sm  text-[#5e5e5e] line-clamp-3">
            {
              locale === 'ru' ? hotel?.shortDescription_ru :
                (locale === 'hy' ? hotel?.shortDescription_hy : hotel?.shortDescription)
            }
          </p>
          <div className="flex justify-end items-center">
            <Link href={`/services/hotels/${hotel.id}`}>
              <Button className="rounded-lg bg-black text-white" variant='contained'>
                {
                  locale === 'ru' ? 'Узнать больше' :
                    (locale === 'hy' ? 'Տեսնել ավելին' : 'See More')
                }
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HotelCard;
