import * as React from 'react';
import { observer, inject } from 'mobx-react';
import ContactForm from './component/form';
import { IContactProps, IContact } from './interface/contact.interface';
import './index.less';


@inject('contact')
@observer
export default class Contact extends React.Component<IContactProps> {
  public render() {
    return (
      <div className="page-contact-container">
        <div className="page-m-wrap">
          <h1>Get in Touch with Us</h1>
          <ContactForm onOk={this.handleOk} />
        </div>
      </div >
    )
  }

  private handleOk = async (item: IContact) => {
    const result = await this.props.contact.onSubmit(item);
    return result;
  }
}