import {IQuestion, ISubQuestion, IUserQuestionAnswer} from "@/containers/aboutphone/page/condition/index.interface";

export function canShowMoreQuestion(isMoreCondition: any[], userAnswer?: []) {
  if (!userAnswer) {
    return false
  }
  return JSON.stringify(isMoreCondition) === JSON.stringify(userAnswer)
}

export function findAnswerById(userAnswerInput: IUserQuestionAnswer[], id: string) {
  let target
  userAnswerInput.forEach((answer) => {
    const {subAnswerArr} = answer
    subAnswerArr.forEach((subAnswer) => {
      if (subAnswer.id === id) {
        target = subAnswer
      }
    })
  });
  return target
}

export function isCanMove(findCurrent: IQuestion, userAnswerInput: IUserQuestionAnswer[]) : boolean {
  if (!findCurrent) {
    return false
  }
  function isAllNotEmpty(arr: ISubQuestion[]) {
    // @ts-ignore
    return arr.every((question) => {
      const {id: subQuestionId} = question
      const userAnswer = findAnswerById(userAnswerInput, subQuestionId)
      // @ts-ignore
      return userAnswer && userAnswer.answer && userAnswer.answer.length
    })
    // const { id, subQuestionArr } = arr;
    // const userAnswer = findAnswerById(id)
    // return Boolean(userAnswer && (userAnswer.subAnswerArr.length === subQuestionArr.length))
  }
  // 检测动态是否完整
  const currentSubQuestion = getCurrentSubQuestion(findCurrent, userAnswerInput)
  if (isAllNotEmpty(currentSubQuestion)) {
    return true
  }
  return false
}

function getCurrentSubQuestion(findCurrent: IQuestion, userAnswerInput: IUserQuestionAnswer[]) : ISubQuestion[] {
  // 根据
  const { subQuestionArr } = findCurrent;
  let canNext = true
  return subQuestionArr.filter((question, index) => {
    const {id: subQuestionId, isMoreCondition} = question
    // 找出对应的answer
    const userAnswer = findAnswerById(userAnswerInput, subQuestionId)
    if (canNext) {
      // @ts-ignore
      if (isMoreCondition && !canShowMoreQuestion(isMoreCondition, userAnswer && userAnswer.answer)) {
        canNext = false
      }
      return true
    } else {
      return false
    }
  }) || []
}

// 根据题目判断。当前这道题目，是否有continue？
export function isNoContinue(findCurrent: IQuestion, userAnswerInput: IUserQuestionAnswer[]) {
  const currentSubQuestion = getCurrentSubQuestion(findCurrent, userAnswerInput)
  return currentSubQuestion.every((subAnswer) => {
    const {type} = subAnswer
    return type === 'default'
  })
}