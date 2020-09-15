import AOPla from "aopla";
import AnotherAspect from "./aspects/AnotherAspect";
import SomeAspect from "./aspects/SomeAspect";

AOPla.registerAspects(
  SomeAspect,
  AnotherAspect
  // [
  //   SomeOtherAspect,
  //   () => {
  //     //MyDIContainer.create(SomeOtherAspect);
  //     // new SomeOtherAspect(1, 2, 3);
  //     return [1, 2, 3];
  //   },
  // ]
);
