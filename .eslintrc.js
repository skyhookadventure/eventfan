/**
 * Eslint config
 */
module.exports = {
  env: {
    node: true,
    jest: true,
  },
  settings: {
    react: {
      version: "latest"
    }
  },
  extends: [
    // Airbnb Typescript eslint from https://www.npmjs.com/package/eslint-config-airbnb-typescript
    "airbnb-base",
    "airbnb-typescript/base",
    // Standard eslint & typescript-eslint recommended
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    // Prettier added using default settings from https://github.com/prettier/eslint-plugin-prettier
    "plugin:prettier/recommended",
    // React
    'plugin:react/recommended',
    "plugin:react/jsx-runtime",
    'plugin:react-hooks/recommended',
    'plugin:testing-library/react',
    'plugin:jest-dom/recommended',
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json"],
    tsconfigRootDir: __dirname,
    ecmaVersion: 8,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  root: true,
  // As well as some specific preferences, the most intensive rules are disabled for performance reasons. This
  // reduces the linting time dramatically and thus improves the developer experience.
  rules: {
    "@typescript-eslint/no-implied-eval": "off", // Disabled for performance
    "@typescript-eslint/no-explicit-any": "off", // Disabled as many destinations require this
    "import/no-cycle": "off", // Disabled for performance
    "import/no-extraneous-dependencies": "off", // Disabled for performance
    "no-await-in-loop": "off", // Allow await in loops (sometime useful to track events in order)
    // Console logging is only an issue on frontend (not backend) code due to imperfect browser support. For the backend
    // it's actually recommended as a quick way of getting logs from lambdas to Cloudwatch.
    "no-console": "off",
    // Using new side effects is a key design pattern of aws-cdk and used heavily for our infrastructure
    "no-new": "off",
    radix: "off", // Disabled for performance
    "prettier/prettier": ["error", { printWidth: 80 }],
    "import/extensions": "off",
    "react/react-in-jsx-scope": "off" // Not needed with Vite
  },
};
