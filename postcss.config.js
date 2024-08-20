module.exports = {
  map: false,
  plugins: [
    "postcss-import",
    [
      "@csstools/postcss-global-data",
      {
        files: ["./src/styles/variables.css"],
      },
    ],
    [
      "postcss-preset-env",
      {
        stage: 0,
        browsers: "defaults",
        autoprefixer: {
          flexbox: "no-2009",
        },
      },
    ],
    "postcss-nesting",
  ],
}
