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
      label: "Phone number ( Optional )",
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
            width={"90%"}
            visible={showModal}
            title={""}
            className="join-wait-list"
            maskClosable={true}
            footer={null}
            closable={true}
          >
            <div>
              <h3>Get notified when this item is back in stock</h3>
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
