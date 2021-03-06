import "./aop";
import SomeService from "./services/SomeService";
import AnotherService from "./services/AnotherService";
import AOPla from "aopla";
import SomeAspect from "./aop/aspects/SomeAspect";
import AnotherAspect from "./aop/aspects/AnotherAspect";
import YetAnotherAspect from "./aop/aspects/YetAnotherAspect";
import SomeController from "./services/SomeController";

const someService = new SomeService();
const anotherService = new AnotherService();
window.SomeService = SomeService;
window.someService = someService;
window.AnotherService = AnotherService;
window.anotherService = anotherService;
window.AOPla = AOPla;
window.SomeAspect = SomeAspect;
window.AnotherAspect = AnotherAspect;
window.YetAnotherAspect = YetAnotherAspect;
window.SomeController = SomeController;
