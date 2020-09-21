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
  onFinally
} from "aopla";
import {
  Tag1,
  Tag2,
  ClassTag1,
  PropTag1,
  PropTag2,
  Tag7,
  Tag9,
  StaticPropTag1,
  PropTag3,
  Tag13,
  Tag14,
  Tag17,
  Tag18,
  Tag20,
  Tag22,
  Tag23,
  Tag25,
  Tag27,
  PropTag5,
  PropTag7,
  PropTag4,
  PropTag8,
  Tag28,
  Tag29,
  PropTag9,
  PropTag10,
  PropTag11,
  Tag32
} from "../tags";

// eslint-disable-next-line no-console
console.log("importing SomeAspect");

class SomeAspect {
  @afterCall(Tag1)
  afterCallingMethodWithTag1(paramsObj) {
    console.warn("SomeAspect.afterCallingMethodWithTag1()", paramsObj);
    // ...
  }

  @afterCall(Tag2)
  afterCallingMethodWithTag2(paramsObj) {
    console.warn("SomeAspect.afterCallingMethodWithTag2()", paramsObj);
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

  @aroundCall(Tag22)
  aroundCallingMethodWithTag22(paramsObj) {
    {
      // around before
      console.warn(
        "SomeAspect.aroundCallingMethodWithTag22() around before",
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
        "SomeAspect.aroundCallingMethodWithTag22() around after",
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

  @aroundCall(Tag23)
  aroundCallingMethodWithTag23(paramsObj) {
    {
      // around before
      console.warn(
        "SomeAspect.aroundCallingMethodWithTag23() around before",
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
        "SomeAspect.aroundCallingMethodWithTag23() around after",
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

  @aroundCall(Tag25)
  aroundCallingMethodWithTag25(paramsObj) {
    {
      // around before
      console.warn(
        "SomeAspect.aroundCallingMethodWithTag25() around before",
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
        "SomeAspect.aroundCallingMethodWithTag25() around after",
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

  @aroundCall(Tag27)
  aroundCallingMethodWithTag27(paramsObj) {
    {
      // around before
      console.warn(
        "SomeAspect.aroundCallingMethodWithTag27() around before",
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
        "SomeAspect.aroundCallingMethodWithTag27() around after",
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

  @aroundGet(PropTag5)
  aroundGettingPropertyWithPropTag5(paramsObj) {
    console.warn(
      "SomeAspect.aroundGettingPropertyWithPropTag5() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation,
      ...rest
    } = paramsObj;
    console.warn(
      "SomeAspect.aroundGettingPropertyWithPropTag5() around after",
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

  @aroundGet(PropTag5)
  anotherAroundGettingPropertyWithPropTag5(paramsObj) {
    console.warn(
      "SomeAspect.anotherAroundGettingPropertyWithPropTag5() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation,
      ...rest
    } = paramsObj;
    console.warn(
      "SomeAspect.anotherAroundGettingPropertyWithPropTag5() around after",
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

  @aroundGet(PropTag5)
  yetAnotherAroundGettingPropertyWithPropTag5(paramsObj) {
    console.warn(
      "SomeAspect.yetAnotherAroundGettingPropertyWithPropTag5() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    console.log(value);
    return 890;
    // const {
    //   hasPerformedUnderlyingOperation,
    //   hasEffectivelyPerformedUnderlyingOperation,
    //   ...rest
    // } = paramsObj;
    // console.warn(
    //   "SomeAspect.yetAnotherAroundGettingPropertyWithPropTag5() around after",
    //   paramsObj,
    //   {
    //     hasPerformedUnderlyingOperation,
    //     hasEffectivelyPerformedUnderlyingOperation,
    //     ...rest
    //   }
    // );
    // return value;
  }

  @aroundGet(PropTag7)
  aroundGettingPropertyWithPropTag7(paramsObj) {
    console.warn(
      "SomeAspect.aroundGettingPropertyWithPropTag7() around before",
      paramsObj
    );
    const value = paramsObj.proceed();
    const {
      hasPerformedUnderlyingOperation,
      hasEffectivelyPerformedUnderlyingOperation
    } = paramsObj;
    console.warn(
      "SomeAspect.aroundGettingPropertyWithPropTag7() around after",
      paramsObj,
      {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation,
        value
      }
    );
    return value;
  }

  @aroundSet(PropTag4)
  aroundSettingPropertyWithPropTag4(paramsObj) {
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "SomeAspect.aroundSettingPropertyWithPropTag4() around before",
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
    paramsObj.proceed(444);
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "SomeAspect.aroundSettingPropertyWithPropTag4() around after",
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

  @aroundSet(PropTag4)
  anotherAroundSettingPropertyWithPropTag4(paramsObj) {
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "SomeAspect.anotherAroundSettingPropertyWithPropTag4() around before",
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
    // paramsObj.proceed(333);
    paramsObj.proceed([333]); // Same as above.
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "SomeAspect.anotherAroundSettingPropertyWithPropTag4() around after",
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

  @aroundSet(PropTag8)
  aroundSettingPropertyWithPropTag8(paramsObj) {
    {
      const {
        hasPerformedUnderlyingOperation,
        hasEffectivelyPerformedUnderlyingOperation
      } = paramsObj;
      console.warn(
        "SomeAspect.aroundSettingPropertyWithPropTag8() around before",
        paramsObj,
        {
          hasPerformedUnderlyingOperation,
          hasEffectivelyPerformedUnderlyingOperation,
          // previousValue: paramsObj.previousValue,
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
        "SomeAspect.aroundSettingPropertyWithPropTag8() around after",
        paramsObj,
        {
          hasPerformedUnderlyingOperation,
          hasEffectivelyPerformedUnderlyingOperation,
          previousValue: paramsObj.previousValue,
          value: paramsObj.value,
          effectiveValue: paramsObj.effectiveValue
          // effectiveUnderlyingValue: paramsObj.effectiveUnderlyingValue
        }
      );
    }
  }

  @beforeCall(Tag28)
  beforeCallingMethodWithTag28(paramsObj) {
    console.warn("SomeAspect.beforeCallingMethodWithTag28()", paramsObj);
    // ...
  }

  @beforeCall(Tag29)
  beforeCallingMethodWithTag29(paramsObj) {
    console.warn("SomeAspect.beforeCallingMethodWithTag29()", paramsObj);
    // ...
  }

  @beforeGet(PropTag9)
  beforeGettingPropertyWithPropTag9(paramsObj) {
    console.warn("SomeAspect.beforeGettingPropertyWithPropTag9()", paramsObj);
    // ...
  }

  @beforeGet(PropTag10)
  beforeGettingPropertyWithPropTag10(paramsObj) {
    console.warn("SomeAspect.beforeGettingPropertyWithPropTag10()", paramsObj);
    // ...
  }

  @beforeGet(PropTag10)
  anotherBeforeGettingPropertyWithPropTag10(paramsObj) {
    console.warn(
      "SomeAspect.anotherBeforeGettingPropertyWithPropTag10()",
      paramsObj
    );
    // ...
  }

  @beforeGet(PropTag11)
  beforeGettingPropertyWithPropTag11(paramsObj) {
    console.warn("SomeAspect.beforeGettingPropertyWithPropTag11()", paramsObj);
    // ...
  }

  // @meta(Tag1)
  // metaForPropertyDescriptorWithTag1(paramsObj) {
  //   console.warn("SomeAspect.metaForPropertyDescriptorWithTag1()", paramsObj);
  //   // ...
  //   return {
  //     enumerable: true
  //   };
  // }

  @targetClass(ClassTag1)
  targetClassTag1({ Class }) {
    const SubClass = class extends Class {};
    SubClass.prototype.prototypeProp = 123;
    return SubClass;
  }

  @whilePending(Tag32, { interval: 300 })
  whilePendingPromiseReturnedByMethodWithTag32(paramsObj) {
    console.warn(
      "SomeAspect.whilePendingPromiseReturnedByMethodWithTag32()",
      paramsObj
    );
  }

  @whilePending(Tag32, { interval: 1500 })
  anotherWhilePendingPromiseReturnedByMethodWithTag32(paramsObj) {
    console.warn(
      "SomeAspect.anotherWhilePendingPromiseReturnedByMethodWithTag32()",
      paramsObj
    );
  }
}

export default SomeAspect;
