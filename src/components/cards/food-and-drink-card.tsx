// @flow strict

import { Button, Card, Rating } from '@mui/material';
import Image from "next/legacy/image";
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { FoodAndDrinksType } from '../../types';

interface FoodAndDrinkCardProps {
  foodDrink: FoodAndDrinksType;
}

function FoodAndDrinkCard({ foodDrink }: FoodAndDrinkCardProps) {
  const { t } = useTranslation('common');

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
                {foodDrink.name}
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
                <span className="text-[#5E5E5E] text-sm">{foodDrink.rating.toFixed(1)}</span>
              </div>
            }
          </div>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Type: {foodDrink.type}
          </p>
          <p className="mt-0 text-[#5E5E5E] text-sm">
            Address: {foodDrink.address}
          </p>

          <p className="text-sm  text-[#5e5e5e]  line-clamp-3 mt-6">
            {foodDrink.shortDescription}
          </p>

          <div className="flex justify-end items-end">
            <Link href={`/armenia/food-and-drink/${foodDrink.id}`}>
              <Button className="rounded-lg bg-black text-white" variant='contained'>{t('seemore_text')}</Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FoodAndDrinkCard;
