# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.
You can also try [the experimental native React Compiler support in plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md#rust-react-compiler) by using `compiler: true` in the plugin options instead of using the Babel plugin.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

## Admin Dashboard

The homepage content can be edited at `/admin`. For a quick local test, use the development-only demo below. Shared publishing requires a Supabase project.

### Local Demo

The workspace `.env.local` enables a local-only admin demo. Restart Vite after changing it, then open `http://localhost:5173/admin` and use:

- Email: `demo@example.com`
- Password: `demo-password`

Demo edits are stored in this browser's local storage and can be previewed on the homepage in the same browser. They are not secure, shared, or published to visitors. The demo login is disabled in production builds.

To turn off the demo, set `VITE_ADMIN_DEMO=false` in `.env.local` and restart Vite.

### Supabase Setup

1. Create a Supabase project and copy `.env.example` to `.env.local`.
2. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env.local`. Use the project's publishable/anon key only; never put a service-role key in a Vite environment variable.
3. Run the SQL in `supabase/schema.sql` in the Supabase SQL Editor. This creates the public-read `portfolio-assets` and `portfolio-videos` buckets; only portfolio admins can upload files.
4. In Supabase Authentication, create the admin user and disable public sign-ups.
5. Find that user's UUID in Authentication > Users, then run this in the SQL Editor, replacing the placeholder:

  ```sql
  insert into public.portfolio_admins (user_id)
  values ('YOUR_AUTH_USER_UUID');
  ```

6. Add the same environment variables to the production hosting provider and redeploy.
7. Visit `/admin`, sign in with the created admin account, edit sections, and publish.

The content table is publicly readable so visitors can render the portfolio. Row-level security only permits accounts explicitly listed in `portfolio_admins` to insert or update it. Admin membership must only be changed from the Supabase SQL Editor.

The profile photo is uploaded from `/admin` and appears on the portfolio, the introduction avatar, and resume downloads. The introduction greeting and message are editable in the Admin dashboard; the popup appears on the first visit in each browser tab and can be reopened from the avatar. The optional Video Introduction section has its own Admin enable switch and accepts MP4/WebM files up to 100 MB; the section stays hidden unless enabled and a video is uploaded. Run the SQL schema again after pulling storage changes. PDF and Word resume files are generated from the currently published portfolio content, so publish Admin edits before downloading an updated copy.
