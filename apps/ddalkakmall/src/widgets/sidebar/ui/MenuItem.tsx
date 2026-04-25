"use client";

import { Link } from "@cher1shrxd/loading";
import { ReactNode } from "react";

interface Props {
  label: string;
  href: string;
  icon: ReactNode;
}

const MenuItem = ({ label, href, icon }: Props) => {
  return (
    <Link href={href} className="cursor-pointer flex items-center gap-2 hover:bg-surface-2 p-1 rounded-lg">
      <div className="p-1.5 rounded-full bg-surface-4">
        {icon}
      </div>
      <span className="text-foreground">{label}</span>
    </Link>
  );
};

export default MenuItem;
