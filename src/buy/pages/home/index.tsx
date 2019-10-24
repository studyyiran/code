import * as React from "react";
import "./index.less";
import { BrandLogo } from "./components/brandLogo";
import { RenderByCondition } from "buy/components/RenderByCondition";
import { HomeCardDataList } from "./components/homeCardDataList";
import { Rate } from "antd";
import SearchProduct from "../../components/SearchProduct";
import { locationHref } from "../../common/utils/routerHistory";
import RouterLink from "../../components/routerLink";
import { brands, buyCardInfo, sellCardInfo } from "./components/constant";
import { getProductListPath, sellPageGoTo } from "../../common/utils/util";
import { useContext } from "react";
import { IOurHomeContext, OurHomeContext } from "./context";
import { ourHomeSsrRule } from "./ssr";

export default function HomeWrapper(props: any) {
  function clickBrandHandler(value: any) {}
  const ourHomeContext = useContext(OurHomeContext);
  const {
    ourHomeContextValue,
    useClientRepair,
    getBuyProductList,
    getSellProductList
  } = ourHomeContext as IOurHomeContext;
  const {
    sellListTitle,
    buyListTitle,
    buyProductList,
    sellProductList
  } = ourHomeContextValue;

  // 告知client执行对应的函数
  useClientRepair(ourHomeSsrRule);

  return (
    <Home
      clickBrandHandler={clickBrandHandler}
      {...props}
      getBuyProductList={getBuyProductList}
      getSellProductList={getSellProductList}
      buyListTitle={buyListTitle}
      sellListTitle={sellListTitle}
      buyProductList={buyProductList}
      sellProductList={sellProductList}
    />
  );
}

class Home extends React.Component<any, any> {
  public readonly state: Readonly<any> = {
    homeTab: "buy",
    buyTab: "Apple",
    buyDataList: [],
    sellTab: "Apple",
    sellDataList: []
  };

  // methods
  public changeTab = (tab: string) => {
    this.setState({
      homeTab: tab
    });
  };

  public render() {
    const url = require("./res/homeBanner.png");
    const homeCardInfo =
      this.state.homeTab === "buy" ? buyCardInfo : sellCardInfo;

    const homeContainerContent = () => {
      if (this.state.homeTab === "buy") {
        return (
          <div className="container">
            <img className="mb-head-img" src={url} />
            <section className="title">
              <h1>
                Buy The Best Used
                <br />
                Phones For Less.
              </h1>
              <div className="home-tab-wrapper">
                <div
                  className={`tab-item active`}
                  onClick={this.changeTab.bind(this, "buy")}
                >
                  Buy a Phone
                </div>
                <div
                  className={`tab-item`}
                  onClick={this.changeTab.bind(this, "sell")}
                >
                  Sell My Phone
                </div>
              </div>
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
      } else {
        return (
          <div className="container">
            <img className="mb-head-img" src={url} />
            <section className="title">
              <h1>
                Sell For More. <br />
                Without Any Hassles.
              </h1>
              <div className="home-tab-wrapper">
                <div
                  className={`tab-item ${
                    this.state.homeTab === "buy" ? "active" : ""
                  }`}
                  onClick={this.changeTab.bind(this, "buy")}
                >
                  Buy a Phone
                </div>
                <div
                  className={`tab-item ${
                    this.state.homeTab === "sell" ? "active" : ""
                  }`}
                  onClick={this.changeTab.bind(this, "sell")}
                >
                  Sell My Phone
                </div>
              </div>

              <div className="intro__icon-list">
                <RenderByCondition
                  ComponentPc={
                    <div className="wrap-container">
                      {fixBrands
                        .filter((brand, index) => index < 6)
                        .map((brand, index) => {
                          const { id } = brand;
                          return (
                            <BrandLogo
                              key={id}
                              brand={brand}
                              {...this.props}
                              onClick={(this.props as any).clickBrandHandler}
                            />
                          );
                        })}
                    </div>
                  }
                  ComponentMb={
                    <>
                      <div className="wrap-container">
                        {fixBrands
                          .filter((brand, index) => index < 3)
                          .map((brand, index) => (
                            <BrandLogo
                              key={index}
                              brand={brand}
                              {...this.props}
                              onClick={(this.props as any).clickBrandHandler}
                            />
                          ))}
                      </div>
                      <div className="wrap-container">
                        {fixBrands
                          .filter((brand, index) => index > 2 && index < 6)
                          .map((brand, index) => (
                            <BrandLogo
                              key={index}
                              brand={brand}
                              {...this.props}
                              onClick={(this.props as any).clickBrandHandler}
                            />
                          ))}
                      </div>
                    </>
                  }
                />
              </div>
              <button
                className="common-button"
                onClick={() => sellPageGoTo("/sell-phone", false)}
              >
                Sell Now
              </button>
            </section>
            <div className="img-container">
              <img src={url} />
            </div>
          </div>
        );
      }
    };
    const fixBrands = brands.filter((brand, index) => index < 6);
    return (
      <article className="page-home">
        <div className="home__intro">{homeContainerContent()}</div>
        <div className="home-mask-wrapper">
          <div className="card-info-wrapper">
            <div className="content-wrapper">
              {homeCardInfo.map((item, index) => {
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
              <button
                className="common-button"
                onClick={() => {
                  this.state.homeTab === "buy"
                    ? sellPageGoTo(getProductListPath())
                    : sellPageGoTo("/how-to-sell-my-home", false);
                }}
              >
                Learn More
              </button>
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
        <HomeCardDataList
          type={"sell"}
          titleList={this.props.sellListTitle}
          onClickHandler={this.props.getSellProductList}
          productList={this.props.sellProductList}
        />

        <div className="home-confidence-wrapper">
          <div className="content-detail-home-width">
            <div className="title">Buy and Sell With Confidence</div>
            <div className="desc">
              “This was the easiest service I've used to get cash for a used
              phone. I received the the same amount I would have received had I
              sold on eBay, considering eBay & PayPal fees”
            </div>
            <div className="start">
              <Rate disabled defaultValue={5} />
            </div>
            <div
              className="read-more"
              onClick={() => sellPageGoTo("/reviews", false)}
            >
              <span className="text">Read more</span>
            </div>
            <div className="img-wrapper">
              <img
                src={require("buy/pages/home/img/buNow.jpeg")}
                className="img-item"
                onClick={() => sellPageGoTo(getProductListPath())}
              />

              <img
                src={require("buy/pages/home/img/sellNow.jpeg")}
                className="img-item last"
                onClick={() => sellPageGoTo("/sell-phone", false)}
              />
            </div>
          </div>
        </div>
      </article>
    );
  }
}
