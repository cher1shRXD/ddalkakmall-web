import CreateBrandFlow from "@/features/create-brand/ui";

export default async function CreatePage() {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return <CreateBrandFlow />;
}
