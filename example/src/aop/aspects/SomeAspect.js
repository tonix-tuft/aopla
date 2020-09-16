/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  beforeCall,
  afterCall,
  aroundCall,
  afterFulfillment,
  afterRejection,
  whilePending,
  beforeGet,
  afterGet,
  aroundGet,
  beforeSet,
  afterSet,
  aroundSet,
  meta,
  targetClass,
  AOPLA_TAG_DATA_PROP,
} from "aopla";
import SomeService from "../../services/SomeService";
import {
  Tag1,
  Tag2,
  Tag3,
  Tag4,
  Tag5,
  Tag6,
  ClassTag1,
  PropTag1,
  PropTag2,
  Tag7,
} from "../tags";

// eslint-disable-next-line no-console
console.log("importing SomeAspect");

class SomeAspect {
  @afterCall(Tag1)
  afterCallingMethodWithTag1({ tag, tagParams, thisArg, argumentsList }) {
    console.warn("SomeAspect.afterCallingMethodWithTag1()", this, {
      tag,
      tagParams,
      thisArg,
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
      argumentsList,
    });
    // ...
  }

  @afterCall(Tag2)
  afterCallingMethodWithTag2({ tag, tagParams, thisArg, argumentsList }) {
    const [{ abc, def }, ...rest] = tagParams;
    console.warn(
      "SomeAspect.afterCallingMethodWithTag2()",
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

  @afterFulfillment(Tag7)
  afterFulfillingPromiseReturnedByAMethodWithTag7(paramsObj) {
    console.warn(
      "SomeAspect.afterFulfillingPromiseReturnedByAMethodWithTag7()",
      paramsObj
    );
    // ...
  }

  @afterGet(PropTag1)
  afterGettingPropertyWithTagPropTag1(paramsObj) {
    console.warn("SomeAspect.afterGettingPropertyWithPropTag1()", paramsObj);
    // ...
  }

  @afterGet(PropTag2)
  afterGettingPropertyWithTagPropTag2(paramsObj) {
    console.warn("SomeAspect.afterGettingPropertyWithPropTag2()", paramsObj);
    // ...
  }
}

export default SomeAspect;
