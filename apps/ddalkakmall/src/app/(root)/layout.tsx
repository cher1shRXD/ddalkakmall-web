import Sidebar from "@/widgets/sidebar/ui";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="w-full pl-80">
      <Sidebar />
      <main>{children}</main>
    </div>
  )
}
