import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { slug } = req.query;

  try {
    // Primeiro, encontrar a categoria pelo slug
    const category = await prisma.category.findFirst({
      where: {
        slug: String(slug)
      }
    });

    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Depois, buscar os produtos dessa categoria
    const products = await prisma.product.findMany({
      where: {
        categoryId: category.id
      },
      include: {
        category: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    });

    // Formatar a resposta
    const response = {
      categoryName: category.name,
      products: products.map(product => ({
        ...product,
        category_name: product.category.name
      }))
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error fetching category products:', error);
    res.status(500).json({ error: 'Error fetching category products' });
  }
} 