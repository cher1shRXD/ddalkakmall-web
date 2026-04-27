import { apiClient } from "@/shared/libs/api-client"
import { User } from "./types"
import { UpdateProfileRequest } from "./dto"

export const UserApi = {
  async getMe() {
    return await apiClient.get<User>("/users/me").withCookie();
  },

  async updateProfile(payload: UpdateProfileRequest) {
    return await apiClient.patch<User>("/users/me/profile", payload).withCookie();
  },

  async logout() {
    return await apiClient.post("/auth/logout").withCookie();
  }
}