import * as React from "react";
import { Collapse } from "antd";
import { RouteComponentProps } from "react-router";
import "./howitworks.less";
import { HeaderTitle } from "@/components/headerTitle";
const { Panel } = Collapse;

class HowItWorks extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <article className="page-help-howitworks">
        <HeaderTitle title="How to sell my phone on UpTrade" />
        <section className="intro">
          <h2>Sell Your Phone For Cash in 3 Easy Steps</h2>
          <video className="comp-video" src="https://www.w3school.com.cn/i/movie.ogg" controls={true} />
        </section>
        <ul className="list">
          <li>
            <div className="img-container">
              <img src={require("@/images/test/bg.jpg")} />
            </div>
            <section>
              <svg className="svg-icon-set" aria-hidden="true">
                <use xlinkHref="#uptrade_Icon" />
              </svg>
              <h3>Get your minimum guarantee price</h3>
              <Collapse expandIconPosition="right" defaultActiveKey={['1', '2']}>
                <Panel header={"Find out how much your phone is worth"} key={1}>
                  <p>
                    Our price calculator will provide you with a minimum
                    guaranteed price based on the condition and market value of
                    your phone. All you have to do is tell us the phone you want
                    to sell and answer a few questions regarding its condition.
                  </p>
                </Panel>
              </Collapse>
            </section>
          </li>
          <div className="bg-container">
            <li>
              <div className="img-container">
                <img src={require("@/images/test/bg.jpg")} />
              </div>
              <section>
                <svg className="svg-icon-set" aria-hidden="true">
                  <use xlinkHref="#uptrade_Icon" />
                </svg>
                <h3>Prepare and ship in your phone for free</h3>
                <Collapse expandIconPosition="right" defaultActiveKey={['1', '2']}>
                  <Panel header={"Reset your phone"} key={1}>
                    <p>
                      Before you ship in your phone, it is important to follow
                      your manufacturer's data reset instructions. We will send
                      you instructions to help and as part of our inspection
                      process we also wipe it again.
                    </p>
                  </Panel>
                  <Panel header={"Ship your phone for free"} key={2}>
                    <p>
                      We provide you with a free shipping label to ship in your
                      phone using your own box. If you don’t have a box, we can
                      provide you one for a cost upon request.
                    </p>
                  </Panel>
                </Collapse>
              </section>
            </li>
          </div>
          <li>
            <div className="img-container">
              <img src={require("@/images/test/bg.jpg")} />
            </div>
            <section>
              <svg className="svg-icon-set" aria-hidden="true">
                <use xlinkHref="#uptrade_Icon" />
              </svg>
              <h3>Get paid in cash</h3>
              <Collapse expandIconPosition="right" defaultActiveKey={['1', '2']}>
                <Panel header={"Fast payment within 1-2 business days"} key={1}>
                  <p>
                    Once we have received your phone, we inspect it to ensure
                    that everything matches with your submission. If everything
                    matches, the minimum guarantee cash offer is issued via
                    PayPal or eCheck within 1-2 business days.
                  </p>
                </Panel>
                <Panel header={"Get a second payment"} key={2}>
                  <p>
                    We list your phone for sale across multiple marketplaces
                    after inspection. If we sell your phone for more than the
                    minimum guarantee price, we will issue a second payment.
                  </p>
                </Panel>
              </Collapse>
            </section>
          </li>
        </ul>
        <div className="button-container">
          <button className="common-button" onClick={this.onGoToSell}>
            Get Started
          </button>
        </div>
      </article>
    );
  }
  private onGoToSell = () => {
    this.props.history.push("/sell/yourphone/brand");
  };
}
export default HowItWorks;
