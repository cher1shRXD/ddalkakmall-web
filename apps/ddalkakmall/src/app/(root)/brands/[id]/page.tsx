import AiChat from "@/features/brand-chat/ui/AiChat";

export default function BrandDetailPage() {
  return (
    <div className="flex h-screen">
      <div className="flex-1">
        <AiChat />
      </div>
      <aside className="w-200 border-l border-border shrink-0" />
    </div>
  );
}
