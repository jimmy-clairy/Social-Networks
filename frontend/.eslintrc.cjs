module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.css'], // Ignore les fichiers CSS
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: {
    react: { version: '18.2' },
    tailwindcss: {
      // These are the default values but feel free to customize
      callees: ["classnames", "clsx", "ctl"],
      config: "tailwind.config.js",
      groups: defaultGroups, // imported from groups.js
      prependCustom: false,
      removeDuplicates: true,
      whitelist: []
    }
  },
  plugins: ['react-refresh', 'tailwindcss', 'eslint-plugin-tailwindcss'], // Ajouter le plugin eslint-plugin-tailwindcss
  rules: {
    'react/jsx-no-target-blank': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Configure les règles TailwindCSS
    'tailwindcss/classnames-order': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/no-contradicting-classname': 'off'
  },
}