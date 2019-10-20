import React, {useState, useEffect} from "react";
import './index.less';
import Svg from "../../../components/svg";

/**
 * UpTrade Protect 静态页面
 * @constructor
 */
export default function Policy() {

  const dataList = [
    {img: require("buy/pages/statics/img/returnPeriod.png"), title: 'Return & Exchange Period', desc: '14 days of shipment arrival.'},
    {img: require("buy/pages/statics/img/restoreFee.png"), title: 'Restocking Fee', desc: 'Zero. While others may<br> charge, we don\'t'},
    {img: require("buy/pages/statics/img/returnShipping.png"), title: 'Return Shipping', desc: ' No worries. It\'s on us'},
  ]

  return (
    <div className={"uptrade-policy-wrapper"}>
      <div className={"title"}>Return & Exchange Policy</div>

      <div className={"content-show-wrapper"}>
        {
          dataList.map((d, index) => {
            return (
              <div className={"item-wrapper"} key={index}>
                <img src={d.img} className={"title-img"}/>
                <div className={"desc-wrapper"}>
                  <div className={"row-one"}>{d.title}</div>
                  <div className={"row-second"} dangerouslySetInnerHTML={{__html: d.desc}}/>
                </div>
              </div>
            )
          })
        }
      </div>

      <div className={"desc-content-wrapper"}>
        <div className={"desc-title"}>How to return an item?</div>
        <div className={"text"}>
          Just contact our customer service with your order number. We will guide you through the process.
        </div>
        <ul>
          <li>Text / Call: <a href="javascript:void(0)" className={"phone"}>(972)833-0136</a></li>
          <li>Email: support@uptradeit.com</li>
        </ul>
        <div className={"text"}>
          Please make sure to mention your order number in your return request.
        </div>

        <img src={require("buy/pages/statics/img/howToReturn.jpeg")} className={"banner"}/>

        <div className={"desc-title"}>Special Considerations</div>
        <ul>
          <li>Items that are not sold by UpTradeit.com can not be returned.</li>
          <li>Reimbursements on returns lacking proof of purchase may be denied or limited, and state sales tax and fees will not be reimbursed.</li>
          <li>Items need to be returned in its original condition. Items that are damaged, unsanitary, dented or scratched may be denied a return.</li>
          <li>Please return items with all accessories and packaging. If you do not, we may either deny the return, or allow a return with a nonrefundable deduction on your refund for what is missing.</li>
          <li>If you received a discount or free item by purchasing multiple items together, you will lose that benefit if you do not return all items purchased.</li>
          <li>Please remember to remove your personal data and other information from the products you are returning.</li>
        </ul>
      </div>
    </div>
  );
}
