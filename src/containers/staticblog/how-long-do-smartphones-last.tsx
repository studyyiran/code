import * as React from 'react';
import './bolg.less';

export default class HowToTellUnlocked extends React.Component {
  public render() {
    return (
      <div className="page-static-blog-how-long-do-container page-statig-blog-container">
        <h1>How long do smartphones last?</h1>
        <div className="small">
          <span>March 29,2019 7AM</span>
          <span>By UpTrade</span>
          <div className="right">
            <em />
            <em />
            <em />
          </div>
        </div>
        <img src={require('@/images/staticblog/img-2.png')} alt="Smartphone lifespan | UpTradeit.com" />
        <p>As with any electronic device, there's a shelf life and your smartphone is no different. Granted, most smartphones today can last quite a while, and usually, most users are swapping out their old phones to boost performance, not cause the device is ‘dead'.</p>
        <p>In fact, the average smartphone user today keeps their phone for 2 to 3 years before considering to upgrade to a new one. </p>
        <p>Why 2 to 3 years? Well there's a set of factors that play into this lifespan beyond just a dead device, and we'll explore them below:</p>
        <h2>1. Battery Life</h2>
        <p>All batteries slowly lose their performance over time. This is a fact, and when your battery hits capacity that only gives it a few hours of charge on your phone, it may be time for an upgrade. Typically 500 charge cycles is the average after which your battery will start to deteriorate in capacity.</p>
        <p>No surprise that this cycle roughly lines up with the 2 to 3 year timeline of how long a smartphone lasts but this battery longevity varies depending on the climate your smartphone operates in. Usually, if your smartphone is kept in moderate temperatures and isn't exposed to the harsh winter cold, this will help in extending its battery life.</p>
        <h2>2. OS Issues</h2>
        <p>As new phone operating systems (OS) are released, they are designed to be used with more advanced hardware. As a result, when you're upgrading your old phones OS, these new software features are going to take a toll on your hardware and increasingly drop the performance of your phone. This shift in computing power required ultimately forces you to upgrade to a more powerful phone that can keep your user experience flawless.</p>
        <h2>3. App Updates and Background Apps</h2>
        <p>To add to the upgrades in OS that may slow down your phone to a point where you look for a new upgrade. App updates and an increasing use of background apps can also slow down your phone. </p>
        <p>With App updates, new and sometimes unnecessary features added to your existing apps can quickly eat up computing power on your smartphone and start to slow down your phone as a whole.</p>
        <p>Similarly, as you install more apps, many of these are set to run in the background even when you're not using them (e.g., email apps continually checking for new messages). Though each app may only use a bit of computational power. In aggregate they can be a significant resource drain that'll slow down your phone and frustrate you.</p>
        <h2>4. Memory Degradation</h2>
        <p>Almost all smartphones run on flash memory known as NAND. Now as NAND memory fills up, which is generally the case as users store more data (e.g., photos) on their phone, this impacts data-writing performance. When close to full storage, the speed loss that occurs in writing and reading can be significant to the smartphones user experience.</p>
        <p>There's an easy solve to this which is free up space on your device, but when combined with other performance issues on the phone, it can push a user to go for an upgrade instead.</p>
        <h2>5. Physical Damage</h2>
        <p>Physical damage is a no brainer when it comes to a reason for upgrading your phone. A shattered screen, for example, can render your phone unusable and the cost to repair might not differ much from the cost to upgrade to a new phone entirely. Similarly, water damage can lead to your speakers or mic not working, or completely render your phone dead.</p>
        <p>Most of the time, smartphone shelf-life has more to do with a user looking for better performance than a smartphone being rendered entirely useless. There are many preventative measures you can use to help your smartphone last long and meet your expectations in performance:</p>
        <ul>
          <li>Use protective casings and screen protectors to prevent physical damage</li>
          <li>Do a regular clean-up of unused apps, and enable settings on your phone that'll do this for you (e.g., iPhones have a neat feature to uninstall unused apps based on your usage behavior)</li>
          <li>Remove any unnecessary photos or videos to free up storage. A pro tip here is to use free services such as Google Photos to back them up on the cloud so your device storage is freed up.</li>
          <li>Try not to expose your phone to extreme temperatures to help lengthen battery life.
Though not an exhaustive list of reasons for why a smartphone may not last long. By doing the above, you can typically help your smartphone stretch well beyond the 2 to 3-year average.</li>
        </ul>
        <p>As always, when it comes time to upgrade, you can choose to extend the life of your smartphone by sending it to us. We will sell the phone for you for the next user to enjoy.</p>
      </div>
    )
  }
}