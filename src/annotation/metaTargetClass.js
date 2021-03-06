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

import preregister from "./helpers/preregister";
import { AOPLA_ANNOTATION_KEY_MAP } from "../constants";
// eslint-disable-next-line no-unused-vars
import Tag from "../tag/Tag";

/**
 * Annotation for advices to execute when tagging a method or a property allowing the client code
 * to access the descriptor of the method or property tagged with the given tag as well as the target class.
 *
 * @param {Tag} tag A tag for which to execute the advice annotated with this annotation.
 * @return {Function} The decorator function for the preregistration.
 */
export default function metaTargetClass(tag) {
  return preregister({
    tag,
    annotationKey: AOPLA_ANNOTATION_KEY_MAP.metaTargetClass
  });
}
