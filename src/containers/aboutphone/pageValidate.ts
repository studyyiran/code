/**
 * 用于校验在yourphone流程中，各个页面所必须的关键数据
 * 如果不满足，则跳会about you 页面
 */
// import { DEFAULT } from 'config';
import userStore from '@/store/user';
import yourPhoneStore from '@/containers/aboutphone/store/yourphone.store';

export const userEmailValidate = (): boolean => {
  return (userStore.preOrder && userStore.preOrder.userEmail !== '');
};


export const brandIdValidate = (): boolean => {
  return yourPhoneStore.activeBrandsId === -1;
}

