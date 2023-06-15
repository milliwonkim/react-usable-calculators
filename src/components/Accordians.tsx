import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styled from "@emotion/styled";
import { spaces } from "../tokens/tokens";

interface AccordiansProps {
  title?: ReactNode;
  children?: ReactNode;
  description?: ReactNode;
  expandIcon?: JSX.Element;
  id?: string;
  ariaControls?: string;
  defaultExpanded?: boolean;
  disabled?: boolean;
  expanded?: boolean;
}

const Accordians = ({
  title,
  children,
  expandIcon,
  ariaControls,
  id,
  description,
  defaultExpanded,
  disabled,
  expanded,
}: AccordiansProps) => {
  return (
    <Accordion
      elevation={1}
      disabled={disabled}
      defaultExpanded={defaultExpanded}
      expanded={expanded}
    >
      <AccordionSummary
        expandIcon={expandIcon || <ExpandMoreIcon />}
        aria-controls={ariaControls || "panel1a-content"}
        id={id || "panel1a-header"}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <div style={{ padding: "16px 0" }}>{description}</div>
        <AccorditionContainer>{children}</AccorditionContainer>
      </AccordionDetails>
    </Accordion>
  );
};

export default Accordians;

const AccorditionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spaces.space_16};
`;
