import { toH } from "hast-to-hyperscript";
import type { BlockContent, Root, Heading, Text } from "mdast";
import { toHast } from "mdast-util-to-hast";
import { h, TransitionGroup } from "vue";

function renderLog(con: BlockContent[]) {
  const root: Root = {
    type: "root",
    children: con,
  };

  const hast = toHast(root) as import("hast").Root;
  return toH(h, hast);
}

interface Props {
  contents: BlockContent[][];
}

function RenderLog(props: Props) {
  return h(
    TransitionGroup,
    { tag: "ul", name: "fade",  },
    props.contents?.map((v, i) =>
      h(
        "li",
        {
          key: ((v[0] as Heading).children[0] as Text).value,
          class: "version-block",
        },
        renderLog(v)
      )
    )
  );
}

export default RenderLog;
