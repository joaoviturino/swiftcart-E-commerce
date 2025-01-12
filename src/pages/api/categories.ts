import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Tenta conectar ao banco de dados primeiro
    await prisma.$connect();
    console.log('Database connection successful in /api/categories');

    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    console.log(`Found ${categories.length} categories`);
    
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Detailed error in /api/categories:', error);
    
    // Verifica se é um erro do Prisma
    if (error.code) {
      return res.status(500).json({ 
        error: 'Database error', 
        code: error.code,
        message: error.message 
      });
    }

    return res.status(500).json({ 
      error: 'Internal server error',
      message: error.message
    });
  } finally {
    // Desconecta do banco de dados
    await prisma.$disconnect();
  }
} 