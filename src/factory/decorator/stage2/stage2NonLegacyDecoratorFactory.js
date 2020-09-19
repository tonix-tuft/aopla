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

import decoratorTypeEnum from "../common/enums";
import {
  getDescriptorKeysMap,
  lazyPropGet,
  lazyPropSet
} from "../common/helpers";

export const stage2NonLegacyDecoratorFactory = () => ({
  decoratorFactoryAPI: "stage-2 non-legacy",

  getDescriptorKeysMapFromDecoratorArgs: function (decoratorArgs) {
    const [descriptorObj] = decoratorArgs;
    const descriptor = descriptorObj.descriptor || {};
    const descriptorKeysMap = getDescriptorKeysMap(descriptor);
    return descriptorKeysMap;
  },

  getDecoratorType: function ({ decoratorArgs, descriptorKeysMap }) {
    const [descriptorObj] = decoratorArgs;
    if (descriptorObj.kind === "class") {
      return decoratorTypeEnum.CLASS;
    }
    if (
      descriptorKeysMap.get ||
      descriptorKeysMap.set ||
      descriptorObj.kind === "field"
    ) {
      return decoratorTypeEnum.PROPERTY_OR_METHOD;
    } else if (descriptorObj.kind === "method") {
      return decoratorTypeEnum.METHOD;
    }
    return void 0;
  },

  withTargetClass: function (decoratorArgs, targetClassCallback) {
    const [descriptorObj] = decoratorArgs;
    return {
      ...descriptorObj,
      finisher: (Class) => targetClassCallback(Class)
    };
  },

  getDescriptor: function (decoratorArgs) {
    const [descriptorObj] = decoratorArgs;
    const { descriptor } = descriptorObj;
    return descriptor;
  },

  getInitialTagDecoratorResultValue: function ({ decoratorArgs }) {
    const [descriptorObj] = decoratorArgs;
    return descriptorObj;
  },

  getKey: function (decoratorArgs) {
    const [descriptorObj] = decoratorArgs;
    const { key } = descriptorObj;
    return key;
  },

  getAccessorDescriptorFromNonAccessorDescriptor: function ({
    descriptor,
    descriptorKeysMap,
    key,
    tagDecoratorReturnValue
  }) {
    const descriptorObj = tagDecoratorReturnValue;
    const {
      initializer: descriptorObjInitializer,
      ...allButInitializer
    } = descriptorObj;
    const { value, writable, ...allButValueAndWritable } = descriptor;
    const newDescriptor = {
      ...allButValueAndWritable
    };
    let initializer = void 0;
    if (descriptorKeysMap.value) {
      initializer = function () {
        return descriptor.value;
      };
    } else if (descriptorObjInitializer) {
      initializer = descriptorObjInitializer;
    }
    newDescriptor.get = lazyPropGet(key, initializer);
    newDescriptor.set = lazyPropSet(key);
    const newDescriptorObj = {
      ...allButInitializer,
      kind: "method",
      descriptor: newDescriptor
    };
    return {
      descriptor: newDescriptor,
      tagDecoratorReturnValue: newDescriptorObj
    };
  },

  getFinalTagDecoratorReturnValue: function ({
    descriptor,
    tagDecoratorReturnValue
  }) {
    return {
      ...tagDecoratorReturnValue,
      descriptor: {
        ...tagDecoratorReturnValue.descriptor,
        ...descriptor
      }
    };
  },

  preregisterAnnotationReturnValue: function ({ targetClassResultValue }) {
    return targetClassResultValue;
  }
});
