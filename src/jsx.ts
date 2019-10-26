import { vnode, VNode, VNodeData } from "snabbdom/vnode";
import { h, VNodeChildElement, ArrayOrElement } from "snabbdom/h";

export type VNodeChildren = ArrayOrElement<VNodeChildElement | boolean>;
export type FunctionComponent = (
  props: { [prop: string]: any },
  children?: VNode[]
) => VNode;

function flattenAndFilter(
  children: VNodeChildren[],
  flattened: VNode[]
): VNode[] {
  for (const child of children) {
    if (child !== undefined && child !== null && child !== false) {
      if (Array.isArray(child)) {
        flattenAndFilter(child, flattened);
      } else if (
        typeof child === "string" ||
        typeof child === "number" ||
        typeof child === "boolean"
      ) {
        flattened.push(
          vnode(undefined, undefined, undefined, String(child), undefined)
        );
      } else {
        flattened.push(child);
      }
    }
  }
  return flattened;
}

export function jsx(
  tag: string | FunctionComponent,
  data: VNodeData | null,
  ...children: VNodeChildren[]
): VNode {
  data = data || {};
  const flatChildren = flattenAndFilter(children, []);
  if (typeof tag === "function") {
    return tag(data, flatChildren);
  } else {
    if (
      flatChildren.length == 1 &&
      !flatChildren[0].sel &&
      flatChildren[0].text
    ) {
      return h(tag, data, flatChildren[0].text);
    } else {
      return h(tag, data, flatChildren);
    }
  }
}

export default jsx;
