export const checkforordermock = {
  groupOrderNo: "HS20190902190302748693",
  orderCreateDate: "2019-09-02 06:03:03",
  userInfo: {
    userEmail: "allen.chen@aihuishou.com",
    firstName: "allen",
    lastName: "chen",
    street: "1111",
    apartment: "2222",
    city: "ny",
    state: "GA",
    zipCode: "10010",
    country: "United States",
    userPhone: "1234567890"
  },
  paymentInfo: {
    payment: "CHECK",
    payPalInfo: null,
    checkInfo: {
      firstName: "bingbing",
      lastName: "chen",
      email: "497076544@qq.com"
    }
  },
  subOrders: [
    {
      subOrderNo: "20190902190345905377",
      subOrderStatus: "LISTED_FOR_SALE",
      sendTrackingNo: "92612902416755000000000014",
      returnTrackingNo: null,
      subOrderStatusDisplayName: "Listed for Sale",
      productDisplayName: "iphone x (64G T-Mobile)",
      subTotal: 6,
      shippingInfo: {
        sendInfo: [
          {
            shipType: "PRODUCT_SEND",
            carrier: "USPS",
            trackingNumber: "92612902416755000000000014",
            trackingStatus: "TRANSIT",
            updatedDt: "2019-09-02 09:24:57",
            lableCode: null
          },
          {
            shipType: "PRODUCT_SEND",
            carrier: "USPS",
            trackingNumber: "92612902416755000000000014",
            trackingStatus: "to be collected",
            updatedDt: "2019-09-02 06:03:40",
            lableCode: null
          }
        ],
        returnInfo: []
      },
      paymentInfo: {
        reserveInfo: {
          payFor: "RESERVE_PRICE",
          amount: 6,
          paymentStatus: "To Be Paid"
        },
        hammerInfo: null
      },
      orderStatusHistories: [
        {
          orderStatus: "TO_BE_RECEIVED",
          displayName: "Package Sent",
          date: "2019-09-02 09:24:57"
        },
        {
          orderStatus: "TO_BE_INSPECTED",
          displayName: "Package Received",
          date: "2019-09-02 09:26:41"
        },
        {
          orderStatus: "DIFFERENCE_INSPECTED",
          displayName: "Difference Inspected",
          date: "2019-09-02 21:31:13"
        },
        {
          orderStatus: "LISTED_FOR_SALE",
          displayName: "Listed for Sale",
          date: "2019-09-02 22:27:29"
        }
      ],
      inquiryInfo: {
        submitted: {
          categoryId: 1,
          brandId: 1,
          brandName: "apple",
          productId: 1,
          productName: "iphone x",
          displayName: "iphone x (32G AT&T)",
          productPns: [
            {
              id: 1,
              name: "32G",
              ppnId: 1,
              ppnName: "storage",
              isSkuProperty: true,
              level: 1,
              type: null
            },
            {
              id: 4,
              name: "AT&T",
              ppnId: 2,
              ppnName: "carrier",
              isSkuProperty: true,
              level: 1,
              type: null
            }
          ],
          pricePns: [
            {
              id: 1,
              name: "Yes",
              ppnId: 1,
              ppnName: "Power On",
              isSkuProperty: true,
              level: 1,
              type: 0
            },
            {
              id: 3,
              name: "Yes",
              ppnId: 2,
              ppnName: "Crash",
              isSkuProperty: true,
              level: 1,
              type: 0
            },
            {
              id: 5,
              name: "Yes",
              ppnId: 3,
              ppnName: "Function All",
              isSkuProperty: true,
              level: 1,
              type: 0
            }
          ],
          serialNo: null,
          comment: null,
          inquiryKey: "rCvRVXGAQcal0XSJit",
          amount: 18
        },
        revised: {
          categoryId: 1,
          brandId: 1,
          brandName: "apple",
          productId: 1,
          productName: "iphone x",
          displayName: "iphone x (64G T-Mobile)",
          productPns: [
            {
              id: 2,
              name: "64G",
              ppnId: 1,
              ppnName: "storage",
              isSkuProperty: true,
              level: 1,
              type: null
            },
            {
              id: 5,
              name: "T-Mobile",
              ppnId: 2,
              ppnName: "carrier",
              isSkuProperty: true,
              level: 1,
              type: null
            }
          ],
          pricePns: [
            {
              id: 2,
              name: "No",
              ppnId: 1,
              ppnName: "Power On",
              isSkuProperty: true,
              level: 1,
              type: 0
            },
            {
              id: 3,
              name: "Yes",
              ppnId: 2,
              ppnName: "Crash",
              isSkuProperty: true,
              level: 1,
              type: 0
            },
            {
              id: 5,
              name: "Yes",
              ppnId: 3,
              ppnName: "Function All",
              isSkuProperty: true,
              level: 1,
              type: 0
            }
          ],
          serialNo: "777777777",
          comment: "test",
          inquiryKey: "hPW4Iad61l8p8zHIdH",
          amount: 6
        },
        isDifferent: true,
        differentReason: "Wrong Condition"
      }
    },
    {
      subOrderNo: "20190902190345256323",
      subOrderStatus: "DIFFERENCE_INSPECTED",
      sendTrackingNo: "92612902416755000000000014",
      returnTrackingNo: null,
      subOrderStatusDisplayName: "Order Placed",
      productDisplayName: "iphone x (32G AT&T)",
      subTotal: 18,
      shippingInfo: {
        sendInfo: [
          {
            shipType: "PRODUCT_SEND",
            carrier: "USPS",
            trackingNumber: "92612902416755000000000014",
            trackingStatus: "TRANSIT",
            updatedDt: "2019-09-02 09:24:57",
            lableCode: null
          },
          {
            shipType: "PRODUCT_SEND",
            carrier: "USPS",
            trackingNumber: "92612902416755000000000014",
            trackingStatus: "to be collected",
            updatedDt: "2019-09-02 06:03:40",
            lableCode: null
          }
        ],
        returnInfo: []
      },
      paymentInfo: {
        reserveInfo: null,
        hammerInfo: null
      },
      orderStatusHistories: [],
      inquiryInfo: {
        submitted: {
          categoryId: 1,
          brandId: 1,
          brandName: "apple",
          productId: 1,
          productName: "iphone x",
          displayName: "iphone x (32G AT&T)",
          productPns: [
            {
              id: 1,
              name: "32G",
              ppnId: 1,
              ppnName: "storage",
              isSkuProperty: true,
              level: 1,
              type: null
            },
            {
              id: 4,
              name: "AT&T",
              ppnId: 2,
              ppnName: "carrier",
              isSkuProperty: true,
              level: 1,
              type: null
            }
          ],
          pricePns: [
            {
              id: 1,
              name: "Yes",
              ppnId: 1,
              ppnName: "Power On",
              isSkuProperty: true,
              level: 1,
              type: 0
            },
            {
              id: 3,
              name: "Yes",
              ppnId: 2,
              ppnName: "Crash",
              isSkuProperty: true,
              level: 1,
              type: 0
            },
            {
              id: 5,
              name: "Yes",
              ppnId: 3,
              ppnName: "Function All",
              isSkuProperty: true,
              level: 1,
              type: 0
            }
          ],
          serialNo: null,
          comment: null,
          inquiryKey: "ud2SRSU9Yh1LczLmMg",
          amount: 18
        },
        revised: null,
        isDifferent: false,
        differentReason: null
      }
    }
  ]
};

export const getTranshippingmock = JSON.parse('{"carrier":"fedex","trackingNumber":"789609480039","addressFrom":"Address [city=Mesquite, state=TX, zip=, country=US]","addressTo":"Address [city=Allen, state=TX, zip=, country=US]","eta":"2019-09-08 19:00:00","serviceLevel":{"token":"fedex_ground","name":"Ground®"},"metadata":null,"trackingStatus":{"objectCreated":"2019-09-05 19:56:11","objectUpdated":"2019-09-05 19:56:11","objectId":"a135a6a40d38414192035afab16cc763","status":"TRANSIT","statusDetails":"Arrived at FedEx location","statusDate":"2019-09-05 19:06:00","location":"Address [city=Cambridge, state=OH, zip=43725, country=US]"},"trackingHistory":[{"objectCreated":"2019-09-05 19:56:11","objectUpdated":"2019-09-05 19:56:11","objectId":"7d01c3d569e843f2b7669fe5c68109ac","status":"TRANSIT","statusDetails":"Arrived at FedEx location","statusDate":"2019-09-05 19:06:00","location":"Address [city=Cambridge, state=OH, zip=43725, country=US]"},{"objectCreated":"2019-09-05 19:56:11","objectUpdated":"2019-09-05 19:56:11","objectId":"fd906594887a4b97b9641393f4b4d5f7","status":"TRANSIT","statusDetails":"Picked up","statusDate":"2019-09-05 16:36:00","location":"Address [city=Cambridge, state=OH, zip=43725, country=US]"},{"objectCreated":"2019-09-05 16:11:07","objectUpdated":"2019-09-05 16:11:07","objectId":"2fed6677f67e45c09d60ddc995266be8","status":"TRANSIT","statusDetails":"In FedEx possession","statusDate":"2019-09-05 13:25:00","location":"Address [city=Zanesville, state=OH, zip=43701, country=US]"},{"objectCreated":"2019-09-05 12:26:01","objectUpdated":"2019-09-05 16:11:07","objectId":"98f8948ea974436087f5bb9d5f44979d","status":null,"statusDetails":"Shipment information sent to FedEx","statusDate":"2019-09-05 11:34:00","location":"Address [city=, state=, zip=43701, country=US]"}]}')