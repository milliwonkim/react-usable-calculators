import styled from "@emotion/styled";
import { colors, spaces } from "../tokens/tokens";
import { forwardRef } from "react";
import { FormElementProps } from "../types/form";
import { FormInput } from "./FormInput";

const FormElement = forwardRef<FormElementProps, any>(
  ({ label, isError, helperText, ...rest }, ref) => {
    if (rest && rest.type === "select") {
      return (
        <>
          <FormBox>
            <FormLabel>{label}</FormLabel>
            <FormSelect ref={ref} {...rest}>
              {rest && rest.children}
            </FormSelect>
          </FormBox>
          <FormHelperText>{helperText}</FormHelperText>
        </>
      );
    }
    return (
      <>
        <FormBox>
          <FormLabel>{label}</FormLabel>
          <div>
            <FormInput isError={isError} ref={ref} {...rest} />
          </div>
        </FormBox>
        <FormHelperText>{helperText}</FormHelperText>
      </>
    );
  }
);

export default FormElement;

const FormBox = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-start;
  flex-direction: column;
`;

const FormLabel = styled.div`
  min-width: ${spaces.space_160};
`;

const FormSelect = styled.select<FormElementProps>`
  border-radius: ${spaces.space_8};
  border: 1px solid ${({ isError }) => (isError ? colors.red_1 : colors.grey_1)};
  padding: ${spaces.space_8};
  min-width: 200px;
`;

const FormHelperText = styled.p`
  font-size: 8px;
`;
