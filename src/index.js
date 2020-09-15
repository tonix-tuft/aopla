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

import AOPla from "./AOPla";
import tag from "./tag";
import { withParams } from "./tag/reducers/withParams";
import afterCall from "./annotation/afterCall";
import afterGet from "./annotation/afterGet";
import afterSet from "./annotation/afterSet";
import aroundCall from "./annotation/aroundCall";
import aroundGet from "./annotation/aroundGet";
import aroundSet from "./annotation/aroundSet";
import beforeCall from "./annotation/beforeCall";
import beforeGet from "./annotation/beforeGet";
import beforeSet from "./annotation/beforeSet";
import whilePending from "./annotation/whilePending";
import afterFulfillment from "./annotation/afterFulfillment";
import afterRejection from "./annotation/afterRejection";
import meta from "./annotation/meta";
import targetClass from "./annotation/targetClass";
import { AOPLA_TAG_DATA_PROP } from "./constants";

[
  ["tag", tag],
  ["withParams", withParams],
  ["afterCall", afterCall],
  ["afterGet", afterGet],
  ["afterSet", afterSet],
  ["aroundCall", aroundCall],
  ["aroundGet", aroundGet],
  ["aroundSet", aroundSet],
  ["beforeCall", beforeCall],
  ["beforeGet", beforeGet],
  ["beforeSet", beforeSet],
  ["whilePending", whilePending],
  ["afterFulfillment", afterFulfillment],
  ["afterRejection", afterRejection],
  ["meta", meta],
  ["targetClass", targetClass],
  ["AOPLA_TAG_DATA_PROP", AOPLA_TAG_DATA_PROP],
].map(([prop, value]) => (AOPla[prop] = value));
export default AOPla;
export {
  tag,
  withParams,
  afterCall,
  afterGet,
  afterSet,
  aroundCall,
  aroundGet,
  aroundSet,
  beforeCall,
  beforeGet,
  beforeSet,
  meta,
  whilePending,
  afterFulfillment,
  afterRejection,
  targetClass,
  AOPLA_TAG_DATA_PROP,
};
