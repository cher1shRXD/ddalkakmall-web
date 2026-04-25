import CompleteView from "@/features/create-brand/ui/CompleteView";
import { PageUrlProps } from "@/shared/types/page-props";

export default async function CompletePage({ searchParams }: PageUrlProps) {
  const params = await searchParams;

  return (
    <CompleteView
      payState={params.pay_state}
      brandName={params.var2}
    />
  );
}
