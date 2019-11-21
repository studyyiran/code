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
          required: true,
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
        },
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
        },
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
      setIsEdit(false);
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
