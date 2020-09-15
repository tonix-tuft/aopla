/* eslint-disable no-unused-vars */
import {
  ClassTag1,
  PropTag1,
  PropTag2,
  Tag1,
  Tag2,
  Tag3,
  Tag4,
  Tag5,
  Tag6,
  Tag7,
  Tag8,
  StaticPropTag1,
  StaticPropTag2,
  StaticPropTag3,
} from "../aop/tags";

// @ClassTag1 // AOPlaTag1
class SomeService {
  // @StaticPropTag1
  // @StaticPropTag2
  // static staticProp = this.method123();

  static method123() {
    return `"original staticProp value"`;
  }

  // @StaticPropTag3
  // get anotherStaticProp() {
  //   return this.anotherStaticPropValue;
  // }

  // set anotherStaticProp(value) {
  //   this.anotherStaticPropValue = value;
  // }

  // @PropTag1 // AOPlaTag8
  // prop = 123;

  // @PropTag2 // Applies both to getter and setter (decorators on a property apply to the property itself). // AOPlaTag9
  // get anotherProp() {
  //   return this.value;
  // }

  set anotherProp(value) {
    // eslint-disable-next-line no-console
    console.log(`SomeService - Setting anotherProp value to ${value}`);
    this.value = value;
  }

  @Tag1
  @Tag2({ abc: "abc", def: ["d", "e", "f"] })
  @Tag3
  someInstanceMethod = (...args) => {
    // eslint-disable-next-line no-console
    console.log("SomeService.someInstanceMethod()", this, args);
    return "SomeService.someInstanceMethod() returnValue";
  };

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
