import { BrandApi } from "@/entities/brand/api";
import { Button, Skeleton } from "@ddalkakmall/ui";
import { Tag } from "@ddalkakmall/ui";

interface Props {
  id: string;
}

const Header = async ({ id }: Props) => {
  const data = await BrandApi.getById(id);

  return (
    <header className="w-full p-4 border-b border-border-sub flex items-center gap-2">
      <h1 className="text-2xl font-semibold">{data.name}</h1>
      <Tag>{data.subscription ? data.subscription.plan : "free"}</Tag>
      <div className="flex-1" />
      <Button>변경사항 적용</Button>
    </header>
  )
}

Header.Skeleton = () => (
  <header className="w-full p-4 border-b border-border-sub flex items-center gap-2">
    <Skeleton width={160} height={28} borderRadius="8px" />
    <Skeleton width={48} height={22} borderRadius="6px" />
    <div className="flex-1" />
    <Skeleton width={100} height={36} borderRadius="8px" />
  </header>
)

export default Header