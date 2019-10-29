export const checkForOrdermockOld = {
  groupOrderNo: "XS2019102818515788438778",
  orderCreateDate: "2019-10-28 05:52:01",
  autoConfirmDeadLine: "2019-11-11 05:00:03",
  userInfo: {
    userEmail: "allen.chen@aihuishou.com",
    firstName: "allen",
    lastName: "chen",
    street: "550 S Watters Rd",
    apartment: "Suite 276",
    city: "Allen",
    state: "TX",
    zipCode: "75013",
    country: "US",
    userPhone: "9723108511",
    fullUserName: "allen chen"
  },
  paymentInfo: {
    paymentType: "CREDIT_CARD",
    creditCardInfo: null
  },
  subOrders: [
    {
      subOrderNo: "2019102818520144790175",
      productInfo: {
        buyProductId: 7,
        buyProductCode: "43248575SI",
        categoryId: 1,
        categoryDisplayName: "Phone",
        brandId: 1,
        brandDisplayName: "Apple",
        productDisplayName: "iPhone XS Max",
        bpvDispalyName: "64GB,AT&T,Gold",
        buyLevel: "NEW",
        buyPrice: 687.0,
        buyProductImgPc:
          "https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/web/1570501390813_e35ee2d9b6d14e1c862ae71c5dcc5884.jpg",
        buyProductImgM:
          "https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/mob/1570501390813_e35ee2d9b6d14e1c862ae71c5dcc5884.jpg"
      },
      subOrderStatus: "TO_BE_COMFIRMED",
      sendTrackingNo: "92055902416755000000000019",
      sendExpressCarrier: "USPS",
      returnTrackingNo: "92055902416755000000000019",
      returnExpressCarrier: "USPS",
      returnShippoLabelCode:
        "bXJvZnRhbHBlZGFydHB1U0gyMDE5MTAyNDEyNTMyMDY0NjM0ODAw",
      shippingInfo: {
        sendInfo: [
          {
            carrier: "USPS",
            trackingNumber: "92055902416755000000000019",
            trackingStatus: "TRANSIT",
            updatedDt: "2019-10-28 06:00:02"
          },
          {
            carrier: "USPS",
            trackingNumber: "92055902416755000000000019",
            trackingStatus: "DELIVERED",
            updatedDt: "2019-10-28 06:00:03"
          }
        ],
        returnInfo: [
          {
            carrier: "USPS",
            trackingNumber: "92055902416755000000000019",
            trackingStatus: "TRANSIT",
            updatedDt: "2019-10-28 06:00:02"
          }
        ]
      }
    }
  ]
};
export const checkForOrdermock = {
  groupOrderNo: "XS2019102818515788438778123",
  orderCreateDate: "2019-10-28 05:52:01",
  autoConfirmDeadLine: "2019-11-11 05:00:03",
  userInfo: {
    userEmail: "allen.chen@aihuishou.com",
    firstName: "allen",
    lastName: "chen",
    street: "550 S Watters Rd",
    apartment: "Suite 276",
    city: "Allen",
    state: "TX",
    zipCode: "75013",
    country: "US",
    userPhone: "9723108511",
    fullUserName: "allen chen"
  },
  paymentInfo: {
    paymentType: "CREDIT_CARD",
    creditCardInfo: null
  },
  subOrders: [
    {
      subOrderNo: "2019102818520144790175",
      productInfo: {
        buyProductId: 7,
        buyProductCode: "43248575SI",// pId?
        categoryId: 1,
        categoryDisplayName: "Phone",
        brandId: 1,
        brandDisplayName: "Apple",
        productDisplayName: "iPhone XS Max",// Model
        bpvDispalyName: "64GB,AT&T,Gold",// 切分.
        buyLevel: "NEW",//
        buyPrice: 687.0,// price
        buyProductImgPc:
          "https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/web/1570501390813_e35ee2d9b6d14e1c862ae71c5dcc5884.jpg",
        buyProductImgM:
          "https://qa-uptrade.s3.us-east-2.amazonaws.com/buy/mob/1570501390813_e35ee2d9b6d14e1c862ae71c5dcc5884.jpg"
      },
      subOrderStatus: "TO_BE_COMFIRMED",
      sendTrackingNo: "92055902416755000000000019",
      sendExpressCarrier: "USPS",
      returnTrackingNo: "92055902416755000000000019",
      returnExpressCarrier: "USPS",
      returnShippoLabelCode:
        "bXJvZnRhbHBlZGFydHB1U0gyMDE5MTAyNDEyNTMyMDY0NjM0ODAw",
      shippingInfo: {
        sendInfo: [
          {
            carrier: "USPS",
            trackingNumber: "92055902416755000000000019",
            trackingStatus: "TRANSIT",
            updatedDt: "2019-10-28 06:00:02"
          },
          {
            carrier: "USPS",
            trackingNumber: "92055902416755000000000019",
            trackingStatus: "DELIVERED",
            updatedDt: "2019-10-28 06:00:03"
          }
        ],
        returnInfo: [
          {
            carrier: "USPS",
            trackingNumber: "92055902416755000000000019",
            trackingStatus: "TRANSIT",
            updatedDt: "2019-10-28 06:00:02"
          }
        ]
      }
    }
  ]
};
