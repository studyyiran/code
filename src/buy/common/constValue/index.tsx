export const constValue = {
  REFUNDTIME: 30,
  priceUnit: "$",
  AUTHKEY: "uptrade_us_frontend_super_fuck_token",
  SHOPPINGCART: "uptrade_us_frontend_gouwuche_token",
  fiveActValue: 10 / 7,
  paypalButtonId: "paypal-button-container"
};

export const constProductType = {
  "ACCESSORY": "ACCESSORY",
  "PRODUCT": "PRODUCT",
}

export const tipsContent = {
  emailMistake: "Please enter a valid email address.",// 格式错误的邮箱
  errorPassword: "Mismatched email and password.",// 密码和用户名不一致
  logOutTips: "Succeed to log out.",// 退出登录文案

  emailMismatch: "Email address mismatch.",// 邮箱只要不一致 就会报错
  passwordMismatch: "Passwords mismatch.",// 密码设定只要不一致 就会报错


  unverifiedEmail: "Unverified email.",// 用户未激活 就试图登录

  currentPasswordError: "Wrong current password.",// 登录后 修改密码时 密码错误


  checkEmail: "Please enter a valid email address.",// 邮箱格式不合法 就会报错

  // 设置个个人信息页面  注册的时候
  emailHaveRegistered: "The email address already exists.",// 试图重置密码输入邮箱的时候 判断邮箱是否是已经注册了的.


  emailUpdateSuccess: "Your profile updated successfully.",
  // emailExists: "The email address already exists.",// 修改个人信息的时候 判断优先
  PasswordFinishReset: "Password Reset Success!",// 用户重置密码成功后的  跳转到login in 的文案

  // forget password 页面
  emailCantSendNotRegistered: "The email address is not registered.",//

};
