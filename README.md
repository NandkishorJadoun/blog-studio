# Blog Studio

A modern, streamlined blog editing and management web application utilizing the React ecosystem, rich text editing, and rapid development tooling. 

## Table of Contents

- [Project Features](#project-features)
- [Technology Stack](#technology-stack)
- [Directory Structure](#directory-structure)
- [Scripts](#scripts)
- [How to Run](#how-to-run)

## Project Features

- **React SPA Architecture**: Built on React 19, using functional components and hooks for a performant experience.
- **Rich Text Publishing**: Integrated WYSIWYG editor via TinyMCE for easy blog creation.
- **Routing**: Page navigation using `react-router`.
- **Visual Feedback**: Top loading progress bar provided by `react-top-loading-bar`.
- **Modern Tooling**: Powered by Vite for fast development and building processes.
- **Linting**: ESLint configuration for code consistency and best practices.
- **Componentized Design**: Reusable, maintainable components structure for rapid feature delivery.

## Technology Stack

**Languages Used**
- JavaScript
- CSS
- HTML

**Major Packages**
- [`react`](https://www.npmjs.com/package/react): UI library for building user interfaces.
- [`react-dom`](https://www.npmjs.com/package/react-dom): DOM bindings for React.
- [`react-router`](https://www.npmjs.com/package/react-router): Declarative routing.
- [`@tinymce/tinymce-react`](https://www.npmjs.com/package/@tinymce/tinymce-react): The official TinyMCE React integration for a rich text editor.
- [`react-top-loading-bar`](https://www.npmjs.com/package/react-top-loading-bar): Progress loading bar at page top.

**Dev Tools**
- [`vite`](https://vitejs.dev/): Fast build tool and dev server.
- [`@vitejs/plugin-react`](https://www.npmjs.com/package/@vitejs/plugin-react): Vite plugin for React fast refresh.
- [`eslint`, `@eslint/js`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `globals`]: For code linting and formatting.

## Directory Structure

```
.
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── src
│   ├── AppLayout.jsx
│   ├── main.jsx
│   ├── routes.jsx
│   ├── assets/
│   └── components/
└── README.md
```

**Key files/folders**:
- `src/AppLayout.jsx`: Application layout and structure.
- `src/main.jsx`: Entry point for the React app.
- `src/routes.jsx`: Route definitions and route-based component rendering.
- `src/components/`: Shared and feature-based React components.
- `src/assets/`: Static assets (images, fonts, etc.).
- `.gitignore`: Files/folders ignored by Git.
- `eslint.config.js`: Custom ESLint configuration.
- `vite.config.js`: Configuration for Vite.

## Scripts

Define project behaviors and automation:

- `dev`: Start the app in development mode using Vite.
- `build`: Generate a production-optimized build.
- `lint`: Check project code for linting issues.
- `preview`: Locally preview the built production app.

Run with:

```sh
npm run dev      # start development server
npm run build    # build for production
npm run lint     # run eslint
npm run preview  # preview production build
```

## How to Run

1. **Install dependencies**:
   ```sh
   npm install
   ```
2. **Start the development server**:
   ```sh
   npm run dev
   ```
3. **Visit**: `http://localhost:5173` (or indicated port)

---

**Made with React, Vite, and passion.**