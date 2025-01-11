import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  image_url: string;
  slug: string;
  category_name?: string;
}

export default function SearchPage() {
  const router = useRouter();
  const { q: searchQuery } = router.query;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      fetch(`/api/products?search=${encodeURIComponent(searchQuery as string)}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }
  }, [searchQuery]);

  return (
    <Layout>
      <section className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Resultados para: {searchQuery}
          </h1>
          <span className="text-gray-600">
            {products.length} produtos encontrados
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                description={product.description}
                price={Number(product.price)}
                imageUrl={product.image_url}
                slug={product.slug}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Nenhum produto encontrado para &quot;{searchQuery}&quot;
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
} 