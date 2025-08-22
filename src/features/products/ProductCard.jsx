// src/features/products/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
  <>
    <Link
      to={`/product/${product.id}`}
      className="border bg-white py-3 px-3 rounded-lg shadow hover:shadow-md transition-shadow
    relative overflow-hidden group cursor-pointer"
    >
    <li className="">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-contain mb-6
        transition-transform duration-300 group-hover:scale-105"
      />
      <h3 className="truncate overflow-hidden whitespace-nowrap text-gray-600">{product.title}</h3>
      <p className="font-semibold text-2xl">${product.price}</p>
      <p className="text-sm font-semibold text-green-700 text-lg">2.400 pts.</p>
      <p className="text-sm text-gray-500 mt-2">{product.category}</p>
      <Link
        to={`/product/${product.id}`}
        className="inline-block mt-3 px-4 py-2 bg-amber-500 text-white rounded hover:bg-orange-600"
      >
        Ver detalles
      </Link>
    </li>
    </Link>
  </>
  );
}
