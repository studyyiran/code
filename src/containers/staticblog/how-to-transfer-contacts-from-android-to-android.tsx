import * as React from 'react';
import './bolg.less';

export default class HowToTransferAndroid extends React.Component {
  public render() {
    return (
      <div className="page-static-blog-how-to-transfer-container page-statig-blog-container">
        <h1>How to Transfer Contacts From Android to Android</h1>
        <div className="small">
          <span>April 1,2019 7AM Central US Time</span>
          <span>By UpTrade</span>
          <div className="right">
            <em />
            <em />
            <em />
          </div>
        </div>
        <img src={require('@/images/staticblog/img-3.png')} alt="Android to Android Contact Transfer | UpTradeit.com" />
        <p>Getting a new phone is great, but it can be so time-consuming to set up a new device exactly how you want it. Downloading all of your apps, logging in to all of your accounts, playing with the settings, and getting everything just the way you want it can take quite a while. </p>
        <p>Luckily, it’s really easy to transfer contacts from Android to Android. There are a couple transfer methods to choose from that will quickly and automatically move your contacts over from your old phone to your new one, giving you one less thing to worry about.</p>
        <h2>Sync Your Contact Data With Your Gmail Account</h2>
        <p>Since you already have an Android phone, you likely have a Gmail account as well. This will make it much easier to transfer contacts from Android to Android. If you have been using your old Android phone without a Gmail account, you’ll need to set one up now. It will allow you to get the most out of your new Android phone, anyway. </p>
        <p>On your old Android phone, open Settings. Then click Accounts and Sync. If you don’t have a Gmail account set up, click Create A New Account. If you have already connected your Gmail account to this device, Open Accounts and Sync and then select Google. On this screen you will see a list of items to sync. They will include your calendar and your Drive documents. Choose Contacts. If there is anything else you would like to transfer to your new phone, select those things as well. Click Sync Now to save all of your data to Google’s servers.</p>
        <p>When you turn on your new Android phone, it will ask you to log in to your Gmail account. Sign in to the same account you had on your old phone. Your new Android will automatically sync all of your contacts and any other data you had selected.</p>
        <p>If you had started to use your new Android before creating a Gmail account, you can go into Accounts & Sync to manually add your account. Open your Gmail account on your new phone and select Sync Contacts to move your contact data over to the new device. </p>
        <h2>Export and Import Contacts With Bluetooth</h2>
        <p>Turn on Bluetooth on both your old Android as well as your new Android phone. Open your Contacts on the old phone and enter the menu. Select Import/Export. Choose the option that says “Share namecard via…” and then select Bluetooth as your method. </p>
        <p>Your new Android should receive an authorization request. Accepting it will start the process to transfer contacts from Android to Android. </p>
        <p>Whether you choose to sync your contacts data through your Gmail account or to export and then import your contact data over Bluetooth, your new Android phone will easily and automatically sync all of your contacts from your old Android phone. </p>
      </div>
    )
  }
}