import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-amber-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-lg">SuperStore</Link>
      <div className="space-x-4">
        <Link to="/">Inicio</Link>
        <Link to="/cart">Carrito</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
}
