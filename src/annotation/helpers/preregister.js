/*
 * Copyright (c) 2021 Anton Bagdatyev (Tonix)
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

import factory from "../../factory";
// eslint-disable-next-line no-unused-vars
import Tag from "../../tag/Tag";

/**
 * Preregister an AOPla annotation.
 *
 * @param {Object} params The parameters.
 * @param {Tag} params.tag The tag.
 * @param {string} params.annotationKey The annotation key (a value of the "AOPLA_ANNOTATION_KEY_MAP" map).
 * @param {Object} [params.annotationParamsObj] An optional object with further parameters.
 * @return {Function} The decorator function for the preregistration.
 */
export default function preregister({
  tag,
  annotationKey,
  annotationParamsObj = {}
}) {
  return function (...decoratorArgs) {
    const decoratorFactory = factory(decoratorArgs);
    return decoratorFactory.preregisterAnnotation({
      tag,
      annotationKey,
      annotationParamsObj
    });
  };
}
