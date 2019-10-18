import * as React from 'react';
import './bolg.less';

export default class HowToTransferAndroid extends React.Component {
  public render() {
    return (
      <div className="page-static-blog-how-to-transfer-container page-statig-blog-container">
        <h1>What is a blacklisted phone?</h1>
        <div className="small">
          <span>April 3,2019 7AM</span>
          <span>By UpTrade</span>
          <div className="right">
            <em />
            <em />
            <em />
          </div>
        </div>
        <img src={require('images/staticblog/img-5.png')} alt="How To Tell If A Phone Is Blacklisted | UpTradeit.com" />
        <p>When a phone is lost or stolen, it becomes a blacklisted phone. These phones are on the GSM network, so either AT&T or T-Mobile. If it is an iPhone that is reported lost or stolen, then it could have what is known as a bad ESN, or electronic serial number.</p>
        <p>There are other ways that an iPhone could have a bad ESN. There could be an unpaid balance on the account, and the carrier wants their money, so they have locked the phone until the balance is paid.</p>
        <p>Another reason for a bad ESN is where someone tries to reactivate a phone on an account when the phone is still active on another account.</p>
        <h2>What happens if I buy a blacklisted phone?</h2>
        <p>If you buy a phone on the GSM network that has been blacklisted, it will likely activate initially, and continue to work just fine for maybe 30 minutes at best. Then it will stop working. AT&T may even call you up to ask why you activated a blacklisted phone!</p>
        <p>It should be fairly obvious, therefore, that you should only purchase a phone when you know for sure it is not blacklisted, or has a bad ESN. It could get you into a lot of trouble, and it simply isn't worth it – even if you get a really good deal with it.</p>
        <h2>Can I check a phone’s ESN or blacklisted status?</h2>
        <p>If you must purchase a phone with a dubious past, there are ways to check whether or not it has been blacklisted, or if it has a bad ESN. This web site, http://www.checkesnfree.com/, will check an ESN or IMEI (International Mobile Equipment Identity) on Verizon for being blacklisted.</p>
        <p>If you have a Sprint phone, you should know that the website has had a few issues with determining ESN and IMEI blacklisting. If you intend to purchase a Sprint phone, and you’re not sure whether it’s blacklisted or not, you should call Sprint and ask.</p>
        <p>When you speak to a Sprint representative, there are three things you need to ask. First, ask them to check if the phone has been reported lost or stolen. Second, ask them if the phone is inactive on a delinquent account. Third, ask them if the phone is activated. It is likely that the representative will only check all three things if they are asked directly.</p>
        <h2>Which number do I need to provide to check if a phone is blacklisted?</h2>
        <p>You will also need to know which number to use to check if a phone is blacklisted, or if the ESN is bad. To find the right number, you need to go into Setting, then General, and finally, MEID.</p>
        <p>The MEID (mobile equipment identifier) number is the one you need to provide in the <a href="http://www.checkesnfree.com/">http://www.checkesnfree.com/</a> web site to check the status of a phone’s ESN. Should you call Sprint or Verizon, they will also ask you to provide this number, so you will need to have it on hand.</p>
        <h2>What should I do if I buy a blacklisted phone?</h2>
        <p>Used phones are bought and sold every day. You can certainly pick up a great bargain that way, but you need to be careful. Don’t buy a used phone if you’re still wondering, ‘what is a blacklisted phone?’ If, however, you do find yourself with a phone that is blacklisted, or has a bad ESN, this is what you should do.</p>
        <p>First of all, you should ask the person you sold it to you for a refund. It isn’t really worth all the hassle of trying to get the phone removed from its blacklisted status. If that isn’t possible, then you still have a few other options.</p>
        <p>You need to get the phone’s ESN and EMEI numbers, as described earlier. Typing #06# into the keypad should also display the numbers. The numbers may also be on the back of your phone, on the box the phone came with, or on the phone’s battery.</p>
        <p>The account holder, or the phone’s carrier, are the only ones who can remove the blacklisting status. You need to contact them and ask to have the phone un-blacklisted. This, of course, can take time, often a lot of time.</p>
        <p>If, at the end of the day you are unable to get a refund, and unable to persuade either the carrier or the account holder to help you. There are few remaining options to consider. You could dismantle the phone and sell off the individual components as phone spare parts. You may even make a small profit that way!</p>
      </div>
    )
  }
}