import styled from "@emotion/styled";
import { FormElementProps } from "../types/form";
import { colors, spaces } from "../tokens/tokens";

export const FormInput = styled.input<FormElementProps>`
  border-radius: ${spaces.space_8};
  border: 1px solid ${({ isError }) => (isError ? colors.red_1 : colors.grey_1)};
  padding: ${spaces.space_16};
  font-size: ${spaces.space_16};
  min-width: 180px;
`;
