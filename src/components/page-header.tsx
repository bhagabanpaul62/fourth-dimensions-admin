import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusCircle } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

export function PageHeader({ title, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

export function PageHeaderAction({ label, href }: { label: string; href: string }) {
  return (
    <Button asChild>
      <Link href={href}>
        <PlusCircle className="mr-2 h-4 w-4" />
        {label}
      </Link>
    </Button>
  );
}
