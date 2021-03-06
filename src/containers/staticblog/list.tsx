import * as React from 'react';
import { Link } from 'react-router-dom';
// import { Button } from 'antd';
import './list.less';
export default class BlogList extends React.Component {
  public render() {
    return (
      <div className="page-blog-list-container">
        <div className="bloglist-list-wrapper">
          <header>Lastest</header>
          <div className="list-box">
            <div className="list">
              <Link to={'/how-to-sell-your-old-phone-for-cash'}>
                <div className="img-box">
                  <div className="img" style={{ backgroundImage: `url(${require('images/staticblog/img-7.jpg')})` }} />
                  <img src={require('images/staticblog/img-7.jpg')} alt="How To Sell Your Old Phone For Cash? | UpTradeit.com" />
                </div>
                <div className="right">
                  <h3>How To Sell Your Old Phone For Cash</h3>
                  <small>April 9,2019</small>
                  <p>There are a lot of different factors that have an effect on the resale value of your phone. A mint condition phone will fetch more value than a broken one for instance. Here are some of the factors that can influence how much you can sell your device for. </p>
                </div>
              </Link>
            </div>

            <div className="list">
              <Link to={'/att-phone-trade-in-is-it-worth-it'}>
                <div className="img-box">
                  <div className="img" style={{ backgroundImage: `url(${require('images/staticblog/img-6.jpg')})` }} />
                  <img src={require('images/staticblog/img-6.jpg')} alt="ATT Phone Trade In: Is It Worth It? | UpTradeit.com" />
                </div>
                <div className="right">
                  <h3>ATT Phone Trade In: Is It Worth It?</h3>
                  <small>April 8,2019</small>
                  <p>You may want to read this before trading in your phone into ATT. We take a closer look and take a deep dive to compare your options of trading your phone versus selling your phone with UpTrade</p>
                </div>
              </Link>
            </div>




            <div className="list">
              <Link to={'/what-is-a-blacklisted-phone'}>
                <div className="img-box">
                  <div className="img" style={{ backgroundImage: `url(${require('images/staticblog/img-5.png')})` }} />
                  <img src={require('images/staticblog/img-5.png')} alt="How To Tell If A Phone Is Blacklisted | UpTradeit.com" />
                </div>
                <div className="right">
                  <h3>What is a blacklisted phone?</h3>
                  <small>April 3,2019 By UpTrade</small>
                  <p>Before purchasing a used phone, you should check to see if a phone has been blacklisted or has a bad ESN number. Here is how to check and make sure you are protected before spending any money.</p>
                </div>
              </Link>
            </div>
            <div className="list">
              <Link to={'/how-to-fix-water-damaged-iphone'}>
                <div className="img-box">
                  <div className="img" style={{ backgroundImage: `url(${require('images/staticblog/img-4.png')})` }} />
                  <img src={require('images/staticblog/img-4.png')} alt="Water Damaged iPhone | UpTradeit.com" />
                </div>
                <div className="right">
                  <h3>How to Fix Water Damaged iPhone</h3>
                  <small>April 2,2019 By UpTrade</small>
                  <p>Find out your options when your iPhone gets dropped in water. What is the best way to bring your phone back to life? Learn preventative ways when accidents like this happens. Surprisingly, your iPhone still might have value if it doesn’t turn on. </p>
                </div>
              </Link>
            </div>

            <div className="list">
              <Link to={'/how-to-transfer-contacts-from-android-to-android'}>
                <div className="img-box">
                  <div className="img" style={{ backgroundImage: `url(${require('images/staticblog/img-3.png')})` }} />
                  <img src={require('images/staticblog/img-3.png')} alt="Android to Android Contact Transfer | UpTradeit.com" />
                </div>
                <div className="right">
                  <h3>How to Transfer Contacts From Android to Android</h3>
                  <small>April 1,2019 By UpTrade</small>
                  <p>Find out what the most efficient way is to transfer your contacts from your old android phone to a new android phone. Tips and tricks to ensure nothing is lost when you setup a new phone.</p>
                </div>
              </Link>
            </div>

            <div className="list">
              <Link to={'/how-long-do-smartphones-last'}>
                <div className="img-box">
                  <div className="img" style={{ backgroundImage: `url(${require('images/staticblog/img-2.png')})` }} />
                  <img src={require('images/staticblog/img-2.png')} alt="Smartphone lifespan | UpTradeit.com" />
                </div>
                <div className="right">
                  <h3>How long do smartphones last? </h3>
                  <small>March 29,2019 By UpTrade</small>
                  <p>Find out what the typical lifespan of a smartphone. How long can they last? Compare it to how long you use your own phone. Is it more or less? What are some things you can do to extend the life of your smartphone?</p>
                </div>
              </Link>
            </div>

            <div className="list">
              <Link to={'/how-to-tell-if-a-phone-is-unlocked'}>
                <div className="img-box">
                  <div className="img" style={{ backgroundImage: `url(${require('images/staticblog/img-1.png')})` }} />
                  <img src={require('images/staticblog/img-1.png')} alt="How To Tell If A Phone Is Unlocked | UpTradeit.com" />
                </div>
                <div className="right">
                  <h3>How To Tell If A Phone Is Unlocked</h3>
                  <small>March 28,2019 By UpTrade</small>
                  <p>Unlocked phones gives you an advantage over locked carrier specific phones. Here are some tips to determine if your phone is unlocked. If you’re looking to sell, unlocked phones can also have a a higher resale value.</p>
                </div>
              </Link>
            </div>
          </div>
          {/* <div className="button-group">
            <Button type="primary" ghost={true} size="large" className="view-more">VIEW MORE</Button>
          </div> */}
        </div>
      </div>
    )
  }
}