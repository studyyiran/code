import * as React from "react";
import { observer, inject } from "mobx-react";
import { IContactProps } from "./interface/contact.interface";
import { IContact } from "./interface/contact.interface";
import "./index.less";
import "../commonCss/contact.less";
import FormPartWrapper from "@/components/formPart/form";
import { Checkbox, Col, Row, Form, Input } from "antd";
const { Item } = Form;
const { TextArea } = Input;
interface IStaticContent {
  title: string;
  desc: string;
  formTitle: string;
}

const staticContent: IStaticContent = {
  title: "Contact us?",
  desc: "",
  formTitle: "Fill out the form below"
};

@inject("contact")
@observer
export default class Contact extends React.Component<IContactProps> {
  public render() {
    return (
      <div className="page-contact-container contact-common-css">
        <div className="bg-container bg-1">
          <section className="page-container__title">
            <h1>{staticContent.title}</h1>
            <p className="sub-desc">{staticContent.desc}</p>
          </section>
        </div>
        <div className="bg-container bg-2">
          <div className="common-card">
            <section>
              <h2>{staticContent.formTitle}</h2>
              <FormPartWrapper
                buttonContent="Submit"
                renderformConfig={renderformConfig}
                onPostHandler={this.handleOk}
              />
            </section>
          </div>
        </div>
      </div>
    );
  }

  private handleOk = async (data: any) => {
    console.log(data);
    // const result = await this.props.contact.onSubmit(item);
    // return result;
  };
}

const renderformConfig = (props: any) => {
  const formContentArr = [
    {
      id: "fullName",
      title: "Full Name",
      required: true
    },
    {
      id: "email",
      title: "Contact Email",
      required: true,
      rules: [
        {
          required: true,
          type: "email",
          message: "The input is not valid E-mail!"
        }
      ]
    },
    {
      id: "message",
      title: "Message",
      rules: [{ required: true, message: "The input is not valid E-mail!" }],
      render: () => {
        return <TextArea maxLength={500} />;
      }
    }
  ];
  return formContentArr;
};
