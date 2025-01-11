import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

// Props do produto
type ProductProps = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  slug: string;
}

function ProductCard({ id, name, price, imageUrl, slug }: ProductProps) {
  // Usar contexto do carrinho
  const { addItem } = useCart();

  // Função para adicionar ao carrinho
  function handleAddToCart() {
    const product = { id, name, price, image_url: imageUrl, slug };
    addItem(product, 1);
    alert('Produto adicionado ao carrinho!');
  }

  // Função para formatar o preço
  function formatPrice(price: number) {
    return `R$ ${Number(price).toFixed(2)}`;
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {/* Imagem do produto */}
      <Link href={`/product/${slug}`}>
        <img
          src={imageUrl || 'https://via.placeholder.com/400'}
          alt={name}
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      </Link>

      {/* Informações do produto */}
      <div className="mb-4">
        <Link href={`/product/${slug}`}>
          <h3 className="text-lg font-medium text-gray-800 hover:text-emerald-500">
            {name}
          </h3>
        </Link>
        <p className="text-emerald-500 font-medium mt-1">
          {formatPrice(price)}
        </p>
      </div>

      {/* Botão de adicionar ao carrinho */}
      <button
        onClick={handleAddToCart}
        className="w-full bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-600 flex items-center justify-center gap-2"
      >
        <ShoppingBagIcon className="w-5 h-5" />
        Adicionar ao carrinho
      </button>
    </div>
  );
}

export default ProductCard; 