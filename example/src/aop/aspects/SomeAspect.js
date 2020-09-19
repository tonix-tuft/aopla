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
  onCatch,
  meta,
  targetClass,
  onFinally,
  AOPLA_TAG_DATA_PROP
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
  Tag8,
  Tag9,
  StaticPropTag1,
  PropTag3,
  Tag13,
  Tag14,
  Tag17,
  Tag18,
  Tag20
} from "../tags";

// eslint-disable-next-line no-console
console.log("importing SomeAspect");

class SomeAspect {
  @afterCall(Tag1)
  afterCallingMethodWithTag1(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("SomeAspect.afterCallingMethodWithTag1()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
    });
    // ...
  }

  @afterCall(Tag2)
  afterCallingMethodWithTag2(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("SomeAspect.afterCallingMethodWithTag2()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
    });
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

  @afterRejection(Tag9)
  afterRejectingPromiseReturnedByAMethodWithTag9(paramsObj) {
    console.warn(
      "SomeAspect.afterRejectingPromiseReturnedByAMethodWithTag9()",
      paramsObj
    );
    // ...
  }

  @afterSet(StaticPropTag1)
  afterSettingPropertyWithStaticPropTag1(paramsObj) {
    console.warn(
      "SomeAspect.afterSettingPropertyWithStaticPropTag1()",
      paramsObj
    );
    // ...
  }

  @afterSet(PropTag2)
  afterSettingPropertyWithPropTag2(paramsObj) {
    console.warn("SomeAspect.afterSettingPropertyWithPropTag2()", paramsObj);
    // ...
  }

  @afterSet(PropTag3)
  afterSettingPropertyWithPropTag3(paramsObj) {
    console.warn("SomeAspect.afterSettingPropertyWithPropTag3()", paramsObj);
    // ...
  }

  @onCatch(Tag13)
  onCatchingFromMethodWithTag13(paramsObj) {
    console.warn("SomeAspect.onCatchingFromMethodWithTag13()", paramsObj);
    // ...
    throw paramsObj.e;
  }

  @Tag13()
  @afterCall(Tag14)
  afterCallingMethodWithTag14(paramsObj) {
    console.warn("SomeAspect.afterCallingMethodWithTag14()", paramsObj);
    // ...
    throw new Error("SomeAspect.afterCallingMethodWithTag14() error");
  }

  @onFinally(Tag17, { afterCall })
  onFinallyFromMethodWithTag17(paramsObj) {
    console.warn("SomeAspect.onFinallyFromMethodWithTag17()", paramsObj);
    // ...
    return (
      paramsObj.returnValue ||
      paramsObj.value ||
      "SomeAspect.onFinallyFromMethodWithTag17() return value"
    );
  }

  @onFinally(Tag17, { afterCall })
  anotherOnFinallyFromMethodWithTag17(paramsObj) {
    console.warn("SomeAspect.anotherOnFinallyFromMethodWithTag17()", paramsObj);
    // ...
    return (
      paramsObj.returnValue ||
      paramsObj.value ||
      "SomeAspect.anotherOnFinallyFromMethodWithTag17() return value"
    );
  }

  @onFinally(Tag18, { afterCall })
  onFinallyFromMethodWithTag18(paramsObj) {
    console.warn("SomeAspect.onFinallyFromMethodWithTag18()", paramsObj);
    // ...
    return (
      paramsObj.returnValue ||
      paramsObj.value ||
      "SomeAspect.onFinallyFromMethodWithTag18() return value"
    );
  }

  @onFinally(Tag20, { aroundCall })
  onFinallyAfterCallingMethodWithTag20(paramsObj) {
    console.warn(
      "SomeAspect.onFinallyAfterCallingMethodWithTag20()",
      paramsObj
    );
    // ...
    return void 0; // This is considered as if the finally block didn't return anything.
    // return null; // This would override the return value.
  }
}

export default SomeAspect;
