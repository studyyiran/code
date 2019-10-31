import { isServer } from "../../utils/util";

const eventType = {
  stepCompleted: "stepCompleted"
};

export function dataReport(params: any) {
  if (!params.event) {
    params.event = eventType.stepCompleted;
  }
  if (!isServer()) {
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push(params);
    console.log(params);
  }
}
