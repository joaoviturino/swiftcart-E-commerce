export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Smartphone X',
    description: 'Um smartphone moderno com câmera de alta resolução',
    price: 1999.99,
    category: 'Eletrônicos',
    image: '/images/smartphone.jpg',
  },
  {
    id: '2',
    name: 'Notebook Pro',
    description: 'Notebook potente para trabalho e jogos',
    price: 4599.99,
    category: 'Eletrônicos',
    image: '/images/notebook.jpg',
  },
  {
    id: '3',
    name: 'Tênis Esportivo',
    description: 'Tênis confortável para corrida',
    price: 299.99,
    category: 'Esportes',
    image: '/images/tenis.jpg',
  },
  {
    id: '4',
    name: 'Camiseta Básica',
    description: 'Camiseta de algodão de alta qualidade',
    price: 49.99,
    category: 'Roupas',
    image: '/images/camiseta.jpg',
  },
  {
    id: '5',
    name: 'Fone de Ouvido Bluetooth',
    description: 'Fone sem fio com cancelamento de ruído',
    price: 399.99,
    category: 'Eletrônicos',
    image: '/images/fone.jpg',
  },
]; 