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
      subOrderStatus: "TO_BE_SHIPPED",
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
