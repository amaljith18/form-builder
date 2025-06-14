// src/app/forms/page.tsx
"use client";

import { useEffect, useState } from "react";
import { FormDefinition } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

export default function FormsPage() {
  const [forms, setForms] = useState<FormDefinition[]>([]);

  useEffect(() => {
    // you can fetch from api i just hardcoded the data curretly
    const mockForms: FormDefinition[] = [
      {
        id: "1",
        title: "Customer Feedback",
        description: "Collect feedback from our customers",
        fields: [
          { id: "name", label: "Name", type: "text" },
          { id: "email", label: "Email", type: "email" },
          {
            id: "rating",
            label: "Rating",
            type: "select",
            options: ["1", "2", "3", "4", "5"],
          },
          { id: "comments", label: "Comments", type: "textarea" },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "2",
        title: "Event Registration",
        description: "Register for upcoming events",
        fields: [
          { id: "fullName", label: "Full Name", type: "text" },
          { id: "company", label: "Company", type: "text" },
          { id: "email", label: "Email", type: "email" },
          {
            id: "event",
            label: "Event",
            type: "select",
            options: ["Conference", "Workshop", "Networking"],
          },
        ],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    setForms(mockForms);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Forms</h1>
        <Link href="/builder">
          <Button>Create New Form</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {forms.map((form) => (
          <Card key={form.id}>
            <CardHeader>
              <CardTitle>{form.title}</CardTitle>
              <CardDescription>{form.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {form.fields.length} fields
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/forms/${form.id}`}>
                <Button variant="outline">View</Button>
              </Link>
              <Link href={`/builder?edit=${form.id}`}>
                <Button variant="secondary">Edit</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
