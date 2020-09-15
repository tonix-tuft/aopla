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

import pigretto, { applyRule, apply, get } from "pigretto";
import { chain } from "js-utl";
import {
  AOPLA_TAG_DATA_PROP,
  AOPLA_ANNOTATION_KEY_MAP,
} from "../../../constants";
import AOPla from "../../../AOPla";

/**
 * @type {Function}
 */
export const applyPigretto = ({
  target,
  decoratorFactoryAPI,
  tag,
  tagParams,
  property,

  beforeAdviceAnnotationKey,
  beforeAdviceAnnotationContext = () => ({}),

  aroundAdviceAnnotationKey,
  aroundAdviceAnnotationContext = () => ({}),

  afterAdviceAnnotationKey,
  afterAdviceAnnotationContext = () => ({}),

  afterThrowAdviceAnnotationContext = () => ({}),
  alwaysFinallyAdviceAnnotationContext = () => ({}),

  decoratorArgs,
  thisArgFn = void 0,
  returnValueFn = ({ returnValue }) => returnValue,
} = {}) => {
  return pigretto(target, {
    [applyRule]: apply()
      .before(function (...argumentsList) {
        // @beforeGet, @beforeCall, @beforeSet
        //
        // @beforeGet:
        //    get(): target, property, receiver, rule
        //    apply(): target, thisArg, rule
        //
        // @beforeCall:
        //    call(): target, property, receiver, rule
        //    apply(): target, thisArg, rule
        //
        // @beforeSet:
        //    set(): target, property, value, originalValue, receiver, rule
        //    apply(): target, thisArg, rule
        //
        const context = {
          ...beforeAdviceAnnotationContext({
            argumentsList,
            applyContext: this,
          }),
          thisArg: thisArgFn ? thisArgFn() : this.thisArg,
          property,
          tag,
          tagParams,
        };

        const annotationKey = beforeAdviceAnnotationKey;
        AOPla.mapAdvices({ tag, annotationKey })((advice) => advice(context));
      })
      .flatAround(function (proceed) {
        return function (...argumentsList) {
          // @aroundGet, @aroundCall, @aroundSet, @afterThrow, @alwaysFinally

          const noObject = {};
          let returnValue = noObject;
          let e = noObject;
          try {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const applyContext = this;

            const aroundAdvicesMiddlewares = AOPla.mapAdvices({
              tag,
              annotationKey: aroundAdviceAnnotationKey,
            })((advice) => (argumentsList, next) => {
              let currentAnnotationHasProceeded;
              let currentAnnotationProceedReturnValue = void 0;
              const AOPlaProceed = (...args) => {
                if (currentAnnotationHasProceeded) {
                  // eslint-disable-next-line no-console
                  console.error(
                    `AOPla - Multiple proceeds for the same ${aroundAdviceAnnotationKey} around advice are not supported, subsequent proceed has been ignored.`,
                    `\n\ttag ${
                      tag[AOPLA_TAG_DATA_PROP].label
                        ? `with label "${tag[AOPLA_TAG_DATA_PROP].label}" and ID "${tag[AOPLA_TAG_DATA_PROP].id}"`
                        : `without label with ID "${tag[AOPLA_TAG_DATA_PROP].id}"`
                    }`,
                    `\n\tdecorator factory API: ${decoratorFactoryAPI}`,
                    `\n\tdecorator arguments: `,
                    decoratorArgs
                  );
                  return currentAnnotationProceedReturnValue;
                }
                if (args.length > 0) {
                  argumentsList = args;
                }
                currentAnnotationHasProceeded = true;
                currentAnnotationProceedReturnValue = next(argumentsList);
                return currentAnnotationProceedReturnValue;
              };

              const shadowObj = {
                // @aroundGet, @aroundCall, @aroundSet
                //
                // @aroundGet
                //    get(): target, property, receiver, rule, flat
                //    apply(): target, thisArg, rule, flat + argumentsList, effectiveArgumentsList, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
                //
                // @aroundCall
                //    call(): target, property, receiver, rule, flat
                //    apply(): target, thisArg, rule, flat + argumentsList, effectiveArgumentsList, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
                //
                // @aroundSet
                //    set(): target, property, value, originalValue, receiver, rule, flat
                //    apply(): target, thisArg, rule, flat + argumentsList, effectiveArgumentsList, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
                //
                ...aroundAdviceAnnotationContext({
                  argumentsList,
                }),
                tag,
                tagParams,
                thisArg: thisArgFn ? thisArgFn() : applyContext.thisArg,
                property,
                proceed: AOPlaProceed,
              };
              const expectedPropsMap = {
                argumentsList: true,
                effectiveArgumentsList: true,
                hasPerformedUnderlyingOperation: true,
                hasEffectivelyPerformedUnderlyingOperation: true,
              };
              const context = pigretto(shadowObj, [
                [
                  /.?/,
                  get().flatAround(function (proceed) {
                    const { property } = this;
                    if (
                      expectedPropsMap[property] &&
                      Object.prototype.hasOwnProperty.call(
                        applyContext,
                        property
                      )
                    ) {
                      return applyContext[property];
                    }
                    const propertyValue = proceed();
                    return propertyValue;
                  }),
                ],
              ]);

              const returnValue = advice(context);
              return returnValue;
            });
            aroundAdvicesMiddlewares.push((argumentsList) => {
              const returnValue = proceed(argumentsList);
              return returnValue;
            });
            const aroundAdvicesChain = chain(aroundAdvicesMiddlewares);
            returnValue = aroundAdvicesChain(...argumentsList);
            returnValue = returnValueFn({
              returnValue,
              applyContext,
              argumentsList,
            });
            return returnValue;
          } catch (exception) {
            e = exception;
            const partialContext = {
              thisArg: thisArgFn ? thisArgFn() : this.thisArg,
              property,
              tag,
              tagParams,
              e,
            };
            const objectParam = {
              argumentsList,
              applyContext: this,
            };
            if (returnValue !== noObject) {
              objectParam.returnValue = returnValue;
            }
            let isThereAnAfterThrowAdvice = false;
            const annotationKey = AOPLA_ANNOTATION_KEY_MAP.afterThrow;
            AOPla.mapAdvices({ tag, annotationKey })((advice) => {
              isThereAnAfterThrowAdvice = true;
              const context = {
                ...afterThrowAdviceAnnotationContext(objectParam),
                ...partialContext,
              };
              const newReturnValue = advice(context);
              if (newReturnValue) {
                returnValue = newReturnValue;
              }
            });
            if (!isThereAnAfterThrowAdvice) {
              throw e;
            }
            returnValue = returnValue !== noObject ? returnValue : void 0;
            return returnValue;
          } finally {
            const partialContext = {
              thisArg: thisArgFn ? thisArgFn() : this.thisArg,
              property,
              tag,
              tagParams,
            };
            const objectParam = {
              argumentsList,
              applyContext: this,
            };
            if (returnValue !== noObject) {
              objectParam.returnValue = returnValue;
            }
            if (e !== noObject) {
              partialContext.e = e;
            }
            let isThereAnAlwaysFinallyAdvice = false;
            let atLeastOneAdviceHasReturned = false;
            const annotationKey = AOPLA_ANNOTATION_KEY_MAP.alwaysFinally;
            AOPla.mapAdvices({ tag, annotationKey })((advice) => {
              isThereAnAlwaysFinallyAdvice = true;
              const context = {
                ...alwaysFinallyAdviceAnnotationContext(objectParam),
                ...partialContext,
              };
              const newReturnValue = advice(context);
              if (newReturnValue) {
                atLeastOneAdviceHasReturned = true;
                returnValue = newReturnValue;
              }
            });
            returnValue = returnValue !== noObject ? returnValue : void 0;
            if (isThereAnAlwaysFinallyAdvice && atLeastOneAdviceHasReturned) {
              // eslint-disable-next-line no-unsafe-finally
              return returnValue;
            }
          }
        };
      })
      .after(function (...argumentsList) {
        return function (returnValue) {
          // @afterGet, @afterCall, @afterSet
          //
          // @afterGet:
          //    get(): target, property, receiver, rule, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
          //    apply(): target, thisArg, rule, effectiveArgumentsList, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
          //
          // @afterCall:
          //    call(): target, property, receiver, rule, effectiveArgumentsList, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
          //    apply(): target, thisArg, rule, effectiveArgumentsList, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
          //
          // @afterSet:
          //    set(): target, property, value, originalValue, receiver, rule, updateWasSuccessful, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
          //    apply(): target, thisArg, rule, effectiveArgumentsList, hasPerformedUnderlyingOperation, hasEffectivelyPerformedUnderlyingOperation
          //
          const context = {
            ...afterAdviceAnnotationContext({
              argumentsList,
              returnValue, // For @afterCall
              applyContext: this, // For @afterCall: applyContext.effectiveArgumentsList
            }),
            thisArg: thisArgFn ? thisArgFn() : this.thisArg,
            property,
            tag,
            tagParams,
            hasPerformedUnderlyingOperation: this
              .hasPerformedUnderlyingOperation,
            hasEffectivelyPerformedUnderlyingOperation: this
              .hasEffectivelyPerformedUnderlyingOperation,
          };

          const annotationKey = afterAdviceAnnotationKey;
          AOPla.mapAdvices({ tag, annotationKey })((advice) => advice(context));
        };
      }),
  });
};
