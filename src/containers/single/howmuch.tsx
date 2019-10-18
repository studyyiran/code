import * as React from 'react';
import { Link } from 'react-router-dom';
import "./blog.less"

export default class HowMuch extends React.Component {
  public render() {
    return (
      <div className="page-howmuch-container">
        <h1>How Much Is My Phone Worth?</h1>
        <div className="small">
          <span>21 Feb 2019</span>
          <span>By UpTradeIt</span>
          <div className="right">
            <em />
            <em />
            <em />
          </div>
        </div>
        <img src={require('images/single/howmuch_banner.png')} alt="" className="banner" />
        <img src={require('images/single/howmuch_banner_m.png')} alt="" className="banner-m" />
        <p> If you want or need to get a new phone, this guide should help you determine how much your iPhone, Samsung or other type of phone is worth. Taking care of the phone while you’re using it and taking time to prepare it for sale should also help you get maximum resale value. Also, remember, even if you aren’t able to sell your phone, there are many ways to recycle old phones.</p>

        <h2>How Much is My Phone Worth?</h2>
        {/*<p>At UpTradeIt.com, our <Link to="/sell/yourphone/brand">price calculator</Link> can tell you how much your Phone is worth automatically. We provide a <em>price guarantee</em> which tells you how much we would pay you if you decide to let us sell your phone for you. </p>*/}
        <p>Here are the main factors that affect the value of your phone:</p>
        <ul>
          <li>Phone Manufacturer: Certain brands of phones command premium prices. These are your Apple iPhones and Samsungs. These companies (and others) are known for creating advanced and durable technology. </li>
          <li>Model: Sometimes it seems like Apple is always coming out with a new model iPhone. In general, more recent models will be worth more. </li>
          <li>Carrier: More and more phones are “unlocked” these days, meaning they can be used with any SIM card or carrier. However, if your phone is tied to a specific carrier, you’ll either need to figure out if your carrier will unlock it or you will be limited to selling to others who use that carrier. </li>
          <li>Condition: Phones that are in better condition – limited scratches, dents or cracks – will be worth more. If you have the original packaging that the phone came in, that may also help in resale value. </li>
          <li>Storage Capacity: Phones that have a larger built-in memory also play a factor in the price. The larger the storage capacity, the more the phone is worth.</li>
        </ul>
        <h2>How to Protect Your Phone for Maximum Resale Value</h2>
        <p>One way to ensure you get the maximum resale value for your phone is to protect it while you are using it. Keeping it in a protective case can help avoid scratches and cracks. Be mindful where you place it, so it doesn’t fall onto the ground or into the toilet. Periodically wipe the screen clean with a dry cloth to help avoid dirt buildup. Don’t use harsh chemicals to clean the outside of the phone as this could damage the screen or case.</p>
        <h2>How to Prepare Your Phone for Sale</h2>
        <p>Once you’re ready to sell your phone, there are a few things you need to do to get it ready for sale. </p>
        <ol className="indent">
          <li>Clean It: Follow the manufacturer’s recommendations on how to clean the outside of the phone. Don’t use typical household cleaners or abrasive cloths. However, try to get it as clean as possible, so it looks almost like new. </li>
          <li>Wipe It: Since you’ll be selling the phone to a new user, you’ll want to remove all your private data and pictures first. You’ll need to remove the SIM card too, but this won’t wipe the data. While the process of wiping the data may vary by manufacturer, here are some general steps.</li>
          <ul>
            <li>Backup all of your contacts, photos and other data </li>
            <li>Encrypt your data </li>
            <li>Perform a factory reset</li>
          </ul>
          <li>Pack It: For the best resale value, pack your phone in its original box, along with the original accessories or whatever else you plan on selling. If you don’t have the original box, be sure to pack it carefully so it doesn’t break during shipment.</li>
        </ol>
        <h2>What if an Old Phone Has No Resale Value?</h2>
        <p>If your phone is too old or too broken and has no resale value, don’t just throw it into the trash. Old electronics make up approximately 70% of the toxic waste in landfills. Please don’t add to this environmental problem. Instead, research companies in your area that recycle phones. Here are some options for recycling:</p>
        <ul>
          <li>Send your phone in to us and we’ll take care of recycling for you. </li>
          <li>Go to the phone manufacturer to see if they have a program such as Apple Recycling Programs, Samsung Mobile Take-Back Program or LG Recycling Program. </li>
          <li>Check with a local tech retailer such as Best Buy and Staples. </li>
          <li>Ask your carrier if they recycle old phones. </li>
          <li>Find a charitable organization to give it to through services such as Recycling for Charities, Phones4Charity, National Coalition Against Domestic Violence and Medic Mobile. </li>
          <li>Check your state’s recycling guidelines since they usually have a section on electronics.</li>
        </ul>
        <p>If you have any other questions in determining how much your phone is worth. Contact us at <a href="mailto:support@uptradeit.com" className="mail">support@uptradeit.com</a> and our staff will be happy to assist you further.</p>
      </div>
    )
  }
}