// src/pages/HomePage.jsx
import { useState, useEffect } from "react";
import { getProducts, getCategories } from "../services/products"; // Eliminamos getProductsByCategory
import { Link } from "react-router-dom";

export default function HomePage() {
  const [allProducts, setAllProducts] = useState([]); // Nuevo estado para todos los productos
  const [filteredProducts, setFilteredProducts] = useState([]); // Productos filtrados
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar datos iniciales (solo una vez)
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Cargamos categorías y productos en paralelo
        const [categoriesData, productsData] = await Promise.all([
          getCategories(),
          getProducts() // Solo hacemos esta llamada inicial
        ]);
        
        setCategories(categoriesData);
        setAllProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        setError("Error al cargar datos iniciales");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialData();
  }, []);

  // Filtramos productos localmente cuando cambia la categoría
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        product => product.category === selectedCategory
      );
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, allProducts]);

  // Función para formatear el nombre de la categoría (se mantiene igual)
  const formatCategoryName = (category) => {
    return category.replace(/\b\w/g, l => l.toUpperCase()).replace(/-/g, ' ');
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>

      {/* Mensajes de estado (se mantiene igual) */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoading && <p className="text-blue-500 mb-4">Cargando...</p>}

      {/* Selector de categorías (se mantiene igual) */}
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

      {/* Lista de productos (cambiamos products por filteredProducts) */}
      {!isLoading && filteredProducts.length === 0 && !error && (
        <p>No se encontraron productos</p>
      )}
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-contain mb-6"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300x300?text=No+Image';
              }}
            />
            <h3 className="font-semibold">{product.title}</h3>
            <p className="text-gray-600">${product.price}</p>
            <p className="text-sm text-gray-500 mt-2">
              {product.category}
            </p>
            <Link
              to={`/product/${product.id}`}
              className="block mt-3 text-blue-500 hover:underline"
              > Ver detalles
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}