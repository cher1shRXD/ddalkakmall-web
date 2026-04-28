import Complete from "@/features/create-brand/ui/Complete";
import { BrandApi } from "@/entities/brand/api";
import { UserApi } from "@/entities/user/api";
import { PageUrlProps } from "@/shared/types/page-props";

export default async function CompletePage({ searchParams }: PageUrlProps) {
  const params = await searchParams;
  const isSuccess = params.pay_state === "4";
  const brandName = params.var2;

  let brandId: string | undefined;
  if (isSuccess && brandName) {
    try {
      const user = await UserApi.getMe();
      const brand = await BrandApi.create({ name: brandName, phone: user.phone! });
      brandId = brand.id;
    } catch {
      // 브랜드 생성 실패 시 complete 페이지는 정상 표시, 상세 이동만 불가
    }
  }

  return (
    <Complete
      payState={params.pay_state}
      brandName={brandName}
      brandId={brandId}
    />
  );
}
