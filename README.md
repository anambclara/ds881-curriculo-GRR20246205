# Currículo Online - DS881

[![CI/CD](https://github.com/anambclara/ds881-curriculo-GRR20246205/actions/workflows/main.yml/badge.svg)](https://github.com/anambclara/ds881-curriculo-GRR20246205/actions/workflows/main.yml)

Currículo profissional desenvolvido como projeto individual da disciplina
DS881. O site usa Jekyll, possui ambiente de desenvolvimento conteinerizado e
é publicado automaticamente no GitHub Pages.

**Produção:** [anambclara.github.io/ds881-curriculo-GRR20246205](https://anambclara.github.io/ds881-curriculo-GRR20246205/)

## Tecnologias

- Jekyll 4 e Ruby
- HTML e CSS
- Docker e Docker Compose
- GitHub Actions
- GitHub Pages
- HTMLHint, Stylelint e Markdownlint

## Executar localmente com Docker

É necessário instalar somente o
[Docker Desktop](https://www.docker.com/products/docker-desktop/). Ruby,
Bundler, Jekyll e Node.js são instalados dentro da imagem.

1. Clone o repositório:

   ```bash
   git clone https://github.com/anambclara/ds881-curriculo-GRR20246205.git
   cd ds881-curriculo-GRR20246205
   ```

2. Construa a imagem e inicie o servidor:

   ```bash
   docker compose up --build
   ```

3. Acesse [http://localhost:8080](http://localhost:8080).

O diretório do projeto é montado em `/srv/jekyll` dentro do contêiner. O
Jekyll usa `--livereload` e `--force_polling`, portanto alterações nos arquivos
são refletidas automaticamente no navegador.

Para encerrar, pressione `Ctrl+C`. Para remover o contêiner:

```bash
docker compose down
```

## Verificações locais

Todos os comandos podem ser executados sem instalar as dependências no sistema
operacional:

```bash
# HTMLHint, Stylelint, Markdownlint e testes dos requisitos
docker compose run --rm site npm run lint

# Análise estática do Jekyll
docker compose run --rm site bundle exec jekyll doctor

# Build de produção
docker compose run --rm site bundle exec jekyll build
```

## Pipeline CI/CD

O workflow [`.github/workflows/main.yml`](.github/workflows/main.yml) é
executado em Pull Requests para `main` e em atualizações da própria `main`.

### Linter / Static Analysis

O job `lint` executa:

- HTMLHint nos arquivos HTML;
- Stylelint no CSS;
- Markdownlint no README;
- testes automatizados dos requisitos de Docker, Jekyll e workflow;
- `jekyll doctor` para análise estática da configuração.

Qualquer erro encerra o job com falha. Não há comandos que ignorem o resultado
dos linters.

### Build

O job `build` depende do sucesso de `lint`, gera o site com
`bundle exec jekyll build` e envia `_site` como artefato oficial do GitHub
Pages.

### Deploy

O job `deploy` depende do sucesso de `build` e executa somente após um `push`
na branch `main`. A publicação usa as actions oficiais
`actions/configure-pages`, `actions/upload-pages-artifact` e
`actions/deploy-pages`.

Em um Pull Request, somente `lint` e `build` são executados. O deploy ocorre
depois do merge aprovado na `main`.

## Fluxo de trabalho com Git

Push direto na `main` não deve ser utilizado.

1. Atualize a `main` e crie uma branch:

   ```bash
   git switch main
   git pull
   git switch -c feat/nome-da-alteracao
   ```

2. Faça commits seguindo
   [Conventional Commits](https://www.conventionalcommits.org/):

   ```bash
   git commit -m "feat: adiciona nova seção ao currículo"
   git commit -m "fix: corrige layout em telas pequenas"
   git commit -m "docs: atualiza instruções de execução"
   git commit -m "ci: ajusta validação do pipeline"
   ```

3. Envie a branch e abra um Pull Request:

   ```bash
   git push -u origin feat/nome-da-alteracao
   ```

4. Aguarde os jobs `Linter / Static Analysis` e `Build` ficarem verdes antes
   de realizar o merge.

## Configurar o GitHub Pages

Esta configuração deve ser aplicada no GitHub após o workflow estar na
`main`:

1. Acesse `Settings` > `Pages`.
2. Em `Build and deployment`, selecione `GitHub Actions` como fonte.
3. Faça o merge de um Pull Request válido na `main`.
4. Acompanhe o job `Deploy` na aba `Actions`.
5. Confirme a publicação no link de produção informado no início deste README.

## Proteção da branch `main`

A proteção é uma configuração do repositório no GitHub e não pode ser definida
somente por arquivos versionados.

1. Acesse `Settings` > `Branches`.
2. Em `Branch protection rules`, clique em `Add branch protection rule`.
3. Em `Branch name pattern`, informe `main`.
4. Marque `Require a pull request before merging`.
5. Marque `Require status checks to pass before merging`.
6. Marque `Require branches to be up to date before merging`.
7. Selecione os checks `Linter / Static Analysis` e `Build`.
8. Marque `Do not allow bypassing the above settings`, se a opção estiver
   disponível.
9. Salve em `Create` ou `Save changes`.

### Evidência esperada

Na tela da regra de proteção, a branch `main` deve aparecer com Pull Request
obrigatório e com os checks `Linter / Static Analysis` e `Build` exigidos.
O histórico do repositório também deve mostrar as alterações integradas por
Pull Requests, sem push direto na `main`.

## Estrutura principal

```text
.
├── .github/workflows/main.yml
├── _layouts/curriculum.html
├── assets/css/style.css
├── tests/requirements.test.mjs
├── Dockerfile
├── docker-compose.yml
├── index.html
└── README.md
```
