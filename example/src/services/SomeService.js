/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import {
  ClassTag1,
  PropTag1,
  PropTag2,
  PropTag3,
  PropTag4,
  PropTag5,
  PropTag6,
  PropTag7,
  PropTag8,
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
  Tag11,
  Tag10,
  Tag12,
  Tag13,
  Tag17,
  Tag18,
  Tag19,
  Tag21,
  Tag22,
  Tag23,
  Tag24,
  Tag25,
  Tag26,
  Tag27,
  Tag30,
  Tag31,
  Cacheable,
  Tag28,
  Tag29,
  PropTag9,
  PropTag10,
  PropTag11,
  PropTag12,
  PropTag13,
  Tag32,
  Tag33
} from "../aop/tags";

@ClassTag1
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

  @PropTag4
  @PropTag5
  @PropTag6
  prop2 = 456;
  // Uncomment the next getter to see the difference between `effectiveValue` and `effectiveUnderlyingValue`
  // when using the @aroundSet annotation.
  // get prop2() {
  //   return 777;
  // }

  @PropTag7
  @PropTag8
  static staticProp2 = this.someStaticMethod123();

  @PropTag7
  @PropTag8
  get anotherProp2() {
    console.log(`get SomeService.anotherProp2`);
    return this.anotherProp2Value || "Default value";
  }
  set anotherProp2(value) {
    console.log(`set SomeService.anotherProp2 = ${value}`);
    this.anotherProp2Value = value;
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
      args
    });
    const value = {
      "SomeService.someInstanceMethodReturningAPromise1()": args
    };
    return value;
  };

  @Tag7
  @Tag8
  async somePrototypeMethodReturningAPromise1(...args) {
    console.log("SomeService.somePrototypeMethodReturningAPromise1()", {
      thisArg: this,
      args
    });
    const value = {
      "SomeService.somePrototypeMethodReturningAPromise1()": args
    };
    return value;
  }

  @Tag7
  static async someStaticMethodReturningAPromise1(...args) {
    console.log("SomeService.someStaticMethodReturningAPromise1()", {
      thisArg: this,
      args
    });
    const value = {
      "SomeService.someStaticMethodReturningAPromise1()": args
    };
    return value;
  }

  @Tag9
  someInstanceMethodReturningARejectedPromise1 = async (...args) => {
    console.log("SomeService.someInstanceMethodReturningARejectedPromise1()", {
      thisArg: this,
      args
    });
    const reason = {
      "SomeService.someInstanceMethodReturningARejectedPromise1()": args
    };
    throw reason;
  };

  @Tag9
  @Tag10
  async somePrototypeMethodReturningARejectedPromise1(...args) {
    console.log("SomeService.somePrototypeMethodReturningARejectedPromise1()", {
      thisArg: this,
      args
    });
    const reason = {
      "SomeService.somePrototypeMethodReturningARejectedPromise1()": args
    };
    throw reason;
  }

  @Tag11
  static async someStaticMethodReturningARejectedPromise1(...args) {
    console.log("SomeService.someStaticMethodReturningARejectedPromise1()", {
      thisArg: this,
      args
    });
    const reason = {
      "SomeService.someStaticMethodReturningARejectedPromise1()": args
    };
    throw reason;
  }

  @Tag12
  @Tag13()
  someInstanceMethodThrowingAnError1 = (...args) => {
    console.log("SomeService.someInstanceMethodThrowingAnError1()", {
      thisArg: this,
      args
    });
    throw new Error("SomeService.someInstanceMethodThrowingAnError1() error");
  };

  @Tag12
  @Tag13({ shouldReturnFromAspect: true })
  anotherInstanceMethodThrowingAnError1 = (...args) => {
    console.log("SomeService.anotherInstanceMethodThrowingAnError1()", {
      thisArg: this,
      args
    });
    throw new Error(
      "SomeService.anotherInstanceMethodThrowingAnError1() error"
    );
  };

  @Tag12
  @Tag13({ shouldThrowFromAspect: true })
  yetAnotherInstanceMethodThrowingAnError1 = (...args) => {
    console.log("SomeService.yetAnotherInstanceMethodThrowingAnError1()", {
      thisArg: this,
      args
    });
    throw new Error(
      "SomeService.yetAnotherInstanceMethodThrowingAnError1() error"
    );
  };

  @Tag12
  somePrototypeMethodThrowingAnError1(...args) {
    console.log("SomeService.somePrototypeMethodThrowingAnError1()", {
      thisArg: this,
      args
    });
    throw new Error("SomeService.somePrototypeMethodThrowingAnError1() error");
  }

  @Tag17
  @Tag18
  someInstanceMethod2 = (...args) => {
    console.log("SomeService.someInstanceMethod2()", { thisArg: this, args });
    return "SomeService.someInstanceMethod2() return value";
  };

  @Tag19
  static someStaticMethod2(...args) {
    console.log("SomeService.someStaticMethod2()", { thisArg: this, args });
    return "SomeService.someStaticMethod2() return value";
  }

  @Tag21
  someInstanceMethod3 = (...args) => {
    console.log("SomeService.someInstanceMethod3()", { thisArg: this, args });
    return "SomeService.someInstanceMethod3() return value";
  };

  @Tag22
  @Tag23
  somePrototypeMethod3(...args) {
    console.log("SomeService.somePrototypeMethod3()", { thisArg: this, args });
    return "SomeService.somePrototypeMethod3() return value";
  }

  @Tag24
  @Tag25
  @Tag26
  @Tag27
  static someStaticMethod3(...args) {
    console.log("SomeService.someStaticMethod3()", { thisArg: this, args });
    return "SomeService.someStaticMethod3() return value";
  }

  /**
   * Sample cache.
   */
  // cache = void 0;

  // cacheInterval = void 0;

  /**
   * Sample method which performs a heavy computation, each time caching the result for subsequent calls
   * with a TTL (Time To Live) of 5 seconds.
   */
  async performHeavyComputationDirty() {
    if (this.cache) {
      // Cache hit:
      console.log("Cache hit!");
      await this.cache;
      return;
    }
    // Cache miss:
    console.log("Cache miss...");
    await new Promise(
      (resolve) => setTimeout(resolve, 8000) // Heavy computation timeout.
    );
    // Ugly cache management code mixed with business logic code.
    console.log("Caching.");
    this.cache = Promise.resolve();
    this.cacheInterval && clearInterval(this.cacheInterval);
    this.cacheInterval = setTimeout(() => {
      // Invalidating the cache after 5 seconds.
      console.log("Cache invalidation.");
      this.cache = void 0;
    }, 5000);
  }

  /**
   * Sample method which performs a heavy computation, stop, no other fancy code.
   */
  @Cacheable // Tagging this method as cacheable.
  async performHeavyComputation() {
    await new Promise(
      (resolve) => setTimeout(resolve, 8000) // Heavy computation timeout.
    );
  }

  @Tag28
  @Tag30
  @Tag31
  someInstanceMethod4 = (...args) => {
    console.log("SomeService.someInstanceMethod4()", { thisArg: this, args });
    return "SomeService.someInstanceMethod4() return value";
  };

  @Tag28
  @Tag29
  somePrototypeMethod4(...args) {
    console.log("SomeService.somePrototypeMethod4()", { thisArg: this, args });
    return "SomeService.somePrototypeMethod4() return value";
  }

  @Tag28
  @Tag29
  @Tag30
  @Tag31
  static someStaticMethod4(...args) {
    console.log("SomeService.someStaticMethod4()", { thisArg: this, args });
    return "SomeService.someStaticMethod4() return value";
  }

  @PropTag9
  @PropTag10
  @PropTag11
  prop3 = 789;

  @PropTag12
  @PropTag13
  static staticProp3 = this.someStaticMethod123();

  @PropTag10
  @PropTag13
  get anotherProp3() {
    console.log(`get SomeService.anotherProp2`);
    return this.anotherProp2Value || "Default value";
  }
  set anotherProp3(value) {
    console.log(`set SomeService.anotherProp2 = ${value}`);
    this.anotherProp2Value = value;
  }

  @Tag32
  @Tag33
  async timeoutPromise(timeout = 8000) {
    console.log("Pending promise...");
    await new Promise((resolve) => setTimeout(resolve, timeout));
    console.log("Promise resolved.");
  }
}

export default SomeService;
