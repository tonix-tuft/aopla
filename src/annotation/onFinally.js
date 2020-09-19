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
import beforeGet from "./beforeGet";
import afterGet from "./afterGet";
import aroundGet from "./aroundGet";
import beforeCall from "./beforeCall";
import afterCall from "./afterCall";
import aroundCall from "./aroundCall";
import beforeSet from "./beforeSet";
import afterSet from "./afterSet";
import aroundSet from "./aroundSet";

/**
 * @type {boolean}
 */
export const get = true;

/**
 * @type {boolean}
 */
export const call = true;

/**
 * @type {boolean}
 */
export const set = true;

/**
 * @type {boolean}
 */
export const before = true;

/**
 * @type {boolean}
 */
export const around = true;

/**
 * @type {boolean}
 */
export const after = true;

/**
 * Annotation for advices to execute always regardless of whether an exception was thrown or caught
 * by a method tagged with the given tag or by a getter or a setter of a property tagged with the given tag.
 *
 * @param {Tag} tag A tag for which to execute the advice annotated with this annotation.
 * @param {Object} [adviceAnnotationsMap] A map specifying for which advice annotations to execute this advice in finally block.
 * @return {Function} The decorator function for the preregistration.
 */
export default function onFinally(tag, adviceAnnotationsMap = void 0) {
  if (!adviceAnnotationsMap) {
    adviceAnnotationsMap = {
      beforeGet,
      aroundGet,
      afterGet,

      beforeCall,
      aroundCall,
      afterCall,

      beforeSet,
      aroundSet,
      afterSet
    };
  }
  if (adviceAnnotationsMap.get) {
    adviceAnnotationsMap = {
      ...adviceAnnotationsMap,
      beforeGet,
      aroundGet,
      afterGet
    };
  }
  if (adviceAnnotationsMap.call) {
    adviceAnnotationsMap = {
      ...adviceAnnotationsMap,
      beforeCall,
      aroundCall,
      afterCall
    };
  }
  if (adviceAnnotationsMap.set) {
    adviceAnnotationsMap = {
      ...adviceAnnotationsMap,
      beforeSet,
      aroundSet,
      afterSet
    };
  }
  if (adviceAnnotationsMap.before) {
    adviceAnnotationsMap = {
      ...adviceAnnotationsMap,
      beforeGet,
      beforeCall,
      beforeSet
    };
  }
  if (adviceAnnotationsMap.around) {
    adviceAnnotationsMap = {
      ...adviceAnnotationsMap,
      aroundGet,
      aroundCall,
      aroundSet
    };
  }
  if (adviceAnnotationsMap.after) {
    adviceAnnotationsMap = {
      ...adviceAnnotationsMap,
      afterGet,
      afterCall,
      afterSet
    };
  }
  const map = {};
  return preregister({
    tag,
    annotationKey: AOPLA_ANNOTATION_KEY_MAP.onFinally,
    annotationParamsObj: {
      annotationKeyMap: Object.keys(adviceAnnotationsMap)
        .map((key) => AOPLA_ANNOTATION_KEY_MAP[key])
        .reduce((acc, key) => {
          acc[key] = true;
          return acc;
        }, map)
    }
  });
}
