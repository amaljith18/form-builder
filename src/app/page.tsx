import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Form Builder</h1>
      <p className="text-lg mb-8">
        Create custom data collection forms with complete control over structure
        and validation.
      </p>
      <div className="flex gap-4 justify-center">
        <Link href="/builder">
          <Button>Create a Form</Button>
        </Link>
        <Link href="/forms">
          <Button variant="outline">View Forms</Button>
        </Link>
      </div>
    </div>
  );
}
