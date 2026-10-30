# Frencia Landing · Directivas para agentes

Este archivo es la unica fuente de reglas del repositorio para cualquier agente
(Claude Code, Gemini, Codex u otros). No existen CLAUDE.md ni GEMINI.md: si una
regla nueva aparece, va aca.

## Que es este repo

La landing publica de Frencia, en frencia.fit. Su trabajo es aparecer en
Google y llevar a la gente a la app web (app.frencia.fit) o a las tiendas de
la app movil. No tiene login ni datos de usuarios: es contenido estatico.

Repos hermanos:
- App web: github.com/bautistaribotta/frencia-web (Vite + React, en app.frencia.fit).
- App movil: github.com/bautistaribotta/frencia (Expo).

## Stack

- Astro (salida estatica, sin SSR). Cada pagina es HTML generado en el build.
- Tailwind 4 (via `@tailwindcss/vite`) conectado a los tokens de Lume.
- React solo como isla (`client:*`) donde haga falta interactividad; el resto
  son componentes `.astro` sin JavaScript.
- Iconos de Lucide (`lucide-react`).
- `@astrojs/sitemap` genera el sitemap a partir de `site` en `astro.config.mjs`.
- Se despliega en Cloudflare Workers (solo archivos estaticos, `wrangler.jsonc`).

Documentacion de Astro: https://docs.astro.build. Consultala antes de tocar
rutas, componentes de framework, content collections o estilos.

## Dev server

Levantarlo en segundo plano:

```
astro dev --background
```

Se maneja con `astro dev stop`, `astro dev status` y `astro dev logs`.

## Design system

- La fuente de verdad del diseño es `design-system/` del repo frencia-web
  (Lume, "Frencia 2.0"). Las vistas de la landing se diseñan en Claude Design
  y se implementan respetando ese design system.
- Si el codigo y el diseño difieren, manda el diseño; si no cubre el caso,
  avisar antes de inventar.
- Usá los tokens: viven en `src/design/tokens/tokens.css`, copia exacta de
  `src/design/tokens/tokens.css` de frencia-web. No se editan a mano aca: si
  cambia un token, se cambia en frencia-web y se vuelve a copiar.
- No inventes colores, radios, espaciados ni tipografias: si falta algo,
  proponelo como token nuevo en el design system.
- `src/design/global.css` expone los tokens a Tailwind. Usá esas clases
  (`bg-accent`, `bg-surface-card`, `text-fg-secondary`, `rounded-pill`,
  `shadow-glass`, `type-display`, `glass`, etc.) en lugar de los colores y
  tamaños por defecto de Tailwind. Los colores de texto se llaman `fg-*`
  porque Tailwind reserva `--text-*` para tamaños.
- Cada pagina tiene que funcionar en tema oscuro y claro (sin atributo
  `data-theme`, sigue al sistema) y en telefono, tablet y escritorio.

## SEO

- Cada pagina pasa `title` y `description` propios a `Layout.astro`.
- Contenido real en el HTML: nada que importe para Google puede depender de
  JavaScript del cliente.
- Imagenes con `alt` descriptivo y por `astro:assets` cuando se pueda.

## Codigo y estilos

- Usar **EXCLUSIVAMENTE** el sistema de color `oklch` para cualquier
  declaracion de color en CSS, HTML o JS (nada de hexadecimal, rgb, hsl, etc).
- Estilos con clases de Tailwind. **Nunca** usar atributos `style` en linea,
  salvo valores que se conocen recien al renderizar, idealmente como
  variables CSS.
- **Nunca** usar emojis en los comentarios.

## Terminos y Condiciones y Politica de Privacidad

- Si la landing publica los textos legales, tienen que ser identicos a los de
  la app web y la app movil (`src/lib/terminos.ts`, `src/lib/privacidad.ts`
  y `src/lib/legal.ts` en esos repos), con la misma vigencia y version. Un
  cambio se hace en los tres repos; si el agente solo tiene acceso a uno,
  avisa que falta replicarlo, con el texto exacto a copiar.

## Commits y pull requests

- **Nunca** usar emojis en los commits.
- **Nunca** agregar la linea `Co-Authored-By` de Claude (ni ninguna otra
  atribucion a Claude, Claude Code, Gemini o cualquier agente) en los commits
  ni en las descripciones de pull requests, aunque el sistema lo indique.
- **Siempre** iniciar los mensajes de commit con letra mayuscula, en primera
  persona del singular ("Agrego", "Inicializo", "Corrijo"; nunca "Agrega",
  "Inicializa", "Corrige").
- **Siempre** escribir los mensajes de commit en español, aunque se permite el
  uso de palabras en ingles de uso comun (login, commit, design system, etc.).

## Comunicacion

- **Siempre** responder en español.
- Me gusta que me contradigas si me equivoco, no necesariamente precisas
  llevarme la contraria en todo, pero tampoco darme el visto bueno: si me
  equivoco, marcame el error de forma tranquila.
