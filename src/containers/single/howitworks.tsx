import * as React from 'react';
import { Button } from 'antd';
import { RouteComponentProps } from 'react-router';
import Wrong from '@/images/single/wrong.png';
import './howitworks.less';

const Right = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAVCAYAAACzK0UYAAAAAXNSR0IArs4c6QAAAjpJREFUSA21k89rE0EUx78zCa2/KKjooSCIP5omHpV6VVA2Rjx5EDx50Uqp0kOxB5GWgkJBL/4WvPgvqNRNLdajRz3EbNNWI4Ie/EUFxR/Zeb7ZpbuZ7AQ0JgOTvPd9j/eZefNWoFOLSKDsHoOQm0RHGN5ML4jGAdrN22s/pOweBWEEAqv5f5H3UPsg5dmNEP4k32Bv0B0SZXTLYWw/uNweSOVxFsq/wqfeHAAElpBSJ7Gz8FX7MhD/58dz8/D9uxEAeM+A4RWALt36TYgkKsUhKJyIzijEMtLs73DeRlrLkIXpbih5kQH74mJE/B5nkCs8i7XQits17w7g3YM1jQkJvzS3DjV5zQQEWTdsAB0RoLk0vB9n2TzOXpX7Ocb9XEoU18LCdA98eZ37nzPiQjxBv3PO0OocCe/nVADQImEr/NQ9zM8U6nJCUwNq8lYCAD5Yz6+JRH6dIJFWN9n/EmlEq6DUJLzieZRKXYH+org2aBGQifJC4xufbBS9R7436IYbTldldhv82h2OrDejwmP/Au8xftQ9Rkw7KTGBPudhQm8Q4hEOQbc5vqEhx+5KPEUmP2oPmmo8XX0HXkGIQX6fT2aKxdPfQw2XLBGrFEN0uN95DXT9BYiuYlf+s7WiRTQhOiG7vwqoQR7nj5Z8vqh4joxz3xprIiYhOjF7qMoPfdoKErjMIGpSzyrbISsg5XPr6m5E9IhvoSfun1ZziC6TO/wGKnWKrQ+8FX6THvMOrcXiFrx0R1qt/gftTrCzLG5hggAAAABJRU5ErkJggg==";

class HowItWorks extends React.Component<RouteComponentProps>{
    public render() {
        return (
            <section className="page-help-howitworks">
                <div className="article">
                    <div className="col-1">
                        <p>Sell My Phone In</p>
                        <p>Two Simple Steps </p>
                        <p>Get cash for what it’s actually worth. Ship it and get paid. It’s that easy.</p>
                    </div>
                    <div className="col-2">
                        <img src={require('@/images/single/sell_you_phone_banner.png')} alt="" />
                    </div>
                </div>
                <div className="two-step-and-done">
                    <p className="title">Two Steps And Done</p>
                    <p className="subtitle">The only way to sell your phone</p>
                    <section className="two-step">
                        <div className="one">
                            <div className="icon">
                                <img src={require('@/images/single/shipIt.png')} alt="" />
                                <p>Ship It</p>
                            </div>
                            <div className="content">
                                <p>Find out how much my phone is worth</p>
                                <p>Our price calculator will provide you a guaranteed price based on the condition and market value of your phone.</p>
                                <p>Prepare your phone for shipment</p>
                                <p>Before you send in your phone, it is important to follow your manufacturer's data reset instructions. We’ll send you instructions to help and as part of our inspection process we also wipe it again.</p>
                                <p>Free shipping</p>
                                <p>We will send you a shipping label for you to pack and mail your phone to us for free.</p>
                            </div>
                        </div>
                        <div className="two">
                            <div className="icon">
                                <img src={require('@/images/single/getMoney.png')} alt="" />
                                <p>Get Paid More</p>
                            </div>
                            <div className="content">
                                <p>Multiple payment options</p>
                                <p>Choose to get paid via Paypal or eCheck. For the fastest and easiest way to receive payment, choose Paypal.</p>
                                <p>Fast payment</p>
                                <p>We issue payment the next business day after we have received and verified the condition of your phone.</p>
                                <p>Premium payout</p>
                                <p>Unlike other trade in services, we cut out the middleman. This means, we pass on those savings directly to you. If we sell it for more, we issue a second payment within seven days.</p>
                            </div>
                        </div>
                    </section>
                </div>
                <section className="bg-white">
                    <section className="uptrade-different">
                        <p className="title">UpTrade Differentiation</p>
                        <table>
                            <thead>
                                <tr>
                                    <th />
                                    <th>UpTrade</th>
                                    <th>Carrier Stores</th>
                                    <th>Online Marketplaces</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Minimum Price Guarantee</td>
                                    <td>
                                        <img className="right" src={Right} alt="" />
                                    </td>
                                    <td>
                                        <img className="right" src={Right} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Premium Payout</td>
                                    <td>
                                        <img className="right" src={Right} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Safe</td>
                                    <td>
                                        <img className="right" src={Right} alt="" />
                                    </td>
                                    <td>
                                        <img className="right" src={Right} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Easy</td>
                                    <td>
                                        <img className="right" src={Right} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Free Shipping</td>
                                    <td>
                                        <img className="right" src={Right} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Fast Payout</td>
                                    <td>
                                        <img className="right" src={Right} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                    <td>
                                        <img className="wrong" src={Wrong} alt="" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </section>
                    <div className="button-group">
                        <Button className="sell-it-now" size="large" type="primary" style={{ width: 232, height: 64 }} onClick={this.onGoToSell}>Get Started</Button>
                    </div>
                </section>
            </section>
        );
    }
    private onGoToSell = () => {
        this.props.history.push('/sell/account')
    }
}
export default HowItWorks;