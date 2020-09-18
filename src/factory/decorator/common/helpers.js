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

import { AOPLA_ACCESSOR_DESCRIPTOR_PROPERTY_NAME } from "../../../constants";
import { defineProperty } from "js-utl";

/**
 * @type {Function}
 */
export const getDescriptorKeysMap = (descriptor) => {
  const descriptorKeysMap = {};
  Object.keys(descriptor).map((key) => (descriptorKeysMap[key] = true));
  return descriptorKeysMap;
};

/**
 * @type {Function}
 */
const getFinalKey = (key) =>
  `${AOPLA_ACCESSOR_DESCRIPTOR_PROPERTY_NAME}-${key}`;

/**
 * @type {Object}
 */
const commonPropertyDescriptorKeys = {
  configurable: false,
  enumerable: false,
  writable: true,
};

/**
 * @type {Function}
 */
export const lazyPropGet = (key, initializer) => {
  const finalKey = getFinalKey(key);
  return function lazyPropGet() {
    if (!Object.prototype.hasOwnProperty.call(this, finalKey)) {
      defineProperty(this, finalKey, {
        ...commonPropertyDescriptorKeys,
        value: initializer ? initializer.call(this) : void 0,
      });
    }
    return this[finalKey];
  };
};

/**
 * @type {Function}
 */
export const lazyPropSet = (key) => {
  const finalKey = getFinalKey(key);
  return function lazyPropSet(value) {
    if (!Object.prototype.hasOwnProperty.call(this, finalKey)) {
      defineProperty(this, finalKey, {
        ...commonPropertyDescriptorKeys,
      });
    }
    this[finalKey] = value;
  };
};
