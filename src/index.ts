import { jsx } from "./jsx";
import { Component, ConfigOptions } from "panel";

interface MyAppState {}
interface MyAppAttrs {}

class MyApp extends Component<MyAppState, {}, unknown, MyAppAttrs> {
  static get attrsSchema() {
    return {
      ...super.attrsSchema
    };
  }

  get config(): ConfigOptions<MyAppState, {}, MyAppAttrs> {
    return {
      defaultState: {},
      helpers: {},
      template: () => <h1>Hello</h1>
    };
  }
}

customElements.define("my-app", MyApp);
