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
  aroundCall,
  aroundGet,
  aroundSet
} from "aopla";
import SomeService from "../../services/SomeService";
import {
  PropTag1,
  PropTag2,
  PropTag3,
  PropTag4,
  PropTag7,
  PropTag8,
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
  Tag21,
  Tag24,
  Tag29,
  Tag3,
  Tag7,
  Tag9
} from "../tags";

console.log("importing AnotherAspect");

class AnotherAspect {
  @afterCall(Tag2)
  afterCallingMethodWithTag2(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("AnotherAspect.afterCallingMethodWithTag2()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
    });
    // ...
  }

  @afterCall(Tag3)
  afterCallingMethodWithTag3(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("AnotherAspect.afterCallingMethodWithTag3()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
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

  @aroundCall(Tag21)
  aroundCallingMethodWithTag21(paramsObj) {
    {
      // around before
      console.warn(
        "AnotherAspect.aroundCallingMethodWithTag21() around before",
        paramsObj
      );
      // ...
    }
    const returnValue = paramsObj.proceed();
    {
      const {
        argumentsList,
        effectiveArgumentsList,
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation,
        ...rest
      } = paramsObj;
      // around after
      console.warn(
        "AnotherAspect.aroundCallingMethodWithTag21() around after",
        paramsObj,
        {
          argumentsList,
          effectiveArgumentsList,
          hasPerformedUnderlyingOperation,
          hasEffectivelyPerformedUnderlyingOperation,
          ...rest
        },
        {
          returnValue
        }
      );
      // ...
    }

    return returnValue;
  }

  @aroundCall(Tag24)
  aroundCallingMethodWithTag24(paramsObj) {
    {
      // around before
      console.warn(
        "AnotherAspect.aroundCallingMethodWithTag24() around before",
        paramsObj
      );
      // ...
    }
    const returnValue = paramsObj.proceed();
    {
      const {
        argumentsList,
        effectiveArgumentsList,
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation,
        ...rest
      } = paramsObj;
      // around after
      console.warn(
        "AnotherAspect.aroundCallingMethodWithTag24() around after",
        paramsObj,
        {
          argumentsList,
          effectiveArgumentsList,
          hasPerformedUnderlyingOperation,
          hasEffectivelyPerformedUnderlyingOperation,
          ...rest
        },
        {
          returnValue
        }
      );
      // ...
    }

    return returnValue;
  }

  @aroundGet(PropTag4)
  aroundGettingPropertyWithPropTag4(paramsObj) {
    console.warn(
      "AnotherAspect.aroundGettingPropertyWithPropTag4() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation,
      ...rest
    } = paramsObj;
    console.warn(
      "AnotherAspect.aroundGettingPropertyWithPropTag4() around after",
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

  @aroundGet(PropTag8)
  aroundGettingPropertyWithPropTag8(paramsObj) {
    console.warn(
      "AnotherAspect.aroundGettingPropertyWithPropTag8() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation
    } = paramsObj;
    console.warn(
      "AnotherAspect.aroundGettingPropertyWithPropTag8() around after",
      paramsObj,
      {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation,
        value
      }
    );
    return value;
  }

  @aroundSet(PropTag7)
  aroundSettingPropertyWithPropTag7(paramsObj) {
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "AnotherAspect.aroundSettingPropertyWithPropTag7() around before",
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
        "AnotherAspect.aroundSettingPropertyWithPropTag7() around after",
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

  @beforeCall(Tag29)
  beforeCallingMethodWithTag29(paramsObj) {
    const { thisArg } = paramsObj;
    console.warn("AnotherAspect.beforeCallingMethodWithTag29()", paramsObj, {
      "thisArg === SomeService": thisArg === SomeService,
      "thisArg instanceof SomeService": thisArg instanceof SomeService
    });
    // ...
  }
}

export default AnotherAspect;
