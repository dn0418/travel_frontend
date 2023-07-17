// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FoodAndDrinksType } from '../../types';

interface FoodAndDrinkCardProps {
  foodDrink: FoodAndDrinksType;
  findTab: any;
}

function FoodAndDrinkCard({ foodDrink, findTab }: FoodAndDrinkCardProps) {
  const { locale } = useRouter();
  const findType = findTab(foodDrink?.type)

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={foodDrink.thumbnail}
          alt={foodDrink.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
        />
        <div className="p-3">
          <div className="flex items-center justify-between">
            <Link href={`/armenia/food-and-drink/${foodDrink.id}`}>
              <p className="text-xl font-medium my-2 text-black">
                {locale === 'ru' ? foodDrink?.name_ru :
                  (locale === 'hy' ? foodDrink?.name_hy : foodDrink?.name)
                }
              </p>
            </Link>
            {
              foodDrink.rating > 0 &&
              <div className="flex items-center gap-1">
                <Rating
                  max={1}
                  size="small"
                  name="half-rating"
                  readOnly
                  defaultValue={foodDrink.rating || 0}
                  precision={0.1}
                />
                <span className="text-[#5E5E5E] text-sm">
                  {foodDrink.rating.toFixed(1)}
                </span>
              </div>
            }
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {
              findType &&
              ((locale === 'ru' ? 'тип:' : (locale === 'hy' ? 'տիպ:' : 'Type:'))
                + ' ' + findType?.title)
            }
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            {(locale === 'ru' ? 'Адрес:' :
              (locale === 'hy' ? 'Հասցե:' : 'Address:'))
              + ' ' + (locale === 'ru' ? foodDrink?.address_ru :
                (locale === 'hy' ? foodDrink?.address_hy : foodDrink?.address)
              )}
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {
              locale === 'ru' ? foodDrink?.shortDescription_ru :
                (locale === 'hy' ? foodDrink?.shortDescription_hy : foodDrink?.shortDescription)
            }
          </p>

          <div className="flex justify-end items-end">
            <Link href={`/armenia/food-and-drink/${foodDrink.id}`}>
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

export default FoodAndDrinkCard;
