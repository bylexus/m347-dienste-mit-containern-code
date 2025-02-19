const bodyParser = require("body-parser");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/**/*.jpg");
  eleventyConfig.addPassthroughCopy("src/**/*.png");
  eleventyConfig.addPassthroughCopy("src/**/*.gif");
  eleventyConfig.addPassthroughCopy("src/**/*.webp");
  eleventyConfig.addPassthroughCopy("src/**/*.svg");
  eleventyConfig.addPassthroughCopy("src/**/*.ttf");
  eleventyConfig.addPassthroughCopy("src/**/*.woff*");
  eleventyConfig.addPassthroughCopy("src/**/*.css");
  eleventyConfig.addPassthroughCopy("src/**/*.js");

  return {
    templateFormats: ["html", "liquid", "njk"],
    dir: {
      // ⚠️ These values are both relative to your input directory.
      input: "src",
      includes: "_includes",
      layouts: "_layouts",
      output: "site",
    },
  };
};
