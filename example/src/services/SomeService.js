/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  ClassTag1,
  PropTag1,
  PropTag2,
  PropTag3,
  Tag1,
  Tag2,
  Tag3,
  Tag4,
  Tag5,
  Tag6,
  Tag7,
  Tag8,
  Tag9,
  StaticPropTag1,
  StaticPropTag2,
  StaticPropTag3,
  Tag11,
  Tag10,
} from "../aop/tags";

// @ClassTag1
class SomeService {
  @PropTag1
  prop1 = 123;

  @StaticPropTag1
  @StaticPropTag2
  static staticProp1 = this.someStaticMethod123();
  static someStaticMethod123() {
    return "Initial value";
  }

  // These tags apply both to the getter and setter function (decorators on a property apply to the property itself).
  @PropTag2
  @PropTag3
  get anotherProp1() {
    console.log(`get SomeService.anotherProp1`);
    return this.anotherProp1Value || "Default value";
  }
  set anotherProp1(value) {
    console.log(`set SomeService.anotherProp1 = ${value}`);
    this.anotherProp1Value = value;
  }

  @Tag1
  @Tag2({ abc: "abc", def: ["d", "e", "f"] })
  @Tag3
  someInstanceMethod1 = (...args) => {
    console.log("SomeService.someInstanceMethod1()", { thisArg: this, args });
    return "SomeService.someInstanceMethod1() return value";
  };

  @Tag1
  @Tag2({ abc: 123, def: [1, 2, 3] }, 4, 5, 6)
  @Tag3
  @Tag4
  @Tag5
  @Tag6
  somePrototypeMethod1(...args) {
    console.log("SomeService.somePrototypeMethod1()", { thisArg: this, args });
    return "SomeService.somePrototypeMethod1() return value";
  }

  @Tag2({ abc: "ABC", def: ["D", "E", "F"] }, 123)
  static someStaticMethod1(...args) {
    console.log("SomeService.someStaticMethod1()", { thisArg: this, args });
    return "SomeService.someStaticMethod1() return value";
  }

  @Tag7
  someInstanceMethodReturningAPromise1 = async (...args) => {
    console.log("SomeService.someInstanceMethodReturningAPromise1()", {
      thisArg: this,
      args,
    });
    const value = {
      "SomeService.someInstanceMethodReturningAPromise1()": args,
    };
    return value;
  };

  @Tag7
  @Tag8
  async somePrototypeMethodReturningAPromise1(...args) {
    console.log("SomeService.somePrototypeMethodReturningAPromise1()", {
      thisArg: this,
      args,
    });
    const value = {
      "SomeService.somePrototypeMethodReturningAPromise1()": args,
    };
    return value;
  }

  @Tag7
  static async someStaticMethodReturningAPromise1(...args) {
    console.log("SomeService.someStaticMethodReturningAPromise1()", {
      thisArg: this,
      args,
    });
    const value = {
      "SomeService.someStaticMethodReturningAPromise1()": args,
    };
    return value;
  }

  @Tag9
  someInstanceMethodReturningARejectedPromise1 = async (...args) => {
    console.log("SomeService.someInstanceMethodReturningARejectedPromise1()", {
      thisArg: this,
      args,
    });
    const reason = {
      "SomeService.someInstanceMethodReturningARejectedPromise1()": args,
    };
    throw reason;
  };

  @Tag9
  @Tag10
  async somePrototypeMethodReturningARejectedPromise1(...args) {
    console.log("SomeService.somePrototypeMethodReturningARejectedPromise1()", {
      thisArg: this,
      args,
    });
    const reason = {
      "SomeService.somePrototypeMethodReturningARejectedPromise1()": args,
    };
    throw reason;
  }

  @Tag11
  static async someStaticMethodReturningARejectedPromise1(...args) {
    console.log("SomeService.someStaticMethodReturningARejectedPromise1()", {
      thisArg: this,
      args,
    });
    const reason = {
      "SomeService.someStaticMethodReturningARejectedPromise1()": args,
    };
    throw reason;
  }

  // @StaticPropTag3
  // get anotherStaticProp() {
  //   return this.anotherStaticPropValue;
  // }

  // set anotherStaticProp(value) {
  //   this.anotherStaticPropValue = value;
  // }

  // @Tag1 // AOPlaTag2
  // @Tag2({ abc: 123, def: [1, 2, 3] }) // tag(withParams) // AOPlaTag3
  // @Tag3 // AOPlaTag4
  // @Tag4 // AOPlaTag5
  // @Tag5 // AOPlaTag6
  // @Tag6 // AOPlaTag7
  // someMethod() {
  //   // ...
  //   // eslint-disable-next-line no-console
  //   console.log("SomeService.someMethod()");
  // }

  // @Tag7
  // @Tag8
  // static someStaticMethod() {
  //   // ...
  //   // eslint-disable-next-line no-console
  //   console.log("SomeService.someStaticMethod()");
  // }
}

export default SomeService;
