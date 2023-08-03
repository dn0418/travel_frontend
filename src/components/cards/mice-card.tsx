// @flow strict

import { Button, Card, Rating } from "@mui/material";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { MiceTypes } from "../../types/services";
import { localizationData } from "../../utils/locales";

interface CardProps {
  mice: MiceTypes;
}

function MiceCard({ mice }: CardProps) {
  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
        ? localizationData.hy
        : localizationData.en;

  return (
    <Card className="regular-shadow rounded-lg">
      <div className="bg-white p-3">
        <Image
          src={mice.thumbnail}
          alt={mice.name}
          className="rounded-lg"
          width={600}
          height={350}
          layout="responsive"
          priority
        />
        <div className="p-3 flex flex-col justify-between">
          <div className="">
            <div className="flex items-center justify-between">
              <Link href={`/services/tour-accessories/${mice.id}`}>
                <p className="text-xl font-medium my-2 text-black">
                  {locale === "ru"
                    ? mice.name_ru
                    : locale === "hy"
                      ? mice.name_hy
                      : mice.name}
                </p>
              </Link>
            </div>
            <div className="flex justify-between items-center">
              <p className="my-0 text-[#5e5e5e] text-sm">
                {(locale === "ru"
                  ? mice?.comportable_ru
                  : locale === "hy"
                    ? mice?.comportable_hy
                    : mice?.comportable)}
              </p>
              {mice.rating && (
                <div className="flex items-center gap-1">
                  <Rating
                    max={1}
                    size="small"
                    name="half-rating"
                    readOnly
                    defaultValue={mice.rating || 0}
                    precision={0.1}
                  />
                  <span className="text-[#5E5E5E] text-sm">
                    {mice.rating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            <p className="my-2 text-[#5E5E5E] text-sm">
              Team building activities:
              {locale === "ru"
                ? mice?.activities_ru
                : locale === "hy"
                  ? mice?.activities_hy
                  : mice?.activities}
            </p>
            <p className="text-sm  text-[#5e5e5e] mt-6 line-clamp-3">
              {locale === "ru"
                ? mice.shortDescription_ru
                : locale === "hy"
                  ? mice.shortDescription_hy
                  : mice.shortDescription}
            </p>
          </div>
          <div className="flex justify-end items-center">
            <Link href={`/services/mice/${mice.id}`}>
              <Button
                className="rounded-lg bg-black text-white"
                variant="contained"
              >
                {localData.see_more_text}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default MiceCard;
