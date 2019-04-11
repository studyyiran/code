export default {
  '/sell/account': {
    step: 0,
    mainText: 'About You',
    subText: 'We just need an email address to send you a shipping label.',
    hasSearch: false,
    progress: -1
  },
  '/sell/yourphone/brand': {
    step: 1,
    mainText: 'What kind of phone do you have？',
    subText: '',
    hasSearch: false,
    progress: 0,
    isBeforeShipping: true
  },
  '/sell/yourphone/carrier': {
    step: 1,
    mainText: 'What phone carrier is your phone?',
    subText: '',
    hasSearch: false,
    progress: 1,
    isBeforeShipping: true
  },
  '/sell/yourphone/model': {
    step: 1,
    mainText: 'Choose your phone model',
    subText: '',
    hasSearch: true,
    progress: 2,
    isBeforeShipping: true
  },
  '/sell/yourphone/condition': {
    step: 1,
    mainText: 'What is the condition of your phone？',
    subText: '',
    hasSearch: false,
    progress: 3,
    isBeforeShipping: true
  },
  '/sell/yourphone/shipping': {
    step: 2,
    mainText: 'Shipping Address',
    subText: 'We use this info on the shipping label so you can mail your phone for free.',
    hasSearch: false,
    progress: -1,
    isBeforeShippingMobile: true
  },
  '/sell/yourphone/payment': {
    step: 3,
    mainText: 'How would you like to be paid',
    subText: 'We’ll send payment to your account, the day your phone arrives at our offices.',
    hasSearch: false,
    progress: -1
  },
  '/sell/yourphone/done': {
    step: 4,
    mainText: 'Please confirm all the details. ',
    subText: 'If everything looks correct, we’ll create a shipping label. You’ll get you paid in no time!',
    hasSearch: false,
    progress: -1
  },
  '/sell/yourphone/checkorder': {
    step: 4,
    mainText: 'All done! Now ship the phone.',
    subText: 'We will send a confirmation email to ',
    isInCheckOrder: true,
    hasSearch: false,
    progress: -1
  },
  '/sell/yourphone/other': {
    step: 1,
    mainText: "What's your phone model?",
    subText: '',
    isInCheckOrder: false,
    hasSearch: false,
    progress: 2,
    showNext: true,
    isBeforeShipping: true
  }
}