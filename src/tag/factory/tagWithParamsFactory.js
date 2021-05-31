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

import { pipe } from "js-utl";
import factory from "../../factory";
import Tag from "../Tag";

/**
 * A factory for tags with parameters.
 *
 * @param {Function[]} tagParamsReducers An array of tag parameters reducers, each reducer being a function accepting the parameters
 *                                       and returning an array of the reduced parameters.
 *                                       The functions are piped one after the other in order. Each subsequent function receives
 *                                       the spread parameters returned from the previous function.
 * @return {Function} The function returning the decorator.
 */
export default function tagWithParamsFactory(tagParamsReducers) {
  const tagParamsPipeReducer = pipe(
    ...tagParamsReducers.map((tagParamsReducer, i) =>
      i > 0
        ? (params) => tagParamsReducer(...params)
        : (...params) => tagParamsReducer(...params)
    )
  );
  return function ({ label }) {
    const tag = new Tag(label, function (...params) {
      const finalParams = tagParamsPipeReducer(...params);
      return function tagWithParamsDecorator(...decoratorArgs) {
        return factory(decoratorArgs).tagDecorator(tag, finalParams);
      };
    });
    return tag;
  };
}
