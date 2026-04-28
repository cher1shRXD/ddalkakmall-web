import AiChat from "@/features/brand-chat/ui/AiChat";
import { PageUrlProps } from "@/shared/types/page-props";
import Header from "@/widgets/header/ui/Header";
import BrandSettings from "@/widgets/brand-settings/ui/BrandSettings";
import FetchBoundary from "@/shared/ui/FetchBoundary";
import { redirect } from "next/navigation";

export default async function BrandDetailPage({ params }: PageUrlProps) {
  const { id } = await params;

  if (!id) redirect("/");

  return (
    <div className="flex h-screen">
      <div className="flex-1 flex flex-col min-w-0">
        <FetchBoundary
          onPending={<Header.Skeleton />}
          onError={<p className="text-sm text-danger">브랜드 정보를 불러올 수 없어요.</p>}
        >
          <Header id={id} />
        </FetchBoundary>
        <div className="flex-1" />
        <AiChat />
      </div>
      <FetchBoundary
        onPending={<BrandSettings.Skeleton />}
        onError={
          <aside className="w-200 border-l border-border shrink-0 h-screen flex items-center justify-center">
            <p className="text-sm text-danger">설정을 불러올 수 없어요.</p>
          </aside>
        }
      >
        <BrandSettings id={id} />
      </FetchBoundary>
    </div>
  );
}
