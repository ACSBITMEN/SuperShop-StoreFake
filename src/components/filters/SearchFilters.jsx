// src/components/filters/SearchFilters.jsx
// Este componente muestra los controles para aplicar filtros.

import { useState, useEffect } from "react";

export default function SearchFilters({ categories, searchParams, setSearchParams }) {
  // Estados iniciales a partir de la URL
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [selectedCategories, setSelectedCategories] = useState(searchParams.getAll("category"));
  const [min, setMin] = useState(searchParams.get("min") || "");
  const [max, setMax] = useState(searchParams.get("max") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "");

  // Sincronizar con cambios de URL (por ejemplo, al compartir un link)
  useEffect(() => {
    setQuery(searchParams.get("query") || "");
    setSelectedCategories(searchParams.getAll("category"));
    setMin(searchParams.get("min") || "");
    setMax(searchParams.get("max") || "");
    setSort(searchParams.get("sort") || "");
  }, [searchParams]);

  // Diccionario de traducciones de categorías
  const categoryLabels = {
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "men's clothing": "Ropa de hombre",
    "women's clothing": "Ropa de mujer",
  };

  // 🔄 Actualizar URL con los filtros activos
  const updateParams = (newFilters) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        params.delete(key); // limpiar primero
        value.forEach((v) => params.append(key, v));
      } else if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  // 📝 Handlers
  const handleCategoryChange = (cat) => {
    let updated = [...selectedCategories];
    if (updated.includes(cat)) {
      updated = updated.filter((c) => c !== cat);
    } else {
      updated.push(cat);
    }
    setSelectedCategories(updated);
    updateParams({ category: updated });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParams({ query });
  };

  const handlePriceChange = () => {
    updateParams({ min, max });
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    updateParams({ sort: e.target.value });
  };

  return (
  <div className="mb-6 p-4 border rounded-md bg-gray-50 shadow-sm">
      <h2 className="font-semibold mb-3 text-lg">Filtros</h2>

      {/* 🔹 Usamos flex-wrap para que los filtros se organicen bien */}
      <div className="flex flex-wrap gap-4 items-end">

        {/* 🔎 Búsqueda */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 flex-grow max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            className="flex-1 border rounded-md px-3 py-2 h-10"
          />
          <button
            type="submit"
            className="bg-amber-500 text-white px-4 rounded-md h-10 hover:bg-amber-600"
          >
            Buscar
          </button>
        </form>

                {/* 💰 Rango de precios */}
        <div className="flex gap-2 min-w-[180px]">
          <div className="flex flex-col">
            <label className="text-sm font-medium">Valor Mín</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              placeholder="0"
              className="w-20 border rounded-md px-2 py-1 h-10"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm font-medium">Valor Máx</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              placeholder="∞"
              className="w-20 border rounded-md px-2 py-1 h-10"
            />
          </div>
          <button
            onClick={handlePriceChange}
            className="bg-amber-500 text-white px-3 rounded-md h-10 self-end hover:bg-amber-600"
          >
            OK
          </button>
        </div>

        {/* ↕️ Ordenamiento */}
        <div className="flex flex-row items-center min-w-[150px]">
          <label className="text-sm font-medium pr-1">Ordenar Precio</label>
          <select
            value={sort}
            onChange={handleSortChange}
            className="border rounded-md px-2 py-2 h-10"
          >
            <option value="">-- Seleccionar --</option>
            <option value="price_asc">menor a mayor</option>
            <option value="price_desc">mayor a menor</option>
          </select>
        </div>

        {/* ✅ Categorías */}
        <div className="flex flex-col min-w-[180px]">
          <p className="font-medium text-sm mb-1">Categorías</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-1 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                />
                {categoryLabels[cat] || cat} {/* 👈 muestra español, pero mantiene el valor inglés */}
              </label>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}




{/* 

  SearchFilters.jsx (componente UI de filtros)

Responsabilidad: UI para modificar los filtros.

Input de búsqueda.

Checkboxes de categorías.

Inputs de rango de precios.

Selector de ordenamiento.

Cuando el usuario interactúe, actualiza los query params en la URL (setSearchParams).

 */}