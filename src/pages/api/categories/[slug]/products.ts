import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '@/lib/db';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  slug: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const { slug } = req.query;

      // Primeiro, buscar a categoria
      const categories = await executeQuery<any[]>(
        'SELECT * FROM categories WHERE slug = ?',
        [slug]
      );

      if (categories.length === 0) {
        return res.status(404).json({ error: 'Category not found' });
      }

      const category = categories[0];

      // Depois, buscar os produtos da categoria
      const products = await executeQuery<Product[]>(
        'SELECT * FROM products WHERE category_id = ?',
        [category.id]
      );

      res.status(200).json({
        categoryName: category.name,
        products
      });
    } catch (error) {
      console.error('Error fetching category products:', error);
      res.status(500).json({ error: 'Error fetching category products' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 