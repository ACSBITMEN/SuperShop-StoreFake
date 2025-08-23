// src/pages/SearchPage.jsx
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts, getCategories } from "../services/products";
import ProductsList from "../features/products/ProductsList";
import SearchFilters from "../components/filters/SearchFilters";
import ActiveFilters from "../components/filters/ActiveFilters";
import useFilteredProducts from "../hooks/useFilteredProducts";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado base
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos y categorías
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [prods, cats] = await Promise.all([
          getProducts(),
          getCategories(),
        ]);
        setProducts(prods);
        setCategories(cats);
      } catch (err) {
        setError("Error al cargar productos o categorías");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Aplicar filtros (hook especializado)
  const filteredProducts = useFilteredProducts(products, searchParams);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Explorar productos</h1>

      {/* Filtros */}
      <SearchFilters
        categories={categories}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {/* Filtros activos */}
      <ActiveFilters
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      {/* Estado de carga o error */}
      {isLoading && <p className="text-blue-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Resultados */}
      {!isLoading && <ProductsList products={filteredProducts} />}
    </div>
  );
}



{/* SearchPage.jsx (página principal)

Responsabilidad: orquestar todo.

Lee los parámetros de la URL (useSearchParams).

Pide los productos (getProducts).

Aplica filtros con el hook useFilteredProducts.

Renderiza SearchFilters (para aplicar filtros), ActiveFilters (para mostrar filtros activos) y ProductsList.

 */}