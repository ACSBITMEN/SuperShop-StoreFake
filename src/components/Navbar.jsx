// src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { House, ShoppingCart, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-amber-500 text-white shadow-md pt-4 pb-1 px-10 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">SuperStore</Link>
      <div className="flex space-x-3">
        <Link to="/" className="hover:text-blue-600 flex flex-col justify-center items-center"><House className="w-6 h-6 text-white-600" /> Inicio</Link>
        <Link to="/cart" className="hover:text-blue-600 flex flex-col justify-center items-center"><ShoppingCart className="w-6 h-6 text-white-600" /> Carrito</Link>
        <Link to="/login" className="hover:text-blue-600 flex flex-col justify-center items-center"><User className="w-6 h-6 text-white-600" /> Login</Link>
      </div>
    </nav>
  );
}
