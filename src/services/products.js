// src/services/products.js
import api from "./api";

// Obtener todos los productos
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data; // Devuelve el array de productos
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data; // Devuelve un solo producto
};
