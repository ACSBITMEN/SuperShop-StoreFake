// src/components/ui/SearchBar.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

export default function SearchBar({ placeholder = "Buscar productos...", initialQuery = "" }) {
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Si hay búsqueda, redirigir con query en la URL
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query.trim())}`);
    } else {
      // Si está vacío, redirigir a search sin query (mostrar todo)
      navigate("/search");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-lg border rounded-md overflow-hidden bg-white"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="flex-1 px-3 py-1 focus:outline-none text-gray-700"
      />
      <button
        type="submit"
        className="bg-amber-600 text-white px-4 flex items-center justify-center hover:bg-amber-700 transition"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}
