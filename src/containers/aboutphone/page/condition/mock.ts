import { IQuestion, IUserQuestionAnswer } from "./index.interface";
import { firstQuestionKey } from "./index";
export const serverPhoneInfo: IUserQuestionAnswer[] = [
  {
    id: "phoneInfoSubQuestion1",
    subAnswerArr: [
      {
        id: "phoneInfoSubQuestion1",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion2",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion3",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion4",
        answer: ["1"]
      }
    ]
  },
  {
    id: "phoneInfoSubQuestion2",
    subAnswerArr: [
      {
        id: "phoneInfoSubQuestion1",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion2",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion3",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion4",
        answer: ["1"]
      }
    ]
  },
  {
    id: "phoneInfoSubQuestion3",
    subAnswerArr: [
      {
        id: "phoneInfoSubQuestion1",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion2",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion3",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion4",
        answer: ["1"]
      }
    ]
  },
  {
    id: "phoneInfoSubQuestion4",
    subAnswerArr: [
      {
        id: "phoneInfoSubQuestion1",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion2",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion3",
        answer: ["1"]
      },
      {
        id: "phoneInfoSubQuestion4",
        answer: ["1"]
      }
    ]
  }
];

export const serverQuestionArr: IQuestion[] = [
  {
    id: "1",
    title: "Power On",
    subQuestionArr: [
      {
        id: "10",
        content: "Does your phone power on to the home screen?",
        type: "default"
      }
    ]
  },
  {
    id: "2",
    title: "Scratch",
    subQuestionArr: [
      {
        id: "20",
        content: "Are there any scratches on the phone?",
        isMoreCondition: ["true"],
        type: "default"
      },
      {
        id: "21",
        content: "Are there scratches on the screen itself?",
        isMoreCondition: ["true"],
        type: "default"
      }
    ]
  },
  {
    id: "3",
    title: "Crack",
    subQuestionArr: [
      {
        id: "30",
        content: "Are there any cracks on your phone?",
        isMoreCondition: ["true"],
        type: "default"
      },
      {
        id: "31",
        content: "Where is the crack located? (Select all that apply)",
        type: "multiSelect",
        questionDesc: ["Screen", "Back Cover", "Back Camera"]
      }
    ]
  },
  {
    id: "4",
    title: "Functionality",
    subQuestionArr: [
      {
        id: "41",
        content: "Is your phone fully functional?",
        isMoreCondition: ["true"],
        type: "default"
      },
      {
        id: "42",
        content:
          "Which of the following aren't working? (Select all that apply)",
        isMoreCondition: ["true"],
        type: "multiSelect",
        questionDesc: ["Charger", "Touch ID", "Home Button"]
      }
    ]
  },
  {
    id: "5",
    title: "Internet Accounts",
    subQuestionArr: [
      {
        id: "51",
        content: "Has iCloud or Google account been removed from your phone?",
        isMoreCondition: ["true"],
        type: "default"
      },
      {
        id: "52",
        content:
          "We can't accept locked phone. Can you remove before sending in?",
        isMoreCondition: ["true"],
        type: "default"
      }
    ]
  },
  {
    id: "6",
    title: "Payoff Status",
    subQuestionArr: [
      {
        id: "61",
        content: "Is your phone fully paid off?",
        type: "default"
      }
    ]
  }
];
// 关于手机情况的 写死的 问题
export const serverPhoneInfoQuestion: IQuestion[] = [
  {
    id: firstQuestionKey,
    title: "About your phone",
    subQuestionArr: [
      {
        id: "phoneInfoSubQuestion1",
        content: "Phone Manufacture",
        questionDesc: ["Brand1", "Brand2"],
        type: "select"
      },
      {
        id: "phoneInfoSubQuestion2",
        content: "Model",
        questionDesc: ["iPhone X", "iPhone 8"],
        type: "select"
      },
      {
        id: "phoneInfoSubQuestion3",
        content: "Storage",
        questionDesc: ["64GB", "128GB"],
        type: "select"
      },
      {
        id: "phoneInfoSubQuestion4",
        content: "Carrier",
        questionDesc: ["Carrier1", "Carrier2"],
        type: "select"
      }
    ]
  }
];
