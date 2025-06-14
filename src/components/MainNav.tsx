// src/components/MainNav.tsx
import Link from "next/link";
import { Button } from "./ui/button";

export function MainNav() {
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link href="/" className="text-lg font-bold">
        Form Builder
      </Link>
      <Link href="/forms">
        <Button variant="ghost">Forms</Button>
      </Link>
      <Link href="/builder">
        <Button variant="ghost">Builder</Button>
      </Link>
    </nav>
  );
}
