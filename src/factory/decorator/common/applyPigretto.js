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
import { chain, isUndefined, completeObjectAssign, isArray } from "js-utl";
import {
  AOPLA_TAG_DATA_PROP,
  AOPLA_ANNOTATION_KEY_MAP
} from "../../../constants";
import AOPla from "../../../AOPla";

/**
 * @type {Function}
 */
const pigrettoContext = ({ shadowObj, applyContext, ref = {} }) => {
  const expectedPropsMap = {
    argumentsList: true,
    effectiveArgumentsList: true,
    hasPerformedUnderlyingOperation: true,
    hasEffectivelyPerformedUnderlyingOperation: true
  };
  return pigretto(shadowObj, [
    [
      /.?/,
      get().flatAround(function (proceed) {
        const { property } = this;
        if (
          ref.aroundAfterAnnotationContextDeletePropsMap &&
          ref.aroundAfterAnnotationContextDeletePropsMap[property]
        ) {
          return void 0;
        }
        if (
          expectedPropsMap[property] &&
          Object.prototype.hasOwnProperty.call(applyContext, property)
        ) {
          return applyContext[property];
        }
        const value = proceed();
        return value;
      })
    ]
  ]);
};

/**
 * @type {FinallyReturn}
 */
class FinallyReturn {
  constructor(returnValue = void 0) {
    this.returnValue = returnValue;
  }
}

/**
 * @type {Function}
 */
const withTryCatchFinally = ({ tryBlock, catchBlock, finallyBlock }) => {
  try {
    return tryBlock();
  } catch (exception) {
    return catchBlock(exception);
  } finally {
    const result = finallyBlock();
    if (result instanceof FinallyReturn) {
      // eslint-disable-next-line no-unsafe-finally
      return result.returnValue;
    }
  }
};

/**
 * @type {Object}
 */
const noObject = {};

/**
 * @type {Function}
 */
const beforeAfterCatchBlockFn = ({ eRef, baseContext, tag }) => (exception) => {
  let e = exception;
  eRef.e = e;
  const context = completeObjectAssign({}, baseContext, {
    e: exception
  });
  const annotationKey = AOPLA_ANNOTATION_KEY_MAP.onCatch;
  let isThereAnOnCatchAdvice = false;
  let hasRethrown = false;
  AOPla.mapAdvices({ tag, annotationKey })((advice) => {
    isThereAnOnCatchAdvice = true;
    try {
      advice(context);
      hasRethrown = false;
    } catch (exception) {
      e = exception;
      context.e = e;
      eRef.e = e;
      hasRethrown = true;
    }
  });
  if (!isThereAnOnCatchAdvice || hasRethrown) {
    throw e;
  }
};

/**
 * @type {Function}
 */
const isValidOnFinallyAdviceFn = (adviceAnnotationKey) => ({
  annotationParamsObj: { annotationKeyMap }
}) => !!annotationKeyMap[adviceAnnotationKey];

/**
 * @type {Function}
 */
const beforeAfterFinallyBlockFn = ({
  eRef,
  baseContext,
  tag,
  adviceAnnotationKey
}) => () => {
  const { e } = eRef;
  let context = baseContext;
  if (e !== noObject) {
    context = completeObjectAssign({}, baseContext, {
      e
    });
  }
  let atLeastOneAdviceHasReturned = false;
  const annotationKey = AOPLA_ANNOTATION_KEY_MAP.onFinally;
  AOPla.mapAdvices({
    tag,
    annotationKey,
    isValidAdviceFn: isValidOnFinallyAdviceFn(adviceAnnotationKey)
  })((advice) => {
    const returnValue = advice(context);
    if (!isUndefined(returnValue)) {
      atLeastOneAdviceHasReturned = true;
    }
  });
  if (atLeastOneAdviceHasReturned) {
    return new FinallyReturn();
  }
};

/**
 * @type {Function}
 */
export const applyPigretto = ({
  target,
  decoratorFactoryAPI,
  tag,
  tagParams,
  property,

  annotationContext = () => ({}),

  beforeAdviceAnnotationKey,
  beforeAdviceAnnotationContext = () => ({}),

  aroundAdviceAnnotationKey,
  aroundAdviceAnnotationContext = () => ({}),
  aroundAfterAnnotationContextDeletePropsMap = {},

  afterAdviceAnnotationKey,
  afterAdviceAnnotationContext = () => ({}),
  afterAnnotationContextDeleteProps = [],

  onCatchAdviceAnnotationContext = () => ({}),
  onFinallyAdviceAnnotationContext = () => ({}),

  decoratorArgs,
  thisArgFn = void 0,
  returnValueFn = ({ returnValue }) => returnValue
} = {}) => {
  let contextMerge = {};
  const ref = {};
  return pigretto(target, {
    [applyRule]: apply()
      .before(function (...argumentsList) {
        // @beforeGet, @beforeCall, @beforeSet, @onCatch, @onFinally
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
        contextMerge = annotationContext({
          applyContext: this,
          argumentsList
        });
        const baseContext = completeObjectAssign(
          {},
          contextMerge,
          beforeAdviceAnnotationContext({
            argumentsList,
            applyContext: this
          }),
          {
            thisArg: thisArgFn ? thisArgFn() : this.thisArg,
            property,
            tag,
            tagParams
          }
        );

        const eRef = {
          e: noObject
        };
        withTryCatchFinally({
          tryBlock: () => {
            const context = baseContext;
            const annotationKey = beforeAdviceAnnotationKey;
            AOPla.mapAdvices({ tag, annotationKey })((advice) =>
              advice(context)
            );
          },
          catchBlock: beforeAfterCatchBlockFn({ eRef, baseContext, tag }),
          finallyBlock: beforeAfterFinallyBlockFn({
            eRef,
            baseContext,
            tag,
            adviceAnnotationKey: beforeAdviceAnnotationKey
          })
        });
      })
      .flatAround(function (proceed) {
        return function (...argumentsList) {
          // @aroundGet, @aroundCall, @aroundSet, @onCatch, @onFinally
          let returnValue = noObject;
          let e = noObject;
          // eslint-disable-next-line @typescript-eslint/no-this-alias
          const applyContext = this;
          returnValue = withTryCatchFinally({
            tryBlock: () => {
              const aroundAdvicesMiddlewares = AOPla.mapAdvices({
                tag,
                annotationKey: aroundAdviceAnnotationKey
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
                  if (args.length === 1) {
                    let [firstArg] = args;
                    if (!isArray(firstArg)) {
                      firstArg = [firstArg];
                    }
                    argumentsList = firstArg;
                  } else if (args.length > 0) {
                    argumentsList = args;
                  }
                  currentAnnotationHasProceeded = true;
                  currentAnnotationProceedReturnValue = next(...argumentsList);
                  return currentAnnotationProceedReturnValue;
                };

                const shadowObj = completeObjectAssign(
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
                  {},
                  contextMerge,
                  aroundAdviceAnnotationContext({
                    argumentsList,
                    applyContext
                  }),
                  {
                    tag,
                    tagParams,
                    thisArg: thisArgFn ? thisArgFn() : applyContext.thisArg,
                    property,
                    proceed: AOPlaProceed
                  }
                );
                const context = pigrettoContext({
                  shadowObj,
                  applyContext,
                  ref
                });
                const returnValue = advice(context);
                return returnValue;
              });
              aroundAdvicesMiddlewares.push((argumentsList) => {
                const returnValue = proceed(argumentsList);
                ref.aroundAfterAnnotationContextDeletePropsMap = aroundAfterAnnotationContextDeletePropsMap;
                return returnValue;
              });
              const aroundAdvicesChain = chain(aroundAdvicesMiddlewares);
              returnValue = aroundAdvicesChain(...argumentsList);
              returnValue = returnValueFn({
                returnValue,
                applyContext,
                argumentsList
              });
              return returnValue;
            },
            catchBlock: (exception) => {
              e = exception;
              const baseContext = {
                thisArg: thisArgFn ? thisArgFn() : applyContext.thisArg,
                property,
                tag,
                tagParams,
                e
              };
              const objectParam = {
                argumentsList,
                applyContext
              };
              if (returnValue !== noObject) {
                objectParam.returnValue = returnValue;
              }
              let isThereAnOnCatchAdvice = false;
              let hasRethrown = false;
              const annotationKey = AOPLA_ANNOTATION_KEY_MAP.onCatch;
              AOPla.mapAdvices({ tag, annotationKey })((advice) => {
                isThereAnOnCatchAdvice = true;
                const shadowObj = completeObjectAssign(
                  {},
                  contextMerge,
                  onCatchAdviceAnnotationContext(objectParam),
                  baseContext
                );
                const context = pigrettoContext({
                  shadowObj,
                  applyContext,
                  ref
                });
                try {
                  returnValue = advice(context);
                  objectParam.returnValue = returnValue;
                  hasRethrown = false;
                } catch (exception) {
                  e = exception;
                  context.e = e;
                  hasRethrown = true;
                }
              });
              if (!isThereAnOnCatchAdvice || hasRethrown) {
                throw e;
              }
              returnValue = returnValue !== noObject ? returnValue : void 0;
              return returnValue;
            },
            finallyBlock: () => {
              const baseContext = {
                thisArg: thisArgFn ? thisArgFn() : applyContext.thisArg,
                property,
                tag,
                tagParams
              };
              const objectParam = {
                argumentsList,
                applyContext
              };
              if (returnValue !== noObject) {
                objectParam.returnValue = returnValue;
              }
              if (e !== noObject) {
                baseContext.e = e;
              }
              let atLeastOneAdviceHasReturned = false;
              const annotationKey = AOPLA_ANNOTATION_KEY_MAP.onFinally;
              AOPla.mapAdvices({
                tag,
                annotationKey,
                isValidAdviceFn: isValidOnFinallyAdviceFn(
                  aroundAdviceAnnotationKey
                )
              })((advice) => {
                const shadowObj = completeObjectAssign(
                  {},
                  contextMerge,
                  onFinallyAdviceAnnotationContext(objectParam),
                  baseContext
                );
                const context = pigrettoContext({
                  shadowObj,
                  applyContext,
                  ref
                });
                returnValue = advice(context);
                if (!isUndefined(returnValue)) {
                  atLeastOneAdviceHasReturned = true;
                }
                objectParam.returnValue = returnValue;
              });
              returnValue = returnValue !== noObject ? returnValue : void 0;
              if (atLeastOneAdviceHasReturned) {
                return new FinallyReturn(returnValue);
              }
            }
          });
          return returnValue;
        };
      })
      .after(function (...argumentsList) {
        return function (returnValue) {
          // @afterGet, @afterCall, @afterSet, @onCatch, @onFinally
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
          const baseContext = completeObjectAssign(
            {},
            contextMerge,
            afterAdviceAnnotationContext({
              argumentsList,
              returnValue, // For @afterCall
              applyContext: this // For @afterCall: applyContext.effectiveArgumentsList
            }),
            {
              thisArg: thisArgFn ? thisArgFn() : this.thisArg,
              property,
              tag,
              tagParams,
              hasPerformedUnderlyingOperation: this
                .hasPerformedUnderlyingOperation,
              hasEffectivelyPerformedUnderlyingOperation: this
                .hasEffectivelyPerformedUnderlyingOperation
            }
          );
          afterAnnotationContextDeleteProps.map((prop) => {
            delete baseContext[prop];
          });

          const eRef = {
            e: noObject
          };
          withTryCatchFinally({
            tryBlock: () => {
              const context = baseContext;
              const annotationKey = afterAdviceAnnotationKey;
              AOPla.mapAdvices({ tag, annotationKey })((advice) =>
                advice(context)
              );
            },
            catchBlock: beforeAfterCatchBlockFn({ eRef, baseContext, tag }),
            finallyBlock: beforeAfterFinallyBlockFn({
              eRef,
              baseContext,
              tag,
              adviceAnnotationKey: afterAdviceAnnotationKey
            })
          });
        };
      })
  });
};
