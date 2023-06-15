import { ComponentProps } from "react";

export interface FormElementProps extends ComponentProps<"input"> {
  label?: string;
  isError?: boolean;
  helperText?: string;
}
