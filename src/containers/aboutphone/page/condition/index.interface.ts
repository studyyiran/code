export interface IQuestion {
  id: string,
  title: string,
  subQuestionArr: Array<{
    id: string,
    content: string,
    type: string,
  }>
}

export interface IAnswer {
  id: string,
  answer: string
}

export interface IUserAnswer {
  id: string,
  answer: string
}

export interface IUserQuestionAnswer {
  id: string,
  answerArr: IUserAnswer[]
}
