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

/**
 * @type {string}
 */
export const AOPLA_TAG_DATA_PROP = "AOPlaTag-qiPsNISmPR56kUNE6g3C";

/**
 * @type {string}
 */
export const AOPLA_TAG_ID_PREFIX = "AOPlaTag";

/**
 * @type {string}
 */
export const AOPLA_ACCESSOR_DESCRIPTOR_PROPERTY_NAME =
  "AOPlaAccessorDescriptorProperty-yZGlzN5o6SPzhLokVhAF";

/**
 * @type {string}
 */
export const AOPLA_TAG_INNER_FN = "AOPlaTagInnerFn-PzzbrM0bZIRGNTix42k7";

/**
 * @type {Object}
 */
export const AOPLA_ANNOTATION_KEY_MAP = {
  beforeGet: "@beforeGet",
  beforeCall: "@beforeCall",
  beforeSet: "@beforeSet",

  aroundGet: "@aroundGet",
  aroundCall: "@aroundCall",
  aroundSet: "@aroundSet",

  afterThrow: "@afterThrow",
  alwaysFinally: "@alwaysFinally",

  afterGet: "@afterGet",
  afterCall: "@afterCall",
  afterSet: "@afterSet",

  whilePending: "@whilePending",
  afterFulfillment: "@afterFulfillment",
  afterRejection: "@afterRejection",

  meta: "@meta",

  targetClass: "@targetClass",
};

/**
 * @type {string}
 */
export const AOPLA_ASPECT_DATA_PROP = "AOPlaAspect-7PFmFwoQ2pslPof1iQDg";

/**
 * @type {string}
 */
export const AOPLA_ASPECT_ID_PREFIX = "AOPlaAspect";
