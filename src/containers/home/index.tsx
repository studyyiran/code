import * as React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import "./index.less";
import { Button } from "antd";
import { IHomeState } from "./interface/index.interface";
import { ICommonProps } from '@/store/interface/common.interface';
import Reviews from './components/reviews'

@inject("common")
@observer
export default class Home extends React.Component<ICommonProps, IHomeState> {
  public readonly state: Readonly<IHomeState> = {
    howitworksGroup: [
      [
        {
          index: 1,
          img: require("@/images/home/icon_1.png"),
          title: "Price Guarantee",
          content:
            "Go through our price calculator and we’ll provide you a minimum guaranteed price based on the condition and market value of your electronics. If we sell the device for more, you’ll get paid more."
        },
        {
          index: 2,
          img: require("@/images/home/icon_2.png"),
          title: "Clean & Package",
          content:
            "Worry free instructions will be provided to help you wipe and prepare your electronics for shipment. We don’t accept electronics that have been reported lost or stolen."
        }
      ],
      [
        {
          index: 3,
          img: require("@/images/home/icon_3.png"),
          title: "Ship for Free",
          content:
            "Shipping is on us. A prepaid shipping label will be sent to you for mailing your electronics to us."
        }
      ],
      [
        {
          index: 4,
          img: require("@/images/home/icon_4.png"),
          title: "You Get Paid Fast",
          content: "Multiple payment options to get cash how you want."
        },
        {
          index: 5,
          img: require("@/images/home/icon_5.png"),
          title: "You Get Paid More",
          content:
            "Unlike other trade in services, we cut out the middleman and pass on those savings directly to you. That means more cash in your pocket."
        }
      ]
    ],
    times: []
  };
  private timer = 0;
  public componentDidMount() {
    if (window['__SERVER_RENDER__INITIALSTATE__']) {
      const initialState = window['__SERVER_RENDER__INITIALSTATE__'];
      this.props.common.reviewsPagation = initialState['common'].reviewsPagation;
      this.props.common.reviews = initialState['common'].reviews;
      this.props.common.moduleOn = initialState['common'].moduleOn;
      window['__SERVER_RENDER__INITIALSTATE__'] = null;
    } else {
      this.props.common.getReviewsSort({
        page: 0,
        pageSize: 100,
        order: 'desc'
      });
      this.props.common.getModuleOn();
    }
    this.getTimes();
    this.timer = window.setInterval(() => {
      this.getTimes();
    }, 1000)
  }
  public componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = 0;
    this.setState({
      times: []
    })
  }
  public render() {
    return (
      <div className="page-home-container">
        <div className="sell-your-phone-wrapper">
          <p className="main-title">
            How It Works
          </p>
          <p className="content-text">
            UpTrade helps you sell your used electronics, so you can get paid <br />
            for what your device is actually worth
          </p>
          <Link to="/sell/yourphone/brand" className="button-link">
            <Button type="primary" size="large" className="sell-it-now">
              SELL NOW
            </Button>
          </Link>
          <img
            src={require("@/images/home/main_bg1.png")}
            className="main_bg1"
          />
        </div>

        <div className="how-it-works-wrapper">
          <h2 className="main-title">This Is How We Do It</h2>
          <p className="sub-title">Two Steps and Done</p>
          <p className="sub-content">
            Ship your electronics to us for free. You’ll get <br />
            paid once it’s sold. It’s that easy!
          </p>
          <div className="works-steps-wrapper">
            {this.state.howitworksGroup.map((steps, key1) => (
              <div className="step-group" key={key1}>
                {steps.map((step, key2) => (
                  <div className="step-item" key={key2}>
                    <div className="icon-group">
                      <span className="number">{step.index}</span>
                      <img src={step.img} />
                    </div>
                    <p className="glance">{step.title}</p>
                    <p className="description">{step.content}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="section-payback">
          <div className="top">
            <div className="left">
              <h2>
                Finally, <br />
                High Payback
              </h2>
              <p>
                Your electronics will be listed on multiple markets
                <br /> at the same time, so you get the best possible
                <br /> payout.
              </p>
            </div>
            <img src={require("@/images/home/main_bg2.png")} alt="" />
          </div>
          <div className="bottom">
            <img
              src={require("@/images/home/progress_bar.png")}
              alt=""
              className="progress_bar"
            />
            <img
              src={require("@/images/home/m_progress_bar.png")}
              alt=""
              className="m_progress_bar"
            />
            <ul>
              <li>
                <h3>Trade In Programs</h3>
                <p>
                  UpTrade pays 36% more on average. <br />
                  Most services that buy used electronics <br /> offer a small credit
                  towards your next purchase.
                </p>
              </li>
              <li>
                <h3>Peer to Peer Marketplaces</h3>
                <p>
                  You might get more on 3rd party <br />
                  marketplaces, but it could take weeks
                  <br /> to get your money.
                </p>
              </li>
            </ul>
          </div>
        </div>

        <div className="section-sell">
          <h2>Sell With Confidence</h2>
          <dl>
            <dd>
              <div>
                <span className="number">1</span>
                <img src={require("@/images/home/icon_1.png")} alt="" />
              </div>
              <h4>Risk Free</h4>
              <p>
                Our price guarantee means you get paid <br />
                for the quoted price based on the
                <br /> condition of your electronics or we send your <br />
                electronics back for FREE!
              </p>
            </dd>

            <dd>
              <div>
                <span className="number">2</span>
                <img src={require("@/images/home/icon_6.png")} alt="" />
              </div>
              <h4>Data Protection</h4>
              <p>
                Your personal information is our priority.
                <br /> We send you worry free instructions on <br />
                how to properly reset your electronics for sale.
              </p>
            </dd>

            <dd>
              <div>
                <span className="number">3</span>
                <img src={require("@/images/home/icon_3--left.png")} alt="" />
              </div>
              <h4>Hassle Free Shipping</h4>
              <p>
                Free shipping label sent to your home.
                <br /> Then drop it off so you can carry on with <br />
                more important things.
              </p>
            </dd>

            <dd>
              <div>
                <span className="number">4</span>
                <img src={require("@/images/home/icon_4_2.png")} alt="" />
              </div>
              <h4>Fast Payment</h4>
              <p>
                No more waiting for your cash. We issue <br />
                our price guarantee payment the next <br />
                business day after your electronics is received.
              </p>
            </dd>

            <dd>
              <div>
                <span className="number">5</span>
                <img src={require("@/images/home/icon_7.png")} alt="" />
              </div>
              <h4>100% Customer Satisfaction</h4>
              <p>
                The best value and service. Honest and <br />
                transparent communication every step of <br />
                the way.
              </p>
            </dd>

            <dd>
              <div>
                <span className="number">6</span>
                <img src={require("@/images/home/icon_8.png")} alt="" />
              </div>
              <h4>Eco-Friendly</h4>
              <p>
                We accept any electronics. If we can’t sell it for <br />
                you, we will recycle it to prevent it from <br />
                ending up in a landfill.
              </p>
            </dd>
          </dl>
        </div>

        {this.props.common.moduleOn && <Reviews {...this.props} />}

        <div className="ewaste-wrapper">
          <h2>Total eWaste Save by Our Customers</h2>
          <div className="number-box">
            <div className="img" />
            <div className="number-list">
              {
                this.state.times.map((v: string, index: number) => {
                  let classNames = 'list';
                  if (v === ',' || v === '.') {
                    classNames = 'symbol'
                  }
                  return <div className={classNames} key={index}>{v}</div>
                })
              }
            </div>
            <span>OZ</span>
          </div>
        </div>

        <div className="section-just">
          <h2>Just Two Steps. Ship and Paid.</h2>
          <p>Quick, easy, and safe. Don’t settle for less.</p>
          <Link className="button-group" to={"/sell/yourphone/brand"}>
            <Button type="primary" size="large" className="sell-it-now">
              SELL NOW
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  private getTimes = () => {
    const currentTimer = new Date().getTime() / 1000;
    let theString = Number(parseInt(currentTimer.toString(), 10) + 7345).toString().substr(-7);
    const lastString = theString.substr(-3);
    theString = theString.substring(0, theString.length - 3).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + lastString;
    this.setState({
      times: theString.split('')
    })
  }
}
