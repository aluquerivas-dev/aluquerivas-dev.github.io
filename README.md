# Portfolio — Albert Luque Rivas

Portfolio personal con **interfaz tipo IDE** (estilo VS Code), hecho con **HTML, CSS y JavaScript vanilla**. Sin build, sin frameworks, sin dependencias.

![stack](https://img.shields.io/badge/HTML-CSS-JS-vanilla-007acc)

## ✨ Características

- 🗂️ **Explorador de archivos** con tu información como "archivos de código".
- 📑 **Pestañas** abribles y cerrables.
- 🎨 **Resaltado de sintaxis** propio (JS, JSON, Markdown, Log).
- 💻 **Terminal interactiva** real: escribe `help`, `about`, `projects`, `skills`, `contact`, `sudo hire-me`…
- 🔍 **Paleta de comandos** (`Ctrl/Cmd + P`) para abrir archivos.
- 🌗 **Tema claro/oscuro** (se recuerda en `localStorage`).
- 📱 **Responsive** (móvil con sidebar plegable).

## 🚀 Uso

Solo abre `index.html` en el navegador. Para recarga automática mientras editas,
usa la extensión **Live Server** de VS Code.

## ✏️ Personalizar tu contenido

Todo tu contenido vive en **`index.html`**, dentro del bloque `<div id="files">`.
Cada "archivo" es un `<script type="text/plain" data-file="..." data-lang="..." data-icon="...">`.

- `about.js` → quién eres
- `projects.json` → tus proyectos (las URLs `https://…` se vuelven clicables)
- `skills.md` → tecnologías
- `experience.log` → trayectoria
- `contact.md` → enlaces de contacto
- `README.md` → este texto

Para **añadir** una sección nueva, copia un bloque `<script type="text/plain">` con un
`data-file` nuevo (ej. `data-file="blog.md"`); aparecerá solo en el explorador, la terminal
y la paleta. Lenguajes soportados para resaltado: `js`, `json`, `md`, `log`, `txt`.

> ⚠️ Importante: el contenido de cada bloque debe ir **pegado al margen izquierdo**
> (sin sangría), porque la sangría se mostraría como parte del código.

## ⌨️ Atajos

| Atajo | Acción |
|-------|--------|
| `Ctrl/Cmd + P` | Abrir archivo (paleta) |
| `Ctrl/Cmd + ` \` | Mostrar/ocultar terminal |
| `↑` / `↓` (en terminal) | Historial de comandos |

## 🌐 Deploy

Es 100% estático. Súbelo a:

- **GitHub Pages** → sube la carpeta a un repo y activa Pages.
- **Vercel / Netlify** → arrastra la carpeta o conecta el repo.

## 🛠️ Estructura

```
portfolio/
├── index.html            ← estructura + tu contenido (#files)
├── assets/
│   ├── css/style.css     ← estilos (temas dark/light)
│   ├── js/app.js         ← lógica del IDE
│   └── img/              ← (para tus imágenes / CV)
└── README.md
```

---

Hecho por Albert Luque Rivas · Easysoft Tech S.L.
