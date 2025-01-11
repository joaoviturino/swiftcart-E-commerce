import { NextApiRequest, NextApiResponse } from 'next';
import { executeQuery } from '@/lib/db';

interface Category {
  id: number;
  name: string;
  slug: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const query = `
      SELECT id, name, LOWER(name) as slug
      FROM categories
      ORDER BY name ASC
    `;
    
    const results = await executeQuery<Category[]>(query, []);
    
    // Ensure we always return an array
    const categories = Array.isArray(results) ? results : [];
    
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Error fetching categories' });
  }
} 