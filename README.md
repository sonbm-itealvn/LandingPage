# landingpage

This template should help get you started developing with Vue 3 in Vite.

### Cache headers (khuyến nghị deploy)

- Không cache `index.html` (no-store/no-cache) để tránh trình duyệt giữ bản cũ sau mỗi lần build.
- Chỉ cache dài các file tĩnh đã có hash (thư mục `assets/`) bằng `Cache-Control: public, immutable`.

Ví dụ Nginx:
```
location = /index.html {
  add_header Cache-Control "no-store, no-cache, must-revalidate, proxy-revalidate";
  add_header Pragma "no-cache";
  add_header Expires 0;
  try_files $uri =404;
}

location / {
  try_files $uri $uri/ /index.html;
}

location /assets/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
  try_files $uri =404;
}
```

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd) 
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
