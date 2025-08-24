import { Link } from "react-router-dom";


export default function ProductCard({ product }) {

  return (
  <>
    <Link to={`/product/${product.id}`}>
    <li className="border bg-white py-3 px-3 rounded-lg shadow hover:shadow-md transition-shadow
      relative overflow-hidden group cursor-pointer list-none">
      
      {/* Imagen */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-60 object-contain mb-6
            transition-transform duration-300 group-hover:scale-105"
        />

      {/* Precio */}
      <p className="font-semibold text-2xl">${product.price} <b className="text-sm font-semibold text-amber-500 text-lg">2.400 pts.</b> </p>

      {/* Ejemplo de puntos (aun sin logica) */}
      <p className="text-sm font-semibold text-green-700 text-lg">Envio gratis ⚡ <b>FULL</b></p>
      
      {/* Título */}
      <h3 className="truncate overflow-hidden whitespace-nowrap text-gray-600">
        {product.title}
      </h3>

      {/* Categoría */}
      <p className="text-sm text-gray-500">{product.category}</p>

    </li>
    </Link>
  </>
  );
}
