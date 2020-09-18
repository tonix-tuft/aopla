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
} from "aopla";
import SomeService from "../../services/SomeService";
import {
  PropTag1,
  PropTag2,
  StaticPropTag1,
  Tag2,
  Tag3,
  Tag4,
  Tag5,
  Tag6,
  Tag7,
  Tag8,
  Tag11,
  StaticPropTag2,
  Tag13,
  Tag16,
  Tag12,
  Tag17,
} from "../tags";
import { isEmpty } from "js-utl";

console.log("importing YetAnotherAspect");

class YetAnotherAspect {
  @afterCall(Tag3)
  afterCallingMethodWithTag3(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("YetAnotherAspect.afterCallingMethodWithTag3()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
    });
    // ...
  }

  @afterCall(Tag4)
  afterCallingMethodWithTag4(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("YetAnotherAspect.afterCallingMethodWithTag4()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
    });
    // ...
  }

  @afterCall(Tag5)
  afterCallingMethodWithTag5(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("YetAnotherAspect.afterCallingMethodWithTag5()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
    });
    // ...
  }

  @afterCall(Tag6)
  afterCallingMethodWithTag6(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("YetAnotherAspect.afterCallingMethodWithTag6()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService,
    });
    // ...
  }

  @afterFulfillment(Tag7)
  afterFulfillingPromiseReturnedByAMethodWithTag7(paramsObj) {
    console.warn(
      "YetAnotherAspect.afterFulfillingPromiseReturnedByAMethodWithTag7()",
      paramsObj
    );
    // ...
  }

  @afterFulfillment(Tag8)
  afterFulfillingPromiseReturnedByAMethodWithTag8(paramsObj) {
    console.warn(
      "YetAnotherAspect.afterFulfillingPromiseReturnedByAMethodWithTag8()",
      paramsObj
    );
    // ...
  }

  @afterGet(PropTag1)
  afterGettingPropertyWithTagPropTag1(paramsObj) {
    console.warn(
      "YetAnotherAspect.afterGettingPropertyWithPropTag1()",
      paramsObj
    );
    // ...
  }

  @afterGet(PropTag1)
  anotherAfterGettingPropertyWithTagPropTag1(paramsObj) {
    console.warn(
      "YetAnotherAspect.anotherAfterGettingPropertyWithTagPropTag1()",
      paramsObj
    );
    // ...
  }

  @afterGet(StaticPropTag1)
  afterGettingPropertyWithStaticPropTag1(paramsObj) {
    console.warn(
      "YetAnotherAspect.afterGettingPropertyWithStaticPropTag1()",
      paramsObj
    );
    // ...
  }

  @afterGet(PropTag2)
  afterGettingPropertyWithTagPropTag2(paramsObj) {
    console.warn(
      "YetAnotherAspect.afterGettingPropertyWithPropTag2()",
      paramsObj
    );
    // ...
  }

  @afterRejection(Tag11)
  afterRejectingPromiseReturnedByAMethodWithTag11(paramsObj) {
    console.warn(
      "YetAnotherAspect.afterRejectingPromiseReturnedByAMethodWithTag11()",
      paramsObj
    );
    // ...
  }

  @afterSet(StaticPropTag2)
  afterSettingPropertyWithStaticPropTag2(paramsObj) {
    console.warn(
      "YetAnotherAspect.afterSettingPropertyWithStaticPropTag2()",
      paramsObj
    );
    // ...
  }

  @onCatch(Tag13)
  onCatchingFromMethodWithTag13(paramsObj) {
    console.warn("YetAnotherAspect.onCatchingFromMethodWithTag13()", paramsObj);
    const { tagParams } = paramsObj;
    if (!isEmpty(tagParams)) {
      const [obj] = tagParams;
      if (obj.shouldReturnFromAspect) {
        return "obj.shouldReturnFromAspect && YetAnotherAspect.onCatchingFromMethodWithTag13() return value";
      }
      if (obj.shouldThrowFromAspect) {
        throw new Error(
          "YetAnotherAspect.onCatchingFromMethodWithTag13() error"
        );
      }
    }
    // ...
    throw paramsObj.e;
  }

  @Tag12
  @afterCall(Tag16)
  afterCallingMethodWithTag16(paramsObj) {
    console.warn("YetAnotherAspect.afterCallingMethodWithTag16()", paramsObj);
    // ...
    throw new Error("YetAnotherAspect.afterCallingMethodWithTag16() error");
  }

  @onFinally(Tag17, { afterCall })
  anotherOnFinallyFromMethodWithTag17(paramsObj) {
    console.warn(
      "YetAnotherAspect.anotherOnFinallyFromMethodWithTag17()",
      paramsObj
    );
    // ...
    return (
      paramsObj.returnValue ||
      paramsObj.value ||
      "YetAnotherAspect.anotherOnFinallyFromMethodWithTag17() default return value"
    );
  }
}

export default YetAnotherAspect;
