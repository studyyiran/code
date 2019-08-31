import {
  IQuestion,
  IUserAnswer,
  ISubQuestion,
  IUserQuestionAnswer
} from "../index.interface";

export function canShowMoreQuestion(
  isMoreCondition?: string[],
  userAnswer?: string[]
): boolean {
  if (!userAnswer) {
    return false
  }
  if (userAnswer.length && userAnswer.length === 0) {
    return false
  }
  if (userAnswer.length && userAnswer.length === 1 && userAnswer[0] === "") {
    return false
  }
  if (!isMoreCondition) {
    return true;
  } else {
    return JSON.stringify(isMoreCondition) === JSON.stringify(userAnswer);
  }
}

export function findAnswerById(
  userAnswerInput: IUserQuestionAnswer[],
  id: string
): IUserAnswer {
  let target: IUserAnswer;
  userAnswerInput.forEach(answer => {
    const { subAnswerArr } = answer;
    subAnswerArr.forEach(subAnswer => {
      if (subAnswer.id === id) {
        target = subAnswer;
      }
    });
  });
  // @ts-ignore
  return target;
}

export function isCanMove(
  findCurrent: IQuestion,
  userAnswerInput: IUserQuestionAnswer[] | undefined
): boolean {
  debugger
  function isAllNotEmpty(arr: ISubQuestion[]): boolean {
    // @ts-ignore
    return arr.every(question => {
      const { id: subQuestionId } = question;
      // @ts-ignore
      const userAnswer = findAnswerById(userAnswerInput, subQuestionId);
      // @ts-ignore
      return userAnswer && userAnswer.answer && userAnswer.answer.length;
    });
    // const { id, subQuestionArr } = arr;
    // const userAnswer = findAnswerById(id)
    // return Boolean(userAnswer && (userAnswer.subAnswerArr.length === subQuestionArr.length))
  }
  if (!userAnswerInput || !findCurrent) {
    return false;
  }
  // 检测动态是否完整
  const currentSubQuestion = getCurrentSubQuestion(
    findCurrent,
    userAnswerInput
  );
  return isAllNotEmpty(currentSubQuestion);
}

function getCurrentSubQuestion(
  findCurrent: IQuestion,
  userAnswerInput: IUserQuestionAnswer[]
): ISubQuestion[] {
  // 根据
  const { subQuestionArr } = findCurrent;
  let canNext = true;
  return (
    subQuestionArr.filter((question, index) => {
      const { id: subQuestionId, isMoreCondition } = question;
      // 找出对应的answer
      const userAnswer = findAnswerById(userAnswerInput, subQuestionId);
      if (canNext) {
        if (
          !canShowMoreQuestion(isMoreCondition, userAnswer && userAnswer.answer)
        ) {
          canNext = false;
        }
        return true;
      } else {
        return false;
      }
    }) || []
  );
}

// 根据题目判断。当前这道题目，是否有continue？
export function isNoContinue(
  findCurrent: IQuestion,
  userAnswerInput: IUserQuestionAnswer[]
) {
  const currentSubQuestion = getCurrentSubQuestion(
    findCurrent,
    userAnswerInput
  );
  const noContinueType = ["default", "tips"];
  return currentSubQuestion.every(subAnswer => {
    const { type } = subAnswer;
    return noContinueType.some(someType => someType === type);
  });
}

export function updateReducerValue(
  arr: any[],
  questionId: string,
  answerId: string,
  answer: any
) {
  // 1 查找question是否存在
  const questionArr: IUserQuestionAnswer[] = changeTargetById(
    arr,
    questionId,
    {
      id: questionId,
      subAnswerArr: []
    }
  );
  const targetArr = questionArr.find(item => item.id === questionId);
  // 查找answerId是否存在
  if (targetArr) {
    targetArr.subAnswerArr = changeTargetById(
      targetArr.subAnswerArr,
      answerId,
      { id: answerId, answer: [] }
    );
    const targetAnswer = targetArr.subAnswerArr.find(
      item => item.id === answerId
    );
    if (targetAnswer) {
      // 更新完成
      targetAnswer.answer = answer;
    }
    questionArr[
      questionArr.findIndex(item => item.id === questionId)
      ] = targetArr;
    return questionArr;
  }
  return null;
  
  function changeTargetById(targetSearchArr: any[], changedId: string, insert: any) {
    // copy
    const changedArr = targetSearchArr.slice(0);
    const findItemIndex = targetSearchArr.findIndex((item: any) => {
      const { id } = item;
      return id === changedId;
    });
    if (findItemIndex === -1) {
      // init insert
      changedArr.push(insert);
    }
    return changedArr;
  }
}
