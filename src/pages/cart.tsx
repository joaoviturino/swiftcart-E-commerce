import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { useCart } from '@/contexts/CartContext';
import { TrashIcon } from '@heroicons/react/24/outline';

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart();

  if (items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Seu Carrinho</h1>
            <p className="text-gray-600 mb-8">Seu carrinho está vazio</p>
            <Link
              href="/"
              className="inline-block bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Seu Carrinho</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 border-b last:border-b-0"
                >
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image
                      src={item.image_url || 'https://via.placeholder.com/400x400'}
                      alt={item.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>

                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-gray-600">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL'
                      }).format(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <select
                      value={item.quantity}
                      onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                      className="border rounded-md px-2 py-1"
                    >
                      {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-600 transition-colors"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-800 mb-4">Resumo do Pedido</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(total)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Frete</span>
                  <span>Grátis</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    }).format(total)}
                  </span>
                </div>
              </div>

              <button
                className="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                onClick={() => {
                  // Implementar checkout
                  console.log('Finalizar compra');
                }}
              >
                Finalizar Compra
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
} 