import api from "./api";

export const getAdminProducts = (params) =>
  api.get("/admin/products", { params });

export const createProduct = (data) =>
  api.post("/admin/products", data);

export const updateProduct = (id, data) =>
  api.put(`/admin/products/${id}`, data);

export const toggleProduct = (id) =>
  api.patch(`/admin/products/${id}/toggle`);
