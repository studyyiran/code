import { getServerAnswerFormat } from "./util";

export function conditionPageReport(params: {
  step: string;
  phoneConditionQuestion: any;
  phoneConditionAnswer: any;
}) {
  const { step, phoneConditionQuestion, phoneConditionAnswer } = params;
  console.log(params.step);
  console.log(params.phoneConditionQuestion);
  console.log(params.phoneConditionAnswer);
  const result = getServerAnswerFormat(
    phoneConditionQuestion,
    phoneConditionAnswer
  );
  console.log(result);
}
