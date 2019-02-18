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
        <h1>Get in Touch with Us</h1>
        <ContactForm onOk={this.handleOk} />
      </div >
    )
  }

  private handleOk = (item: IContact) => {
    this.props.contact.onSubmit(item);
  }
}