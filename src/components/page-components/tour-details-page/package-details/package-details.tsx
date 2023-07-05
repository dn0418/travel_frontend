// @flow strict

import { Container } from "@mui/material";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import { TourType } from "../../../../types/tour";
import ExpandedSectionTitle from "../../../common/expanded-section-title";



function PackageDetails({ tour }: { tour: TourType }) {
  const { includesServices, excludeServices } = tour;
  const [isReviewShow, setIsReviewShow] = useState(false);

  const handleChangeFunction = () => {
    setIsReviewShow(!isReviewShow);
  }

  return (
    <div className="my-5">
      <ExpandedSectionTitle
        title="Package Details"
        onchange={handleChangeFunction}
      />
      <div hidden={!isReviewShow} className="transition-all duration-1000 ease-in-out ">
        <Container>
          <div className="flex flex-col md:items-center">
            <div>
              {
                includesServices.map((item, index) => (
                  item.type === 'include' &&
                  <p className="flex gap-4 my-6 items-center" key={index}>
                    <AiOutlineCheckCircle className="text-[#00952A]" />
                    <span className="text-sm">{item.text}</span>
                  </p>
                ))
              }
              {
                excludeServices.map((item, index) => (
                  item.type === 'exclude' &&
                  <p className="flex gap-4 my-6 items-center" key={index}>
                    <RxCrossCircled className="text-[#FF3500]" />
                    <span className="text-sm">{item.text}</span>
                  </p>
                ))
              }
            </div>
          </div>
        </Container>
      </div >
    </div >
  );
};

export default PackageDetails;