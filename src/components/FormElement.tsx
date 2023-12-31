import styled from "@emotion/styled";
import { colors, spaces } from "../tokens/tokens";
import { forwardRef } from "react";
import { FormElementProps } from "../types/form";
import { FormInput } from "./FormInput";
import { FormControl, Select } from "@mui/material";

const FormElement = forwardRef<FormElementProps, any>(
  ({ label, isError, helperText, ...rest }, ref) => {
    if (rest && rest.type === "select") {
      return (
        <>
          <FormBox>
            <FormControl fullWidth>
              <FormLabel>{label}</FormLabel>
              <Select ref={ref} {...rest}>
                {rest && rest.children}
              </Select>
            </FormControl>
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
  margin: 0 0 ${spaces.space_16} 0;
`;

const FormHelperText = styled.p`
  font-size: ${spaces.space_12};
  color: ${colors.grey_1};
`;
