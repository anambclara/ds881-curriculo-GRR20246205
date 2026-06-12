import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (path) => readFileSync(path, "utf8");

test("Jekyll publishes the curriculum as the home page", () => {
  const home = read("index.html");

  assert.match(home, /^---\r?\nlayout: curriculum\r?\n---/);
  assert.match(home, /Ana Clara Martins Batista/);
  assert.match(home, /Experi.ncia Profissional/);
  assert.doesNotMatch(home, /LinkedIn/);
});

test("Docker Compose exposes Jekyll with bind mount and live reload", () => {
  const compose = read("docker-compose.yml");

  assert.match(compose, /8080:8080/);
  assert.match(compose, /\.\s*:\s*\/srv\/jekyll/);
  assert.match(compose, /bundle exec jekyll serve/);
  assert.match(compose, /--livereload/);
  assert.match(compose, /--force_polling/);
});

test("workflow contains strict lint, build, and deploy jobs", () => {
  const workflow = read(".github/workflows/main.yml");

  assert.match(workflow, /^\s{2}lint:\s*$/m);
  assert.match(workflow, /^\s{2}build:\s*$/m);
  assert.match(workflow, /^\s{2}deploy:\s*$/m);
  assert.match(workflow, /needs:\s*lint/);
  assert.match(workflow, /needs:\s*build/);
  assert.match(workflow, /actions\/configure-pages@/);
  assert.match(workflow, /actions\/upload-pages-artifact@/);
  assert.match(workflow, /actions\/deploy-pages@/);
  assert.doesNotMatch(workflow, /\|\|\s*echo/);
});

test("Jekyll is configured for the repository GitHub Pages URL", () => {
  const config = read("_config.yml");

  assert.match(config, /url:\s*"https:\/\/anambclara\.github\.io"/);
  assert.match(config, /baseurl:\s*"\/ds881-curriculo-GRR20246205"/);
  assert.match(config, /email:\s*"anaclaramartinsbatista2006@gmail\.com"/);
});
