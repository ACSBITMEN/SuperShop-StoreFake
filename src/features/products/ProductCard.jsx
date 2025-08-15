// src/features/products/ProductCard.jsx
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <li className="border p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-60 object-contain mb-6"
      />
      <h3 className="font-semibold">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-500 mt-2">{product.category}</p>
      <Link
        to={`/product/${product.id}`}
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Ver detalles
      </Link>
    </li>
  );
}
