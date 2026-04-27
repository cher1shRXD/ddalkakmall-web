import { apiClient } from "@/shared/libs/api-client"
import { User } from "./types"

export const UserApi = {
  async getMe() {
    return await apiClient.get<User>("/users/me").withCookie();
  },
  
  async logout() {
    return await apiClient.post("/auth/logout").withCookie();
  }
}