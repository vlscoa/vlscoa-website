module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/documents");
  eleventyConfig.addPassthroughCopy("src/admin");
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/_headers");

  // Served via passthrough copy only — keep out of the template build,
  // collections, and sitemap.
  eleventyConfig.ignores.add("src/admin/index.html");
  eleventyConfig.ignores.add("src/documents/README.md");

  // Build-time year for the footer (no client-side JS).
  eleventyConfig.addGlobalData("buildYear", () => new Date().getFullYear());

  // Look up an instrument by id, e.g. "02.1"
  eleventyConfig.addFilter("instrument", (instruments, id) =>
    instruments.find((i) => i.id === id)
  );

  eleventyConfig.addFilter("isoDate", (d) =>
    d ? new Date(d).toISOString().slice(0, 10) : ""
  );
  eleventyConfig.addFilter("longDate", (d) =>
    d
      ? new Date(d).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
          timeZone: "UTC",
        })
      : ""
  );

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
};
