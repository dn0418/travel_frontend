// @flow strict

import { Accordion, AccordionSummary, Container, Typography } from "@mui/material";
import { SyntheticEvent } from "react";
import { MdExpandMore } from "react-icons/md";

type Props = {
  onchange: (event: SyntheticEvent<Element, Event>, expanded: boolean) => void,
  title: string
}

function ExpandedSectionTitle({ onchange, title }: Props) {

  return (
    <div className="bg-[#FFEAE4] expanded-section-title">
      <Container>
        <Accordion onChange={onchange}>
          <AccordionSummary
            expandIcon={<MdExpandMore />}
            aria-controls="tour-reviews"
          >
            <Typography className="text-[#004C99] text-xl">{title}</Typography>
          </AccordionSummary>
        </Accordion>
      </Container>
    </div>
  );
};

export default ExpandedSectionTitle;