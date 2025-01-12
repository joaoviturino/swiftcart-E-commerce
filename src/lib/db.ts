import { PrismaClient } from '@prisma/client';

// Para logs mais detalhados em produção
const prismaClientConfig = {
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
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

// Configurar listeners de eventos
prisma.$on('query', (e) => {
  console.log('Query: ' + e.query);
  console.log('Params: ' + e.params);
  console.log('Duration: ' + e.duration + 'ms');
});

prisma.$on('error', (e) => {
  console.error('Prisma Error:', e.message);
  console.error('Target:', e.target);
});

prisma.$on('info', (e) => {
  console.log('Prisma Info:', e.message);
});

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