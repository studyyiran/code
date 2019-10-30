export const shippingMock = {
  "carrier":"usps",
  "trackingNumber":"92612902416755000001655381",
  "addressFrom":"Address [city=Anaheim, state=CA, zip=92815, country=US]",
  "addressTo":"Address [city=Allen, state=TX, zip=75013, country=US]",
  "eta":"2019-11-04 00:00:00",
  "serviceLevel":{
    "token":"usps_parcel_select",
    "name":"Parcel Select"
  },
  "metadata":null,
  "trackingStatus":{
    "objectCreated":"2019-10-29 03:41:31",
    "objectUpdated":"2019-10-29 03:41:31",
    "objectId":"403eb658accb42b38499e89e4e3b1079",
    "status":"TRANSIT",
    "statusDetails":"Your shipment has arrived at the USPS regional origin facility.",
    "statusDate":"2019-10-28 21:46:00",
    "location":"Address [city=Anaheim Ca Distribution Center, state=, zip=, country=US]"
  },
  "trackingHistory":[
    {
      "objectCreated":"2019-10-29 03:41:31",
      "objectUpdated":"2019-10-29 03:41:31",
      "objectId":"403eb658accb42b38499e89e4e3b1079",
      "status":"TRANSIT",
      "statusDetails":"Your shipment has arrived at the USPS regional origin facility.",
      "statusDate":"2019-10-28 21:46:00",
      "location":"Address [city=Anaheim Ca Distribution Center, state=, zip=, country=US]"
    },
    {
      "objectCreated":"2019-10-29 03:41:31",
      "objectUpdated":"2019-10-29 03:41:31",
      "objectId":"7ff89d7573c7497f80e14894c71dd984",
      "status":"TRANSIT",
      "statusDetails":"USPS is in possession of the item.",
      "statusDate":"2019-10-28 19:08:00",
      "location":"Address [city=Anaheim, state=CA, zip=92815, country=US]"
    },
    {
      "objectCreated":"2019-10-29 03:41:31",
      "objectUpdated":"2019-10-29 03:41:31",
      "objectId":"717585e2fd4045499e2661b1081bc104",
      "status":"TRANSIT",
      "statusDetails":"USPS is in possession of the item.",
      "statusDate":"2019-10-28 18:40:00",
      "location":"Address [city=Anaheim, state=CA, zip=92815, country=US]"
    },
    {
      "objectCreated":"2019-10-28 16:26:11",
      "objectUpdated":"2019-10-29 03:41:31",
      "objectId":"ce8ab2e328b341869d2b49b716322844",
      "status":null,
      "statusDetails":"The shipping label has been created and the USPS is awaiting the item.",
      "statusDate":"2019-10-28 18:32:00",
      "location":"Address [city=Anaheim, state=CA, zip=92815, country=US]"
    }
  ]
}

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
