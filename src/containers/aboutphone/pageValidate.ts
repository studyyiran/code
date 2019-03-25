/**
 * 用于校验在yourphone流程中，各个页面所必须的关键数据
 * 如果不满足，则跳会about you 页面
 */
import config from '@/config';
import userStore from '@/store/user';
import yourPhoneStore from '@/containers/aboutphone/store/yourphone.store';
import { EPayType, INoteUserModalProps } from './interface/index.interface';
import { Modal } from 'antd';

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
  // TBD的情况
  if (isTBDValidate()) {
    return brandIdValidate();
  } else {
    return !!(conditionPageValidate() && inquiryKeyValidate());
  }

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

export const isTBDValidate = (): boolean => {
  return !!(yourPhoneStore.activeBrandsId === config.DEFAULT.otherBrandsId);
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
  if (isTBDValidate()) {
    return true;
  }
  return !!(yourPhoneStore.inquiryDetail !== null && JSON.stringify(yourPhoneStore.orderDetail) !== '{}');
}

export const noteUserModal = (params: INoteUserModalProps) => {
  const defaultParams: INoteUserModalProps = {
    className: 'modal-for-user-to-email',
    content: '',
    type: 'success',
    seconds: 15,
    hasCountDown: true,
    ...params
  };

  let secondsToGo: number = defaultParams.seconds!;
  let timer: NodeJS.Timer
  let timer2: NodeJS.Timer
  if (defaultParams.customerOk) {
    defaultParams.onOk = () => {
      debugger;
      clearInterval(timer);
      clearTimeout(timer2);
      if (defaultParams.customerOk) {
        defaultParams.customerOk();
        defaultParams.hasCountDown = false;

      }
    }
  }

  const modal = Modal[defaultParams.type](defaultParams);

  // 是否自动关闭
  if (defaultParams.hasCountDown) {
    timer = setInterval(() => {
      secondsToGo -= 1;
      if (defaultParams.update) {
        defaultParams.update(secondsToGo)
        modal.update({
          content: defaultParams.update(secondsToGo),
        });
      }
    }, 1000);

    // // 倒计时时候的Click 按钮点击
    // if (defaultParams.customerOk) {
    //   defaultParams.onOk = () => {
    //     clearInterval(timer);
    //     if (defaultParams.customerOk) {
    //       defaultParams.customerOk();
    //     }
    //   }
    // }

    timer2 = setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
      if (defaultParams.onOk) {
        defaultParams.onOk();
      }
    }, secondsToGo * 1000);
  }
}