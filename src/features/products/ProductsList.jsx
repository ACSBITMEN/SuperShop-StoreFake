// src/features/products/ProductsList.jsx
import ProductCard from "./ProductCard";

export default function ProductsList({ products }) {
  if (!products || products.length === 0) {
    return <p>No se encontraron productos</p>;
  }

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ul>
  );
}
