import styled from "@emotion/styled";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  Slider,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { boxShadows, colors, spaces } from "../../tokens/tokens";

const rgbaToHex = (rgbaColor: string, isToHEX: boolean) => {
  if (!isToHEX) return rgbaColor;

  // Extract the RGBA values
  var rgbaValues = rgbaColor.replace(/rgba?\(|\)/g, "").split(",");

  // Convert the RGBA values to their hexadecimal equivalents
  var red = parseInt(rgbaValues[0], 10).toString(16);
  var green = parseInt(rgbaValues[1], 10).toString(16);
  var blue = parseInt(rgbaValues[2], 10).toString(16);

  // Pad single-digit hex values with a leading zero if necessary
  if (red.length === 1) red = "0" + red;
  if (green.length === 1) green = "0" + green;
  if (blue.length === 1) blue = "0" + blue;

  // Construct the hexadecimal color value
  var hexColor = "#" + red + green + blue;

  return hexColor;
};

const ColorPicker = () => {
  const [shadow1, setShadow1] = useState(0);
  const [shadow2, setShadow2] = useState(0);
  const [shadow3, setShadow3] = useState(0);
  const [shadow4, setShadow4] = useState(0);

  const [xPosition, setXPosition] = useState(0);
  const [yPosition, setYPosition] = useState(0);
  const [blur, setBlur] = useState(0);
  const [spread, setSpread] = useState(0);

  const [r, setR] = useState(256);
  const [g, setG] = useState(256);
  const [b, setB] = useState(256);
  const [a, setA] = useState(100);

  const [rColor, setRColor] = useState(0);
  const [gColor, setGColor] = useState(0);
  const [bColor, setBColor] = useState(0);
  const [aColor, setAColor] = useState(100);

  const [isToHEX, setIsToHEX] = useState(false);
  const [isToHEXColor, setIsToHEXColor] = useState(false);

  const [upPadding, setUpPadding] = useState(16);
  const [rightPadding, setRightPadding] = useState(16);
  const [bottomPadding, setBottomPadding] = useState(16);
  const [leftPadding, setLeftPadding] = useState(16);

  const [upMargin, setUpMargin] = useState(16);
  const [rightMargin, setRightMargin] = useState(16);
  const [bottomMargin, setBottomMargin] = useState(16);
  const [leftMargin, setLeftMargin] = useState(16);

  const [toast, setToast] = useState("");

  const ref = useRef(null);

  const handleCopyClick = () => {
    if (ref.current) {
      const textToCopy = (ref.current as any).innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setToast("클립보드에 복사완료");
          setDuration(3000);
        })
        .catch((error) => {
          setToast("클립보드에 복사실패");
          console.error("Failed to copy text:", error);
        });
    }
  };

  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (duration !== 0) {
        setDuration(0);
        setToast("");
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [duration]);

  const renderPadding = () => {
    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>padding</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>up: {upPadding}px</div>
          <Slider
            value={upPadding}
            onChange={(e: any) => setUpPadding(+e.target.value)}
          />
          <div>right: {rightPadding}px</div>
          <Slider
            value={rightPadding}
            onChange={(e: any) => setRightPadding(+e.target.value)}
          />
          <div>bottom: {bottomPadding}px</div>
          <Slider
            value={bottomPadding}
            onChange={(e: any) => setBottomPadding(+e.target.value)}
          />
          <div>left: {leftPadding}px</div>
          <Slider
            value={leftPadding}
            onChange={(e: any) => setLeftPadding(+e.target.value)}
          />
        </AccordionDetails>
      </Accordion>
    );
  };
  const renderMargin = () => {
    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>margin</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>up: {upMargin}px</div>
          <Slider
            value={upMargin}
            onChange={(e: any) => setUpMargin(+e.target.value)}
          />
          <div>right: {rightMargin}px</div>
          <Slider
            value={rightMargin}
            onChange={(e: any) => setRightMargin(+e.target.value)}
          />
          <div>bottom: {bottomMargin}px</div>
          <Slider
            value={bottomMargin}
            onChange={(e: any) => setBottomMargin(+e.target.value)}
          />
          <div>left: {leftPadding}px</div>
          <Slider
            value={leftMargin}
            onChange={(e: any) => setLeftMargin(+e.target.value)}
          />
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderBoxShadow = () => {
    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>box-shadow</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div>r: {shadow1}</div>
          <Slider
            value={shadow1}
            onChange={(e: any) => setShadow1(+e.target.value)}
          />
          <div>g: {shadow2}</div>
          <Slider
            value={shadow2}
            onChange={(e: any) => setShadow2(+e.target.value)}
          />
          <div>b: {shadow3}</div>
          <Slider
            value={shadow3}
            onChange={(e: any) => setShadow3(+e.target.value)}
          />
          <div>a: {shadow4 / 100}</div>
          <Slider
            value={shadow4}
            onChange={(e: any) => setShadow4(+e.target.value)}
          />
          <div>x-position: {xPosition}px</div>
          <Slider
            min={-100}
            max={100}
            value={xPosition}
            onChange={(e: any) => setXPosition(+e.target.value)}
          />
          <div>y-position: {yPosition}px</div>
          <Slider
            min={-100}
            max={100}
            value={yPosition}
            onChange={(e: any) => setYPosition(+e.target.value)}
          />
          <div>blur: {blur}px</div>
          <Slider
            min={0}
            max={100}
            value={blur}
            onChange={(e: any) => setBlur(+e.target.value)}
          />
          <div>spread: {spread}px</div>
          <Slider
            min={0}
            max={100}
            value={spread}
            onChange={(e: any) => setSpread(+e.target.value)}
          />
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderBackground = () => {
    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>background</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            style={{
              marginBottom: "16px",
              background: isToHEX ? colors.skyblue_1 : "",
              color: isToHEX ? colors.white_1 : "",
            }}
            onClick={() => setIsToHEX((prev) => !prev)}
          >
            {isToHEX ? "HEX를 RGBA로 바꾸기" : "RGBA를 HEX로 바꾸기"}
          </Button>
          <div>r: {r}</div>
          <Slider
            min={0}
            max={256}
            value={r}
            onChange={(e: any) => setR(+e.target.value)}
          />
          <div>g: {g}</div>
          <Slider
            min={0}
            max={256}
            value={g}
            onChange={(e: any) => setG(+e.target.value)}
          />
          <div>b: {b}</div>
          <Slider
            min={0}
            max={256}
            value={b}
            onChange={(e: any) => setB(+e.target.value)}
          />
          <div>a: {a / 100}</div>
          <Slider
            min={0}
            max={100}
            value={a}
            onChange={(e: any) => setA(+e.target.value)}
          />
        </AccordionDetails>
      </Accordion>
    );
  };

  const renderColor = () => {
    return (
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>color</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Button
            style={{
              marginBottom: "16px",
              background: isToHEXColor ? colors.skyblue_1 : "",
              color: isToHEXColor ? colors.white_1 : "",
            }}
            onClick={() => setIsToHEXColor((prev) => !prev)}
          >
            {isToHEX ? "HEX를 RGBA로 바꾸기" : "RGBA를 HEX로 바꾸기"}
          </Button>
          <div>r: {rColor}</div>
          <Slider
            min={0}
            max={256}
            value={rColor}
            onChange={(e: any) => setRColor(+e.target.value)}
          />
          <div>g: {gColor}</div>
          <Slider
            min={0}
            max={256}
            value={gColor}
            onChange={(e: any) => setGColor(+e.target.value)}
          />
          <div>b: {bColor}</div>
          <Slider
            min={0}
            max={256}
            value={bColor}
            onChange={(e: any) => setBColor(+e.target.value)}
          />
          <div>a: {aColor / 100}</div>
          <Slider
            min={0}
            max={100}
            value={aColor}
            onChange={(e: any) => setAColor(+e.target.value)}
          />
        </AccordionDetails>
      </Accordion>
    );
  };

  const boxShadowText = `box-shadow: rgba(${shadow2}, ${shadow2}, ${shadow3}, ${
    shadow4 / 100
  }) ${xPosition}px ${yPosition}px ${blur}px ${spread}px;`;
  const backgroundText = `background-color: ${rgbaToHex(
    `rgba(${r}, ${g}, ${b}, ${a / 100})`,
    isToHEX
  )};`;
  const colorText = `color: ${rgbaToHex(
    `rgba(${rColor}, ${gColor}, ${bColor}, ${aColor / 100})`,
    isToHEXColor
  )};`;
  const paddingText = `padding: ${upPadding}px ${rightPadding}px ${bottomPadding}px ${leftPadding}px;`;
  const marginText = `margin: ${upMargin}px ${rightMargin}px ${bottomMargin}px ${leftMargin}px;`;

  return (
    <div>
      <div>
        <DesignContainer>
          <DesignBox
            ref={ref}
            color={colorText}
            padding={paddingText}
            background={backgroundText}
            boxShadow={boxShadowText}
            margin={marginText}
            onClick={handleCopyClick}
          >
            <div>{boxShadowText}</div>
            <div>{backgroundText}</div>
            <div>{colorText}</div>
            <div>{paddingText}</div>
            <div>{marginText}</div>
          </DesignBox>
        </DesignContainer>
      </div>
      <SelectorContainer>
        {renderBackground()}
        {renderColor()}
        {renderPadding()}
        {renderMargin()}
        {renderBoxShadow()}

        <Snackbar
          open={duration !== 0}
          autoHideDuration={duration}
          message={toast}
        />
      </SelectorContainer>
    </div>
  );
};

export default ColorPicker;

interface ColorPickerProps {
  boxShadow?: string;
  color?: string;
  background?: string;
  padding?: string;
  margin?: string;
}

const DesignContainer = styled.div`
  background: ${colors.grey_1};
  box-shadow: ${boxShadows.type_1};
  position: fixed;
  top: 80px;
  left: 0;
  right: 0;
  z-index: 100;
`;

const DesignBox = styled.div<ColorPickerProps>`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-direction: column;
  justify-content: center;
  ${(props) => props.boxShadow};
  ${(props) => props.background};
  ${(props) => props.color};
  ${(props) => props.padding};
  ${(props) => props.margin};
  transition: transform 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: scale(1.02);
  }
`;

const SelectorContainer = styled.div<ColorPickerProps>`
  padding-top: 200px;
`;
