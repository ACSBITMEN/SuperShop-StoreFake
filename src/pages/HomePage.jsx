// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { getProducts, getCategories, getProductsByCategory } from "../services/products";
import ProductsList from "../features/products/ProductsList";
import Carousel from "../components/Carousel";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar categorías
  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (err) {
        setError("Error al cargar categorías");
      } finally {
        setIsLoading(false);
      }
    };
    loadCategories();
  }, []);

  // Cargar productos según categoría
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const productsData =
          selectedCategory === "all"
            ? await getProducts()
            : await getProductsByCategory(selectedCategory);

        setProducts(productsData);
      } catch (err) {
        setError("Error al cargar productos");
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };
    loadProducts();
  }, [selectedCategory]);

  const formatCategoryName = (category) => {
    return category.replace(/\b\w/g, (l) => l.toUpperCase()).replace(/-/g, " ");
  };

  return (
    <div className="p-4">

      <Carousel />

      <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading && <p className="text-blue-500 mb-4">Cargando...</p>}

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 mb-4 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={isLoading}
      >
        <option value="all">Todas las categorías</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {formatCategoryName(cat)}
          </option>
        ))}
      </select>

      {!isLoading && <ProductsList products={products} />}
    </div>
  );
}
