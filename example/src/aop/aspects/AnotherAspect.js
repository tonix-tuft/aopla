/* eslint-disable no-unused-vars */
import { beforeGet, afterCall } from "aopla";
import { PropTag1, Tag2 } from "../tags";

// eslint-disable-next-line no-console
console.log("importing AnotherAspect...");

class AnotherAspect {
  @afterCall(Tag2)
  afterCallingMethodWithTag2({ tagParams }) {
    const [{ abc, def }] = tagParams;
    // eslint-disable-next-line no-console
    console.warn("AnotherAspect.afterCallingMethodWithTag2()", { abc, def });
    // ...
  }

  // @beforeGet(PropTag1)
  // beforeGettingPropertyWithPropTag1AnotherAspect() {
  //   // ...
  // }
}

export default AnotherAspect;
