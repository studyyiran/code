export interface IQuestion {
  id: string,
  title: string,
  subQuestionArr: ISubQuestion[]
}

export interface ISubQuestion {
  id: string,
  content: string,
  // 用于关联。
  isMoreCondition?: string[],
  type: string,
}

export interface IUserQuestionAnswer {
  id: string,
  subAnswerArr: IUserAnswer[]
}
// 为了适应多种可能。answer必须是[]。例如多选。
export interface IUserAnswer {
  id: string,
  answer: []
}


export interface IAnswer {
  id: string,
  answer: string
}