export interface IQuestion {
  id: string,
  title: string,
  subQuestionArr: ISubQuestion[]
}

export interface ISubQuestion {
  id: string,
  content: string,
  type: string,
}

export interface IUserQuestionAnswer {
  id: string,
  subAnswerArr: IUserAnswer[]
}
// 为了适应多种可能。answer必须是[]
export interface IUserAnswer {
  id: string,
  answer: []
}


export interface IAnswer {
  id: string,
  answer: string
}