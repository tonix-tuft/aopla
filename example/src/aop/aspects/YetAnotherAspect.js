/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { beforeGet, afterCall } from "aopla";
import SomeService from "../../services/SomeService";
import { PropTag1, Tag2, Tag3, Tag4, Tag5, Tag6 } from "../tags";

console.log("importing YetAnotherAspect");

class YetAnotherAspect {
  @afterCall(Tag3)
  afterCallingMethodWithTag3({ tag, tagParams, thisArg, argumentsList }) {
    console.warn("YetAnotherAspect.afterCallingMethodWithTag3()", this, {
      tag,
      tagParams,
      thisArg,
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
      argumentsList,
    });
    // ...
  }

  @afterCall(Tag4)
  afterCallingMethodWithTag4({ tag, tagParams, thisArg, argumentsList }) {
    console.warn("YetAnotherAspect.afterCallingMethodWithTag4()", this, {
      tag,
      tagParams,
      thisArg,
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
      argumentsList,
    });
    // ...
  }

  @afterCall(Tag5)
  afterCallingMethodWithTag5({ tag, tagParams, thisArg, argumentsList }) {
    console.warn("YetAnotherAspect.afterCallingMethodWithTag5()", this, {
      tag,
      tagParams,
      thisArg,
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
      argumentsList,
    });
    // ...
  }

  @afterCall(Tag6)
  afterCallingMethodWithTag6({ tag, tagParams, thisArg, argumentsList }) {
    console.warn("YetAnotherAspect.afterCallingMethodWithTag6()", this, {
      tag,
      tagParams,
      thisArg,
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
      argumentsList,
    });
    // ...
  }
}

export default YetAnotherAspect;
