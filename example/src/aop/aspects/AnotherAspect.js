/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { beforeGet, afterCall, afterFulfillment } from "aopla";
import SomeService from "../../services/SomeService";
import { PropTag1, Tag2, Tag3, Tag7 } from "../tags";

console.log("importing AnotherAspect");

class AnotherAspect {
  @afterCall(Tag2)
  afterCallingMethodWithTag2({ tag, tagParams, thisArg, argumentsList }) {
    const [{ abc, def }, ...rest] = tagParams;
    console.warn(
      "AnotherAspect.afterCallingMethodWithTag2()",
      this,
      { abc, def },
      rest,
      {
        tag,
        tagParams,
        thisArg,
        "thisArg === SomeService": thisArg === SomeService,
        "thisArg instanceof SomeService": thisArg instanceof SomeService,
        argumentsList,
      }
    );
    // ...
  }

  @afterCall(Tag3)
  afterCallingMethodWithTag3({ tag, tagParams, thisArg, argumentsList }) {
    console.warn("AnotherAspect.afterCallingMethodWithTag3()", this, {
      tag,
      tagParams,
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
      argumentsList,
    });
    // ...
  }

  @afterFulfillment(Tag7)
  afterFulfillmentOfAPromiseReturnedByAMethodWithTag7(paramsObj) {
    console.warn(
      "AnotherAspect.afterFulfillmentOfAPromiseReturnedByAMethodWithTag7()",
      paramsObj
    );
    // ...
  }
}

export default AnotherAspect;
