/*
 * Copyright (c) 2020 Anton Bagdatyev (Tonix)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

import { AOPLA_ASPECT_DATA_PROP, AOPLA_TAG_DATA_PROP } from "./constants";
import ImmutableLinkeOrderedMap from "immutable-linked-ordered-map";
import { isEmpty, isArray } from "js-utl";
// eslint-disable-next-line no-unused-vars
import Tag from "./tag/Tag";

/**
 * @type {Function}
 */
const newMap = () => new ImmutableLinkeOrderedMap();

class AOPla {
  /**
   * @type {Object}
   */
  preregistrationAspectsMap = {};

  /**
   * @type {ImmutableLinkeOrderedMap}
   */
  aspectsMap = newMap();

  /**
   * @type {Object}
   */
  tagsMap = {};

  /**
   * @private
   */
  ifAspectId(Aspect, callback) {
    let factory = void 0;
    if (isArray(Aspect)) {
      // Aspect is a tuple: [TrueAspect, aspectFactory].
      const [TrueAspect, aspectFactory] = Aspect;
      Aspect = TrueAspect;
      factory = aspectFactory;
    }
    let aspectId;
    if (Aspect[AOPLA_ASPECT_DATA_PROP]?.id) {
      aspectId = Aspect[AOPLA_ASPECT_DATA_PROP].id;
    }
    if (Aspect.prototype?.[AOPLA_ASPECT_DATA_PROP]?.id) {
      aspectId = Aspect.prototype?.[AOPLA_ASPECT_DATA_PROP]?.id;
    }
    if (!aspectId) {
      // Ignore if "Aspect" is not an AOPla aspect.
      return;
    }
    callback({ aspectId, Aspect, factory });
  }

  /**
   * Preregister an aspect.
   *
   * @param {Object} params An object with parameters.
   * @param {string} params.aspectId The aspect ID.
   * @param {Tag} params.tag A tag.
   * @param {string} params.annotationKey An annotation key (a value of the "AOPLA_ANNOTATION_KEY_MAP" map).
   * @param {string} params.adviceName The name of the advice to execute.
   * @param {Object} [params.annotationParamsObj] An optional object with annotation parameters.
   * @return {undefined}
   */
  preregister({
    aspectId,
    tag,
    annotationKey,
    adviceName,
    annotationParamsObj = {},
  }) {
    const tagId = tag[AOPLA_TAG_DATA_PROP].id;

    this.preregistrationAspectsMap[aspectId] =
      this.preregistrationAspectsMap[aspectId] || {};
    this.preregistrationAspectsMap[aspectId][tagId] =
      this.preregistrationAspectsMap[aspectId][tagId] || {};
    this.preregistrationAspectsMap[aspectId][tagId][annotationKey] =
      this.preregistrationAspectsMap[aspectId][tagId][annotationKey] || [];
    this.preregistrationAspectsMap[aspectId][tagId][annotationKey][
      this.preregistrationAspectsMap[aspectId][tagId][annotationKey].length
    ] = { adviceName, annotationParamsObj };
  }

  /**
   * Register the given aspects.
   *
   * @param {...(Function|Array<Array>)} Aspects A variadic argument where each argument represents the aspect to register
   *                                             (i.e. a constructor function of the aspect which can be instantiated via the "new" keyword),
   *                                             or a tuple containing the aspect to register at index 0 and a factory function
   *                                             returning either the aspect instance for that aspect or an array of parameters
   *                                             to pass to the aspect constructor function in the given order at index 1.
   * @return {undefined}
   */
  registerAspects(...Aspects) {
    Aspects.map((Aspect) => {
      this.ifAspectId(Aspect, ({ aspectId, Aspect, factory }) => {
        const prevAspectMetadata = this.aspectsMap.get(aspectId);
        let aspectInstance = void 0;
        if (prevAspectMetadata) {
          aspectInstance = prevAspectMetadata.aspectInstance;
          if (
            Aspect !== prevAspectMetadata.Aspect ||
            factory !== prevAspectMetadata.factory
          ) {
            // Invalidating the previous aspect instance.
            aspectInstance = void 0;
          }
        }
        this.aspectsMap = this.aspectsMap.set({
          [aspectId]: {
            Aspect,
            factory,
            aspectInstance,
            subtree: this.preregistrationAspectsMap[aspectId],
          },
        });
        const aspectMetadata = this.aspectsMap.get(aspectId);
        const tagIds = Object.keys(aspectMetadata.subtree);
        tagIds.map((tagId) => {
          this.tagsMap[tagId] = this.tagsMap[tagId] || newMap();
          this.tagsMap[tagId] = this.tagsMap[tagId].set({
            [aspectId]: aspectId,
          });
        });
      });
    });
  }

  /**
   * Unregister the given aspects.
   *
   * @param {...Function} Aspects A variadic argument where each argument represents the aspect to unregister
   *                              (i.e. a constructor function of the aspect which can be instantiated via the "new" keyword),
   * @return {undefined}
   */
  unregisterAspects(...Aspects) {
    Aspects.map((Aspect) => {
      this.ifAspectId(Aspect, ({ aspectId }) => {
        const aspectMetadata = this.aspectsMap.get(aspectId);
        if (aspectMetadata) {
          const tagIds = Object.keys(aspectMetadata.subtree);
          tagIds.map((tagId) => {
            this.tagsMap[tagId] = this.tagsMap[tagId].set({
              [aspectId]: void 0,
            });
          });
          this.aspectsMap = this.aspectsMap.set({ [aspectId]: void 0 });
        }
      });
    });
  }

  /**
   * Clear and register the given aspects.
   * This method works in the same way as the "registerAspects" method,
   * but it does not preserve the order of the registered aspects
   * if they have been unregistered for some reason and are now being registered again.
   *
   * @param  {...(Function|Array<Array>)} Aspects The same parameter as for "registerAspects".
   * @return {undefined}
   */
  clearRegisterAspects(...Aspects) {
    Aspects.map((Aspect) => {
      this.ifAspectId(Aspect, ({ aspectId }) => {
        const aspectMetadata = this.aspectsMap.get(aspectId);
        if (aspectMetadata) {
          const tagIds = Object.keys(aspectMetadata.subtree);
          tagIds.map((tagId) => {
            this.tagsMap[tagId].unset(aspectId);
          });
          this.aspectsMap = this.aspectsMap.unset(aspectId);
        }
      });
    });
    this.registerAspects(...Aspects);
  }

  /**
   * A higher order method to map all the advices of all the aspects registered so far
   * for the given tag and annotation key.
   *
   * @param {Object} params An object with parameters.
   * @param {Tag} params.tag A tag.
   * @param {string} params.annotationKey An annotation key (a value of the "AOPLA_ANNOTATION_KEY_MAP" map).
   * @return {((advice: Function, annotationParamsObj: Object) => *) => Array} A function returing the array which represents the mapping of the advices.
   */
  mapAdvices({ tag, annotationKey }) {
    return (adviceFn) => {
      const resultArray = [];
      const tagId = tag[AOPLA_TAG_DATA_PROP].id;
      if (this.tagsMap[tagId]) {
        this.tagsMap[tagId].forEach((aspectId) => {
          if (!aspectId) {
            // This aspect has been unregistered, go on.
            return;
          }
          const aspectMetadata = this.aspectsMap.get(aspectId);
          if (aspectMetadata) {
            const advicesMetadata =
              aspectMetadata.subtree?.[tagId]?.[annotationKey];
            if (!isEmpty(advicesMetadata)) {
              advicesMetadata.map((adviceMetadata) => {
                const { adviceName, annotationParamsObj } = adviceMetadata;
                const advice = (adviceParamsObj) =>
                  this.executeAspectAdvice({
                    aspectMetadata,
                    adviceName,
                    adviceParamsObj,
                  });
                resultArray[resultArray.length] = adviceFn(
                  advice,
                  annotationParamsObj
                );
              });
            }
          }
        });
      }
      return resultArray;
    };
  }

  /**
   * @private
   */
  executeAspectAdvice({ aspectMetadata, adviceName, adviceParamsObj }) {
    let aspectInstance = aspectMetadata.aspectInstance;
    const Aspect = aspectMetadata.Aspect;
    if (!aspectInstance) {
      if (aspectMetadata.factory) {
        const factoryResult = aspectMetadata.factory();
        if (isArray(factoryResult)) {
          aspectInstance = new Aspect(...factoryResult);
        } else {
          aspectInstance = factoryResult;
        }
      } else {
        aspectInstance = new Aspect();
      }
      aspectMetadata.aspectInstance = aspectInstance;
    }
    return aspectInstance[adviceName](adviceParamsObj);
  }
}

export default new AOPla();
