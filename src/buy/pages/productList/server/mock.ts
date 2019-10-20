export const productListMock = () => {
  return [
    {
      buyProductImgM: "http",
      buyProductImgPc: "http",
      buyProductPrice: "0.00",
      buyProductName: "iPhone XS Max!!!!!",
      buyProductBQV: null,
      buyProductId: 29,
      buyProductCode: "43244838IS",
      buyProductLevel: "NEW",
      buyProductStatus: "LISTFORSALE"
    },
    {
      buyProductImgM: "1",
      buyProductImgPc: "v",
      buyProductPrice: "0.00",
      buyProductName: "iPhone XS Max",
      buyProductBQV: null,
      buyProductId: 15,
      buyProductCode: "43243074WT",
      buyProductLevel: "NEW",
      buyProductStatus: "LISTFORSALE"
    },
    {
      buyProductImgM: "1",
      buyProductImgPc: "1",
      buyProductPrice: "0.00",
      buyProductName: "iPhone XS Max",
      buyProductBQV: null,
      buyProductId: 17,
      buyProductCode: "43241635NG",
      buyProductLevel: "GOOD",
      buyProductStatus: "LISTFORSALE"
    },
    {
      buyProductImgM: "1",
      buyProductImgPc: "5",
      buyProductPrice: "0.00",
      buyProductName: "iPhone XS Max",
      buyProductBQV: null,
      buyProductId: 19,
      buyProductCode: "43247775Wx",
      buyProductLevel: "NEW",
      buyProductStatus: "LISTFORSALE"
    },
    {
      buyProductImgM: "1",
      buyProductImgPc: "1",
      buyProductPrice: "0.00",
      buyProductName: "Galaxy S8",
      buyProductBQV: null,
      buyProductId: 10,
      buyProductCode: "43245006pQ",
      buyProductLevel: "GOOD",
      buyProductStatus: "SOLDOUT"
    },
    {
      buyProductImgM: "1",
      buyProductImgPc: "1",
      buyProductPrice: "0.00",
      buyProductName: "iPhone XS Max",
      buyProductBQV: null,
      buyProductId: 5,
      buyProductCode: "43241206cL",
      buyProductLevel: "NEW",
      buyProductStatus: "SOLDOUT"
    },
    {
      buyProductImgM: "1",
      buyProductImgPc: "1",
      buyProductPrice: "0.00",
      buyProductName: "iPhone XS Max",
      buyProductBQV: null,
      buyProductId: 3,
      buyProductCode: "43243901BO",
      buyProductLevel: "NEW",
      buyProductStatus: "SOLDOUT"
    },
    {
      buyProductImgM: "1",
      buyProductImgPc: "1",
      buyProductPrice: "0.00",
      buyProductName: "iPhone XS Max",
      buyProductBQV: null,
      buyProductId: 1,
      buyProductCode: "43249363WJ",
      buyProductLevel: "GOOD",
      buyProductStatus: "SOLDOUT"
    }
  ];
};

export const getModelListMock = () => {
  return [
    {
      productDisplayName: "iPhone XS Max",
      productId: 1
    },
    {
      productDisplayName: "Galaxy S8 Plus",
      productId: 34
    },
    {
      productDisplayName: "Galaxy S10",
      productId: 23
    },
    {
      productDisplayName: "Galaxy S8",
      productId: 33
    },
    {
      productDisplayName: "LG V10",
      productId: 56
    },
    {
      productDisplayName: "OnePlus 5T",
      productId: 67
    },
    {
      productDisplayName: "OnePlus 7 Pro",
      productId: 63
    }
  ].map((item, index) => {
    return {
      productId: item.productId + Date.now() + index,
      productDisplayName: item.productDisplayName
    };
  });
};

export const getManufactureListMock = () => {
  return [
    {
      brandId: 1,
      brandDisplayName: "Apple",
      brandSort: 1,
      seqNo: "2019-10-03"
    },
    {
      brandId: 2,
      brandDisplayName: "Samsung",
      brandSort: 2,
      seqNo: "2019-10-03"
    },
    {
      brandId: 3,
      brandDisplayName: "Google",
      brandSort: 3,
      seqNo: "2019-10-03"
    },
    {
      brandId: 4,
      brandDisplayName: "LG",
      brandSort: 4,
      seqNo: "2019-10-03"
    },
    {
      brandId: 5,
      brandDisplayName: "OnePlus",
      brandSort: 5,
      seqNo: "2019-10-03"
    }
  ];
};

export const getBaseAttrMock = () => {
  return [
    {
      bpId: 1,
      bpDisplayName: "Storage",
      tag: "ISSTORAGE",
      bqvList: [
        {
          bpvId: 1,
          bpvDisplayName: "8GB"
        },
        {
          bpvId: 2,
          bpvDisplayName: "16GB"
        },
        {
          bpvId: 3,
          bpvDisplayName: "32GB"
        },
        {
          bpvId: 4,
          bpvDisplayName: "64GB"
        },
        {
          bpvId: 5,
          bpvDisplayName: "128GB"
        },
        {
          bpvId: 6,
          bpvDisplayName: "256GB"
        },
        {
          bpvId: 7,
          bpvDisplayName: "512GB"
        },
        {
          bpvId: 28,
          bpvDisplayName: "1T"
        }
      ]
    },
    {
      bpId: 2,
      bpDisplayName: "Carrier",
      tag: "ISCARRIER,QUICKFILTERBUY",
      bqvList: [
        {
          bpvId: 8,
          bpvDisplayName: "AT&T"
        },
        {
          bpvId: 9,
          bpvDisplayName: "Verizon"
        },
        {
          bpvId: 10,
          bpvDisplayName: "T-Mobile"
        },
        {
          bpvId: 11,
          bpvDisplayName: "Sprint"
        },
        {
          bpvId: 12,
          bpvDisplayName: "MetroPCS"
        },
        {
          bpvId: 13,
          bpvDisplayName: "Unlocked"
        },
        {
          bpvId: 14,
          bpvDisplayName: "Others"
        }
      ]
    },
    {
      bpId: 3,
      bpDisplayName: "Color",
      tag: "ISCOLOR",
      bqvList: [
        {
          bpvId: null,
          bpvDisplayName: "#FF0000",
          colorDisplayName: "(Product)Red"
        },
        {
          bpvId: null,
          bpvDisplayName: "#0000FF",
          colorDisplayName: "Blue"
        },
        {
          bpvId: null,
          bpvDisplayName: "#f88379",
          colorDisplayName: "Coral"
        },
        {
          bpvId: null,
          bpvDisplayName: "#DAA520",
          colorDisplayName: "Gold"
        },
        {
          bpvId: null,
          bpvDisplayName: "#008000",
          colorDisplayName: "Green"
        },
        {
          bpvId: null,
          bpvDisplayName: "#000000",
          colorDisplayName: "Jet Black"
        }
      ]
    }
  ];
};
