import AOPla from "aopla";
import AnotherAspect from "./aspects/AnotherAspect";
import CacheAspect from "./aspects/CacheAspect";
import SomeAspect from "./aspects/SomeAspect";
import YetAnotherAspect from "./aspects/YetAnotherAspect";

AOPla.registerAspects(
  SomeAspect,
  AnotherAspect,
  YetAnotherAspect,
  CacheAspect
  // [
  //   SomeOtherAspect,
  //   () => {
  //     //return MyDIContainer.create(SomeOtherAspect);
  //     //return new SomeOtherAspect(1, 2, 3);
  //     return [1, 2, 3]; // Same as `new SomeOtherAspect(1, 2, 3);`
  //   },
  // ]
);
