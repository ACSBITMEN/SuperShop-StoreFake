import { Link } from "react-router-dom";
import { ShoppingCart, Search, List, Percent, Gift } from "lucide-react";
import SearchBar from "./ui/SearchBar";

export default function Navbar() {
  return (
    <header className="w-full bg-gradient-to-b from-amber-500 to-amber-600 shadow-md">
      <nav className="w-full max-w-7xl mx-auto px-4 py-2 text-white flex flex-col gap-2">
        
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link to="/" className="hover:text-white font-bold text-2xl">
            SúperStore
          </Link>

          {/* Barra de búsqueda */}
          <SearchBar placeholder="Buscar en SúperStore..." />

          <div className="hidden sm:flex font-bold">
            <p className="text-yellow-100 pr-1">PRIMER ENVÍO</p>
            <b className="text-white">GRATIS</b>
          </div>
        </div>

        <div className="flex justify-between items-center">
          {/* Menú 1 */}
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-blue-200 flex items-center gap-1">
              <List className="w-4 h-4" /> Categorías
            </Link>
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
