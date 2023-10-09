// @flow strict

import { Button, Card, Rating } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { TourAccessoryType } from "../../types/services";
import { localizationData } from "../../utils/locales";

interface TransportCardProps {
  accessory: TourAccessoryType;
}

function AccessoriesCard({ accessory }: TransportCardProps) {
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  return (
    <Card className="regular-shadow md:min-h-[500px] rounded-lg flex flex-col justify-between">
      <div className="bg-white p-3">
        <Image
          src={accessory.thumbnail}
          alt={accessory.title}
          className="rounded-lg"
          height={340}
          width={560}
          layout="responsive"
          priority
        />
        <div className="p-3 flex flex-col justify-between">
          <div className="">
            <div className="flex items-center justify-between">
              <Link href={`/services/tour-accessories/${accessory.id}`}>
                <p className="text-xl font-medium my-2 text-black line-clamp-2">
                  {locale === "ru"
                    ? accessory.title_ru
                    : locale === "hy"
                      ? accessory.title_hy
                      : accessory.title}
                </p>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              {accessory.type && (
                <p className="my-0 text-[#5e5e5e] text-sm">
                  {(locale === "ru"
                    ? "тип:"
                    : locale === "hy"
                      ? "տիպ:"
                      : "Type:") +
                    " " +
                    (locale === "ru"
                      ? accessory?.type.name_ru
                      : locale === "hy"
                        ? accessory?.type.name_hy
                        : accessory?.type.name)}
                </p>
              )}
              {accessory.rating && (
                <div className="flex items-center gap-1">
                  <Rating
                    max={1}
                    size="small"
                    name="half-rating"
                    readOnly
                    defaultValue={accessory.rating || 0}
                    precision={0.1}
                  />
                  <span className="text-[#5E5E5E] text-sm">
                    {accessory.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <p className="my-2 text-[#5E5E5E] text-sm">
              {accessory.available}
              {(locale === "ru"
                ? "Доступный:"
                : locale === "hy"
                  ? "Հասանելի է:"
                  : "Available:") +
                " " +
                (locale === "ru"
                  ? accessory?.available_ru
                  : locale === "hy"
                    ? accessory?.available_hy
                    : accessory?.available)}
            </p>
            <p className="text-sm  text-[#5e5e5e] mt-6 line-clamp-3">
              {locale === "ru"
                ? accessory.shortDescription_ru
                : locale === "hy"
                  ? accessory.shortDescription_hy
                  : accessory.shortDescription}
            </p>
          </div>

        </div>
      </div>
      <div className="flex justify-end items-center p-3">
        <Link href={`/services/tour-accessories/${accessory.id}`}>
          <Button
            className="rounded-lg bg-black text-white"
            variant="contained"
          >
            {localData.see_more_text}
          </Button>
        </Link>
      </div>
    </Card>
  );
}

export default AccessoriesCard;
