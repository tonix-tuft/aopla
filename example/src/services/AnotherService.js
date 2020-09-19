/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import {
  ClassTag1,
  PropTag1,
  PropTag2,
  Tag1,
  Tag10,
  Tag11,
  Tag13,
  Tag14,
  Tag15,
  Tag16,
  Tag18,
  Tag19,
  Tag2,
  Tag3,
  Tag5,
  Tag6,
  Tag9,
  Tag20,
  Tag21,
  Tag22,
  Tag23,
  Tag24,
  Tag25,
  Tag26,
  Tag27,
  Tag4
} from "../aop/tags";

@ClassTag1
class AnotherService {
  @Tag20
  static get someStaticMethod2() {
    return (...args) => {
      console.log("AnotherService.someStaticMethod2()", {
        thisArg: this,
        args
      });
      return "AnotherService.someStaticMethod2() return value";
    };
  }

  @Tag1
  @Tag2({ abc: 123, def: [1, 2, 3] })
  @Tag3
  @Tag4
  @Tag5
  @Tag6
  somePrototypeMethod1(...args) {
    console.log("AnotherService.somePrototypeMethod1()", {
      thisArg: this,
      args
    });
    return "AnotherService.somePrototypeMethod1() return value";
  }

  @Tag9
  @Tag10
  @Tag11
  static async someStaticMethodReturningARejectedPromise1(...args) {
    console.log("AnotherService.someStaticMethodReturningARejectedPromise1()", {
      thisArg: this,
      args
    });
    const reason = {
      "AnotherService.someStaticMethodReturningARejectedPromise1()": args
    };
    throw reason;
  }

  @Tag13({ shouldReturnFromAspect: false, shouldThrowFromAspect: false })
  static someStaticMethodThrowingAnError1(...args) {
    console.log("AnotherService.someStaticMethodThrowingAnError1()", {
      thisArg: this,
      args
    });
    throw new Error("AnotherService.someStaticMethodThrowingAnError1() error");
  }

  @Tag14
  someInstanceMethodNotThrowingAnError1 = (...args) => {
    console.log("AnotherService.someInstanceMethodNotThrowingAnError1()", {
      thisArg: this,
      args
    });
    return "AnotherService.someInstanceMethodNotThrowingAnError1() return value";
  };

  @Tag15
  somePrototypeMethodNotThrowingAnError1(...args) {
    console.log("AnotherService.somePrototypeMethodNotThrowingAnError1()", {
      thisArg: this,
      args
    });
    return "AnotherService.somePrototypeMethodNotThrowingAnError1() return value";
  }

  @Tag16
  static someStaticMethodNotThrowingAnError1(...args) {
    console.log("AnotherService.someStaticMethodNotThrowingAnError1()", {
      thisArg: this,
      args
    });
    return "AnotherService.someStaticMethodNotThrowingAnError1() return value";
  }

  @Tag18
  @Tag19
  somePrototypeMethodThrowingAnError2(...args) {
    console.log("AnotherService.somePrototypeMethodThrowingAnError2()", {
      thisArg: this,
      args
    });
    throw new Error(
      "AnotherService.somePrototypeMethodThrowingAnError2() error"
    );
  }

  @Tag21
  @Tag22
  @Tag23
  @Tag24
  someInstanceMethod3 = (...args) => {
    console.log("AnotherService.someInstanceMethod3()", {
      thisArg: this,
      args
    });
    return "AnotherService.someInstanceMethod3() return value";
  };

  @Tag25
  somePrototypeMethod3(...args) {
    console.log("AnotherService.somePrototypeMethod3()", {
      thisArg: this,
      args
    });
    return "AnotherService.somePrototypeMethod3() return value";
  }

  @Tag26
  @Tag27
  static someStaticMethod3(...args) {
    console.log("AnotherService.someStaticMethod3()", { thisArg: this, args });
    return "AnotherService.someStaticMethod3() return value";
  }

  // @PropTag1
  // prop = 123;

  // @PropTag2 // Applies on the property itself (decorators on a property apply to the property itself, not to the single getter/setter).
  // get anotherProp() {
  //   return this.value;
  // }

  // set anotherProp(value) {
  //   // eslint-disable-next-line no-console
  //   console.log(`AnotherService - Setting anotherProp value to ${value}`);
  //   this.value = value;
  // }
}

export default AnotherService;
