/* eslint-disable no-unused-vars */
import AOPla from "aopla";
import AnotherAspect from "./aspects/AnotherAspect";
import CacheAspect from "./aspects/CacheAspect";
import RoutingAspect from "./aspects/RoutingAspect";
import SomeAspect from "./aspects/SomeAspect";
import YetAnotherAspect from "./aspects/YetAnotherAspect";

AOPla.registerAspects(
  SomeAspect,
  AnotherAspect,
  YetAnotherAspect,
  CacheAspect
  // RoutingAspect
  // [
  //   SomeOtherAspect,
  //   () => {
  //     //return MyDIContainer.create(SomeOtherAspect);
  //     //return new SomeOtherAspect(1, 2, 3);
  //     return [1, 2, 3]; // Same as `new SomeOtherAspect(1, 2, 3);`
  //   },
  // ]
);
