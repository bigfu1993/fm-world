import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import autoImportGlobals from './.eslintrc-auto-import.json' with { type: 'json' }

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: { ...globals.browser, ...autoImportGlobals.globals },
    },
    rules: {
      // fetch-on-mount with a loading flag is the standard pattern for this admin's list pages
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
