import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// Tipo do produto
type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  slug: string;
}

function SearchBar() {
  // Estados
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const router = useRouter();

  // Buscar produtos da API
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Dados inválidos da API');
          setProducts([]);
        }
      })
      .catch(error => {
        console.error('Erro ao buscar produtos:', error);
        setProducts([]);
      });
  }, []);

  // Atualizar sugestões quando usuário digita
  useEffect(() => {
    if (searchText.trim() === '') {
      setSuggestions([]);
      return;
    }

    // Filtrar produtos que correspondem à busca
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    ).slice(0, 5); // Limitar a 5 sugestões

    setSuggestions(filtered);
  }, [searchText, products]);

  // Função para formatar o preço
  function formatPrice(price: number) {
    return `R$ ${Number(price).toFixed(2)}`;
  }

  // Função para ir para página do produto
  function handleProductClick(slug: string) {
    router.push(`/product/${slug}`);
    setSearchText('');
    setSuggestions([]);
  }

  return (
    <div className="relative">
      {/* Campo de busca */}
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Buscar produtos..."
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
      />

      {/* Lista de sugestões */}
      {suggestions.length > 0 && (
        <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
          {suggestions.map(product => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product.slug)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              {/* Imagem do produto */}
              <img
                src={product.image_url || 'https://via.placeholder.com/400'}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              
              {/* Informações do produto */}
              <div className="ml-3">
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-sm text-gray-500">
                  {`R$ ${Number(product.price).toFixed(2)}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar; 