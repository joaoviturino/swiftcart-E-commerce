import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  slug: string;
}

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetch(`/api/categories/${slug}/products`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.products);
          setCategoryName(data.categoryName);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching products:', error);
          setLoading(false);
        });
    }
  }, [slug]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">{categoryName}</h1>
        
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
                price={Number(product.price)}
                imageUrl={product.image_url}
                slug={product.slug}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">Nenhum produto encontrado nesta categoria.</p>
        )}
      </div>
    </Layout>
  );
} 