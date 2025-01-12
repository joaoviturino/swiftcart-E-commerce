import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        id: 'desc'
      }
    });

    const formattedProducts = products.map(product => ({
      ...product,
      category_name: product.category.name
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Error fetching products' });
  }
} 