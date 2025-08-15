// src/pages/ProductDetailPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../services/products";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Error al cargar el producto");
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Cargando producto...</p>;
  if (error) return <p className="text-red-500 text-center mt-4">{error}</p>;
  if (!product) return <p className="text-center mt-4">Producto no encontrado</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-80 object-contain mb-6"
      />
      <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
      <p className="text-gray-600 mb-4">{product.category}</p>
      <p className="text-lg mb-6">{product.description}</p>
      <p className="text-green-600 font-bold text-xl mb-4">${product.price}</p>

      <Link to="/" className="text-blue-500 hover:underline">
        ← Volver
      </Link>
    </div>
  );
}
