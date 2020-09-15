/* eslint-disable no-unused-vars */
import {
  beforeCall,
  afterCall,
  aroundCall,
  afterFulfillment,
  afterRejection,
  whilePending,
  beforeGet,
  afterGet,
  aroundGet,
  beforeSet,
  afterSet,
  aroundSet,
  meta,
  targetClass,
  AOPLA_TAG_DATA_PROP,
} from "aopla";
import {
  Tag1,
  Tag2,
  Tag3,
  Tag4,
  Tag5,
  Tag6,
  ClassTag1,
  PropTag1,
  PropTag2,
} from "../tags";

// eslint-disable-next-line no-console
console.log("importing SomeAspect...");

class SomeAspect {
  @afterCall(Tag2)
  afterCallingMethodWithTag2({ tagParams }) {
    const [{ abc, def }] = tagParams;
    // eslint-disable-next-line no-console
    console.warn("SomeAspect.afterCallingMethodWithTag2()", { abc, def });
    // ...
  }

  // @beforeGet(PropTag1)
  // beforeGettingPropertyWithPropTag1({ tag, ...rest }) {
  //   // ...

  //   // TODO: Remove
  //   // eslint-disable-next-line no-console
  //   console.log(tag[AOPLA_TAG_DATA_PROP].label, { tag, ...rest });
  // }

  // @afterGet(PropTag1)
  // afterGettingPropertyWithPropTag1({ tag, ...rest }) {
  //   // TODO: Remove
  //   // eslint-disable-next-line no-console
  //   console.log(tag[AOPLA_TAG_DATA_PROP].label, { tag, ...rest });
  // }

  // @aroundGet(PropTag1)
  // aroundGettingPropertyWithPropTag1() {
  //   // ...
  // }

  // @beforeCall(Tag1)
  // beforeCallingMethodWithTag1() {
  //   // ...
  // }

  // @aroundCall(Tag3)
  // aroundCallingMethodWithTag3(context) {
  //   let returnValue;
  //   {
  //     // AROUND - BEFORE
  //     const { tag, proceed, ...rest } = context;
  //     // ...
  //     // eslint-disable-next-line no-console
  //     console.log("aroundCallingMethodWithTag3 - before", { proceed });
  //     // TODO: Remove
  //     // eslint-disable-next-line no-console
  //     console.log(tag[AOPLA_TAG_DATA_PROP].label, `@aroundCall - before`, {
  //       tag,
  //       proceed,
  //       ...rest,
  //     });
  //     returnValue = proceed();
  //   }
  //   {
  //     // AROUND - AFTER
  //     const { tag, proceed, ...rest } = context;
  //     // eslint-disable-next-line no-console
  //     console.log("aroundCallingMethodWithTag3 - after", { returnValue });
  //     // TODO: Remove
  //     // eslint-disable-next-line no-console
  //     console.log(
  //       tag[AOPLA_TAG_DATA_PROP].label,
  //       `@aroundCall - after`,
  //       { tag, proceed, ...rest },
  //       returnValue
  //     );
  //   }

  //   // TODO: Remove
  //   returnValue = "Tag3 someInstanceMethod returnValue override!!!";
  //   return returnValue;
  // }

  // @whilePending(Tag6, { interval: 1500 })
  // whilePendingPromiseReturnedByMethodWithTag6() {
  //   // Executed every 1500ms until the returned promise is settled (either fulfilled or rejected).
  //   // ...
  // }

  // @afterFulfillment(Tag4)
  // afterFulfillmentOfPromiseReturnedByMethodWithTag4() {
  //   // ...
  // }

  // @afterRejection(Tag5)
  // afterRejectionOfPromiseReturnedByMethodWithTag5() {
  //   // ...
  // }

  // @beforeSet(PropTag2)
  // beforeSettingPropertyWithPropTag2() {
  //   // ...
  // }

  // @afterSet(PropTag2)
  // afterSettingPropertyWithPropTag2() {
  //   // ...
  // }

  // @aroundSet(PropTag2)
  // aroundSettingPropertyWithPropTag2() {
  //   // ...
  // }

  // @meta(PropTag1)
  // metadataForPropertyWithPropTag1({ tag, tagParams, descriptor }) {
  //   // TODO: execute @meta annotations
  //   // eslint-disable-next-line no-console
  //   console.log(tag[AOPLA_TAG_DATA_PROP].label, "@meta", {
  //     tag,
  //     tagParams,
  //     descriptor,
  //   });

  //   descriptor.writable = false;
  //   // ...
  // }

  // @meta(Tag3)
  // metadataForMethodWithTag1({ descriptor }) {
  //   // ...
  //   // eslint-disable-next-line no-console
  //   console.log(descriptor);
  // }

  // @targetClass(ClassTag1)
  // onAnyTargetClassWithClassTag1({ Class, tag, tagParams }) {
  //   // TODO: execute @targetClass annotations
  //   // eslint-disable-next-line no-console
  //   console.log(tag[AOPLA_TAG_DATA_PROP].label, "@targetClass", {
  //     Class,
  //     tag,
  //     tagParams,
  //   });
  //   return class extends Class {
  //     constructor(...args) {
  //       super(...args);
  //       this.decorated = true;
  //     }
  //   };
  // }
}

export default SomeAspect;
