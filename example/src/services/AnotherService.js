/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
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
} from "../aop/tags";

@ClassTag1
class AnotherService {
  @Tag1
  @Tag2({ abc: 123, def: [1, 2, 3] })
  @Tag3
  @Tag4
  @Tag5
  @Tag6
  somePrototypeMethod1(...args) {
    console.log("AnotherService.somePrototypeMethod1()", {
      thisArg: this,
      args,
    });
    return "AnotherService.somePrototypeMethod1() return value";
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
