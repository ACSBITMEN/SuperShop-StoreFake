import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById } from "../services/products";
import QuantitySelector from "../components/ui/QuantitySelector";
import RelatedProducts from "../features/products/RelatedProducts";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

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

  const handleAddToCart = () => {
    console.log("Agregar al carrito:", product, "Cantidad:", quantity);
    // luego aquí irá dispatch(addToCart({ ...product, quantity }))
  };

  
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button onClick={() => navigate(-1)} className=" text-black font-bold px-2 py-1 rounded hover:text-amber-700">
        ← Volver
      </button>

      <div className="flex flex-col md:flex-row gap-8 mt-10">
        {/* Imagen */}
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-96 object-contain"
          />
        </div>

        {/* Detalles */}
        <div className="md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-md mb-6">{product.description}</p>
          <p className="text-green-600 font-bold text-2xl mb-4">${product.price} dls.</p>

          {/* Cantidad + Botón */}
          <div className="flex items-center gap-4 mt-4">
            <QuantitySelector value={quantity} onChange={setQuantity} />
            <button
              onClick={handleAddToCart}
              className="px-6 py-2 bg-amber-600 text-white rounded hover:bg-amber-500"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>

      {/* Productos relacionados */}
      <RelatedProducts category={product.category} excludeId={product.id} />
    </div>
  );
}
