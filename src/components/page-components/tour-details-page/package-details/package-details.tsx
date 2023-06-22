// @flow strict

import { Container } from "@mui/material";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RxCrossCircled } from "react-icons/rx";
import ExpandedSectionTitle from "../../../common/expanded-section-title";

const includes = [
  "The sun set over the mountains in a fiery display.",
  "The cat curled up on the cozy couch.",
  "I can hear the rain tapping on my window.",
  "The scent of freshly baked bread filled the room.",
  "The dancer gracefully leaped across the stage.",
  "The old man sat quietly on the park bench.",
  "The snowflakes danced in the frigid air.",
  "The waves crashed against the rocky shore.",
]

const excludes = [
  "The aroma of coffee wafted through the air.",
  "The child giggled with delight as she played.",
  "The scent of freshly baked bread filled the room.",
  "The dancer gracefully leaped across the stage.",
  "The old man sat quietly on the park bench.",
]


function PackageDetails() {
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
                includes.map((item, index) => (
                  <p className="flex gap-4 my-6 items-center" key={index}>
                    <AiOutlineCheckCircle className="text-[#00952A]" />
                    <span className="text-sm">{item}</span>
                  </p>
                ))
              }
              {
                excludes.map((item, index) => (
                  <p className="flex gap-4 my-6 items-center" key={index}>
                    <RxCrossCircled className="text-[#FF3500]" />
                    <span className="text-sm">{item}</span>
                  </p>
                ))
              }
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default PackageDetails;