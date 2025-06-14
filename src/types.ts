/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types.ts
export type FieldType =
  | "text"
  | "number"
  | "email"
  | "date"
  | "select"
  | "checkbox"
  | "radio"
  | "textarea";

export type ValidationRule = {
  type:
    | "required"
    | "minLength"
    | "maxLength"
    | "pattern"
    | "min"
    | "max"
    | "greaterThan"
    | "lessThan";
  value?: string | number;
  message: string;
};

export interface FormField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
  defaultValue?: any;
  validationRules?: ValidationRule[];
}

export interface FormDefinition {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  createdAt: Date;
  updatedAt: Date;
}
