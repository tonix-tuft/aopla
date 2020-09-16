/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  beforeGet,
  afterCall,
  afterFulfillment,
  afterGet,
  afterRejection,
  afterSet,
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
} from "../tags";

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
}

export default YetAnotherAspect;
