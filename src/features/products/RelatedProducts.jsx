// src/features/products/RelatedProducts.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../../services/products";
import ProductCard from "./ProductCard";

export default function RelatedProducts({ category, excludeId }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const products = await getProducts();
        const filtered = products.filter(
          (p) => p.category === category && p.id !== excludeId
        );
        setRelated(filtered);
      } catch (err) {
        console.error("Error cargando productos relacionados", err);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [category, excludeId]);

  if (loading) return <p className="mt-4">Cargando productos relacionados...</p>;
  if (related.length === 0) return <p className="mt-4 text-gray-500">No hay productos relacionados.</p>;

  return (
    <div className="mt-20">
      <h2 className="text-xl font-bold mb-4">Productos relacionados</h2>
      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-2 scrollbar-thin">
          {related.map((prod) => (
            <div key={prod.id} className="max-w-[200px] flex-shrink-0">
              <ProductCard product={prod} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
