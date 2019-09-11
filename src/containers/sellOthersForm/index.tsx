import * as React from "react";
import ContactForm from "@/containers/contact/component/form";
import "./index.less";
import "../commonCss/contact.less";

export default function() {
  function handlerFormPost() {
    //
  }
  return (
    <div className="page-sell-others-container contact-common-css">
      <div className="bg-container bg-1">
        <section className="page-contact-container__title">
          <h1>Sell other phone</h1>
        </section>
      </div>
      <div className="bg-container bg-2">
        <div className="common-card">
          <section>
            <ContactForm onOk={handlerFormPost as any} />
          </section>
        </div>
      </div>
    </div>
  );
}
