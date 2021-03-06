import { IQuestion, IUserQuestionAnswer } from "./index.interface";
// import { firstQuestionKey } from "./index";
const firstQuestionKey = "aboutYourPhone";
export const serverPhoneConditionQuestion: IQuestion[] = [
  // {
  //   id: "test",
  //   title: "Test",
  //   subQuestionArr: [
  //     {
  //       id: "test1",
  //       content: "Does your phone power on to the home screen?",
  //       type: "choiceQuestion",
  //       questionDesc: [
  //         {
  //           id: "test1",
  //           content: "111"
  //         },
  //         {
  //           id: "test2",
  //           content: "222"
  //         },
  //         {
  //           id: "test3",
  //           content: "333"
  //         }
  //       ]
  //     }
  //   ]
  // },
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
        questionDesc: ["Screen", "Back Cover", "Back Camera", "__input__"]
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
        isMoreCondition: ["false"],
        type: "default"
      },
      {
        id: "42",
        content:
          "Which of the following aren't working? (Select all that apply)",
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
        isShowTips: {
          condition: ["false"],
          tips:
            "<p>A phone that is not fully paid off has a risk of being blacklisted; therefore the price will be significantly reduced.</p>" +
            "<p>We suggest to fully pay off your phone before selling.</p>"
        },
        type: "default"
      }
    ]
  }
];

export const staticPhoneInfo: IUserQuestionAnswer[] = [
  {
    id: firstQuestionKey,
    subAnswerArr: [
      {
        id: "manufacture",
        answer: []
      },
      {
        id: "model",
        answer: []
      },
      {
        id: "storage",
        answer: []
      },
      {
        id: "carrier",
        answer: []
      }
    ]
  }
];

// 关于手机情况的 写死的 问题
export const staticPhoneInfoQuestion: IQuestion[] = [
  {
    id: firstQuestionKey,
    title: "About your phone",
    subQuestionArr: [
      {
        id: "manufacture",
        content: "Phone Manufacturer",
        questionDesc: [],
        type: "select"
      },
      {
        id: "model",
        content: "Model",
        questionDesc: [],
        type: "select"
      },
      {
        id: "storage",
        content: "Storage",
        questionDesc: [],
        type: "select"
      },
      {
        id: "carrier",
        content: "Carrier",
        questionDesc: [],
        type: "select"
      }
    ]
  }
];
