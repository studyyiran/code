import * as React from "react";
import "./index.less";
import RouterLink from "../../../../components/routerLink";
import {useState} from "react";
import {getProductListPath} from "../../../../common/utils/util";


export default function BuyHowItWorks(props: any) {

  const [showVideo, setShowVideo] = useState(true); // tab list
  const img = require("../../img/buyVideoHome.jpeg");


  return (
    <div className={"buy-home-how-it-works-wrapper"}>
      <div className={"buy-home-how-it-title"}>How It Works</div>
      <div className={"buy-home-how-it-desc"}>
        UpTrade is reinventing the way people buy used phones.
      </div>

      <img src={img} className={`video-img ${showVideo ? "hidden" : "show"}`} onClick={() => setShowVideo(true)}/>
      <div className={`iframe-wrapper ${showVideo ? "show" : "hidden"}`}>
        <div className={"mob-player"}>
          <iframe width="100%" height="240" src="https://www.youtube.com/embed/cjIquwlYNm8" frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
        </div>
        <div className={"web-player"}>
          <iframe width="100%" height="568" src="https://www.youtube.com/embed/cjIquwlYNm8" frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
        </div>
      </div>

      <div className={"shop-all-wrapper"}>
        <RouterLink to={getProductListPath()}>
          <button className="common-home-button shop-all">View All</button>
        </RouterLink>
      </div>
    </div>
  );
}
