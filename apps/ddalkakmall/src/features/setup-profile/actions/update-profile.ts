"use server";

import { redirect } from "next/navigation";
import { UserApi } from "@/entities/user/api";
import type { UpdateProfileRequest } from "@/entities/user/dto";

export async function updateProfile(formData: FormData) {
  const payload: UpdateProfileRequest = {
    phone: formData.get("phone") as string,
    zipcode: formData.get("zipcode") as string,
    address: formData.get("address") as string,
    addressDetail: formData.get("addressDetail") as string,
  };

  if (!payload.phone || !payload.zipcode || !payload.address) {
    throw new Error("필수 항목을 모두 입력해주세요.");
  }

  await UserApi.updateProfile(payload);
  redirect("/");
}
