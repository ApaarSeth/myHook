import { useState } from "react";

export type validation = {
  max?: number;
  min?: number;
  pattern?: string;
  required?: boolean;
  custom?: any;
  requiredErrorMessage?: string;
  minErrorMessage?: string;
  maxErrorMessage?: string;
  minMaxErrorMessage?: string;
  patternErrorMessage?: string;
  customErrorMessage?: string;
};
const useFormHook = (name: string, validation?: validation) => {
  const [err, setError] = useState("");
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);

  const checkValidation = (val: any) => {
    let errorMessage = "";
    if (validation && Object.keys(validation).length) {
      if (validation.required) {
        if (!val.length) {
          errorMessage = validation.requiredErrorMessage
            ? validation.requiredErrorMessage
            : `${name} is required`;
          return errorMessage;
        }
      }
      if (validation.max && validation.min) {
        if (
          val.length > Number(validation.max) ||
          val.length < Number(validation.min)
        ) {
          errorMessage = validation.minMaxErrorMessage
            ? validation.minMaxErrorMessage
            : `${name} should lie between ${validation.min} to ${validation.max} characters`;
          return errorMessage;
        }
      }

      if (validation.max) {
        if (val.length > Number(validation.max)) {
          errorMessage = validation.maxErrorMessage
            ? validation.maxErrorMessage
            : `${name} should not exceed ${validation.max}`;
          return errorMessage;
        }
      }

      if (validation.min) {
        if (val.length < Number(validation.min)) {
          errorMessage = validation.minErrorMessage
            ? validation.minErrorMessage
            : `${name} should not be less than ${validation.min}`;
          return errorMessage;
        }
      }

      if (validation.pattern) {
        const reg = new RegExp(validation.pattern, "g");
        if (reg.test(val)) {
          errorMessage = validation.patternErrorMessage
            ? validation.patternErrorMessage
            : `${name} is invalid`;
          return errorMessage;
        }
      }

      if (validation.custom) {
        const error = validation.custom(val);
        if (error) {
          return validation.customErrorMessage
            ? validation.customErrorMessage
            : `${name} is invalid`;
        }
      }
      return null;
    }
    return null;
  };

  const valueChangeHandler = (val: any, customValidation?: any) => {
    setTouched(true);
    let validationCheck = null;
    if (customValidation) {
      validationCheck = customValidation();
    } else {
      validationCheck = checkValidation(val);
    }
    if (validationCheck) {
      setError(validationCheck);
    } else {
      setValue(val);
      setError("");
    }
  };

  return {
    err,
    value,
    touched,
    valueChangeHandler,
  };
};

export default useFormHook;
