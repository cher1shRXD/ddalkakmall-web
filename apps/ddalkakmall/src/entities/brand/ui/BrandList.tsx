import { Store } from "lucide-react";
import { BrandApi } from "../api";
import MenuItem from "@/widgets/sidebar/ui/MenuItem";

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

export default BrandList;
