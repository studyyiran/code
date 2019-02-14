import * as React from 'react';
import { inject, observer } from 'mobx-react';
import './index.less';
import { Button } from 'antd';
import { IHomeState } from './interface/index.interface';
@inject("common")
@observer
export default class Home extends React.Component<object, IHomeState> {

  public readonly state: Readonly<IHomeState> = {
    howitworksGroup: [
      [
        {
          index: 1,
          img: require('@/images/home/icon_1.png'),
          title: 'Price Guarantee',
          content: 'Go through our price calculator and we’ll provide you a minimum guaranteed price based on the condition and market value of your phone. If we sell the phone for more, you’ll get paid more.'
        },
        {
          index: 2,
          img: require('@/images/home/icon_2.png'),
          title: 'Clean & Package',
          content: 'Worry free instructions will be provided to help you wipe and prepare your phone for shipment. We don’t accept phones that have been reported lost or stolen.'
        }
      ],
      [
        {
          index: 3,
          img: require("@/images/home/icon_3.png"),
          title: 'Home Pickup or Dropoff',
          content: 'You don’t even need to leave your home. A prepaid shipping label and box will be sent to you for mailing your phone to us.'
        }
      ],
      [
        {
          index: 4,
          img: require('@/images/home/icon_4.png'),
          title: 'You Get Paid Fast',
          content: 'Multiple payment options to get cash how you want. For next day payment choose Paypal.'
        },
        {
          index: 5,
          img: require('@/images/home/icon_5.png'),
          title: 'You Get Paid More',
          content: 'Unlike other trade in services, we cut out the middleman and pass on those savings directly to you. That means more cash in your pocket.'
        }
      ]
    ]
  }

  public render() {
    return (
      <div className="page-home-container">
        <div className="sell-your-phone-wrapper">
          <p className="main-title">
            We Sell Your <br />
            Phone for More.
          </p>
          <p className="content-text">UpTrade helps you sell your phone, so you can get paid <br /> for what your device is actually worth.</p>
          <Button type="primary" style={{ boxShadow: '0px 2px 4px 0px rgba(0,207,255,0.35)' }}>Sell It Now</Button>
          <img src={require('@/images/home/main_bg1.png')} className="main_bg1" />
        </div>

        <div className="how-it-works-wrapper">
          <h2 className="main-title">How it Works</h2>
          <p className="sub-title">Two Steps and Done</p>
          <p className="sub-content">
            Ship your phone to us for free. You'll get <br />
            paid once it's sold. It's that easy!
          </p>
          <div className="works-steps-wrapper">
            {
              this.state.howitworksGroup.map((steps, key1) => (
                <div className="step-group" key={key1}>
                  {
                    steps.map((step, key2) => (
                      <div className="step-item" key={key2}>
                        <div className='icon-group'>
                          <span className="number">{step.index}</span>
                          <img src={step.img} />
                        </div>
                        <p className="glance">{step.title}</p>
                        <p className="description">{step.content}</p>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}