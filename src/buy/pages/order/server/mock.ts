export const getOrderTaxMock = {
  state: "TX",
  totalTax: 20,
  taxItems: [
    {
      productId: 1,
      tax: 10
    },
    {
      productId: 2,
      tax: 20
    }
  ]
};

export const getExpressMock = [
  {
    rateId: "fca461b19c54444ba23e715117ee3e94",
    totalFee: 6.85,
    name: "Parcel Select",
    token: "usps_parcel_select"
  },
  {
    rateId: "923189bd3f6c4496a2ba5132aa00ca9d",
    totalFee: 6.95,
    name: "Priority Mail",
    token: "usps_priority"
  }
];

export const orderIdToProductInfoMock = {

}


