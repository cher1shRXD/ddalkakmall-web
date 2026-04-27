"use server";

import { redirect } from "next/navigation";
import { UserApi } from "@/entities/user/api";
import { cookies } from "next/headers";

export async function logout() {
  await UserApi.logout();
  const cookieStore = await cookies();
  cookieStore.delete("refresh_token");
  cookieStore.delete("access_token");
  redirect("/");
}
