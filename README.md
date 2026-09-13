# Portfólio Ana Clara

Portfólio responsivo de Ana Clara, construído com React, TypeScript, Vite e Motion. A interface usa uma linguagem editorial de colagem, com projetos completos e orientados por dados no fluxo da própria página.

## Como executar

Requisitos: Node.js 24 e pnpm 10 ou superior.

```bash
pnpm install
pnpm dev
```

O Vite informa o endereço local no terminal. Para gerar e visualizar a versão de produção:

```bash
pnpm build
pnpm preview
```

## Como editar o conteúdo

- Perfil, contato e habilidades: `src/data/profile.ts`.
- Projetos, descrição, texto principal, categorias, ferramentas, aprendizados, mídias e links: `src/data/projects.ts`.
- Fotos da Ana e ícone da marca: `public/images/`.
- Cores, tipografia e estilos globais: `src/styles/global.css`.

Para adicionar um projeto, duplique um objeto do array `projects` em `src/data/projects.ts`, defina um `slug` único e preencha seus campos. Cada case completo é gerado automaticamente em uma composição alternada de texto e mídia. Se o projeto usar imagens próprias, coloque WebP ou AVIF em `public/images/projects/<slug>/` e referencie o caminho no campo `media`.

Cada projeto aceita uma capa independente e quantas fotos extras forem necessárias. A capa aparece como destaque visual e os itens de `media` aparecem automaticamente no carrossel do próprio case. Se a capa também estiver em `media`, ela é removida do carrossel para não aparecer duas vezes:

```ts
{
  // ...demais campos do projeto
  cover: {
    id: 'capa',
    kind: 'image',
    src: '/images/projects/meu-projeto/capa.webp',
    alt: 'Descrição objetiva da capa.',
    caption: 'Capa do projeto.',
    width: 1600,
    height: 900,
  },
  media: [
    {
      id: 'tela-inicial',
      kind: 'image',
      src: '/images/projects/meu-projeto/tela-inicial.webp',
      alt: 'Descrição da tela inicial.',
      caption: 'Tela inicial do projeto.',
      width: 1600,
      height: 900,
    },
    {
      id: 'detalhe-mobile',
      kind: 'image',
      src: '/images/projects/meu-projeto/detalhe-mobile.webp',
      alt: 'Descrição da versão mobile.',
      caption: 'Detalhe da experiência no celular.',
      width: 900,
      height: 1600,
    },
  ],
}
```

Com duas ou mais mídias, a galeria exibe setas, contador, gestos de arraste e navegação pelo teclado. Com três ou mais, também aparecem miniaturas.

## Componentes principais

- `src/components/hero/`: apresentação, fotos em colagem e faixa de habilidades.
- `src/components/projects/ProjectsBoard.tsx`: lista data-driven dos cases.
- `src/components/projects/ProjectCase.tsx`: composição alternada de cada projeto.
- `src/components/projects/ProjectMeta.tsx` e `ProjectNarrative.tsx`: categorias, ferramentas, texto principal e aprendizados.
- `src/components/gallery/`: galeria reutilizável para fotos e imagens dos projetos.
- `src/components/about/`, `contact/` e `layout/`: seções e estrutura geral da página.

## Performance

- Fotos em WebP transparente e dimensionadas para o tamanho real de exibição.
- Lightbox leve para ampliar as imagens sem substituir ou recomprimir os arquivos originais.
- Embla é carregado apenas pelas galerias que possuem múltiplas mídias.
- Animações baseadas principalmente em `transform`, com suporte a `prefers-reduced-motion`.
- Dimensões explícitas nas imagens para reduzir mudanças de layout.
- `dist`, `node_modules`, caches e arquivos locais não fazem parte do repositório.

## Deploy na Vercel

O repositório está preparado para importação direta na Vercel com o preset do Vite. Ao importar o projeto, mantenha a raiz do repositório como `Root Directory`.

- Build Command: `pnpm build`.
- Output Directory: `dist`.
- Node.js: 24.x.
- Variáveis de ambiente: nenhuma obrigatória.

O arquivo `vercel.json` registra essas opções no próprio repositório. A Vercel detecta o `pnpm-lock.yaml` e instala as dependências com pnpm automaticamente. A pasta local `.vercel` permanece ignorada para não versionar identificadores da conta ou do projeto.

## Verificação

```bash
pnpm test
pnpm lint
pnpm build
```

O conteúdo do site é estático e não utiliza variáveis de ambiente, banco de dados ou serviços externos obrigatórios.
