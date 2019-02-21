/**
 * 用于校验在yourphone流程中，各个页面所必须的关键数据
 * 如果不满足，则跳会about you 页面
 */
// import { DEFAULT } from 'config';
import userStore from '@/store/user';
import yourPhoneStore from '@/containers/aboutphone/store/yourphone.store';
import { EPayType } from './interface/index.interface';

// modal页面的校验
export const modalPageValidate = (): boolean => {
  return (userEmailValidate() && brandIdValidate() && carrierValidate());
}

// condition 页面的校验
export const conditionPageValidate = (): boolean => {
  return (userEmailValidate() && brandIdValidate() && carrierValidate());
}

// shipping 页面的校验
export const shippingPageValidate = (): boolean => {
  return !!(conditionPageValidate() && inquiryKeyValidate());
}

// payment 页面的校验
export const paymentPageValidate = (): boolean => {
  return !!(shippingPageValidate() && addressInfoValidate());
}

// done 页面的校验
export const donePageValidate = (): boolean => {
  return !!(paymentPageValidate() && paymentPageValidate());
}

// checkorder 页面的校验
export const checkOrderPageValidate = (): boolean => {
  return !!(brandIdValidate() && orderDetailValidate());
}

export const userEmailValidate = (): boolean => {
  return !!userStore.preOrder.userEmail;
};


export const brandIdValidate = (): boolean => {
  return !!(typeof yourPhoneStore.activeBrandsId === 'number' && yourPhoneStore.activeBrandsId !== -1);
}

export const carrierValidate = (): boolean => {
  return !!(yourPhoneStore.activeCarrierName);
}

export const inquiryKeyValidate = (): boolean => {
  return !!(yourPhoneStore.inquiryKey);
}

export const inquiryDetail = (): boolean => {
  return !!(yourPhoneStore.inquiryDetail !== null && JSON.stringify(yourPhoneStore.inquiryDetail) !== '{}');
}


export const addressInfoValidate = (): boolean => {
  return !!(yourPhoneStore.addressInfo !== null && JSON.stringify(yourPhoneStore.addressInfo) !== '{}' && yourPhoneStore.addressInfo.state !== '');
}

export const paymentValidate = (): boolean => {
  return !!(yourPhoneStore.payment && (yourPhoneStore.payment === EPayType.ECHECK || yourPhoneStore.payment === EPayType.PAYPAL));
}

export const orderDetailValidate = (): boolean => {
  return !!(yourPhoneStore.inquiryDetail !== null && JSON.stringify(yourPhoneStore.orderDetail) !== '{}');
}


