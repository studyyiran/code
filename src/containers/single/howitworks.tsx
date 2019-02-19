import * as React from 'react';
import './howitworks.less';

const HowItWorks = () => {
    return (
        <section className="page-help-howitworks">
            <div className="article">
                <div className="col-1">
                    <p>Get Cash</p>
                    <p>For Your Phone</p>
                    <p>In Two </p>
                    <p>Sell your phone for what it’s actually worth. Ship it and get paid. It’s that easy.</p>
                </div>
                <div className="col-2">
                    <img src={require('@/images/single/sell_you_phone_banner.png')} alt="" />
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;