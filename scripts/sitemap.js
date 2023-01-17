const fs = require("fs");
const prettier = require("../.yarn/sdks/prettier");
const { sync } = require("glob");

const getDate = new Date().toISOString();
const url = "https://www.yu-won.blog";

const publicPath = `${process.cwd()}public`.replace("scripts", "");
console.log("path test", `${process.cwd()}`);

(async () => {
	const pages = await sync(`${publicPath}/sitemap/*.gz`);

	const sitemapIndex = `
  ${pages
		.map((page) => {
			const path = `${url}${page.split(`dev-blog/public`)[1]}`;

			return `
      <sitemap>
        <loc>${path}</loc>
        <lastmod>${getDate}</lastmod>
      </sitemap>
    `;
		})
		.join("")}
  `;

	const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemapIndex}
    </sitemapindex>
  `;

	fs.writeFileSync("../public/sitemap.xml", sitemap.trim(), "utf8");
})();
