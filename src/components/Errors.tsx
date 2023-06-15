import styled from "@emotion/styled";
import React from "react";
import { colors, spaces } from "../tokens/tokens";

interface ErrorsProps {
  messages?: (string | undefined)[];
}

const Errors = ({ messages }: ErrorsProps) => {
  if (!messages || messages.length === 0 || messages.every((el) => !el))
    return null;
  return (
    <ErrorContainer>
      {messages.map((message) => {
        if (!message) return null;
        return <div key={message}>- {message}</div>;
      })}
    </ErrorContainer>
  );
};

export default Errors;

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spaces.space_16};
  //   overflow: auto;
  height: 100%;
  color: ${colors.red_1};
`;
