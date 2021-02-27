const presets = [
  ["@babel/env", { "targets": { "node": "current" } }]
];

module.exports = { 
  presets,
  "plugins": [
    ["babel-plugin-root-import", {
      "rootPathSuffix": "src"
    }],
    "@babel/plugin-proposal-class-properties"
  ]
};