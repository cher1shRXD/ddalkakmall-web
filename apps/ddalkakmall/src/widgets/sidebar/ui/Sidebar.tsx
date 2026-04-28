import { Plus } from "lucide-react";
import MenuItem from "./MenuItem";
import { Divider } from "@ddalkakmall/ui";
import { Heading } from "@ddalkakmall/ui";
import UserIndicator from "@/entities/user/ui/UserIndicator";
import BrandList from "@/entities/brand/ui/BrandList";
import LogoutButton from "@/features/logout/ui/LogoutButton";
import FetchBoundary from "@/shared/ui/FetchBoundary";
import LoginButton from "@/features/login/ui/LoginButton";

const Sidebar = () => {
  return (
    <aside className="w-80 h-screen border-r border-border bg-surface-1 fixed top-0 left-0 flex flex-col gap-2 p-4">
      <Heading level={1} className="py-3">
        딸깍몰
      </Heading>
      <div className="w-full flex flex-col gap-1">
        <MenuItem
          label="새 브랜드 생성"
          href="/create"
          icon={<Plus size={16} />}
        />
      </div>
      <Divider label="My Brands" />
      <div className="w-full flex-1 overflow-y-auto space-y-1">
        <FetchBoundary
          onPending={<BrandList.Skeleton />}
          onError={<p className="text-foreground-sub text-sm px-1">브랜드를 불러올 수 없어요.</p>}
        >
          <BrandList />
        </FetchBoundary>
      </div>
      <FetchBoundary onPending={<LoginButton />} onError={<LoginButton />}>
        <div className="w-full flex items-center p-2 rounded-xl border border-border bg-surface-2">
          <UserIndicator />
          <LogoutButton />
        </div>
      </FetchBoundary>
    </aside>
  );
};

export default Sidebar;
