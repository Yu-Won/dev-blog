import fs from 'fs';
import { sync } from "glob";
import frontMatter from "front-matter";
import { serialize } from "next-mdx-remote/serialize";
import { visit } from "unist-util-visit";
import remarkMath from "remark-math";
import toc from "remark-toc";
import slug from "remark-slug";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import prism from "rehype-prism-plus";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

import { FrontMatter, Post, TagWithCount } from "../types"

const DIR_REPLACE_STRING = "/posts"
export const POSTS_PATH =`${process.cwd()}${DIR_REPLACE_STRING}`

type TokenType =
  | 'tag'
  | 'attr-name'
  | 'attr-value'
  | 'deleted'
  | 'inserted'
  | 'punctuation'
  | 'keyword'
  | 'string'
  | 'function'
  | 'boolean'
  | 'comment'

const tokenClassNames: { [key in TokenType]: string } = {
  tag: 'text-code-red',
  'attr-name': 'text-code-yellow',
  'attr-value': 'text-code-green',
  deleted: 'text-code-red',
  inserted: 'text-code-green',
  punctuation: 'text-code-white',
  keyword: 'text-code-purple',
  string: 'text-code-green',
  function: 'text-code-blue',
  boolean: 'text-code-red',
  comment: 'text-gray-400 italic',
} as const

function parseCodeSnippet() {
  return (tree: any) => {
    visit(tree, 'element', (node: any) => {
      const [token, type]: [string, TokenType] = node.properties.className || []
      if (token === 'token') {
        node.properties.className = [tokenClassNames[type]]
      }
    })
  }
}

export const getAllPosts = async (): Promise<Post[]> => {
    const files = sync(`${POSTS_PATH}/**/*.md*`).reverse();
    console.log("files", files);
      const posts = files.reduce<Post[]>((prev, path) => {
      const file = fs.readFileSync(path, { encoding: 'utf8' });
      const { attributes, body } = frontMatter<FrontMatter>(file);
      const fm: FrontMatter = attributes;
      const { tags: fmTags, published, date } = fm;

      const slug = path
        .slice(path.indexOf(DIR_REPLACE_STRING) + DIR_REPLACE_STRING.length + 1)
        .replace('.mdx', '')
        .replace('.md', '')

      if (published) {
        const tags: string[] = (fmTags || []).map((tag: string) => tag.trim());

        const result: Post = {
          frontMatter: {
            ...fm,
            tags,
            date: new Date(date).toISOString().substring(0, 19),
          },
          body,
          fields: {
            slug,
          },
          path,
        }
        prev.push(result)
      }
      return prev
    }, [])
    .sort((a, b) => {
      if (a.frontMatter.date < b.frontMatter.date) {
        return 1
      }
      if (a.frontMatter.date > b.frontMatter.date) {
        return -1
      }
      return 0
    });
    console.log("get All posts", posts);

    return posts;
};

export const getAllTagsFromPosts = async (): Promise<Array<any>> => {
    const tags: string[] = (await getAllPosts()).reduce<string[]>((prev: string[], cur: Post) => {
        cur.frontMatter.tags.forEach((tag: string) => {
            prev.push(tag)
        });
        return prev;
    }, []);

    const tagWithCount = [...new Set(tags)].map((tag) => ({
        tag,
        count: tags.filter((t) => t === tag).length,
    }));
    return tagWithCount.sort((a, b) => b.count - a.count);
};

export const parseMarkdownToMdx = async (body: string, path: string) => {
  return serialize(body, {
    mdxOptions: {
      remarkPlugins: [remarkMath, toc, slug, remarkGfm],
      rehypePlugins: [
        rehypeKatex,
        prism,
        parseCodeSnippet,
        rehypeAutolinkHeadings,
        // imageMetadata(path),
      ],
    },
  })
};
