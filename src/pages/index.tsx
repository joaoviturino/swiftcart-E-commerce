import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import ProductCard from '@/components/ProductCard';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  category_id: number;
  slug: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    Promise.all([
      fetch('/api/products').then(res => res.json()),
      fetch('/api/categories').then(res => res.json())
    ])
      .then(([productsData, categoriesData]) => {
        if (productsData.error) {
          setError(productsData.error);
        } else {
          const productsArray = Array.isArray(productsData) ? productsData : [];
          setProducts(productsArray);
        }

        if (categoriesData.error) {
          console.error('Error fetching categories:', categoriesData.error);
        } else {
          const categoriesArray = Array.isArray(categoriesData) ? categoriesData : [];
          setCategories(categoriesArray);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError('Erro ao carregar dados');
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      {/* Hero Section with Animation */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white"
      >
        <div className="container mx-auto px-4 py-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Descubra produtos incríveis no SwiftCart
            </h1>
            <p className="text-lg md:text-xl mb-8 text-emerald-50">
              Sua nova experiência de compra online com entrega rápida e segura.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-500 px-8 py-3 rounded-full font-medium hover:bg-emerald-50 transition-colors inline-flex items-center group"
            >
              Explorar agora
              <ArrowRightIcon className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </motion.section>

      <div className="container mx-auto px-4 py-12">
        {/* Categories Section with Animation */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-2xl font-bold text-gray-800"
            >
              Categorias
            </motion.h2>
            <motion.a 
              whileHover={{ x: 5 }}
              href="/categories" 
              className="text-emerald-500 hover:text-emerald-600 font-medium inline-flex items-center group"
            >
              Ver todas
              <ArrowRightIcon className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <motion.a
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index, duration: 0.5 }}
                whileHover={{ scale: 1.05, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
                href={`/categories/${category.slug}`}
                className="bg-white rounded-xl p-6 text-center transition-shadow group"
              >
                <h3 className="font-medium text-gray-800 group-hover:text-emerald-500 transition-colors">
                  {category.name}
                </h3>
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Products Section with Animation */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <div className="flex items-center justify-between mb-8">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-2xl font-bold text-gray-800"
            >
              Produtos em Destaque
            </motion.h2>
            <motion.a 
              whileHover={{ x: 5 }}
              href="/products" 
              className="text-emerald-500 hover:text-emerald-600 font-medium inline-flex items-center group"
            >
              Ver todos
              <ArrowRightIcon className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-b-2 border-emerald-500"
              />
            </div>
          ) : error ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-red-500 bg-red-50 rounded-lg p-4"
            >
              {error}
            </motion.div>
          ) : products.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-500 bg-gray-50 rounded-lg p-8"
            >
              Nenhum produto encontrado
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.5 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.image_url}
                    slug={product.slug}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </Layout>
  );
} 