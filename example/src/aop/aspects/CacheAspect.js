/* eslint-disable no-console */
import { aroundCall } from "aopla";
import { Cacheable } from "../tags";

console.log("importing CacheAspect");

export default class CacheAspect {
  cache = void 0;

  cacheInterval = void 0;

  @aroundCall(Cacheable)
  async advice({ proceed }) {
    if (this.cache) {
      // Cache hit:
      console.warn("Cache hit!");
      await this.cache;
      return;
    }
    // Cache miss:
    console.warn("Cache miss...");
    await proceed();
    // Cache management code only, no other shit.
    console.warn("Caching.");
    this.cache = Promise.resolve();
    this.cacheInterval && clearInterval(this.cacheInterval);
    this.cacheInterval = setTimeout(() => {
      // Invalidating the cache after 5 seconds.
      console.warn("Cache invalidation.");
      this.cache = void 0;
    }, 5000);
  }
}
