export interface IStaticFilterItem {
  type: string;
  typeId: string;
  bpId?: string;
  title: string;
  allTitle: string;
  optionArr: any[];
  tips?: any;
  tag?: any;
  clickMoreHandler?: any;
}

export const filterListConfig: IStaticFilterItem[] = [
  {
    type: "Manufacture",
    typeId: "manufacture",
    title: "MANUFACTURER",
    allTitle: "All Makes",
    optionArr: [],
    clickMoreHandler: null
  },
  {
    type: "Model",
    typeId: "model",
    title: "MODEL",
    allTitle: "All Models",
    optionArr: [],
    clickMoreHandler: null
  },
  {
    type: "Price",
    typeId: "price",
    title: "PRICE",
    allTitle: "All Prices",
    optionArr: [
      {
        id: 1,
        displayName: "Less than $200",
        value: [0, 200]
      },
      {
        id: 2,
        displayName: "$200-$400",
        value: [200, 400]
      },
      {
        id: 3,
        displayName: "$400-$600",
        value: [400, 600]
      },
      {
        id: 4,
        displayName: "above $600",
        value: [600, ""]
      }
    ]
  },
  {
    type: "Condition",
    typeId: "condition",
    title: "CONDITION",
    allTitle: "All Conditions",
    optionArr: [
      {
        id: 1,
        displayName: "New",
        value: "NEW"
      },
      {
        id: 2,
        displayName: "Best",
        value: "BEST"
      },
      {
        id: 3,
        displayName: "Better",
        value: "BETTER"
      },
      {
        id: 4,
        displayName: "Good",
        value: "GOOD"
      },
      {
        id: 5,
        displayName: "Fair",
        value: "FAIR"
      }
    ],
    tips: "asdasdasd"
  }
];
