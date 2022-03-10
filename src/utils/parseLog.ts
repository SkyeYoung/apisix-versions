import remarkParse from "remark-parse";
import { unified } from "unified";
import type { BlockContent, Heading, Text } from "mdast";

const processor = unified().use(remarkParse).freeze();

function parseLog(content: string) {
  const parsedContent = processor.parse(content);

  const versionBlocks = parsedContent.children
    .reduce((res, v, idx, arr) => {
      if (v.type === "heading" && v.depth === 2) {
        res.push([v]);
      } else if (
        // just for skip not changelog block
        Array.isArray(res[res.length - 1]) &&
        // remove last `Back to Toc` block
        idx + 1 !== arr.length
      ) {
        res[res.length - 1].push(v as BlockContent);
      }

      return res;
    }, [] as BlockContent[][])
    .filter(
      (arr) =>
        // remove license
        arr.every((v) => v.type !== "html") &&
        // remove toc
        ((arr[0] as Heading).children[0] as Text).value !== "Table of Contents"
    );

  const LTSVersionBlocks = versionBlocks.filter(
    (arr) =>
      arr[1].type === "paragraph" &&
      arr[1].children[0].type === "strong" &&
      arr[1].children[0].children[0].type === "text" &&
      arr[1].children[0].children[0].value.startsWith(
        "This is an LTS maintenance release"
      )
  );

  return {
    versionBlocks,
    LTSVersionBlocks,
  };
}

export default parseLog;
