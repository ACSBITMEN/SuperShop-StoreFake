import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, Percent, Gift, List, ChevronDown } from "lucide-react";
import SearchBar from "./ui/SearchBar";
import { getCategories } from "../services/products";

const categoryLabels = {
  "electronics": "Electrónica",
  "jewelery": "Joyería",
  "men's clothing": "Ropa de hombre",
  "women's clothing": "Ropa de mujer",
};

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await getCategories();
        setCategories(cats);
      } catch (error) {
        console.error("Error cargando categorías:", error);
      }
    };
    loadCategories();
  }, []);

  const handleCategoryClick = (cat) => {
    navigate(`/search?category=${encodeURIComponent(cat)}`);
    setIsOpen(false); // 👈 cierra el dropdown después de seleccionar
  };

  return (
    <header className="w-full bg-gradient-to-b from-amber-500 to-amber-600 shadow-md relative">
      <nav className="w-full max-w-7xl mx-auto px-4 py-2 text-white flex flex-col gap-2">
        
        <div className="flex justify-between items-center gap-4">
          <Link to="/" className="hover:text-white font-bold text-2xl">
            ⚡SúperStore
          </Link>

          <SearchBar placeholder="Buscar en SúperStore..." />

          <div className="hidden sm:flex font-bold">
            <p className="text-yellow-100 pr-1">PRIMER ENVÍO</p>
            <b className="text-white">GRATIS</b>
          </div>
        </div>

        <div className="flex justify-between items-center relative">

          {/* Menú 1 */}
          <div className="flex space-x-4 items-center">
            
            {/* Categorías con dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hover:text-blue-200 flex items-center gap-1"
              >
                <List className="w-4 h-4" /> Categorías
                <ChevronDown className="w-4 h-4" />
              </button>

              {isOpen && (
                <div className="absolute mt-2 bg-amber-600 text-white rounded-md shadow-md w-48 z-50">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => handleCategoryClick(cat)}
                      className="w-full text-left px-4 py-2 hover:bg-amber-700 rounded-md"
                    >
                      {categoryLabels[cat] || cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/sales" className="hover:text-blue-200 flex items-center gap-1">
              <Percent className="w-4 h-4" /> Ofertas
            </Link>
            <Link to="/redeem" className="hover:text-blue-200 flex items-center gap-1">
              <Gift className="w-4 h-4" /> Canjea Súper Códigos
            </Link>
          </div>

          {/* Menú 2 */}
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-200">Inicio</Link>
            <Link to="/login" className="hover:text-blue-200">Login</Link>
            <Link
              to="/cart"
              className="bg-amber-500 hover:bg-red-500 py-2 px-4 rounded-md flex items-center"
            >
              <ShoppingCart className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
