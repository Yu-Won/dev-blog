export const SiteConfig = {
	url: "https://www.yu-won.blog",
	pathPrefix: "/1",
	title: "Yu-Won dev-blog",
	subtitle: "dev-blog",
	copyright: "Yu-Won © All rights reserved.",
	disqusShortname: "",
	googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
	menu: [
		{
			label: "Tags",
			path: "/tags",
		},
	],
	author: {
		name: "Yu-Won",
		photo: "/public/images/profile.jpeg",
		bio: "Frontend Engineer",
		contacts: {
			email: "shallwedance0419@gmail.com",
			github: "https://github.com/Yu-Won",
			linkedin: "https://www.linkedin.com/in/yu-won",
		},
	},
};

export const defaultImagePlaceHolder =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAADICAQAAABvh7MEAAABjklEQVR42u3SAQ0AAAjDMO5fAKYQhQMEkFbCsvQUvBFDY2gwNBgaDI2hwdBgaDA0GBpDg6HB0GBoMDSGBkODocHQYGgMDYYGQ4OhwdAYGgwNhgZDg6ExNBgaDA2GBkNjaDA0GBoMjaHB0GBoMDQYGkODocHQYGgwNIYGQ4OhwdBgaAwNhgZDg6HB0BgaDA2GBkODoTE0GBoMDYYGQ2NoMDQYGgwNhsbQYGgwNBgaQ4OhwdBgaDA0hgZDg6HB0GBoDA2GBkODocHQGBoMDYYGQ4OhMTQYGgwNhgZDY2gwNBgaDA2GxtBgaDA0GBpDi4ChwdBgaDA0hgZDg6HB0GBoDA2GBkODocHQGBoMDYYGQ4OhMTQYGgwNhgZDY2gwNBgaDA2GxtBgaDA0GBoMjaHB0GBoMDSGBkODocHQYGgMDYYGQ4OhwdAYGgwNhgZDg6ExNBgaDA2GBkNjaDA0GBoMDYbG0GBoMDQYGgyNocHQYGgwNIY2NIYGQ4OhwdAYGgwNhgZDg6ExNBgaDA2GhtsCeNsWMJEUCwgAAAAASUVORK5CYII=";

export const PAGE_COUNT = 3;

export const PAGE_LIST_COUNT = 5;
