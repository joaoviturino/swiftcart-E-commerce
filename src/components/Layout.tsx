import Link from 'next/link';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/contexts/CartContext';
import SearchBar from './SearchBar';

// Props do layout
type LayoutProps = {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  // Pegar itens do carrinho
  const { items } = useCart();
  
  // Calcular quantidade total de itens
  let totalItems = 0;
  for(let item of items) {
    totalItems += item.quantity;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center h-16 justify-between">
            {/* Logo */}
            <Link href="/">
              <span className="text-2xl font-bold text-emerald-500">
                SwiftCart
              </span>
            </Link>

            {/* Barra de busca */}
            <div className="w-full max-w-lg mx-4">
              <SearchBar />
            </div>

            {/* Carrinho */}
            <Link href="/cart">
              <div className="relative">
                <ShoppingCartIcon className="w-6 h-6 text-gray-600 hover:text-emerald-500" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer simples */}
      <footer className="bg-white border-t mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-500">
            © 2024 SwiftCart - Todos os direitos reservados
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout; 