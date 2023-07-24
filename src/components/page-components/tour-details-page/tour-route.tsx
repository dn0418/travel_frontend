// @flow strict

import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { FaRegDotCircle } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { IoLocationOutline } from "react-icons/io5";
import { MdExpandMore } from "react-icons/md";
import { RiHotelLine } from "react-icons/ri";
import { TourType } from "../../../types/tour";
import ExpandedSectionTitle from "../../common/expanded-section-title";
import { localizationData } from "../../../utils/locales";

function TourRoute({ tour }: { tour: TourType }) {
  const { routes } = tour;
  const [isReviewShow, setIsReviewShow] = useState(false);

  const { locale } = useRouter();
  const localData =
    locale === "ru"
      ? localizationData.ru
      : locale === "hy"
      ? localizationData.hy
      : localizationData.en;

  const handleChangeFunction = () => {
    setIsReviewShow(!isReviewShow);
  };

  return (
    <div className="my-5">
      <ExpandedSectionTitle
        title={localData.route_text}
        onchange={handleChangeFunction}
      />
      <div
        hidden={!isReviewShow}
        className="transition-all duration-1000 ease-in-out"
      >
        <Container>
          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {routes.map((route, index) => (
              <TimelineItem key={index}>
                <TimelineSeparator>
                  <TimelineDot
                    className="text-[#EDA592] my-1  text-[26px] 
                      bg-transparent p-0 shadow-none"
                  >
                    <FaRegDotCircle />
                  </TimelineDot>
                  {index !== routes.length - 1 && (
                    <TimelineConnector className="bg-[#EDA592]" />
                  )}
                </TimelineSeparator>
                <TimelineContent>
                  <Accordion className="shadow-[0px_0.5px_4px_rgba(0,0,0,0.1)] rounded-xl px-3 py-2">
                    <AccordionSummary
                      expandIcon={<MdExpandMore />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <h5 className="text-xl font-medium my-0">
                        {locale === "ru"
                          ? route.title_ru
                          : locale === "hy"
                          ? route.title_hy
                          : route.title}
                      </h5>
                    </AccordionSummary>
                    <AccordionDetails>
                      <p>
                        {locale === "ru"
                          ? route.description_ru
                          : locale === "hy"
                          ? route.description_hy
                          : route.description}
                      </p>
                      <div className="">
                        <p className="flex items-center gap-4">
                          <BsClock className="text-base text-[#EDA592]  font-bold" />
                          <span className="text-base text-[#5e5e5e]">
                            {locale === "ru"
                              ? route.time_ru
                              : locale === "hy"
                              ? route.time_hy
                              : route.time}
                          </span>
                        </p>
                        <p className="flex items-center gap-4">
                          <IoLocationOutline className="text-base text-[#EDA592]  font-bold" />
                          <span className="text-base text-[#5e5e5e]">
                            {locale === "ru"
                              ? route.distance_ru
                              : locale === "hy"
                              ? route.distance_hy
                              : route.distance}
                          </span>
                        </p>
                        <p className="flex items-center gap-4">
                          <GiCoffeeCup className="text-base text-[#EDA592]  font-bold" />
                          <span className="text-base text-[#5e5e5e]">
                            {locale === "ru"
                              ? route.meals_ru
                              : locale === "hy"
                              ? route.meals_hy
                              : route.meals}
                          </span>
                        </p>
                        <p className="flex items-center gap-4">
                          <RiHotelLine className="text-base text-[#EDA592]  font-bold" />
                          <span className="text-base text-[#5e5e5e]">
                            {locale === "ru"
                              ? route.hotel_ru
                              : locale === "hy"
                              ? route.hotel_hy
                              : route.hotel}
                          </span>
                        </p>
                      </div>
                    </AccordionDetails>
                  </Accordion>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </div>
    </div>
  );
}

export default TourRoute;
