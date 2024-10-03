const fs = require("fs");
const path = require("path");
const prettier = require("../.yarn/sdks/prettier");
const { sync } = require("glob");
const frontMatter = require("front-matter");

const url = "https://www.yu-won.blog";
const getDate = new Date().toISOString();

// 절대 경로로 posts 폴더 경로 설정
const postPaths = path.resolve(__dirname, "../posts");

const getAllPosts = async () => {
	// posts 경로에서 모든 md, mdx 파일을 가져옴
	const files = sync(`${postPaths}/**/*.md*`).reverse();
	return files.reduce((acc, cur) => {
		const file = fs.readFileSync(cur, { encoding: "utf8" });

		const { attributes } = frontMatter(file);
		const fm = attributes;
		const { tags, published } = fm;

		if (published) {
			const tagList = tags.map((tag) => tag.trim());

			// 파일 경로에서 slug 생성
			const slug = cur
				.slice(postPaths.length + 1)  // posts 폴더 경로 이후의 경로만 슬러그로 사용
				.replace(/\\/g, "/")  // Windows 경로 호환성을 위해 백슬래시를 슬래시로 변경
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

	// post 경로와 페이지 경로를 모두 결합
	const pages = [
		...allPost.map((value) => `${url}/post/${value.slug}`),  // posts 폴더 내 파일의 슬러그를 포함한 URL
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

	const sitemapDir = path.resolve(__dirname, "../public/sitemap");
	if (!fs.existsSync(sitemapDir)) {
		fs.mkdirSync(sitemapDir, { recursive: true });
	}

	fs.writeFileSync(
		path.join(sitemapDir, "sitemap.xml"),
		generatedSitemap.trim(),
		"utf8",
	);
})();
