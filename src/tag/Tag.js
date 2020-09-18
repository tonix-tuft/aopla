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

import CallableInstance from "callable-instance";
import { uniqueId, defineProperty } from "js-utl";
import {
  AOPLA_TAG_ID_PREFIX,
  AOPLA_TAG_DATA_PROP,
  AOPLA_TAG_INNER_FN,
} from "../constants";

/**
 * The tag class for AOPla tags.
 */
export default class Tag extends CallableInstance {
  /**
   * Construct a new tag.
   *
   * @constructor
   *
   * @param {String|undefined} label The tag label or "undefined" if none.
   * @param {Function} innerFn The tag's inner function to call when the tag is called as it is a callable instance.
   */
  constructor(label, innerFn) {
    const self = super("fn");
    defineProperty(self, AOPLA_TAG_DATA_PROP, {
      value: Object.assign(self[AOPLA_TAG_DATA_PROP] || {}, {
        id: uniqueId(AOPLA_TAG_ID_PREFIX),
        label,
      }),
    });
    defineProperty(self, AOPLA_TAG_INNER_FN, {
      value: innerFn.bind(self),
    });
  }

  /**
   * The function called when this tag is called as a function.
   *
   * @param {...*} [params] The tag parameters.
   * @return {*} The result of the tag called as a function.
   */
  fn(...params) {
    return this[AOPLA_TAG_INNER_FN](...params);
  }
}
