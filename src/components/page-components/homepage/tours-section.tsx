// @flow strict

import { Card, Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { TourType } from "../../../types/tour";
import TourCard from "../../cards/tour-card";
import SectionTitle from "../../common/section-title";


function TourSection({ tours }: { tours: TourType[] }) {
  const { t } = useTranslation('common');

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="my-3 md:my-6 w-screen">
      <Container className="grid grid-cols-1 md:grid-cols-3  mb-12 gap-4 md:gap-8">
        <div className="home-tours-section">
          <SectionTitle title={t('home_top_suggestion')} />
          <Card
            className='p-1 regular-shadow rounded-lg'
          >
            <Slider
              {...settings}>
              {
                tours.map((tour, index) => (
                  <TourCard tour={tour} key={index} />
                ))
              }
            </Slider>
          </Card>
        </div>
        <div className="home-tours-section">
          <SectionTitle title={t('home_one_day')} />
          <Card
            className='p-1 regular-shadow rounded-lg'
          >
            <Slider
              {...settings}>
              {
                tours.map((tour, index) => (
                  <TourCard tour={tour} key={index} />
                ))
              }
            </Slider>
          </Card>
        </div>
        <div className="home-tours-section">
          <SectionTitle title={t('home_fixed_date')} />
          <Card
            className='p-1 regular-shadow rounded-lg'
          >
            <Slider
              {...settings}>
              {
                tours.map((tour, index) => (
                  <TourCard tour={tour} key={index} />
                ))
              }
            </Slider>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default TourSection;