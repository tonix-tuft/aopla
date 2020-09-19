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

import preregister from "./helpers/preregister";
import { AOPLA_ANNOTATION_KEY_MAP } from "../constants";
// eslint-disable-next-line no-unused-vars
import Tag from "../tag/Tag";

/**
 * Annotation for advices to execute repeatedly while a promise returned by a method tagged with the given tag is in a pending state.
 *
 * @param {Tag} tag A tag for which to execute the advice annotated with this annotation.
 * @param {Object} [annotationParamsObj] An optional object with parameters:
 *
 *                                           - interval (number): Delay in milliseconds between the executions of the advice
 *                                                                (if set, "minInterval" and "maxInterval" will not be considered).
 *                                                                Defaults to 500 ms;
 *                                           - minInterval (number): Minimum delay in milliseconds between the executions of the advice;
 *                                           - maxInterval (number): Maximum delay in milliseconds between the executions of the advice;
 *
 *                                       If this object is not provided, or provided as an empty object or with a different shape, a default interval
 *                                       of 500 ms will be used.
 * @return {Function} The decorator function for the preregistration.
 */
export default function whilePending(tag, annotationParamsObj = {}) {
  if (
    !Object.prototype.hasOwnProperty.call(annotationParamsObj, "interval") &&
    !Object.prototype.hasOwnProperty.call(annotationParamsObj, "minInterval") &&
    !Object.prototype.hasOwnProperty.call(annotationParamsObj, "maxInterval")
  ) {
    // Default interval.
    annotationParamsObj = { ...annotationParamsObj };
    annotationParamsObj.interval = 500;
  }
  const {
    interval = void 0,
    minInterval = void 0,
    maxInterval = void 0
  } = annotationParamsObj;
  return preregister({
    tag,
    annotationKey: AOPLA_ANNOTATION_KEY_MAP.whilePending,
    annotationParamsObj: { interval, minInterval, maxInterval }
  });
}
