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

import decoratorTypeEnum from "./enums";
import {
  AOPLA_TAG_DATA_PROP,
  AOPLA_ANNOTATION_KEY_MAP,
  AOPLA_ASPECT_DATA_PROP,
  AOPLA_ASPECT_ID_PREFIX
} from "../../../constants";
import { lazyPropGet, lazyPropSet } from "./helpers";
import { throwUnknownDecoratorTypeError } from "../utils";
import { applyPigretto } from "./applyPigretto";
import IntervalJitter from "interval-jitter";
import { uniqueId, isEmpty, defineProperty } from "js-utl";
import AOPla from "../../../AOPla";
import { PIGRETTO_EFFECTIVE_TARGET_PROP } from "pigretto";

/**
 * Generic factory for an object implementing the generic logic for a decorator.
 *
 * @param {Array} decoratorArgs The decorator arguments.
 * @return {Object} An object implementing the generic logic for a decorator.
 */
export const decoratorFactory = (decoratorArgs) => ({
  executeTargetClassAnnotations: function ({ Class, tag, tagParams }) {
    const annotationKey = AOPLA_ANNOTATION_KEY_MAP.targetClass;
    AOPla.mapAdvices({ tag, annotationKey })((advice) => {
      const context = { tag, tagParams, Class };
      const NewClass = advice(context);
      if (NewClass) {
        Class = NewClass;
      }
    });
    return Class;
  },

  isAccessorDescriptor: function ({ descriptorKeysMap }) {
    return descriptorKeysMap.get || descriptorKeysMap.set;
  },

  wrapAccessorDescriptor: function ({ descriptor, tag, tagParams, key }) {
    const descriptorGet = descriptor.get; // get, call
    const descriptorSet = descriptor.set; // set
    const decoratorFactoryAPI = this.decoratorFactoryAPI;
    const property = key;

    const callAdviceContextFn = ({ argumentsList }) => ({
      argumentsList
    });

    const setAdviceContextFn = ({ argumentsList }) => {
      const [value] = argumentsList;
      return {
        value
      };
    };

    const getAdviceTryCatchFinallyContextFn = (objectParam) =>
      Object.prototype.hasOwnProperty.call(objectParam, "returnValue")
        ? {
            value: objectParam.returnValue
          }
        : {};
    const callAdviceTryCatchFinallyContextFn = ({
      argumentsList,
      applyContext,
      ...objectParam
    }) =>
      Object.prototype.hasOwnProperty.call(objectParam, "returnValue")
        ? {
            argumentsList,
            effectiveArgumentsList: applyContext.effectiveArgumentsList,
            returnValue: objectParam.returnValue
          }
        : {
            argumentsList,
            effectiveArgumentsList: applyContext.effectiveArgumentsList
          };
    const setAdviceTryCatchFinallyContextFn = ({
      argumentsList,
      applyContext
    }) => {
      const [originalValue] = argumentsList;
      const returnObj = {
        originalValue
      };
      if (!isEmpty(applyContext.effectiveArgumentsList)) {
        const [value] = applyContext.effectiveArgumentsList;
        returnObj.value = value;
      }
      return returnObj;
    };

    const getAppliedPigretto = applyPigretto({
      target: descriptorGet,
      decoratorFactoryAPI,
      tag,
      tagParams,
      property,

      annotationContext: ({ applyContext }) => ({
        get effectiveValue() {
          // effectiveTarget is the innermost getter function.
          const thisArg = applyContext.thisArg;
          const effectiveValue = applyContext.effectiveTarget.call(thisArg);
          return effectiveValue;
        }
      }),

      beforeAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.beforeGet,

      aroundAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.aroundGet,

      afterAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.afterGet,
      afterAdviceAnnotationContext: ({ returnValue }) => ({
        value: returnValue
      }),

      onCatchAdviceAnnotationContext: getAdviceTryCatchFinallyContextFn,
      onFinallyAdviceAnnotationContext: getAdviceTryCatchFinallyContextFn,

      decoratorArgs,
      returnValueFn: ({ returnValue, applyContext }) => {
        if (typeof returnValue === "function") {
          returnValue = applyPigretto({
            target: returnValue,
            decoratorFactoryAPI,
            tag,
            tagParams,
            property,
            beforeAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.beforeCall,
            beforeAdviceAnnotationContext: callAdviceContextFn,

            aroundAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.aroundCall,
            aroundAdviceAnnotationContext: callAdviceContextFn,

            afterAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.afterCall,
            afterAdviceAnnotationContext: ({
              argumentsList,
              applyContext,
              returnValue
            }) => ({
              argumentsList,
              effectiveArgumentsList: applyContext.effectiveArgumentsList,
              returnValue
            }),

            onCatchAdviceAnnotationContext: callAdviceTryCatchFinallyContextFn,
            onFinallyAdviceAnnotationContext: callAdviceTryCatchFinallyContextFn,

            decoratorArgs,
            thisArgFn: () => applyContext.thisArg,
            returnValueFn: ({ returnValue, applyContext, argumentsList }) => {
              if (returnValue instanceof Promise) {
                // @whilePending, @afterFulfillment, @afterRejection
                const jitters = [];
                const annotationKey = AOPLA_ANNOTATION_KEY_MAP.whilePending;
                AOPla.mapAdvices({ tag, annotationKey })(
                  (advice, annotationParamsObj) => {
                    const {
                      minInterval,
                      maxInterval,
                      interval
                    } = annotationParamsObj;
                    const jitter = new IntervalJitter(
                      () => {
                        const context = {
                          tag,
                          tagParams,
                          thisArg: applyContext.thisArg,
                          property,
                          argumentsList,
                          hasPerformedUnderlyingOperation:
                            applyContext.hasPerformedUnderlyingOperation,
                          hasEffectivelyPerformedUnderlyingOperation:
                            applyContext.hasEffectivelyPerformedUnderlyingOperation,
                          effectiveArgumentsList:
                            applyContext.effectiveArgumentsList,
                          promise: returnValue
                        };
                        advice(context);
                      },
                      {
                        minInterval,
                        maxInterval,
                        interval
                      }
                    );
                    jitters.push(jitter);
                    jitter.run();
                  }
                );
                const stopJitters = () =>
                  jitters.map((jitter) => jitter.stop());
                returnValue = returnValue
                  .then((value) => {
                    stopJitters();
                    const annotationKey =
                      AOPLA_ANNOTATION_KEY_MAP.afterFulfillment;
                    AOPla.mapAdvices({ tag, annotationKey })((advice) => {
                      const context = {
                        tag,
                        tagParams,
                        thisArg: applyContext.thisArg,
                        property,
                        argumentsList,
                        hasPerformedUnderlyingOperation:
                          applyContext.hasPerformedUnderlyingOperation,
                        hasEffectivelyPerformedUnderlyingOperation:
                          applyContext.hasEffectivelyPerformedUnderlyingOperation,
                        effectiveArgumentsList:
                          applyContext.effectiveArgumentsList,
                        value
                      };
                      advice(context);
                    });
                    return value;
                  })
                  .catch((reason) => {
                    stopJitters();
                    const annotationKey =
                      AOPLA_ANNOTATION_KEY_MAP.afterRejection;
                    AOPla.mapAdvices({ tag, annotationKey })((advice) => {
                      const context = {
                        tag,
                        tagParams,
                        thisArg: applyContext.thisArg,
                        property,
                        argumentsList,
                        hasPerformedUnderlyingOperation:
                          applyContext.hasPerformedUnderlyingOperation,
                        hasEffectivelyPerformedUnderlyingOperation:
                          applyContext.hasEffectivelyPerformedUnderlyingOperation,
                        effectiveArgumentsList:
                          applyContext.effectiveArgumentsList,
                        reason
                      };
                      advice(context);
                    });
                    throw reason;
                  });
              }
              return returnValue;
            }
          });
        }
        return returnValue;
      }
    });

    const setAppliedPigretto = applyPigretto({
      target: descriptorSet,
      decoratorFactoryAPI,
      tag,
      tagParams,
      property,

      annotationContext: ({ applyContext, argumentsList }) => {
        const [value] = argumentsList;
        return {
          get previousValue() {
            const thisArg = applyContext.thisArg;
            const previousValue = getAppliedPigretto[
              PIGRETTO_EFFECTIVE_TARGET_PROP
            ].call(thisArg);
            return previousValue;
          },
          originalValue: value
        };
      },

      beforeAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.beforeSet,
      beforeAdviceAnnotationContext: setAdviceContextFn,

      aroundAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.aroundSet,
      aroundAdviceAnnotationContext: setAdviceContextFn,
      aroundAfterAnnotationContextDeletePropsMap: { previousValue: true },

      afterAdviceAnnotationKey: AOPLA_ANNOTATION_KEY_MAP.afterSet,
      afterAdviceAnnotationContext: ({ applyContext }) => {
        const [value] = applyContext.effectiveArgumentsList;
        return {
          value
        };
      },
      afterAnnotationContextDeleteProps: ["previousValue"],

      onCatchAdviceAnnotationContext: setAdviceTryCatchFinallyContextFn,
      onFinallyAdviceAnnotationContext: setAdviceTryCatchFinallyContextFn,

      decoratorArgs
    });

    return {
      ...descriptor,
      get: getAppliedPigretto,
      set: setAppliedPigretto
    };
  },

  executeMetaAnnotations: function ({ tag, tagParams, descriptor }) {
    const annotationKey = AOPLA_ANNOTATION_KEY_MAP.meta;
    AOPla.mapAdvices({ tag, annotationKey })((advice) => {
      const context = { tag, tagParams, descriptor };
      const newDescriptorMerge = advice(context);
      if (newDescriptorMerge) {
        descriptor = {
          ...descriptor,
          ...newDescriptorMerge
        };
      }
    });
    return descriptor;
  },

  tagDecorator: function (tag, tagParams) {
    // Generic algorithm for AOPla tags.

    /*
     * stage-1 legacy
     * 1. If class, execute @targetClass annotations immediately for the given tag DONE
     * 2. If prop or method (instance, static, prototype method):
     *      - If static prop, descriptor has a `value` property or there is an `initializer`, or there is a `get`/`set` accessor descriptor;
     *      - If instance prop, there is no `value` but there is an `initializer`, or there is a `get`/`set` accessor descriptor;
     *      - If instance method, there is an `initializer`;
     *      - If prototype or static method, descriptor has a `value` which is a function;
     *    Change descriptor to accessor descriptor immediately before executing @meta annotations if not already an accessor descriptor.
     *    Then wrap the accessor descriptor and in the wrapping code determine whether the underlying prop is a method or not and change execution accordingly.
     * 3. If prop or method, execute @meta annotations immediately with descriptor (remove eventual `initializer` from descriptor before passing descriptor to @meta annotations) DONE
     */

    /*
     * stage-2 non-legacy
     * 1. If kind: "class", execute @targetClass annotations immediately for the given tag DONE
     * 2. If prop (kind: "field") or method (instance, static, prototype method):
     *      - If static prop (placement: "static"), there is an `initializer`, or there is a `get`/`set` accessor descriptor;
     *      - If instance prop (placement: "own"), there is no `value` but there is an `initializer`, or there is a `get`/`set` accessor descriptor;
     *      - If instance method (kind: "field" with placement: "own"), there is an initializer;
     *      - If prototype or static method (kind: "method" with placement: "prototype" or "static"), descriptor has a `value` which is a function);
     *    Change descriptor to accessor descriptor immediately before executing @meta annotations if not already an accessor descriptor.
     *    Then wrap the accessor descriptor and in the wrapping code determine whether the underlying prop is a method or not and change execution accordingly.
     * 3. If prop or method, execute @meta annotations immediately with descriptor DONE
     */
    let matched = false;
    let descriptor;
    let tagDecoratorReturnValue;
    const descriptorKeysMap = this.getDescriptorKeysMapFromDecoratorArgs(
      decoratorArgs
    );
    const decoratorType = this.getDecoratorType({
      decoratorArgs,
      descriptorKeysMap
    });

    if (decoratorType) {
      if (decoratorType === decoratorTypeEnum.CLASS) {
        // 1.
        tagDecoratorReturnValue = this.withTargetClass(decoratorArgs, (Class) =>
          this.executeTargetClassAnnotations({
            Class,
            tag,
            tagParams
          })
        );
        return tagDecoratorReturnValue;
      }

      descriptor = this.getDescriptor(decoratorArgs);
      tagDecoratorReturnValue = this.getInitialTagDecoratorResultValue({
        decoratorArgs
      });

      const isPropertyOrMethodDecoratorType =
        decoratorType === decoratorTypeEnum.PROPERTY_OR_METHOD;
      const isMethodDecoratorType = decoratorType === decoratorTypeEnum.METHOD;
      if (isPropertyOrMethodDecoratorType || isMethodDecoratorType) {
        // 2.
        const key = this.getKey(decoratorArgs);
        if (!this.isAccessorDescriptor({ descriptorKeysMap })) {
          const {
            descriptor: accessorDescriptor,
            tagDecoratorReturnValue: newTagDecoratorReturnValue
          } = this.getAccessorDescriptorFromNonAccessorDescriptor({
            descriptor,
            descriptorKeysMap,
            key,
            tagDecoratorReturnValue
          });
          descriptor = accessorDescriptor;
          if (newTagDecoratorReturnValue) {
            tagDecoratorReturnValue = newTagDecoratorReturnValue;
          }
        } else {
          if (!descriptorKeysMap.get) {
            descriptor = {
              ...descriptor,
              get: lazyPropGet(key)
            };
          }
          if (!descriptorKeysMap.set) {
            descriptor = {
              ...descriptor,
              set: lazyPropSet(key)
            };
          }
        }
        descriptor = this.wrapAccessorDescriptor({
          descriptor,
          tag,
          tagParams,
          key
        });

        // Assuming a decorator type has matched here.
        matched = true;

        // 3.
        descriptor = this.executeMetaAnnotations({
          tag,
          tagParams,
          descriptor
        });
      } else {
        matched = false;
      }
    }

    if (!matched) {
      /*
       * For now, supported decorators are class, property (static or instance properties) and method (static, prototype or instance methods) decorators.
       * If none of these decorators match, throw an error asking the client to report an issue.
       */
      const decoratorFactoryAPI = this.decoratorFactoryAPI;
      throwUnknownDecoratorTypeError(
        `AOPla - Unknown decorator type.`,
        `\n\ttag ${
          tag[AOPLA_TAG_DATA_PROP].label
            ? `with label "${tag[AOPLA_TAG_DATA_PROP].label}" and ID "${tag[AOPLA_TAG_DATA_PROP].id}"`
            : `without label with ID "${tag[AOPLA_TAG_DATA_PROP].id}"`
        }`,
        `\n\tdecorator factory API: ${decoratorFactoryAPI}`,
        `\n\tdecorator arguments: `,
        decoratorArgs
      );
    }

    tagDecoratorReturnValue = this.getFinalTagDecoratorReturnValue({
      descriptor,
      tagDecoratorReturnValue
    });
    return tagDecoratorReturnValue;
  },

  newAspectData: () => ({
    id: uniqueId(AOPLA_ASPECT_ID_PREFIX)
  }),

  preregisterAnnotation: function ({
    tag,
    annotationKey,
    annotationParamsObj = {}
  }) {
    const adviceName = this.getKey(decoratorArgs);
    return this.preregisterAnnotationReturnValue({
      targetClassResultValue: this.withTargetClass(decoratorArgs, (Aspect) => {
        if (!Aspect[AOPLA_ASPECT_DATA_PROP]) {
          defineProperty(Aspect, AOPLA_ASPECT_DATA_PROP, {
            value: this.newAspectData()
          });
        }
        const aspectId = Aspect[AOPLA_ASPECT_DATA_PROP].id;
        AOPla.preregister({
          aspectId,
          tag,
          annotationKey,
          adviceName,
          annotationParamsObj
        });
      })
    });
  }
});
