// 快捷的获取属性
export function findArrByKey(arr: any, key: string) {
  if (arr && arr.subQuestionArr && arr.subQuestionArr.length) {
    const targetQuestion = arr.subQuestionArr.find((item: any) => {
      return item.id === key;
    });
    if (targetQuestion && targetQuestion.questionDesc) {
      return targetQuestion.questionDesc;
    } else {
      return null;
    }
  }
  if (arr && arr.subAnswerArr && arr.subAnswerArr.length) {
    const targetAnswer = arr.subAnswerArr.find((item: any) => {
      return item.id === key;
    });
    if (targetAnswer && targetAnswer.answer) {
      return targetAnswer.answer;
    } else {
      return null;
    }
  }
}
