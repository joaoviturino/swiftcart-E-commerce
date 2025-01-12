import { PrismaClient, Prisma } from '@prisma/client';

// Para logs mais detalhados em produção
const prismaClientConfig = {
  log: [
    { level: 'query' as const },
    { level: 'error' as const },
    { level: 'info' as const },
    { level: 'warn' as const }
  ],
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(prismaClientConfig);
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient(prismaClientConfig);
  }
  prisma = (global as any).prisma;
}

// Tentar conectar ao banco de dados
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    // Log detalhado do erro
    if (error.code) {
      console.error('Error code:', error.code);
    }
    if (error.meta) {
      console.error('Error metadata:', error.meta);
    }
  });

export default prisma; 