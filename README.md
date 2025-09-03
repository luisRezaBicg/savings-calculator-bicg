# BICG Landing - Vite + React + Tailwind (TypeScript, GitHub Pages ready)

## Pasos de uso
1) Instala dependencias:
   ```bash
   npm install
   ```
2) Arranca en local:
   ```bash
   npm run dev
   ```
3) Ajusta la base para GitHub Pages (opcional): edita `vite.config.ts` y descomenta `base: '/NOMBRE-DEL-REPO/',`.
4) Compila:
   ```bash
   npm run build
   ```
5) (Opcional) Despliega a GitHub Pages:
   - Asegúrate de tener el remoto configurado con tu repo.
   - Ejecuta:
     ```bash
     npm run deploy
     ```
   - En GitHub > Settings > Pages selecciona la rama `gh-pages`.

## Notas
- Este proyecto incluye componentes UI ligeros en `src/components/ui/` con la misma API usada en tu App, para evitar instalar shadcn/ui.
- Se usan `lucide-react` y `recharts` como en tu código original.
- El alias `@` apunta a `src/`.
