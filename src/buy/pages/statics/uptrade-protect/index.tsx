import React, {useState, useEffect} from "react";
import './index.less';
import Svg from "../../../components/svg";

/**
 * UpTrade Protect 静态页面
 * @constructor
 */
export default function UptradeProtect() {

  const contentList = [
    {
      img: require("buy/pages/statics/img/hardware.png"),
      title1: 'Extended',
      title2: 'hardware warranty',
      desc: 'Device protections generally cover new phones and are nontransferable. Buying secondhand shouldn\'t mean being treated second class. UpTrade Protect offers an extended hardware warranty so you can be equally protected as if purchasing new.'
    },
    {
      img: require("buy/pages/statics/img/phone.png"),
      title1: 'Protection against',
      title2: 'accidental damage',
      desc: 'It costs up to $329 to repair a broken screen of iPhone. With UpTrade Protect, you pay $29 deductible to repair a damage screen and $99 for any other damage. Phones with water damage are ineligible.'
    },
    {
      img: require("buy/pages/statics/img/customerService.png"),
      title1: 'Get friendly',
      title2: 'solution-oriented help',
      desc: 'Need help? With UpTrade Protect, you won\'t just get tech support, you\'ll get solutions and results! All our representatives are invested in your happiness and success of  your device.'
    },
  ];

  const tableData = [
    {desc: 'Monthly Fee', uptrade: '$5', version: '$17', mobile: '$11.99', protection: '$15', sprint: '$15'},
    {
      desc: 'Screen damage and other accidental damages',
      uptrade: 'Unlimited',
      version: 'Unlimited',
      mobile: 'Max 2 Claims in 12 months',
      protection: 'Max 2 Claims in 24 months',
      sprint: 'Max 3 Claims in 12 months'
    },
    {
      desc: 'Lost and Stolen',
      uptrade: 'No',
      version: 'Yes',
      mobile: 'Yes',
      protection: 'Yes',
      sprint: 'Yes'
    },
    {desc: '', uptrade: '', version: '', mobile: '', protection: '', sprint: ''}
  ]
  return (
    <div className={"uptrade-protect-wrapper"}>
      <div className={"title"}>
        <div className={"first"}>UpTrade Protect</div>
        <div className={"second"}>
          Ultimate protection for your phone
        </div>
      </div>

      <div className={"content-list-wrapper"}>
        {
          contentList.map((c, index) => {
            return (
              <div className={"item-wrapper"} key={index}>
                <img src={c.img} className={"left-img"}/>
                <div className={"right-wrapper"}>
                  <div className={"row-title1"}>{c.title1}</div>
                  <div className={"row-title2"}>{c.title2}</div>
                  <div className={"desc"}>{c.desc}</div>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className={"table-title"}>Price comparison</div>

      <div className={"footer-table-wrapper"}>
        <table className={"protect-table"}>
          <thead>
          <tr>
            <td></td>
            <td className={"special"}>UpTrade Protect</td>
            <td>Verizon Protect</td>
            <td>AT&T Mobile Protection</td>
            <td>T-Mobile Protection 360</td>
            <td>Sprint Complete Protection</td>
          </tr>
          </thead>
          <tbody>
          {
            tableData.map((t, index) => {
              return (
                <tr key={index}>
                  <td>{t.desc}</td>
                  <td className={"special"}>{t.uptrade}</td>
                  <td>{t.version}</td>
                  <td>{t.mobile}</td>
                  <td>{t.protection}</td>
                  <td className={"last-td"}>{t.sprint}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
      <div className={"mob-page"}>
        <Svg icon="arrow-right"/>
      </div>
    </div>
  );
}
