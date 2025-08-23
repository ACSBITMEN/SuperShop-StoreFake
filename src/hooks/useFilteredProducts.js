// src/hooks/useFilteredProducts.js

export default function useFilteredProducts(products, searchParams) {
  let filtered = [...products];

  // 1. Filtro por texto (query)
  const query = searchParams.get("query") || "";
  if (query) {
    filtered = filtered.filter((p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  // 2. Filtro por categoría (puede haber varias)
  const categories = searchParams.getAll("category"); 
  if (categories.length > 0) {
    filtered = filtered.filter((p) => categories.includes(p.category));
  }

  // 3. Filtro por rango de precios
  const min = parseFloat(searchParams.get("min"));
  const max = parseFloat(searchParams.get("max"));

  if (!isNaN(min)) {
    filtered = filtered.filter((p) => p.price >= min);
  }
  if (!isNaN(max)) {
    filtered = filtered.filter((p) => p.price <= max);
  }

  // 4. Ordenamiento
  const sort = searchParams.get("sort");
  if (sort === "price_asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price_desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
}


{/* 
  
📄 useFilteredProducts.js (hook de lógica)

Responsabilidad: encapsular la lógica de filtrado.

Recibe: products (todos) + searchParams (filtros).

Devuelve: filteredProducts.

Aquí se implementa:

Coincidencia por texto.

Categorías múltiples.

Rango de precios.

Ordenamiento.

Así SearchPage.jsx se mantiene limpio y fácil de leer.

 */}