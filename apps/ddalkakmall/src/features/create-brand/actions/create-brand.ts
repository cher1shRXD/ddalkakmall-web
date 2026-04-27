"use server";

import { BrandApi } from "@/entities/brand/api";
import { UserApi } from "@/entities/user/api";

export async function createBrand(name: string) {
  const user = await UserApi.getMe();
  if (!user.phone) throw new Error("전화번호를 등록해주세요.");
  return await BrandApi.create({ name, phone: user.phone });
}
