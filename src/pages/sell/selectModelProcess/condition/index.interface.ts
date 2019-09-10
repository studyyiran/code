export interface IQuestion {
  id: string;
  title: string;
  subQuestionArr: ISubQuestion[];
}

export interface ISubQuestion {
  id: string; // subQuestionId
  content: string; // 题目描述
  type: string; // 题目类型
  isMoreCondition?: string[]; // 用于关联多道题目
  isShowTips?: {
    condition: string[];
    tips: any;
  };
  questionDesc?: any[]; // 题目额外信息
  tipsContent?: string; // 点击弹框
}

export interface IUserQuestionAnswer {
  id: string;
  subAnswerArr: IUserAnswer[];
}
// 为了适应多种可能。answer必须是[]。例如多选。
export interface IUserAnswer {
  id: string;
  answer: string[];
}
