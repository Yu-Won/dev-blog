module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ["next/core-web-vitals", "prettier"],
  rules: {
    "react-hooks/rules-of-hooks": "warn",
  },
};
