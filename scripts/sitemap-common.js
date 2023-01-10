const fs = require("fs");
const prettier = require("../.yarn/sdks/prettier");
const { sync } = require("glob");
const frontMatter = require("front-matter");

const postPaths = `${process.cwd()}posts`.replace("scripts", "");
const url = "https://www.yu-won.blog";
const getDate = new Date().toISOString();

const getAllPosts = async () => {
	const files = sync(`${postPaths}/**/*.md*`).reverse();
	return files.reduce((acc, cur) => {
		const file = fs.readFileSync(cur, { encoding: "utf8" });

		const { attributes } = frontMatter(file);
		const fm = attributes;
		const { tags, published } = fm;

		if (published) {
			const tagList = tags.map((tag) => tag.trim());

			const slug = cur
				.slice(cur.indexOf("/posts") + "posts".length + 1)
				.replace(".mdx", "")
				.replace(".md", "");

			const result = {
				slug,
				tagList,
			};
			acc.push(result);
		}
		return acc;
	}, []);
};

const getAllTagsFromPosts = async () => {
	const tags = (await getAllPosts()).reduce((acc, cur) => {
		cur.tagList.forEach((tag) => {
			acc.push(tag);
		});
		return acc;
	}, []);

	const tagWithCount = [...new Set(tags)].map((tag) => ({
		tag,
		count: tags.filter((t) => t === tag).length,
	}));
	return tagWithCount.sort((a, b) => b.count - a.count);
};

(async () => {
	const allPost = await getAllPosts();
	const allTags = await getAllTagsFromPosts();

	const tagPage = allTags.map((value) => ({
		tag: value.tag,
		page: Math.ceil(value.count / 3),
	}));
	const allTagPath = [];

	tagPage.forEach((tags) => {
		while (tags.page) {
			allTagPath.push({ id: tags.tag, page: tags.page.toString() });
			tags.page--;
		}
	});

	const pages = [
		...allPost.map((value) => `${url}/post${value.slug}`),
		...allPost
			.filter((value, index) => (index / 3) % 1 === 0)
			.map((value, index) => `${url}/${index + 1}`),
		...allTagPath.map((value) => `${url}/tag/${value.id}/${value.page}`),
		`${url}`,
		`${url}/about`,
	];

	const pageListSitemap = `
  ${pages
		.map((page) => {
			return `
      <url>
        <loc>${page}</loc>
        <lastmod>${getDate}</lastmod>
      </url>
    `;
		})
		.join("")}`;

	const generatedSitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
      <urlset 
		xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
		xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
		xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
		http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"
	  >
        ${pageListSitemap}
      </urlset>
  `;

	fs.writeFileSync(
		"../public/sitemap/sitemap.xml",
		generatedSitemap.trim(),
		"utf8",
	);
})();
