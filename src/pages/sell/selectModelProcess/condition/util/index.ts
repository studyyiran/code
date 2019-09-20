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
    return false;
  }
  // if (userAnswer.length && userAnswer.length === 0) {
  //   return false;
  // }
  // if (userAnswer.length && userAnswer.length === 1 && userAnswer[0] === "") {
  //   return false;
  // }
  if (!isMoreCondition) {
    return true;
  } else {
    return (
      JSON.stringify(isMoreCondition) ===
      JSON.stringify(userAnswer.map((item: any) => item.optionId))
    );
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
      if (String(subAnswer.id) === String(id)) {
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
  function isAllNotEmpty(arr: ISubQuestion[]): boolean {
    // @ts-ignore
    return arr.every(question => {
      const { id: subQuestionId } = question;
      // @ts-ignore
      const userAnswer = findAnswerById(userAnswerInput, subQuestionId);
      // @ts-ignore
      return (
        userAnswer &&
        userAnswer.answer &&
        userAnswer.answer.length &&
        userAnswer.answer[0] !== ""
      );
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
  const questionArr: IUserQuestionAnswer[] = changeTargetById(arr, questionId, {
    id: questionId,
    subAnswerArr: []
  });
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

  function changeTargetById(
    targetSearchArr: any[],
    changedId: string,
    insert: any
  ) {
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

/*
将服务器下发的问题转为
渲染问题
 */
export function tranServerQuestionToLocalRender(staticQuestion: any) {
  const arr = [];
  const staticMap = {
    "0": "default",
    "1": "multiSelect"
  };
  const makeNewQuestionList = staticQuestion.map((parentQuestion: any) => {
    const {
      id,
      name,
      displayName,
      type,
      question,
      qualityPropertyValueDtos,
      sort
    } = parentQuestion;
    const newQuestion: any = {
      id: `parent${id}`,
      title: name,
      subQuestionArr: []
    };
    justPush(newQuestion.subQuestionArr, {
      subQuestionContent: displayName,
      tips: question,
      sort,
      type,
      subQuestionId: id,
      qualityPropertyValueDtos
    });
    newQuestion.subQuestionArr = newQuestion.subQuestionArr.map(
      (item: any) => item.that
    );
    return newQuestion;
  });
  console.warn("makeNewQuestionList!");
  console.warn(makeNewQuestionList);
  return makeNewQuestionList;

  function justPush(root: any, obj: any) {
    const newObj = {
      that: undefined
    };
    root.push(newObj);
    newObj.that = insertSubQuestion({ ...obj, root });
  }
  function insertSubQuestion({
    root,
    subQuestionContent,
    type,
    subQuestionId,
    qualityPropertyValueDtos,
    sort,
    tips
  }: any) {
    let subQuesiton: any = {};
    subQuesiton = Object.assign(subQuesiton, {
      tipsContent: tips,
      sort,
      id: subQuestionId,
      content: subQuestionContent,
      type: staticMap[type],
      questionDesc: qualityPropertyValueDtos.map((questionOption: any) => {
        // 为了防止会后一个违题目提示文本的bug
        const {
          id: optionId,
          displayName: optionContent,
          qualityPropertyDtos,
          type: questionOptionType
        } = questionOption;
        if (qualityPropertyDtos && qualityPropertyDtos.length) {
          // 目前看只有0
          // 为了防止会后一个违题目提示文本的bug
          if (
            qualityPropertyDtos[0].qualityPropertyValueDtos &&
            qualityPropertyDtos[0].qualityPropertyValueDtos.length
          ) {
            subQuesiton.isMoreCondition = [optionId];
            justPush(root, {
              sort: qualityPropertyDtos[0].sort,
              subQuestionContent: qualityPropertyDtos[0].displayName,
              tips: qualityPropertyDtos[0].question,
              type: qualityPropertyDtos[0].type,
              subQuestionId: qualityPropertyDtos[0].id,
              qualityPropertyValueDtos:
                qualityPropertyDtos[0].qualityPropertyValueDtos
            });
          } else {
            subQuesiton.isShowTips = {
              condition: [optionId],
              tips: qualityPropertyDtos[0].displayName
                .split(".")
                .map((content: any) => `<p>${content}</p>`)
                .join("")
            };
          }
        }
        return {
          optionContent,
          optionId,
          type: questionOptionType
        };
      })
    });
    return subQuesiton;
  }
}

/*
将本地答案，format为服务器的答案。
需要本地渲染的题目来帮助。
 */
export function getServerAnswerFormat(
  phoneConditionQuestion: any,
  phoneConditionAnswer: any
) {
  let staticAnswer: any[] = [];
  phoneConditionAnswer.forEach(({ id, subAnswerArr }: any) => {
    const question = phoneConditionQuestion.find(({ id: questionId }: any) => {
      return id === questionId;
    });
    if (question && question.subQuestionArr) {
      // 对于每一个答案，去找对应的子问题
      let needStop = false;
      subAnswerArr.forEach(({ id: subAnswerId, answer }: any) => {
        if (!needStop) {
          const subQuestion = question.subQuestionArr.find(
            ({ id: subQuestionId }: any) => {
              return subQuestionId === subAnswerId;
            }
          );
          if (
            subQuestion &&
            subQuestion.isMoreCondition &&
            JSON.stringify(subQuestion.isMoreCondition) !==
              JSON.stringify(answer.map((item: any) => item.optionId))
          ) {
            needStop = true;
          }
          staticAnswer = staticAnswer.concat(
            answer.map((answerValue: any) => {
              return {
                sort: subQuestion.sort,
                optionId:
                  answerValue && answerValue.optionId
                    ? answerValue.optionId
                    : answerValue,
                optionContent:
                  answerValue && answerValue.optionContent
                    ? answerValue.optionContent
                    : ""
              };
            })
          );
        }
      });
    }
  });
  return staticAnswer.map((item: any) => {
    return {
      id: item.optionId,
      remark: item.optionContent,
      sort: item.sort
    };
  });
  // test3(phoneConditionQuestion, staticAnswer);
}

// 将静态答案转化为渲染答案(借助整合后的答案)
export function serverAnswerToRenderAnswer(question: any, staticAnswer: any) {
  let finalResult: any;
  finalResult = {
    phoneConditionAnswer: []
  };
  staticAnswer.forEach((item2: any) => {
    const newItem = {
      optionId: item2.id,
      optionContent: item2.name
    };
    // 查找对对应的属性。
    // 1 从现有的树种查找
    function testFromCurrentAnswer(targetAnswerId: any) {
      const { phoneConditionAnswer } = finalResult;
      const target = phoneConditionAnswer.find(
        ({ subAnswerArr, id: parentQuestionId }: any) => {
          if (
            subAnswerArr.find(({ id: subQuestionId, answer }: any) => {
              if (String(subQuestionId) === String(targetAnswerId)) {
                result.answer = answer.concat([newItem]);
                return true;
              } else {
                return false;
              }
            })
          ) {
            result.questionId = parentQuestionId;
            return true;
          } else {
            return false;
          }
        }
      );
      if (target) {
        return result;
      } else {
        return null;
      }
    }
    const result = Object.assign(
      getIdFromAllQuestion(question, newItem.optionId),
      {
        answer: [newItem]
      }
    );
    if (result.answerId) {
      // 试图从现有中寻找
      testFromCurrentAnswer(result.answerId);
      finalResult.phoneConditionAnswer = updateReducerValue(
        finalResult.phoneConditionAnswer,
        result.questionId,
        result.answerId,
        result.answer
      );
    }
  });
  return finalResult.phoneConditionAnswer;
}

/*
找出属性值对应的信息
 */
export function getIdFromAllQuestion(question: any, optionId: any) {
  const result = {
    questionId: "",
    answerId: ""
  };

  // 2 从整合后的问题中查找
  const target = question.find((parentQuestion: any) => {
    const { id: parentQuestionId, subQuestionArr } = parentQuestion;
    if (
      subQuestionArr.find((subQuestion: any) => {
        const { id: subQuestionId, questionDesc } = subQuestion;
        if (
          questionDesc.find((options: any) => {
            if (String(options.optionId) === String(optionId)) {
              return true;
            } else {
              return false;
            }
          })
        ) {
          result.answerId = subQuestionId;
          return true;
        } else {
          return false;
        }
      })
    ) {
      result.questionId = parentQuestionId;
      return true;
    } else {
      return false;
    }
  });
  return result;
}
