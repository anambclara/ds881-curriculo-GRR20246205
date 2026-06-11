# Currículo Online - DS881

Currículo/Portfólio online estático desenvolvido com Jekyll e Docker.

🔗 **Link em Produção:** [https://anambclara.github.io/ds881-curriculo-GRR20246205/](link)

## 📋 Sobre

Portfólio profissional com informações de experiência, projetos, formação acadêmica e habilidades técnicas. Design totalmente estático, sem elementos interativos.

## 🚀 Como executar localmente

Este projeto utiliza Docker para garantir que o ambiente de desenvolvimento seja isolado e não exija instalações locais.

### Pré-requisitos
- Docker e Docker Compose instalados

### Passos

1. Clone o repositório e acesse a pasta:
   ```bash
   git clone <URL-do-repositorio>
   cd ds881-curriculo-GRR20246205
   ```

2. Inicie o contêiner:
   ```bash
   docker compose up
   ```

3. Acesse no navegador:
   ```
   http://localhost:8080
   ```

## 📁 Estrutura do Projeto

```
.
├── src/
│   ├── pages/
│   │   └── index.html          # Página principal do currículo
│   └── style/
│       └── style.css           # Estilos globais
├── _config.yml                 # Configuração Jekyll
├── dockerfile                  # Imagem Docker
├── docker-compose.yml          # Composição de contêineres
├── Gemfile                     # Dependências Ruby/Jekyll
└── README.md                   # Este arquivo
```

## 🛠 Tecnologias

- **Jekyll** - Gerador de sites estáticos
- **Docker** - Containerização
- **HTML5** - Markup
- **CSS3** - Estilos

## 📝 Como Customizar

### Editar conteúdo do currículo
Modifique o arquivo [src/pages/index.html](src/pages/index.html) com suas informações pessoais:
- Dados de contato
- Experiência profissional
- Projetos
- Formação acadêmica
- Habilidades

### Editar estilos
Customize a aparência no arquivo [src/style/style.css](src/style/style.css)

## 🔄 Fluxo de Desenvolvimento

1. Faça alterações nos arquivos em `src/`
2. O Jekyll detecta as mudanças automaticamente (live reload)
3. Atualize o navegador para ver as alterações
4. Para parar o contêiner: `docker compose down`

## 📦 Dependências

- **Ruby** - Linguagem de programação
- **Jekyll** - Gerador estático
- **jekyll-feed** - Plugin para feed RSS

## ✅ Features

- ✨ Design estático e responsivo
- 🎨 CSS puro (sem frameworks)
- 🐳 Totalmente containerizado
- 📱 Mobile-friendly
- ⚡ Sem JavaScript (aplicação totalmente estática)
