import { useLocation, useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { Typography } from "@mui/material";
import styled from "@emotion/styled";
import { colors, spaces } from "../tokens/tokens";
import {
  CALCULATORS_TITLE,
  CALCULATORS_URL,
  YOUTH_SAVING_TITLE,
  YOUTH_SAVING_URL,
} from "../constants/url";

const HEADER_NAMES: { [key: string]: string } = {
  [YOUTH_SAVING_URL]: YOUTH_SAVING_TITLE,
  [CALCULATORS_URL]: CALCULATORS_TITLE,
};

const Header = () => {
  const location = useLocation();
  const nav = useNavigate();
  return (
    <IconBox>
      {location.pathname === "/" ? (
        <Typography
          style={{
            display: "inline-block",
            width: "100%",
            textAlign: "center",
          }}
        >
          Useful Tools
        </Typography>
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SlArrowLeft
            color={colors.grey_1}
            style={{
              position: "absolute",
              cursor: "pointer",
              display: "inline-block",
            }}
            onClick={() => nav(-1)}
          />
          <Typography
            style={{
              display: "inline-block",
              width: "100%",
              textAlign: "center",
            }}
            align="center"
          >
            {HEADER_NAMES[location.pathname] || "Useful Tools"}
          </Typography>
        </div>
      )}
    </IconBox>
  );
};

export default Header;

const IconBox = styled.div`
  display: flex;
  align-items: center;
  min-height: ${spaces.space_16};
  position: fixed;
  z-index: 100;
  padding: ${spaces.space_16};
  top: 0;
  left: 0;
  right: 0;
  border-bottom: 1px solid ${colors.grey_2};
  background: ${colors.white_1};
  max-width: 400px;
  box-sizing: border-box;
  margin: auto;
`;
