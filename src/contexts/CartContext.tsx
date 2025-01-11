import { createContext, useContext, useState, useEffect } from 'react';

// Tipo do item do carrinho
type CartItem = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

// Tipo do produto
type Product = {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

// Tipo do contexto do carrinho
type CartContextType = {
  items: CartItem[];
  itemsCount: number;
  total: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Criar contexto
const CartContext = createContext<CartContextType | null>(null);

// Provider do carrinho
export function CartProvider({ children }: { children: React.ReactNode }) {
  // Estado dos itens do carrinho
  const [items, setItems] = useState<CartItem[]>([]);

  // Calcular total de itens
  const itemsCount = items.reduce((total, item) => total + item.quantity, 0);
  
  // Calcular valor total
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Carregar carrinho do localStorage quando iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  // Salvar carrinho no localStorage quando mudar
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  // Adicionar item ao carrinho
  function addItem(product: Product, quantity: number) {
    setItems(currentItems => {
      // Verificar se produto já existe
      const existingItem = currentItems.find(item => item.id === product.id);

      if (existingItem) {
        // Atualizar quantidade se já existe
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      // Adicionar novo item se não existe
      return [...currentItems, { ...product, quantity }];
    });
  }

  // Remover item do carrinho
  function removeItem(productId: number) {
    setItems(currentItems => 
      currentItems.filter(item => item.id !== productId)
    );
  }

  // Atualizar quantidade de um item
  function updateQuantity(productId: number, quantity: number) {
    if (quantity < 1) return;

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    );
  }

  // Limpar carrinho
  function clearCart() {
    setItems([]);
  }

  return (
    <CartContext.Provider value={{
      items,
      itemsCount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Hook para usar o carrinho
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
} 