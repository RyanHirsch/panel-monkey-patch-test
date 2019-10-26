import { VNode, VNodeData } from "snabbdom/vnode";

declare global {
  namespace JSX {
    type Element = VNode;
    interface IntrinsicElements {
      [elemName: string]: VNodeData;
    }
  }
}
