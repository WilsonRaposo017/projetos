# Galeria — como adicionar fotos

1. Copia as fotos para esta pasta (`assets/gallery/`).
   Nomes sem espaços/acentos são mais seguros: `praia-01.jpg`, `aniversario.jpg`.

2. Abre o ficheiro `gallery.js` (nesta mesma pasta) e regista cada foto:

```js
window.GALLERY_ITEMS = [
  { file: 'praia-01.jpg', caption: 'Praia, julho' },
  { file: 'aniversario.jpg', caption: 'Primeiro aniversário' },
  { file: 'sem-legenda.jpg' }
];
```

- `file` — nome exato do ficheiro que colocaste nesta pasta.
- `caption` — opcional. Se não quiseres legenda, omite este campo.

3. Guarda o `gallery.js` e faz commit/push para o GitHub. As fotos aparecem
   automaticamente na secção "Galeria" do site, na ordem em que estão na lista.

Formatos aceites: `.jpg`, `.jpeg`, `.png`, `.webp`, `.mp4`, `.webm`, `.ogg`.
Sem limite rígido de fotos, mas para o site carregar rápido evita imagens
acima de ~2MB cada (comprime antes de subir, se precisares).

No GitHub, o nome no campo `file` tem de ser idêntico ao do ficheiro,
incluindo maiúsculas e minúsculas.
