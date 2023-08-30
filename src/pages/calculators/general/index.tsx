import Accordians from "@/components/Accordians";
import { boxShadows, colors, spaces } from "@/tokens/tokens";
import styled from "@emotion/styled";
import { Box, Input } from "@mui/material";
import React, { FormEvent, useState } from "react";

const GeneralCalculatorPage = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState(0);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!input || !Boolean(eval(input))) {
        window.alert("잘못된 입력값입니다.");
      } else {
        setAnswer(eval(input));
      }
    } catch (err: any) {
      window.alert(err.message);
    }
  };
  return (
    <>
      <Accordians defaultExpanded title="계산하기">
        <form onSubmit={handleSubmit}>
          답: {answer}
          <Input
            style={{ marginBottom: "16px" }}
            fullWidth
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
          <Box display="flex" gap="16px">
            <Buttons
              type="button"
              background={colors.grey_1}
              onClick={() => setInput("")}
            >
              모두 지우기
            </Buttons>
            <Buttons type="submit">계산하기</Buttons>
          </Box>
        </form>
      </Accordians>
      <Accordians defaultExpanded title="예시">
        <>
          답: 20
          <Input
            readOnly
            style={{ marginBottom: "16px" }}
            fullWidth
            value={"4*5"}
          />
        </>
        <>
          답: 30
          <Input
            readOnly
            style={{ marginBottom: "16px" }}
            fullWidth
            value={"(2 * 10) + 16"}
          />
        </>
      </Accordians>
    </>
  );
};

export default GeneralCalculatorPage;

const Buttons = styled.button<{ [key: string]: any }>`
  cursor: pointer;
  display: inline-block;
  width: 100%;
  background: ${(props) => props.background || colors.skyblue_1};
  border-radius: ${spaces.space_8};
  border: transparent;
  padding: ${spaces.space_16};
  color: ${colors.white_1};
  font-size: ${spaces.space_14};
  box-shadow: ${boxShadows.type_1};

  &:hover {
    background: ${colors.white_1};
    color: ${colors.skyblue_1};
  }
`;
