/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { beforeGet, afterCall, afterFulfillment, afterGet } from "aopla";
import SomeService from "../../services/SomeService";
import {
  PropTag1,
  PropTag2,
  PropTag3,
  StaticPropTag2,
  Tag2,
  Tag3,
  Tag7,
} from "../tags";

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
  afterFulfillingPromiseReturnedByAMethodWithTag7(paramsObj) {
    console.warn(
      "AnotherAspect.afterFulfillingPromiseReturnedByAMethodWithTag7()",
      paramsObj
    );
    // ...
  }

  @afterGet(PropTag1)
  afterGettingPropertyWithTagPropTag1(paramsObj) {
    console.warn("AnotherAspect.afterGettingPropertyWithPropTag1()", paramsObj);
    // ...
  }

  @afterGet(StaticPropTag2)
  afterGettingPropertyWithStaticPropTag2(paramsObj) {
    console.warn(
      "AnotherAspect.afterGettingPropertyWithStaticPropTag2()",
      paramsObj
    );
    // ...
  }

  @afterGet(PropTag3)
  afterGettingPropertyWithTagPropTag3(paramsObj) {
    console.warn("AnotherAspect.afterGettingPropertyWithPropTag3()", paramsObj);
    // ...
  }
}

export default AnotherAspect;
