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

import declarativeFactory from "declarative-factory";
import tagWithParamsFactory from "./factory/tagWithParamsFactory";
import tagWithoutParamsFactory from "./factory/tagWithoutParamsFactory";
// eslint-disable-next-line no-unused-vars
import Tag from "./Tag";

/**
 * Tag function to create a new tag.
 *
 * @param {string|Function} [label] An optional tag label (useful for debug in case of errors) or a tag parameter reducer function
 *                                  to add to the list of tag parameters reducers to use for the tag parameters
 *                                  (see the "tagParamsReducers" parameter below).
 * @param {...Function} [tagParamsReducers] An optional list of tag parameters reducers to use for the tag parameters
 *                                          when the returned tag is used.
 * @return {Tag} The new tag.
 */
export default function tag(...tagParamsReducers) {
  const label = tagParamsReducers[0] || void 0;
  const typeOfLabel = typeof label;
  if (typeOfLabel === "string") {
    tagParamsReducers.shift();
  }
  const tagFactory = declarativeFactory([
    [tagParamsReducers.length, () => tagWithParamsFactory(tagParamsReducers)],
    () => tagWithoutParamsFactory,
  ])();
  const tag = tagFactory({ label });
  return tag;
}
