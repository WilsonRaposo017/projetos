# Morgan & Lior — Nosso Universo

Site pessoal, reconstruído com o design system **ddna** (vitrine quente sobre
linho cru — tons de areia/creme/carvão, tipografia peso 400, zero sombras,
zero cantos arredondados). Estrutura em pastas, pronta para GitHub Pages.

## Estrutura

```
index.html            página única
css/style.css          todo o estilo (tokens ddna)
js/data.js              todos os textos editáveis (motivos, cartas, regras...)
js/app.js               toda a lógica/interatividade
assets/gallery/          fotos da galeria + gallery.js + instruções
assets/audio/            música de fundo (trilha.mp3) + instruções
```

## O que foi corrigido

O ficheiro original tinha dois módulos de JavaScript (o "coração flutuante"
do topo e o **quiz das 100 perguntas**) colados dentro de uma tag `<style>`
em vez de `<script>`. O navegador ignora JavaScript dentro de `<style>`,
por isso o quiz nunca funcionava. Neste projeto todo o JavaScript está em
`js/app.js`, carregado corretamente — o quiz, o contador, os carrosséis, o
jardim, a música e o resto funcionam.

## Como publicar no GitHub Pages

1. Cria um repositório novo no GitHub (pode ser privado ou público).
2. Sobe esta pasta inteira para o repositório (mantendo a estrutura acima).
3. No repositório: **Settings → Pages → Branch: main → pasta `/root`
   → Save**.
4. Em 1–2 minutos o GitHub dá-te um link do tipo
   `https://teu-usuario.github.io/nome-do-repo/` — é esse link que podes
   enviar.

## Como editar o conteúdo

Quase tudo o que é texto está em `js/data.js`, dentro de `CONFIG`:

- `startDate` — data de início do contador (ano, mês de 0 a 11, dia).
- `timeline`, `rules`, `curiosities`, `quotes`, `poems`, `gardenPhrases`
- `reasons` — os 100 motivos (`[texto, categoria]`)
- `letters` — as 100 cartas (`[título, categoria, texto]`)

O quiz (`quizBank`, no mesmo ficheiro) está ligado a estes dois arrays —
se mudares um motivo ou carta, considera atualizar a pergunta correspondente
para não ficar desalinhado.

## Galeria

Vê `assets/gallery/README.md`. Resumo: coloca as fotos na pasta e regista-as
em `assets/gallery/gallery.js`.

## Música

Vê `assets/audio/README.md`. Resumo: coloca um ficheiro `trilha.mp3` na
pasta `assets/audio/`.

## Testar localmente antes de publicar

Para testar tudo localmente com um servidor simples, corre na pasta do projeto:

```bash
python3 -m http.server 8000
```

e abre `http://localhost:8000` no navegador. No GitHub Pages isto não é
um problema — funciona normalmente.
