// src/components/filters/ActiveFilters.jsx
import { X } from "lucide-react";

export default function ActiveFilters({ searchParams, setSearchParams }) {
  const removeFilter = (key, value = null) => {
    const params = new URLSearchParams(searchParams);

    if (value === null) {
      params.delete(key);
    } else {
      const values = params.getAll(key).filter((v) => v !== value);
      params.delete(key);
      values.forEach((v) => params.append(key, v));
    }

    setSearchParams(params);
  };

  const query = searchParams.get("query");
  const categories = searchParams.getAll("category");
  const min = searchParams.get("min");
  const max = searchParams.get("max");
  const sort = searchParams.get("sort");

  if (!query && categories.length === 0 && !min && !max && !sort) {
    return null;
  }

  // Estilo común de los chips
  const chipClass =
    "flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded-full text-sm shadow-sm hover:bg-red-50 transition cursor-pointer";

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {query && (
        <span className={chipClass} onClick={() => removeFilter("query")}>
          Buscar: "{query}" <X className="w-4 h-4" />
        </span>
      )}

      {categories.map((cat) => (
        <span
          key={cat}
          className={chipClass}
          onClick={() => removeFilter("category", cat)}
        >
          {cat} <X className="w-4 h-4" />
        </span>
      ))}

      {(min || max) && (
        <span
          className={chipClass}
          onClick={() => {
            removeFilter("min");
            removeFilter("max");
          }}
        >
          Precio: {min || "0"} – {max || "∞"} <X className="w-4 h-4" />
        </span>
      )}

      {sort && (
        <span className={chipClass} onClick={() => removeFilter("sort")}>
          Orden: {sort === "price_asc" ? "Precio ↑" : "Precio ↓"}{" "}
          <X className="w-4 h-4" />
        </span>
      )}
    </div>
  );
}
