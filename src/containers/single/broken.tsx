import * as React from 'react';
import { Link } from 'react-router-dom';
import "./blog.less"
export default class Broken extends React.Component {
  public render() {
    return (
      <div className="page-broken-container">
        <h1>Sell Broken iPhone</h1>
        <div className="small">
          <span>21 Feb 2019</span>
          <span>By UpTradeIt</span>
          <div className="right">
            <em />
            <em />
            <em />
          </div>
        </div>
        {
          <>
            <img src={require('images/single/broken_banner.png')} alt="" className="banner" />
            <img src={require('images/single/broken_banner_m.png')} alt="" className="banner-m" />
          </>
        }

        <p> From cracked screens to busted cameras, damage to your iPhone is hugely frustrating. For one, iPhones aren’t exactly a cheap investment and buying a new one can really set you back—particularly if you’ve just spent a bundle on the latest model. </p>
        <p>Luckily, there is a market out there for broken iPhones, often times for the purpose of refurbishing and obtaining spare parts. </p>
        <p>Below, is a breakdown of numerous types of iPhone damage, whether or not the broken device can still be sold, how much it can be sold for, and the available selling channels.</p>
        <h2>Can You Sell a Cracked iPhone?</h2>
        <p>After cracking your iPhone screen, repairs usually cost around $150 and walking around with a smashed screen isn’t the most appealing option. </p>
        <p>But not all is lost. We are happy to buy cracked iPhones and there are plenty of businesses that help refurbish cracked iPhones. </p>
        <p>Best of all? These companies repair cracked screens at a low cost. So, even in such a poor aesthetic state, your iPhone is still quite valuable. It’s actually possible to sell a cracked iPhone for only $30-$50 less than one in mint condition—mitigating much of the financial brunt felt in paying for a new phone. </p>
        <p>If you decide to sell and end up purchasing the same model instead of upgrading, it’d amount to a $50 loss. When compared to paying $150 to Apple for a repair, selling your damaged iPhone is the vastly superior option.</p>
        <h2>Can You Sell a Scratched iPhone?</h2>
        <p>Since it’s possible to sell an iPhone with a completely cracked screen, it’s not surprising that it’s far easier to find a buyer for a device with a scratched or scuffed screen. In fact, go through our pricing estimate to get a quote on a scuffed iPhone 8. The amount may surprise you.</p>
        <h2>Can You Sell Broken Home Button iPhone?</h2>
        <p>While it is possible to sell phones with broken buttons, research is inconclusive on how much you’ll get. The decided price will come down to negotiations. </p>
        <p>Also, we’ll be discussing a tool that gives an estimate for damaged iPhones later on in our blog that could shed light on how much money you could receive in this particular instance.</p>
        <h2>Can You Sell Your iPhone that Won’t Turn On?</h2>
        <p>With refurbishment in mind, some buyers are willing to pay $50 for an iPhone with a shoddy battery. </p>
        <p>On a different note, back in 2015, a group of iPhone 5 owners qualified for free battery replacements after several units were recalled. </p>
        <p>So, the best course of actions is to always investigate through Apple’s support website if your battery appears to be faulty. There might have been a recall, similar to the above example, meaning you can avoid the hassle of selling a broken iPhone altogether.</p>
        <h2>Can You Sell Your iPhone with a Broken Camera?</h2>
        <p>Nowadays, largely thanks to the prevalence of Instagram and Snapchat, cameras are almost as important to a phone as your ability to call and text. As such, iPhones with a non-functioning front or rear camera are useless to many consumers. </p>
        <p>Luckily, even with the influx of selfie-enthusiasts out there, an iPhone 6 with a broken camera can still be sold for around $120 at the time of this writing.</p>
        <h2>Find Out How Much Your Broken iPhone is Worth</h2>
        <p>The selling price of a broken iPhone will vary depending on the model and its condition. Needless to say, a broken iPhone 5 won’t sell for as much as an iPhone 7 in a similar state of disrepair.</p>
        {/*<Link to={'/sell/yourphone/brand'}>Get a quote to see how much money your broken iPhones are worth.</Link>*/}
        <p>It’s a simple process; choose Apple as the manufacturer and select the correct the phone model. Then, select the right phone conditions. From there, a display of the minimum price guarantee UpTrade will pay you will appear.</p>
        <h2>How to Prepare Broken iPhone for Sale</h2>
        <p>The first thing you should do before selling a damaged iPhone (if you can turn it on), is remove all data by following these instructions: </p>
        <p>Open up the Settings app and navigate to General -> Reset, then select Erase All Contents and Settings. </p>
        <p>When deciding your preferred selling channel, know that the demand for damaged iPhones is negligible compared to those in good condition. Therefore, selling locally would adversely narrow your chances of selling, whereas seeking online buyers opens up the playing field to a wider audience.</p>
        <h2>Conclusion</h2>
        <p>If there’s one takeaway from this blog, it’s that you aren’t completely out of luck when your iPhone is damaged. We issue a high payback for iPhones in any condition as long as there is a demand for them. Even if the device is a complete write-off, there’ll be somebody looking for spare parts willing to pay some kind of price. If in the case that the phone is completely unsalvageable, UpTrade can also help recycle the phone.</p>
      </div>
    )
  }
}