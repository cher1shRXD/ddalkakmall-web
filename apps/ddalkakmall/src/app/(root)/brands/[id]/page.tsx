import AiChat from "@/features/ask-brand-ai/ui/AiChat";
import { PageUrlProps } from "@/shared/types/page-props";
import Header from "@/widgets/header/ui/Header";
import BrandSettings from "@/features/edit-brand-settings/ui/BrandSettings";
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
          onError={<Header.Skeleton />}
        >
          <Header id={id} />
        </FetchBoundary>
        <div className="flex-1" />
        <AiChat />
      </div>
      <FetchBoundary
        onPending={<BrandSettings.Skeleton />}
        onError={<BrandSettings.Skeleton />}
      >
        <BrandSettings id={id} />
      </FetchBoundary>
    </div>
  );
}
