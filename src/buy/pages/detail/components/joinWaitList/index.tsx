import React, {useContext, useEffect, useState} from "react";
import "./index.less";
import { LoginWrapper } from "../../../../common-modules/components/loginButton";
import { ProductDetailContext } from "../../context";
import Modal from "../../../../components/modal";
import { tipsContent } from "../../../../common/constValue";
import { Input } from "antd";
import Button from "../../../../components/button";
import { FormWrapper } from "../../../../components/formWrapper";

export function JoinWaitList(props: { buyProductCode: string }) {
  const productDetailContext = useContext(ProductDetailContext);
  const [showModal, setShowModal] = useState(false)
  const {
    addProductWaitList,
    productDetailContextValue
  } = productDetailContext;
  const { isLoading } = productDetailContextValue;
  const formConfig = [
    {
      label: "Email",
      id: "email",
      rules: [
        {
          type: "email",
          required: true,
          message: tipsContent.emailMistake
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      label: "Phone",
      id: "phone",
      rules: [
        {
          required: false,
          pattern: /\d{10}/,
          message: "Please enter a valid mobile."
        }
      ],
      renderFormEle: () => <Input />
    },
    {
      renderFormEle: () => (
        <Button isLoading={isLoading && isLoading.addProductWaitList}>
          Submit
        </Button>
      )
    }
  ];
  // 渲染
  return (
    <LoginWrapper
      renderNotLogin={() => (
        <div
          className="long-button waitlist-button"
          onClick={() => {
            setShowModal(true)
          }}
        >
          Join waitlist
          <Modal
            visible={showModal}
            title={""}
            className=""
            maskClosable={true}
            footer={null}
            closable={true}
          >
            <div>
              <FormWrapper
                formConfig={formConfig}
                onSubmit={(formValues: any) => {
                  addProductWaitList({
                    ...formValues,
                    buyProductCode: props.buyProductCode
                  }).then(() => {
                    setShowModal(false)
                  });
                }}
              />
            </div>
          </Modal>
        </div>
      )}
      renderWhenHaveLogin={() => (
        <div
          className="long-button waitlist-button"
          onClick={() => {
            addProductWaitList({
              buyProductCode: props.buyProductCode
            });
          }}
        >
          Join waitlist
        </div>
      )}
    />
  );
}
