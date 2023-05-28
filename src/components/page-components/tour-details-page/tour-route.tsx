// @flow strict

import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Container
} from "@mui/material";
import { useState } from "react";
import { BsClock } from 'react-icons/bs';
import { FaRegDotCircle } from 'react-icons/fa';
import { GiCoffeeCup } from 'react-icons/gi';
import { IoLocationOutline } from 'react-icons/io5';
import { MdExpandMore } from 'react-icons/md';
import { RiHotelLine } from 'react-icons/ri';
import ExpandedSectionTitle from "../../shared/expanded-section-title";

function TourRoute() {
  const [isReviewShow, setIsReviewShow] = useState(false)
  const handleChangeFunction = () => {
    setIsReviewShow(!isReviewShow);
  }

  return (
    <div className="my-5">
      <ExpandedSectionTitle
        title="Route"
        onchange={handleChangeFunction}
      />
      <div
        hidden={!isReviewShow}
        className="transition-all duration-1000 ease-in-out"
      >
        <Container>
          <Timeline sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
          >
            {
              [1, 2, 3, 4].map((item, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot
                      className='text-[#EDA592] my-1  text-[26px] bg-transparent p-0 shadow-none' >
                      <FaRegDotCircle />
                    </TimelineDot>
                    {
                      index !== 3 && <TimelineConnector className='bg-[#EDA592]' />
                    }
                  </TimelineSeparator>
                  <TimelineContent>
                    <RouteDetails
                      title={`Day ${index + 1}: Airport -Tsaghkadzor - Other city`}
                    />
                  </TimelineContent>
                </TimelineItem>
              ))
            }
          </Timeline>
        </Container>
      </div>
    </div>
  );
};

export default TourRoute;


const RouteDetails = ({ title }: { title: string }) => {

  return (
    <Accordion className='shadow-[0px_0.5px_4px_rgba(0,0,0,0.1)] rounded-xl px-3 py-2'>
      <AccordionSummary
        expandIcon={<MdExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <h5 className="text-xl font-medium my-0">
          {title}
        </h5>
      </AccordionSummary>
      <AccordionDetails>
        <p>
          09:00-14:00 Meeting at Zvartnots airport and transfer to a comfortable Cascade 3* hotel in the very center of Yerevan. Time for registration and a little rest. 15:30 Cascade architectural complex, Cafesjian Museum of Contemporary Art, Opera House. 16:00 Tour to Matenadaran: museum-institute of ancient Armenian manuscripts, one of the largest manuscript repositories in the world. 17:00 Sightseeing tour of Yerevan with stops at the Monument to David Sasuntsi, in the Victory Park - at the Mother Armenia monument, from where a beautiful view of the whole city opens. 19:00 Welcome dinner with folklore program (Folk Song and Dance Ensemble - Yerevan) in one of the most favorite restaurants in the capital - Yerevan Tavern. 21:30Evening walk in the center of Yerevan: walking tour along the Northern Avenue to the Republic Square. Participation in the show of singing fountains (from May to October). 23:00 Return to the hotel.
        </p>
        <div className="">
          <p className="flex items-center gap-4">
            <BsClock className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base text-[#5e5e5e]">8 houre</span>
          </p>
          <p className="flex items-center gap-4">
            <IoLocationOutline className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base text-[#5e5e5e]">12 kilometers</span>
          </p>
          <p className="flex items-center gap-4">
            <GiCoffeeCup className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base text-[#5e5e5e]">Breakfast</span>
          </p>
          <p className="flex items-center gap-4">
            <RiHotelLine className="text-base text-[#EDA592]  font-bold" />
            <span className="text-base text-[#5e5e5e]">City hotel</span>
          </p>
        </div>
      </AccordionDetails>
    </Accordion>
  )
}