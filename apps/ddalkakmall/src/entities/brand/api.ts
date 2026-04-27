import { apiClient } from "@/shared/libs/api-client";
import { Brand } from "./types";
import { CreateBrandRequest } from "./dto";

export const BrandApi = {
  async getAll() {
    return await apiClient.get<Brand[]>("/brands").withCookie();
  },

  async getById(id: string) {
    return await apiClient.get<Brand>(`/brands/${id}`).withCookie();
  },

  async create(payload: CreateBrandRequest) {
    return await apiClient.post<Brand>("/brands", payload).withCookie();
  },
};
