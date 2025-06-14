/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { FieldType, FormField, ValidationRule } from "@/types";
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

export function FieldEditor({
  field,
  onSave,
  onCancel,
}: {
  field?: FormField;
  onSave: (field: FormField) => void;
  onCancel: () => void;
}) {
  const [label, setLabel] = useState(field?.label || "");
  const [type, setType] = useState<FieldType>(field?.type || "text");
  const [placeholder, setPlaceholder] = useState(field?.placeholder || "");
  const [options, setOptions] = useState(field?.options?.join(", ") || "");
  const [validationRules, setValidationRules] = useState<ValidationRule[]>(
    field?.validationRules || []
  );
  const [newRuleType, setNewRuleType] = useState<string>("");
  const [newRuleValue, setNewRuleValue] = useState<string>("");

  const handleSave = () => {
    const newField: FormField = {
      id: field?.id || Date.now().toString(),
      label,
      type,
      placeholder,
      options:
        type === "select" || type === "radio"
          ? options.split(",").map((o) => o.trim())
          : undefined,
      validationRules,
    };
    onSave(newField);
  };

  const addValidationRule = () => {
    if (newRuleType && newRuleValue) {
      setValidationRules([
        ...validationRules,
        { type: newRuleType as any, value: newRuleValue },
      ]);
      setNewRuleType("");
      setNewRuleValue("");
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div>
        <Label>Field Label</Label>
        <Input value={label} onChange={(e) => setLabel(e.target.value)} />
      </div>

      <div>
        <Label>Field Type</Label>
        <Select
          value={type}
          onValueChange={(value) => setType(value as FieldType)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select field type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="select">Dropdown</SelectItem>
            <SelectItem value="checkbox">Checkbox</SelectItem>
            <SelectItem value="radio">Radio Buttons</SelectItem>
            <SelectItem value="textarea">Text Area</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {(type === "text" ||
        type === "email" ||
        type === "number" ||
        type === "textarea") && (
        <div>
          <Label>Placeholder</Label>
          <Input
            value={placeholder}
            onChange={(e) => setPlaceholder(e.target.value)}
          />
        </div>
      )}

      {(type === "select" || type === "radio") && (
        <div>
          <Label>Options (comma separated)</Label>
          <Input value={options} onChange={(e) => setOptions(e.target.value)} />
        </div>
      )}

      <div className="space-y-2">
        <Label>Validation Rules</Label>
        <div className="flex gap-2">
          <Select
            value={newRuleType}
            onValueChange={(value) => setNewRuleType(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select rule" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="required">Required</SelectItem>
              <SelectItem value="min">Minimum</SelectItem>
              <SelectItem value="max">Maximum</SelectItem>
              {type === "number" && (
                <>
                  <SelectItem value="greaterThan">Greater Than</SelectItem>
                  <SelectItem value="lessThan">Less Than</SelectItem>
                </>
              )}
              <SelectItem value="pattern">Pattern</SelectItem>
            </SelectContent>
          </Select>

          {["min", "max", "greaterThan", "lessThan"].includes(newRuleType) && (
            <Input
              type="number"
              placeholder="Value"
              value={newRuleValue}
              onChange={(e) => setNewRuleValue(e.target.value)}
              className="w-[100px]"
            />
          )}

          <Button onClick={addValidationRule}>Add Rule</Button>
        </div>

        {validationRules.length > 0 && (
          <div className="mt-2">
            {validationRules.map((rule, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="text-sm">
                  {rule.type}: {rule.value}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setValidationRules(
                      validationRules.filter((_, i) => i !== index)
                    )
                  }
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={handleSave}>Save</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
