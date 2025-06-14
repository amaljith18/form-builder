"use client";

import { useState } from "react";
import { FormDefinition, FormField } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FieldEditor } from "@/components/FieldEditor";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function FormBuilder() {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState<FormField[]>([]);
  const [editingField, setEditingField] = useState<FormField | null>(null);
  const [isAddingField, setIsAddingField] = useState(false);

  const handleAddField = () => {
    setIsAddingField(true);
  };

  const handleSaveField = (field: FormField) => {
    if (editingField) {
      setFields(fields.map((f) => (f.id === field.id ? field : f)));
    } else {
      setFields([...fields, field]);
    }
    setEditingField(null);
    setIsAddingField(false);
  };

  const handleEditField = (field: FormField) => {
    setEditingField(field);
  };

  const handleRemoveField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const saveForm = () => {
    const formDefinition: FormDefinition = {
      id: Date.now().toString(),
      title: formTitle,
      description: formDescription,
      fields,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    console.log("Form saved:", formDefinition);
  };

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Form</CardTitle>
          <CardDescription>
            Build your custom data collection form
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Form Title</label>
            <Input
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="Enter form title"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Form Description
            </label>
            <Input
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              placeholder="Enter form description"
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Form Fields</h3>
              <Button onClick={handleAddField}>Add Field</Button>
            </div>

            {isAddingField && !editingField && (
              <FieldEditor
                onSave={handleSaveField}
                onCancel={() => setIsAddingField(false)}
              />
            )}

            {editingField && (
              <FieldEditor
                field={editingField}
                onSave={handleSaveField}
                onCancel={() => setEditingField(null)}
              />
            )}

            <div className="space-y-2">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className="flex items-center justify-between p-3 border rounded"
                >
                  <div>
                    <span className="font-medium">{field.label}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({field.type})
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditField(field)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveField(field.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <Button onClick={saveForm}>Save Form</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
