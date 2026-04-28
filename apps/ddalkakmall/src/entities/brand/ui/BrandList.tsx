import { BrandApi } from "../api";
import MenuItem from "@/widgets/sidebar/ui/MenuItem";
import { Skeleton } from "@ddalkakmall/ui";

const BrandList = async () => {
  const brands = await BrandApi.getAll();

  if (brands.length === 0) {
    return (
      <p className="text-foreground-sub text-sm px-1">생성된 브랜드가 없습니다.</p>
    );
  }

  return (
    <>
      {brands.map((brand) => (
        <MenuItem
          key={brand.id}
          label={brand.name}
          href={`/brands/${brand.id}`}
          icon={<></>}
        />
      ))}
    </>
  );
};

BrandList.Skeleton = () => (
  <div className="flex flex-col gap-1.5 px-1">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex items-center gap-2 p-1">
        <Skeleton width={28} height={28} borderRadius="9999px" />
        <Skeleton height={14} borderRadius="6px" />
      </div>
    ))}
  </div>
);

export default BrandList;
