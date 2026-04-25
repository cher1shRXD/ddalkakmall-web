import CompleteView from "@/features/create-brand/ui/CompleteView";

interface PageProps {
  searchParams: Promise<Record<string, string | undefined>>;
}

export default async function CompletePage({ searchParams }: PageProps) {
  const params = await searchParams;

  return (
    <CompleteView
      payState={params.pay_state}
      brandName={params.var2}
    />
  );
}
