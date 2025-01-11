# 🛍️ SwiftCart - E-commerce Moderno

## 📝 Sobre o Projeto
SwiftCart é um e-commerce moderno desenvolvido com Next.js e TypeScript. O projeto foi criado para demonstrar a construção de uma loja virtual completa, com funcionalidades essenciais para uma experiência de compra agradável.

![SwiftCart Preview](https://via.placeholder.com/800x400)

## ⭐ Principais Funcionalidades

### 🔍 Busca Inteligente
- Busca em tempo real
- Sugestões de produtos enquanto digita
- Visualização rápida com imagens e preços

### 🛒 Carrinho de Compras
- Adicionar/remover produtos
- Atualizar quantidades
- Persistência de dados (mantém os itens mesmo após fechar o navegador)
- Cálculo automático do total

### 📱 Design Responsivo
- Interface adaptável para todos os dispositivos
- Experiência otimizada para mobile
- Design moderno e intuitivo

## 🚀 Tecnologias Utilizadas

### Frontend
- Next.js 14.0.4
- React 18.2.0
- TypeScript 5.3.3
- TailwindCSS 3.4.1
- Framer Motion (animações)
- Headless UI (componentes acessíveis)
- Heroicons (ícones)

### Backend
- MySQL
- Prisma (ORM)
- API Routes do Next.js

## 🎯 Como Funciona

### Estrutura do Projeto
```
src/
├── components/    # Componentes reutilizáveis
├── contexts/      # Contextos (ex: carrinho)
├── lib/          # Configurações (banco de dados)
├── pages/        # Páginas e API routes
└── styles/       # Estilos globais
```

### Banco de Dados
- Tabelas principais:
  - Products (produtos)
  - Categories (categorias)
  - Users (usuários)
  - Orders (pedidos)
  - Order_items (itens dos pedidos)

## 💻 Como Rodar o Projeto

### Pré-requisitos
- Node.js instalado
- MySQL instalado e rodando
- NPM ou Yarn

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/joaoviturino/swiftcart-E-commerce.git
cd swiftcart-E-commerce
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Configure o banco de dados**
- Crie um arquivo `.env` na raiz do projeto
- Adicione suas configurações:
```env
DATABASE_URL="mysql://seu_usuario:sua_senha@localhost:3306/nome_do_banco"
```

4. **Rode as migrations**
```bash
npx prisma db push
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
# ou
yarn dev
```

6. Acesse `http://localhost:3000` 🎉

## 📱 Funcionalidades por Página

### Página Inicial
- Lista de produtos em destaque
- Navegação por categorias
- Barra de busca inteligente

### Página de Produto
- Detalhes completos
- Seleção de quantidade
- Botão de adicionar ao carrinho

### Carrinho
- Lista de produtos selecionados
- Controle de quantidade
- Resumo do pedido

## 🔄 Próximas Atualizações
- [ ] Sistema de login/cadastro
- [ ] Integração com gateway de pagamento
- [ ] Área do administrador
- [ ] Filtros avançados
- [ ] Sistema de avaliações

## 🤝 Contribuindo
Contribuições são sempre bem-vindas! Se você tem alguma sugestão para melhorar este projeto:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📫 Contato
João Viturino - [LinkedIn](seu_linkedin) - joaoviturino.pessoal@gmail.com

## 📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ Se este projeto te ajudou de alguma forma, considere dar uma estrela!
