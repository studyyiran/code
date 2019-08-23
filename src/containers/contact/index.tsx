import * as React from 'react';
import { observer, inject } from 'mobx-react';
import ContactForm from './component/form';
import { IContactProps } from './interface/contact.interface';
import { IContact } from './interface/contact.interface';
import './index.less';

interface IStaticContent {
  title: string;
  desc: string;
  formTitle: string;
}

const staticContent : IStaticContent = {
  title: 'Need help with your order?',
  desc: 'Let us know how we can assist you with your order. We will get back to you within 1 business day.',
  formTitle: 'Fill out the form below',
}




function HelpList () {
  interface IStaticHelpContent {
    title: string;
    desc: string;
    img: string;
  }

  const staticHelpContent : IStaticHelpContent[] = [
    {
      title: 'Need more time?',
      desc: 'Let us know how we can assist you with your order. We will get back to you within 1 business day.',
      img: require('./bg.jpg'),
    },
    {
      title: 'Need more time?',
      desc: 'Let us know how we can assist you with your order. We will get back to you within 1 business day.',
      img: require('./bg.jpg'),
    },
    {
      title: 'Need more time?',
      desc: 'Let us know how we can assist you with your order. We will get back to you within 1 business day.',
      img: require('./bg.jpg'),
    }
  ]
  return <section className="comp-help-list">
    <h2>Where here to help</h2>
    <ul>
      {staticHelpContent.map(({title, desc, img} : IStaticHelpContent, index) => {
        return <li key={index} className="help-info">
          <div className="desc-content">
            <h3>{title}</h3>
            <p>{desc}</p>
          </div>
          <img src={img} />
        </li>
      })}
    </ul>
  </section>
}


@inject('contact')
@observer
export default class Contact extends React.Component<IContactProps> {
  public render() {
    console.log(this.props)
    return (
      <div className="page-contact-container">
        <div className="bg-container bg-1">
          <section className="page-contact-container__title">
            <h1>{staticContent.title}</h1>
            <p className="sub-desc">{staticContent.desc}</p>
          </section>
        </div>
        <div className="bg-container bg-2">
          <div className="common-card">
            <section>
              <h2>{staticContent.formTitle}</h2>
              <ContactForm onOk={this.handleOk} />
            </section>
          </div>
        </div>
        <div className="bg-container bg-3">
          <HelpList />
        </div>
        <div className="bg-container bg-4">
          <section className="leave-message">
            <h2>The simplest way to sell your phone.</h2>
            <p>Let use know how we can help</p>
            <button className="common-button">Leave a message</button>
          </section>
        </div>
      </div >
    )
  }

  private handleOk = async (item: IContact) => {
    const result = await this.props.contact.onSubmit(item);
    return result;
  }
}