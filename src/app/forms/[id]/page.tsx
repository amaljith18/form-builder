// src/app/forms/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FormDefinition } from "@/types";
import { FormRenderer } from "@/components/FormRenderer";

export default function FormPage() {
  const params = useParams();
  const [formDefinition, setFormDefinition] = useState<FormDefinition | null>(
    null
  );

  useEffect(() => {
    // you can fetch from api currently i just hardcoded the data
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

    const form = mockForms.find((f) => f.id === params.id);
    if (form) {
      setFormDefinition(form);
    }
  }, [params.id]);

  if (!formDefinition) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <FormRenderer formDefinition={formDefinition} />
    </div>
  );
}
