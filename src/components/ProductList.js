import ProductCard from './ProductCard';
import data from '../data/data.json';

export default function ProductList() {
  return (
    <div className="container  mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
