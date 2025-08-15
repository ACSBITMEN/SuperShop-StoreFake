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

// Obtener todas las categorías
export const getCategories = async () => {
  const response = await api.get("/products/categories");
  return response.data; // Devuelve un array de strings con las categorías
};

// Obtener productos por categoría (sin uso momentaneo)
export const getProductsByCategory = async (category) => {
  const response = await api.get(`/products/category/${encodeURIComponent(category)}`);
  const products = response.data;
  
  // Normalizar URLs de imágenes
  const normalizedProducts = products.map(product => ({
    ...product,
    image: product.image.replace(/\.jpg$/, 't.png')
  }));
  
  return normalizedProducts;
};

// Exportar todas las funciones
export default {
  getProducts,
  getProductById,
  getCategories,
  getProductsByCategory
};