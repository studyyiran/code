import { isServer } from "../../utils/util";

const eventType = {
  stepCompleted: "stepCompleted"
};

export function dataReport(params: any) {
  if (!params.event) {
    params.event = eventType.stepCompleted;
  }
  let mapping = {
    Storage: "storage",
    Carrier: "carrier",
    PowerOn: "powerOn",
    Scratches: "scratches",
    ScratchesonScreen: "scratchesOnTheScreen",
    ScratcheswhenScreenIsOn: "canSeeScratches",
    CrackLocation: "crackLocation",
    Cracks: "cracks",
    FunctionDefects: "notWorking",
    Functionality: "isFunctional",
    InternetAccounts: "accountRemoved",
    RemoveAccount: "canRemoveAccount",
    PayoffStatus: "phonePaid"
  };
  let formatParams = {};
  Object.keys(params).forEach(key => {
    debugger;
    if (mapping[key]) {
      formatParams[mapping[key]] = params[key];
    } else {
      formatParams[key] = params[key];
    }
  });
  if (!isServer()) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(formatParams);
  }
}
