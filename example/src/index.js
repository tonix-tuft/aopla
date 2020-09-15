import "./aop";
import SomeService from "./services/SomeService";
import AnotherService from "./services/AnotherService";

const someService = new SomeService();
const anotherService = new AnotherService();
window.SomeService = SomeService;
window.someService = someService;
window.AnotherService = AnotherService;
window.anotherService = anotherService;
