import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  // next/core-web-vitals already registers the jsx-a11y plugin, so we layer on
  // the full recommended ruleset (rules only — avoids re-declaring the plugin).
  { rules: { ...jsxA11y.flatConfigs.recommended.rules } },
  {
    ignores: [
      ".next/**",
      ".next.backup/**",
      "node_modules/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
];

export default eslintConfig;
