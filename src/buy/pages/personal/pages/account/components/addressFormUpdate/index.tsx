import React, { useContext, useEffect, useRef } from "react";
import { FormWrapper } from "../../../../../../components/formWrapper";
import { Input } from "antd";
import { AccountInfoContext, IAccountInfoContext } from "../../../../context";
import { UpdateFormLayout } from "../updateFormLayout";
import {
  IStoreAuthContext,
  StoreAuthContext
} from "../../../../../../common-modules/context/authToken/context";
import {
  IOrderInfoContext,
  OrderInfoContext
} from "../../../../../order/context";
const { RenderButton } = UpdateFormLayout as any;

export default function AddressFormUpdate(props: any) {
  const orderInfoContext = useContext(OrderInfoContext);
  const { zipCodeToAddressInfo } = orderInfoContext as IOrderInfoContext;
  const accountInfoContext = useContext(AccountInfoContext);
  const storeAuthContext = useContext(StoreAuthContext);
  const { storeAuthContextValue } = storeAuthContext as IStoreAuthContext;
  const { userInfoForm } = storeAuthContextValue;
  const {
    accountInfoContextValue,
    userEditAddress
  } = accountInfoContext as IAccountInfoContext;
  const { isLoading } = accountInfoContextValue;
  const formRef: any = useRef(null);
  const { isEdit, setIsEdit } = props;
  // 设置表单数据.时刻同步更新

  useEffect(() => {
    // 这是为了 让他在初始化和xx的时候 都能显示
    if (userInfoForm) {
      // 为什么第一帧的时候 current没有值
      const { form } = formRef.current.props;
      const keyMap = [
        "street",
        "apartment",
        "zipCode",
        "city",
        "state",
        "userPhone"
      ];
      let obj: any = {};
      keyMap.forEach(key => {
        obj[key] = {
          value: userInfoForm ? userInfoForm[key] : ""
        };
      });
      const { setFields } = form;
      setFields(obj);
    }
  }, [userInfoForm, isEdit]);
  const formConfigUpdate = [
    {
      label: "Street",
      id: "street",
      initialValue: userInfoForm.street,
      rules: [
        {
          required: true,
          pattern: /\w+/,
          message: "Please enter a valid address."
        }
      ],
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      label: "Apartment, suite",
      id: "apartment",
      initialValue: userInfoForm.apartment,
      rules: [
        {
          pattern: /\w+/,
          message: "Please enter a valid address."
        }
      ],
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      label: "Zip/Postal code",
      id: "zipCode",
      initialValue: userInfoForm.zipCode,
      validateTrigger: "onBlur",
      rules: [
        {
          required: true,
          pattern: /\w+/,
          message: "Please enter a valid address."
        },
        {
          validator: (rule: any, value: any, callback: any) => {
            zipCodeToAddressInfo(value, formRef.current.props.form).then(
              (result: any) => {
                if (result) {
                  callback(result);
                } else {
                  callback();
                }
              }
            );
          }
        }
      ],
      renderFormEle: () => <Input maxLength={5} disabled={!isEdit} />
    },
    {
      label: "City",
      id: "city",
      initialValue: userInfoForm.city,
      rules: [
        {
          required: true,
          pattern: /\w+/,
          message: "Please enter a valid city."
        }
      ],
      renderFormEle: () => <Input disabled={!isEdit} />
    },
    {
      label: "State",
      id: "state",
      initialValue: userInfoForm.state,
      rules: [
        {
          required: true,
          pattern: /\w+/,
          message: "Please enter a valid state."
        },
        {
          validator: (rule: any, value: any, callback: any) => {
            zipCodeToAddressInfo(value, formRef.current.props.form).then(
              (result: any) => {
                if (result) {
                  callback(result);
                } else {
                  callback();
                }
              }
            );
          }
        }
      ],
      renderFormEle: () => <Input disabled={true} />
    },
    {
      label: "Country",
      id: "country",
      initialValue: "US",
      rules: [
        {
          required: true,
          pattern: /\w+/,
          message: "Please enter a valid city."
        }
      ],
      renderFormEle: () => <Input disabled={true} />
    },
    {
      label: "Phone Number",
      id: "userPhone",
      initialValue: userInfoForm.userPhone,
      rules: [
        {
          required: true,
          pattern: /\d{10}/,
          message: "Please enter a valid mobile."
        }
      ],
      validateTrigger: "onBlur",
      renderFormEle: () => <Input maxLength={10} disabled={!isEdit} />
    },
    {
      renderFormEle: () => (
        <RenderButton isLoading={isLoading && isLoading.userEditPassword} />
      )
    }
  ];

  async function onSubmitHandler(values: any) {
    if (values) {
      await userEditAddress(values);
      props.successHandler();
    }
  }

  return (
    <FormWrapper
      wrappedComponentRef={(inst: any) => (formRef.current = inst)}
      formConfig={formConfigUpdate}
      onSubmit={onSubmitHandler}
    />
  );
}
