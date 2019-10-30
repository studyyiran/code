interface IDataReport {
  event?: string;
  step: string;
}

const eventType = {
  stepCompleted: "stepCompleted"
};

export function dataReport(params: IDataReport) {
  if (!params.event) {
    params.event = eventType.stepCompleted;
  }
  console.log(params);
}
