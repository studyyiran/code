import {
  IQuestion,
  IUserQuestionAnswer
} from "./selectModelProcess/condition/index.interface";
// import { firstQuestionKey } from "./index";
const firstQuestionKey = "aboutYourPhone";

export const treemock =  [
  {
    "id": 12,
    "displayName": "Pow on",
    "type": 0,
    "question": "is phone pow on",
    "qualityPropertyValueDtos": [
      {
        "id": 19,
        "displayName": "yes",
        "type": 0,
        "qualityPropertyDtos": []
      },
      {
        "id": 20,
        "displayName": "no",
        "type": 0,
        "qualityPropertyDtos": []
      }
    ]
  },
  {
    "id": 13,
    "displayName": "是否磨损",
    "type": 0,
    "question": null,
    "qualityPropertyValueDtos": [
      {
        "id": 21,
        "displayName": "yes",
        "type": 0,
        "qualityPropertyDtos": [
          {
            "id": 14,
            "displayName": "磨损部位在哪",
            "type": 1,
            "question": "可以自己写磨损部位",
            "qualityPropertyValueDtos": [
              {
                "id": 23,
                "displayName": "上",
                "type": 0,
                "qualityPropertyDtos": []
              },
              {
                "id": 24,
                "displayName": "左",
                "type": 0,
                "qualityPropertyDtos": []
              },
              {
                "id": 25,
                "displayName": "下",
                "type": 0,
                "qualityPropertyDtos": []
              },
              {
                "id": 26,
                "displayName": "右",
                "type": 1,
                "qualityPropertyDtos": []
              }
            ]
          }
        ]
      },
      {
        "id": 22,
        "displayName": "no",
        "type": 0,
        "qualityPropertyDtos": []
      }
    ]
  }
]

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

export const serverPhoneInfo: IUserQuestionAnswer[] = [
  {
    id: firstQuestionKey,
    subAnswerArr: [
      {
        id: "manufacture",
        answer: ["1"]
      },
      {
        id: "model",
        answer: ["1"]
      },
      {
        id: "storage",
        answer: ["1"]
      },
      {
        id: "carrier",
        answer: ["1"]
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
        id: "manufacture",
        content: "Phone Manufacture",
        questionDesc: ["Brand1", "Brand2"],
        type: "select"
      },
      {
        id: "model",
        content: "Model",
        questionDesc: ["iPhone X", "iPhone 8"],
        type: "select"
      },
      {
        id: "storage",
        content: "Storage",
        questionDesc: ["64GB", "128GB"],
        type: "select"
      },
      {
        id: "carrier",
        content: "Carrier",
        questionDesc: ["Carrier1", "Carrier2"],
        type: "select"
      }
    ]
  }
];

export const mockgetexpressfee = [
  {
    minPrice: 100,
    maxPrice: 99999999,
    sendDateType: 1,
    fee: 0
  },
  {
    minPrice: 100,
    maxPrice: 99999999,
    sendDateType: 2,
    fee: 10
  },
  {
    minPrice: 100,
    maxPrice: 99999999,
    sendDateType: 3,
    fee: 10
  }
];

export const mockgetinquirybykeys = {
  resultList: [
    {
      categoryId: 1,
      categoryName: "mobile",
      brandId: 1,
      brandName: "apple",
      productId: 1,
      productName: "iphone x",
      skuId: 1,
      levelId: 1,
      levelName: "S",
      inquiryKey: "rCvRVXGAQcal0XSJit",
      deviceEstimate: 300.0,
      platformFee: 30.0,
      thirdPartyFee: 15.0,
      subTotal: 18.0,
      insuranceFee: 0.18,
      expressFeess: null,
      bpvIds: [
        {
          id: 1,
          name: "32G",
          ppId: "1",
          ppName: "storage",
          level: 1,
          type: null
        },
        {
          id: 4,
          name: "AT&T",
          ppId: "2",
          ppName: "carrier",
          level: 1,
          type: null
        }
      ],
      qpvIds: [
        {
          id: 1,
          name: "Yes",
          ppId: "1",
          ppName: "Power On",
          level: 1,
          type: 0
        },
        {
          id: 3,
          name: "Yes",
          ppId: "2",
          ppName: "Crash",
          level: 1,
          type: 0
        },
        {
          id: 5,
          name: "Yes",
          ppId: "3",
          ppName: "Function All",
          level: 1,
          type: 0
        }
      ]
    }
  ],
  guaranteedPayout: 142.0,
  shippingInsurance: 1.42
};
