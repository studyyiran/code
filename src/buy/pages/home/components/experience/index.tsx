import * as React from "react";
import {useState} from "react";
import "./index.less";


export default function Experience(props: any) {

  const [tab, setTab] = useState('Price'); // tab list
  const tabList = ['Price', 'Quality', '14-Day Returns', 'Device Protection'];
  const tabContent = {
    [tabList[0]]: {
      before: 'BEFORE',
      beforeTitle: 'Haggling Was Mandatory',
      beforeDesc: 'You had to negotiate a good deal with a dealer or private seller. To complicate things, you never knew if you were dealing with someone trustworthy.',
      after: 'AFTER',
      afterTitle: 'Phones Priced at Fair Market Value',
      afterDesc: 'You won\'t find scammers here. This means you get what you pay for, at a fair deal, with no surprises.'
    },
    [tabList[1]]: {
      before: 'BEFORE',
      beforeTitle: 'Hidden Problems',
      beforeDesc: 'You thought you scored a great phone, only to find out later that the phone has functional issues that appeared weeks later.',
      after: 'AFTER',
      afterTitle: 'Multi-Point Inspection',
      afterDesc: ' Every phone we sell passes our rigorous inspection process and includes a full phone history report. We disclose everything about the phone so there are no surprises.'
    },
    [tabList[2]]: {
      before: 'BEFORE',
      beforeTitle: 'Buyer’s remorse? You’re stuck',
      beforeDesc: 'You thought you scored a great phone, only to find out later that the phone has functional issues that appeared weeks later.',
      after: 'AFTER',
      afterTitle: '14 Day Trial',
      afterDesc: 'Use the phone for up to two weeks. Get familiar with your new phone and put it through its paces as you normally would. If you’re not completely satisfied, we’ll take it back and refund you the full amount.'
    },
    [tabList[3]]: {
      before: 'BEFORE',
      beforeTitle: 'Only new phones were protected',
      beforeDesc: 'Device protections generally cover new phones. This leaves second hand owners vulnerable when accidents happen.',
      after: 'AFTER',
      afterTitle: 'UpTrade Protect',
      afterDesc: 'Extended hardware warranty, protection against accidental damage, and technical support can now be obtained for an additional $5/month. No long term commitments. Cancel anytime.'
    }
  };

  const rightImg = require("../../img/BuyHomeExperienceBanner.jpeg");

  return (
    <div className={"experience-content-wrapper"}>
      <div className={"left-wrapper"}>
        <div className={"title"}>Experience the UpTrade Difference</div>
        <div className={"desc"}>We believe buying used phones should be just as exciting as buying new. Here’s how
          UpTrade is changing the game.
        </div>

        <div className={"comments-tab-content-wrapper"}>
          <div className={"tab-wrapper"}>
            <div className={"tab-wrapper-overflow"}>
              {
                tabList.map((t, index) => {
                  return (
                    <div key={index}
                         className={`tab-item`}
                         onClick={() => {
                           setTab(t)
                         }}>
                      <span className={`text ${tab === t ? "active" : "inactive"}`}>{t}</span>
                    </div>
                  )
                })
              }
            </div>
          </div>

          <div className={"tab-item-content-wrapper"}>
            <div className={"tab-content-title-text"}>{tabContent[tab].before}</div>
            <div className={"tab-content-title"}>{tabContent[tab].beforeTitle}</div>
            <div className={"tab-content-desc"} dangerouslySetInnerHTML={{__html: tabContent[tab].beforeDesc}}/>

            <div className={"tab-content-title-text after-content"}>{tabContent[tab].after}</div>
            <div className={"tab-content-title"}>{tabContent[tab].afterTitle}</div>
            <div className={"tab-content-desc"} dangerouslySetInnerHTML={{__html: tabContent[tab].afterDesc}}/>
          </div>
        </div>
      </div>
      <div className={"right-wrapper"}>
        <img src={rightImg}/>
      </div>
    </div>
  );
}
