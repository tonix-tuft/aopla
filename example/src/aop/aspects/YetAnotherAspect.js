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
  aroundCall,
  aroundGet,
  aroundSet
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
  Tag19,
  Tag26,
  PropTag4,
  PropTag6,
  PropTag7,
  PropTag5
} from "../tags";
import { isEmpty } from "js-utl";

console.log("importing YetAnotherAspect");

class YetAnotherAspect {
  @afterCall(Tag3)
  afterCallingMethodWithTag3(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("YetAnotherAspect.afterCallingMethodWithTag3()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
    });
    // ...
  }

  @afterCall(Tag4)
  afterCallingMethodWithTag4(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("YetAnotherAspect.afterCallingMethodWithTag4()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
    });
    // ...
  }

  @afterCall(Tag5)
  afterCallingMethodWithTag5(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("YetAnotherAspect.afterCallingMethodWithTag5()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
    });
    // ...
  }

  @afterCall(Tag6)
  afterCallingMethodWithTag6(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("YetAnotherAspect.afterCallingMethodWithTag6()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
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
  onFinallyFromMethodWithTag17(paramsObj) {
    console.warn("YetAnotherAspect.onFinallyFromMethodWithTag17()", paramsObj);
    // ...
    return (
      paramsObj.returnValue ||
      paramsObj.value ||
      "YetAnotherAspect.onFinallyFromMethodWithTag17() return value"
    );
  }

  @onFinally(Tag19, { aroundCall })
  onFinallyFromMethodWithTag19(paramsObj) {
    console.warn("YetAnotherAspect.onFinallyFromMethodWithTag19()", paramsObj);
    // ...
    // return null; // Try to uncomment this line while commenting the lines below.
    return void 0; // Try to uncomment this line while commenting the line above and the lines below.
    /*
    return (
      paramsObj.returnValue ||
      paramsObj.value ||
      "YetAnotherAspect.onFinallyFromMethodWithTag19() return value"
    );
    //*/
  }

  @aroundCall(Tag26)
  aroundCallingMethodWithTag26(paramsObj) {
    {
      // around before
      console.warn(
        "YetAnotherAspect.aroundCallingMethodWithTag26() around before",
        paramsObj
      );
      // ...
    }
    console.log(
      "YetAnotherAspect.aroundCallingMethodWithTag26() not proceeding and returning 123"
    );
    return 123;
    // const returnValue = paramsObj.proceed();
    // {
    //   const {
    //     argumentsList,
    //     effectiveArgumentsList,
    //     hasPerformedUnderlyingOperation,
    //     hasEffectivelyPerformedUnderlyingOperation,
    //     ...rest
    //   } = paramsObj;
    //   // around after
    //   console.warn(
    //     "YetAnotherAspect.aroundCallingMethodWithTag26() around after",
    //     paramsObj,
    //     {
    //       argumentsList,
    //       effectiveArgumentsList,
    //       hasPerformedUnderlyingOperation,
    //       hasEffectivelyPerformedUnderlyingOperation,
    //       ...rest
    //     },
    //     {
    //       returnValue
    //     }
    //   );
    //   // ...
    // }

    // return returnValue;
  }

  @aroundGet(PropTag4)
  aroundGettingPropertyWithPropTag4(paramsObj) {
    console.warn(
      "YetAnotherAspect.aroundGettingPropertyWithPropTag4() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation,
      ...rest
    } = paramsObj;
    console.warn(
      "YetAnotherAspect.aroundGettingPropertyWithPropTag4() around after",
      paramsObj,
      {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation,
        value,
        ...rest
      }
    );
    return value;
  }

  @aroundGet(PropTag4)
  anotherAroundGettingPropertyWithPropTag4(paramsObj) {
    console.warn(
      "YetAnotherAspect.anotherAroundGettingPropertyWithPropTag4() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation,
      ...rest
    } = paramsObj;
    console.warn(
      "YetAnotherAspect.anotherAroundGettingPropertyWithPropTag4() around after",
      paramsObj,
      {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation,
        value,
        ...rest
      }
    );
    return value;
  }

  @aroundGet(PropTag6)
  aroundGettingPropertyWithPropTag6(paramsObj) {
    console.warn(
      "YetAnotherAspect.aroundGettingPropertyWithPropTag6() around before",
      paramsObj
    );
    // const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation,
      ...rest
    } = paramsObj;
    console.warn(
      "YetAnotherAspect.aroundGettingPropertyWithPropTag6() around after",
      paramsObj,
      {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation,
        ...rest
      }
    );
    // return value;
    return 999;
  }

  @aroundGet(PropTag7)
  aroundGettingPropertyWithPropTag7(paramsObj) {
    console.warn(
      "YetAnotherAspect.aroundGettingPropertyWithPropTag7() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation
    } = paramsObj;
    console.warn(
      "YetAnotherAspect.aroundGettingPropertyWithPropTag7() around after",
      paramsObj,
      {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation,
        value
      }
    );
    return value;
  }

  @aroundSet(PropTag5)
  aroundSettingPropertyWithPropTag5(paramsObj) {
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "YetAnotherAspect.aroundSettingPropertyWithPropTag5() around before",
        paramsObj,
        {
          hasPerformedUnderlyingOperation,
          hasEffectivelyPerformedUnderlyingOperation,
          previousValue: paramsObj.previousValue,
          value: paramsObj.value,
          effectiveValue: paramsObj.effectiveValue,
          effectiveUnderlyingValue: paramsObj.effectiveUnderlyingValue
        }
      );
    }
    paramsObj.proceed();
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "YetAnotherAspect.aroundSettingPropertyWithPropTag5() around after",
        paramsObj,
        {
          hasPerformedUnderlyingOperation,
          hasEffectivelyPerformedUnderlyingOperation,
          previousValue: paramsObj.previousValue,
          value: paramsObj.value,
          effectiveValue: paramsObj.effectiveValue,
          effectiveUnderlyingValue: paramsObj.effectiveUnderlyingValue
        }
      );
    }
  }

  @aroundSet(PropTag6)
  aroundSettingPropertyWithPropTag6(paramsObj) {
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "YetAnotherAspect.aroundSettingPropertyWithPropTag6() around before",
        paramsObj,
        {
          hasPerformedUnderlyingOperation,
          hasEffectivelyPerformedUnderlyingOperation,
          previousValue: paramsObj.previousValue,
          value: paramsObj.value,
          effectiveValue: paramsObj.effectiveValue,
          effectiveUnderlyingValue: paramsObj.effectiveUnderlyingValue
        }
      );
    }
    paramsObj.proceed();
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "YetAnotherAspect.aroundSettingPropertyWithPropTag6() around after",
        paramsObj,
        {
          hasPerformedUnderlyingOperation,
          hasEffectivelyPerformedUnderlyingOperation,
          previousValue: paramsObj.previousValue,
          value: paramsObj.value,
          effectiveValue: paramsObj.effectiveValue,
          effectiveUnderlyingValue: paramsObj.effectiveUnderlyingValue
        }
      );
    }
  }
}

export default YetAnotherAspect;
