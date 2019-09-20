import * as React from "react";
import "./bolg.less";

export default class HowToTellUnlocked extends React.Component {
  public render() {
    return (
      <div className="page-statig-blog-container">
        <h1>ATT Phone Trade In: Is It Worth It?</h1>
        <div className="small">
          <span>April 8,2019 7AM</span>
          <div className="right">
            <em />
            <em />
          </div>
        </div>
        <img
          src={require("@/images/staticblog/img-6.jpg")}
          alt="ATT Phone Trade In: Is It Worth It? | UpTradeit.com"
        />
        <p>
          AT&T’s trade-in may seem convenient but when you take a closer look,
          it’s nowhere near what it seems to be.
        </p>
        <p>
          With the days of subsidized phones considered long gone, selling your
          unwanted cell phone when it comes time to upgrade has become a great
          alternative. With the absence of contracts, more and more people are
          either put on payment plans for their phones (significantly raising
          the monthly bill) or they must pony up a large lump sum up front to
          get a new device. With Uptradeit.com you can sell your device for max
          value, giving you the freedom to put a larger down payment on your new
          device, keeping the phone bill manageable.
        </p>
        <p>
          AT&T offers a similar alternative, with a caveat. Their payout method
          involves store credit. This means that if you are not a AT&T customer,
          maybe you can purchase a few hundred dollars in AT&T branded
          merchandise? UpTrade offers more value and it’s in cold hard cash with
          convenient payment methods such as PayPal and e-Checks. (You can
          receive an instant check via email instead of waiting for snail-mail
          to arrive) Take a look at the difference in value below:
        </p>
        <table>
          <thead>
            <tr>
              <td>Payment Options</td>
              <td>AT&T</td>
              <td>Up Trade</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Payment Method</td>
              <td>AT&T Credit</td>
              <td>Cash via PayPal & e-Checks</td>
            </tr>
            <tr>
              <td>Payment Timeframe</td>
              <td>1-2 Weeks</td>
              <td>2 Business Days</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        <br />
        <table>
          <thead>
            <tr>
              <td>Phone Value</td>
              <td>AT&T</td>
              <td>Up Trade</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>iPhone XS Max (64 GB)</td>
              <td>$550 credit</td>
              <td>$655 cash</td>
            </tr>
            <tr>
              <td>iPhone XR (64 GB)</td>
              <td>$380 credit</td>
              <td>$425 cash</td>
            </tr>
            <tr>
              <td>iPhone XS (64 GB)</td>
              <td>$440 credit</td>
              <td>$575 cash</td>
            </tr>
            <tr>
              <td>Samsung S8</td>
              <td>$140 credit</td>
              <td>$170 cash</td>
            </tr>
            <tr>
              <td>Samsung Note 8</td>
              <td>$210 credit</td>
              <td>$290 cash</td>
            </tr>
          </tbody>
        </table>
        <p>
          Keep in mind, the estimated value that is displayed for a “Good”
          condition device is generally considered to be a flawless device. If
          there is wear and tear present on your phone, the price will
          potentially be reduced from the original offer after a thorough
          examination. Although the condition of a device will impact the value,
          Uptradeit.com walks you step by step to accurately describe your
          device for the most accurately quoted price. Get a quote for your
          phone today.
        </p>
      </div>
    );
  }
}
