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

import decoratorTypeEnum from "../common/enums";
import {
  getDescriptorKeysMap,
  lazyPropGet,
  lazyPropSet
} from "../common/helpers";
import { noOpFn } from "js-utl";

export const stage1LegacyDecoratorFactory = () => ({
  decoratorFactoryAPI: "stage-1 legacy",

  getDescriptorKeysMapFromDecoratorArgs: function (decoratorArgs) {
    const descriptor = decoratorArgs[2];
    return descriptor ? getDescriptorKeysMap(descriptor) : {};
  },

  getDecoratorType: function ({ decoratorArgs, descriptorKeysMap }) {
    const target = decoratorArgs[0];
    if (target && decoratorArgs.length < 2) {
      return decoratorTypeEnum.CLASS;
    }
    const [, , descriptor] = decoratorArgs;
    if (
      descriptorKeysMap.get ||
      descriptorKeysMap.set ||
      (descriptorKeysMap.value && typeof descriptor.value !== "function") ||
      descriptorKeysMap.initializer
    ) {
      return decoratorTypeEnum.PROPERTY_OR_METHOD;
    } else if (
      descriptorKeysMap.value &&
      typeof descriptor.value === "function"
    ) {
      return decoratorTypeEnum.METHOD;
    }
    return void 0;
  },

  withTargetClass: function (decoratorArgs, targetClassCallback) {
    let [Class] = decoratorArgs;
    if (Object.prototype.hasOwnProperty.call(Class, "constructor")) {
      Class = Class.constructor;
    }
    return targetClassCallback(Class);
  },

  getDescriptor: function (decoratorArgs) {
    const [, , descriptor] = decoratorArgs;
    return descriptor;
  },

  getInitialTagDecoratorResultValue: function ({ decoratorArgs }) {
    const [, , descriptor] = decoratorArgs;
    return descriptor;
  },

  getKey: function (decoratorArgs) {
    const [, key] = decoratorArgs;
    return key;
  },

  getAccessorDescriptorFromNonAccessorDescriptor: function ({
    descriptor,
    descriptorKeysMap,
    key
  }) {
    // `{ value, writable }` or `{ initializer, writable }`.
    const newDescriptor = {
      ...descriptor
    };
    delete newDescriptor.writable;
    delete newDescriptor.value;
    delete newDescriptor.initializer;
    let initializer = void 0;
    if (descriptorKeysMap.value) {
      initializer = function () {
        return descriptor.value;
      };
    } else if (descriptorKeysMap.initializer) {
      initializer = descriptor.initializer;
    }
    newDescriptor.get = lazyPropGet(key, initializer);
    newDescriptor.set = lazyPropSet(key);
    return { descriptor: newDescriptor };
  },

  getFinalTagDecoratorReturnValue: function ({ descriptor }) {
    return descriptor;
  },

  preregisterAnnotationReturnValue: noOpFn
});
