// @flow strict

import { Card, Container } from "@mui/material";
import { useRouter } from "next/router";
import Slider from "react-slick";
import { TourType } from "../../../types/tour";
import { localizationData } from "../../../utils/locales";
import TourCard from "../../cards/tour-card";
import SectionTitle from "../../common/section-title";

interface PropsType {
  tours: TourType[];
  fixedDateTour: TourType[];
  oneDayTour: TourType[];
  topSuggestedTour: TourType[];
}

function TourSection({ tours, oneDayTour, fixedDateTour, topSuggestedTour }: PropsType) {
  const { locale } = useRouter();

  const localData = locale === "ru" ? localizationData.ru :
    (locale === 'hy' ? localizationData.hy : localizationData.en);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="my-3 md:my-6 w-screen">
      <Container className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          <div className="home-tours-section">
            <SectionTitle title={localData.top_suggested_title} />
            <Card
              className='p-1 regular-shadow rounded-lg'
            >
              {
                topSuggestedTour.length > 0 ?
                  <Slider
                    {...settings}>
                    {
                      topSuggestedTour.map((tour, index) => (
                        <TourCard tour={tour} key={index} />
                      ))
                    }
                  </Slider>
                  :
                  <div className="w-full h-full flex justify-center items-center">
                    <p>{localData.not_found_text}</p>
                  </div>
              }
            </Card>
          </div>
          <div className="home-tours-section">
            <SectionTitle title={localData.one_day} />
            <Card
              className='p-1 regular-shadow rounded-lg'
            >
              {
                oneDayTour.length > 0 ?
                  <Slider
                    {...settings}>
                    {
                      oneDayTour.map((tour, index) => (
                        tour.dayLength === 1 &&
                        <TourCard tour={tour} key={index} />
                      ))
                    }
                  </Slider>
                  :
                  <div className="w-full h-full flex justify-center items-center">
                    <p>{localData.not_found_text}</p>
                  </div>
              }
            </Card>
          </div>
          <div className="home-tours-section">
            <SectionTitle title={localData.fixed_date} />
            <Card
              className='p-1 regular-shadow rounded-lg'
            >
              {
                fixedDateTour.length > 0 ?
                  <Slider
                    {...settings}>
                    {
                      fixedDateTour.map((tour, index) => (
                        (tour.startDate && tour.endDate) &&
                        <TourCard tour={tour} key={index} />
                      ))
                    }
                  </Slider>
                  :
                  <div className="w-full h-full flex justify-center items-center">
                    <p>{localData.not_found_text}</p>
                  </div>
              }
            </Card>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default TourSection;