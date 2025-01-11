import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    const query = `
      SELECT p.*, c.name as category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
    `;
    
    const results = await executeQuery(query, [slug]);
    
    if (!results || !Array.isArray(results) || results.length === 0) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const product = results[0];
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 