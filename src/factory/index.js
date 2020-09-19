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
import { decoratorFactory } from "./decorator/common/decoratorFactory";
import { stage2NonLegacyDecoratorFactory } from "./decorator/stage2/stage2NonLegacyDecoratorFactory";
import { stage1LegacyDecoratorFactory } from "./decorator/stage1/stage1LegacyDecoratorFactory";

/**
 * Constructs a new factory object for the given decorator arguments.
 *
 * @param {...*} decoratorArgs The decorator arguments.
 * @return {Object} The factory object for the given tag.
 */
export default function factory(decoratorArgs) {
  const factory = declarativeFactory([
    [
      () => {
        let isStage2NonLegacyDecorator = false;
        if (decoratorArgs[0]) {
          const descriptorObj = decoratorArgs[0];
          if (
            Object.prototype.hasOwnProperty.call(descriptorObj, "kind") &&
            (Object.prototype.hasOwnProperty.call(descriptorObj, "elements") ||
              (Object.prototype.hasOwnProperty.call(descriptorObj, "key") &&
                Object.prototype.hasOwnProperty.call(
                  descriptorObj,
                  "descriptor"
                )))
          ) {
            isStage2NonLegacyDecorator = true;
          }
        }
        return isStage2NonLegacyDecorator;
      },
      stage2NonLegacyDecoratorFactory
    ],
    stage1LegacyDecoratorFactory
  ]);
  return {
    ...decoratorFactory(decoratorArgs),
    ...factory(decoratorArgs)
  };
}
