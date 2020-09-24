/* eslint-disable no-console */
import { metaTargetClass } from "aopla";
import { Route } from "../tags";

console.log("importing RoutingAspect");

export default class RoutingAspect {
  routes = [];

  @metaTargetClass(Route)
  advice({ tagParams, Class, property }) {
    const [route] = tagParams;
    console.warn(`Registering route ${route}`, {
      Class,
      property,
      aspectInstance: this
    });
    this.routes.push({ route, Class, property });
  }
}
