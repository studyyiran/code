import React, { useContext, useEffect, useLayoutEffect } from "react";
import "./index.less";
import "../../common.less";
import { Form, Input } from "antd";
import { IStoreCheckOrderContext, StoreCheckOrderContext } from "../../context";
import Button from "../../../../components/button";
import { locationHref } from "../../../../common/utils/routerHistory";

const Dom = Form.create({ name: "dontknow" })(CheckOrderEntryForm);

export default Dom;

function CheckOrderEntryForm(props: any) {
  const storeCheckOrderContext = useContext(StoreCheckOrderContext);
  const {
    storeCheckOrderContextValue,
    getCheckOrderDetail
  } = storeCheckOrderContext as IStoreCheckOrderContext;

  const { isLoading } = storeCheckOrderContextValue;

  const submitHandler = (e: any) => {
    e.preventDefault();
    validateFields((error: any, values: any) => {
      if (!error) {
        console.log(values);
        const { email, orderId } = values;
        getCheckOrderDetail({
          groupOrderNo: orderId,
          userEmail: email
        }).then((res: any) => {
          console.log("get it and go");
          locationHref("/buy/checkorder/order");
          console.log(res);
        });
      }
    });
  };

  console.log(storeCheckOrderContextValue);
  const { form } = props;
  const { getFieldDecorator, validateFields, getFieldsError } = form;
  useLayoutEffect(() => {
    // form.validateFields();
  }, []);
  useEffect(() => {
    // form.validateFields();
  }, []);
  function hasErrors(fieldsError: any) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  const config = [
    {
      id: "email",
      options: {
        rules: [
          {
            required: true,
            type: "email",
            message: "Please enter a valid email."
          }
        ]
      },
      renderProps: (params: any) => {
        return <Input size="large" />;
      }
    },
    {
      id: "orderId",
      options: {
        rules: [
          {
            required: true,
            message: "Please enter a valid email."
          }
        ]
      },
      renderProps: (params: any) => {
        return <Input size="large" />;
      }
    },
    {
      id: "submit",
      options: {},
      renderProps: (params: any) => {
        return (
          <Button
            className="common-button"
            // disabled={hasErrors(getFieldsError())}
            isLoading={isLoading && isLoading.getCheckOrderDetail}
          >
            Check Order
          </Button>
        );
      }
    }
  ];
  return (
    <div className="page-container__title contact-common-css page-checkOrder-container">
      <div className="bg-container bg-1">
        <section className="page-container__title">
          <h1>Check My Order</h1>
        </section>
      </div>
      <div className="bg-container bg-2">
        <div className="common-card">
          <div className="form ">
            <div className="check-label">Contact Email on My Order</div>
            <div className="check-label">My Order Number</div>
            <Form onSubmit={submitHandler}>
              {config.map((config: any) => {
                const { id, options, renderProps } = config;
                return (
                  <Form.Item>
                    {getFieldDecorator(id, options)(renderProps())}
                  </Form.Item>
                );
              })}
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
