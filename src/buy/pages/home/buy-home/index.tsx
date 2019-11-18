import * as React from "react";
import "./index.less";
import { RenderByCondition } from "buy/components/RenderByCondition";
import { HomeCardDataList } from "../components/homeCardDataList";
import SearchProduct from "../../../components/SearchProduct";
import { locationHref } from "../../../common/utils/routerHistory";
import RouterLink from "../../../common-modules/components/routerLink";
import { buyCardInfo } from "../components/constant";
import Experience from "../components/experience";
import BuyConfidence from "../components/buy-confidence";
import BuyHowItWorks from "../components/how-it-works";
import { NewBuyNotice } from "../components/newBuyNotice";
import { getProductListPath } from "../../../common/utils/util";
import { useContext } from "react";
import { IOurHomeContext, OurHomeContext } from "../context";
import { ourHomeSsrRule } from "../ssr";

export default function HomeWrapper(props: any) {
  function clickBrandHandler(value: any) {}
  const ourHomeContext = useContext(OurHomeContext);
  const {
    ourHomeContextValue,
    useClientRepair,
    getBuyProductList
  } = ourHomeContext as IOurHomeContext;
  const { buyProductList, buyListTitle } = ourHomeContextValue;

  // 告知client执行对应的函数
  useClientRepair(ourHomeSsrRule);
  return (
    <Home
      clickBrandHandler={clickBrandHandler}
      {...props}
      buyListTitle={buyListTitle}
      buyProductList={buyProductList}
      getBuyProductList={getBuyProductList}
    />
  );
}

class Home extends React.Component<any, any> {
  public render() {
    const url = require("../res/homeBanner.png");

    const homeContainerContent = () => {
      return (
        <div className="container">
          <img className="mb-head-img" src={url} />
          <section className="title">
            <h1>
              Buy Used Phones.
              <br />
              Real Phones.
              <br />
              Fully Inspected.
            </h1>
            <RenderByCondition
              ComponentMb={null}
              ComponentPc={
                <SearchProduct
                  onClickSubmit={() => {
                    locationHref(getProductListPath());
                  }}
                />
              }
            />
            <div className="intro__icon-list home-search-wrapper">
              {/*<input*/}
              {/*  type="text"*/}
              {/*  className="home-buy-search-input"*/}
              {/*  placeholder="Search phone manufacture, model, storage & carrier"*/}
              {/*/>*/}
              {/*<button className="common-home-button search-button">*/}
              {/*  Search*/}
              {/*</button>*/}
            </div>
            <div className="mb-home-button-wrapper">
              <RouterLink to={getProductListPath()}>
                <button className="common-home-button mb-home-button">
                  Shop All
                </button>
              </RouterLink>
            </div>
          </section>
          <div className="img-container">
            <img src={url} />
          </div>
        </div>
      );
    };
    return (
      <article className="buy-home-page-wrapper">
        <div className="home__intro">{homeContainerContent()}</div>
        <div className="home-mask-wrapper">
          <div className="card-info-wrapper">
            <div className="content-wrapper">
              {buyCardInfo.map((item, index) => {
                return (
                  <div className="content-item" key={index}>
                    <img src={item.img} className="item-img" />
                    <div className="content">
                      <div className="title">{item.title}</div>
                      <div
                        className="text"
                        dangerouslySetInnerHTML={{ __html: item.text }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="learn-more-button-wrapper">
              <RouterLink to={getProductListPath()}>
                <button className="common-home-button learn-more-button">
                  Learn More
                </button>
              </RouterLink>
            </div>
          </div>
        </div>

        <div className="line">&nbsp;</div>

        <HomeCardDataList
          type={"buy"}
          titleList={this.props.buyListTitle}
          onClickHandler={this.props.getBuyProductList}
          productList={this.props.buyProductList}
        />

        <BuyConfidence isMob={true} />
        <Experience />
        <BuyConfidence isMob={false} />
        <BuyHowItWorks />
        <div className={"experience-notice-wrapper"}>
          <NewBuyNotice />
        </div>
      </article>
    );
  }
}
