/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  beforeGet,
  afterCall,
  afterFulfillment,
  afterGet,
  afterRejection,
  afterSet,
  onCatch,
  onFinally,
  beforeCall,
} from "aopla";
import SomeService from "../../services/SomeService";
import {
  PropTag1,
  PropTag2,
  PropTag3,
  StaticPropTag2,
  Tag1,
  Tag10,
  Tag12,
  Tag13,
  Tag15,
  Tag17,
  Tag18,
  Tag2,
  Tag20,
  Tag3,
  Tag7,
  Tag9,
} from "../tags";

console.log("importing AnotherAspect");

class AnotherAspect {
  @afterCall(Tag2)
  afterCallingMethodWithTag2(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("AnotherAspect.afterCallingMethodWithTag2()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
    });
    // ...
  }

  @afterCall(Tag3)
  afterCallingMethodWithTag3(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("AnotherAspect.afterCallingMethodWithTag3()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
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

  @afterRejection(Tag10)
  afterRejectingPromiseReturnedByAMethodWithTag10(paramsObj) {
    console.warn(
      "AnotherAspect.afterRejectingPromiseReturnedByAMethodWithTag10()",
      paramsObj
    );
    // ...
  }

  @afterSet(PropTag1)
  afterSettingPropertyWithPropTag1(paramsObj) {
    console.warn("AnotherAspect.afterSettingPropertyWithPropTag1()", paramsObj);
    // ...
  }

  @afterSet(PropTag1)
  anotherAfterSettingPropertyWithPropTag1(paramsObj) {
    console.warn(
      "AnotherAspect.anotherAfterSettingPropertyWithPropTag1()",
      paramsObj
    );
    // ...
  }

  @afterSet(PropTag2)
  afterSettingPropertyWithPropTag2(paramsObj) {
    console.warn("AnotherAspect.afterSettingPropertyWithPropTag2()", paramsObj);
    // ...
  }

  @onCatch(Tag12)
  onCatchingFromMethodWithTag12(paramsObj) {
    console.warn("AnotherAspect.onCatchingFromMethodWithTag12()", paramsObj);
    // ...
    throw new Error("AnotherAspect.onCatchingFromMethodWithTag12() error");
  }

  @afterCall(Tag15)
  @Tag13({ shouldReturnFromAspect: true })
  afterCallingMethodWithTag15(paramsObj) {
    console.warn("AnotherAspect.afterCallingMethodWithTag15()", paramsObj);
    // ...
    throw new Error("AnotherAspect.afterCallingMethodWithTag15() error");
  }

  @onFinally(Tag17, { afterCall })
  anotherOnFinallyFromMethodWithTag17(paramsObj) {
    console.warn(
      "AnotherAspect.anotherOnFinallyFromMethodWithTag17()",
      paramsObj
    );
    // ...
    return (
      paramsObj.returnValue ||
      paramsObj.value ||
      "AnotherAspect.anotherOnFinallyFromMethodWithTag17() return value"
    );
  }

  @onFinally(Tag18, { afterCall })
  onFinallyFromMethodWithTag18(paramsObj) {
    console.warn("AnotherAspect.onFinallyFromMethodWithTag18()", paramsObj);
    // ...
    return (
      paramsObj.returnValue ||
      paramsObj.value ||
      "AnotherAspect.onFinallyFromMethodWithTag18() return value"
    );
  }

  @onFinally(Tag20, { afterGet })
  onFinallyAfterGettingPropertyWithTag20(paramsObj) {
    console.warn(
      "AnotherAspect.onFinallyAfterGettingPropertyWithTag20()",
      paramsObj
    );
    // ...
  }
}

export default AnotherAspect;
