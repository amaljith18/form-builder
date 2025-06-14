/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FormDefinition, FormField } from "@/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Textarea } from "./ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField as FormFieldComponent,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

export function FormRenderer({
  formDefinition,
}: {
  formDefinition: FormDefinition;
}) {
  const createSchema = () => {
    const schema: Record<string, z.ZodTypeAny> = {};

    formDefinition.fields.forEach((field) => {
      // Create base schema based on field type
      let fieldSchema: z.ZodTypeAny;
      switch (field.type) {
        case "text":
        case "textarea":
          fieldSchema = z.string();
          break;
        case "number":
          fieldSchema = z.number();
          break;
        case "email":
          fieldSchema = z.string().email();
          break;
        case "date":
          fieldSchema = z.string(); // or z.date() if you parse it
          break;
        case "checkbox":
          fieldSchema = z.boolean();
          break;
        case "select":
        case "radio":
          fieldSchema = z.string();
          break;
        default:
          fieldSchema = z.string();
      }

      // Apply validation rules
      field.validationRules?.forEach((rule) => {
        const isStringSchema = fieldSchema._def.typeName === "ZodString";
        const isNumberSchema = fieldSchema._def.typeName === "ZodNumber";

        if (rule.type === "required") {
          fieldSchema = fieldSchema.refine(
            (val) => {
              if (val === null || val === undefined) return false;
              if (typeof val === "string" && val.trim() === "") return false;
              return true;
            },
            { message: rule.message }
          );
        } else if (isStringSchema) {
          const stringSchema = fieldSchema as z.ZodString;
          if (rule.type === "minLength" && typeof rule.value === "number") {
            fieldSchema = stringSchema.min(rule.value, {
              message: rule.message,
            });
          } else if (
            rule.type === "maxLength" &&
            typeof rule.value === "number"
          ) {
            fieldSchema = stringSchema.max(rule.value, {
              message: rule.message,
            });
          } else if (
            rule.type === "pattern" &&
            typeof rule.value === "string"
          ) {
            fieldSchema = stringSchema.regex(
              new RegExp(rule.value),
              rule.message
            );
          }
        } else if (isNumberSchema) {
          const numberSchema = fieldSchema as z.ZodNumber;
          const numericValue =
            typeof rule.value === "string"
              ? parseFloat(rule.value)
              : rule.value;

          if (typeof numericValue !== "number" || isNaN(numericValue)) {
            return; // Skip invalid numeric rules
          }

          if (rule.type === "min") {
            fieldSchema = numberSchema.min(numericValue, {
              message: rule.message,
            });
          } else if (rule.type === "max") {
            fieldSchema = numberSchema.max(numericValue, {
              message: rule.message,
            });
          } else if (rule.type === "greaterThan") {
            fieldSchema = numberSchema.refine((val) => val > numericValue, {
              message: rule.message,
            });
          } else if (rule.type === "lessThan") {
            fieldSchema = numberSchema.refine((val) => val < numericValue, {
              message: rule.message,
            });
          }
        }
      });

      schema[field.id] = fieldSchema;
    });

    return z.object(schema);
  };

  const formSchema = createSchema();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("Form submitted:", data);
  };

  const renderField = (field: FormField) => {
    switch (field.type) {
      case "text":
      case "email":
      case "number":
      case "date":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Input
                    type={field.type}
                    placeholder={field.placeholder}
                    {...formField}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "textarea":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  <Textarea placeholder={field.placeholder} {...formField} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "select":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  defaultValue={formField.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={field.placeholder || "Select an option"}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "checkbox":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={formField.value}
                    onCheckedChange={formField.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>{field.label}</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      case "radio":
        return (
          <FormFieldComponent
            key={field.id}
            control={form.control}
            name={field.id}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <div className="space-y-2">
                  {field.options?.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`${field.id}-${option}`}
                        value={option}
                        checked={formField.value === option}
                        onChange={() => formField.onChange(option)}
                        className="h-4 w-4 text-primary"
                      />
                      <Label htmlFor={`${field.id}-${option}`}>{option}</Label>
                    </div>
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <h2 className="text-2xl font-bold">{formDefinition.title}</h2>
        {formDefinition.description && (
          <p className="text-muted-foreground">{formDefinition.description}</p>
        )}

        <div className="space-y-4">
          {formDefinition.fields.map((field) => renderField(field))}
        </div>

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
