/* eslint-disable no-console */
import { Route } from "../aop/tags";

export default class SomeController {
  @Route("/")
  rootAction() {
    console.log("SomeController.rootAction()");
  }

  @Route("/home")
  homeAction() {
    console.log("SomeController.homeAction()");
  }

  @Route("/some/page")
  somePageAction() {
    console.log("SomeController.somePageAction()");
  }

  @Route("/some/other/page")
  someOtherPageAction = () => {
    console.log("SomeController.someOtherPageAction()");
  };

  @Route("/yet/some/other/page")
  static yetSomeOtherPageAction() {
    console.log("SomeController.yetSomeOtherPageAction()");
  }
}
