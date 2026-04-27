import Complete from "@/features/create-brand/ui/Complete";
import { PageUrlProps } from "@/shared/types/page-props";

export default async function CompletePage({ searchParams }: PageUrlProps) {
  const params = await searchParams;

  return (
    <Complete
      payState={params.pay_state}
      brandName={params.var2}
      brandId={params.var3}
    />
  );
}
