import * as React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import "./index.less";
import { IHomeProps, IHomeState } from "./interface/index.interface";
import ReviewItem from "./components/review";
import { IReview } from "./components/review/index.interface";
import { BrandLogo } from "./components/brandLogo";
import { SectionIcons } from "./components/sectionIcons";
import { Carousel } from "antd";
import { RenderByCondition } from "@/containers/layout/components/footer/RenderByCondition";

const descPart1 = {
  descArr: [
    {
      descTitle: "Price Guarantee",
      icon: require("./res/icon/icon-easy.svg"),
      content:
        "Get a minimum guaranteed price based on the condition and market value of your phone. If we sell your phone for more, we will issue a second payment."
    },
    {
      descTitle: "Fast and Easy",
      icon: require("./res/icon/icon-price.svg"),
      content:
        "Get started in minutes and get cash payment within 1-2 business days once we receive your phone."
    },
    {
      descTitle: "Zero Risk",
      icon: require("./res/icon/icon-safe.svg"),
      content:
        "Ship your phone to us for free. If you change your mind, we will even ship it back to you for free. "
    }
  ]
};

const descPart2 = {
  title: "How it works",
  descArr: [
    {
      descTitle: "Step 1",
      icon: require("./res/icon/icon-step-1.svg"),
      content: "Get your minimum guarantee price."
    },
    {
      descTitle: "Step 2",
      icon: require("./res/icon/icon-step-2.svg"),
      content: "Reset your phone and ship it to us for free."
    },
    {
      descTitle: "Step 3",
      icon: require("./res/icon/icon-step-3.svg"),
      content: "Fast cash payment issued within 1-2 business days."
    }
  ]
};

const brands = [
  {
    iconName: "Apple",
    iconUrl: "Apple.svg",
    id: 52
  },
  {
    iconName: "Samsung",
    iconUrl: "Samsung.svg",
    id: 7
  },
  {
    iconName: "Google",
    iconUrl: "Google.svg",
    id: 20
  },
  {
    iconName: "LG",
    iconUrl: "LG.svg",
    id: 3
  },
  {
    iconName: "OnePlus",
    iconUrl: "OnePlus.svg",
    id: 357
  },
  {
    iconName: "Others",
    iconUrl: "",
    id: "others"
  }
];

interface ILinkButton {
  children: string;
  className?: string;
  url: string;
}

function LinkButton(props: ILinkButton) {
  const { children, url, className } = props;
  return (
    <Link to={url} className={`comp-link-button ${className}`}>
      <button className="common-button">{children}</button>
    </Link>
  );
}

function RenderReviewList(props: any) {
  const { reviews, isMobile } = props;
  if (reviews && reviews.reviews) {
    if (!isMobile) {
      return (reviews.reviews || [])
        .slice(0, 3)
        .map((item: IReview, index: number) => {
          return <ReviewItem key={index} {...item} />;
        });
    } else {
      return (
        <Carousel>
          {(reviews.reviews || [])
            .slice(0, 3)
            .map((item: IReview, index: number) => {
              return <ReviewItem key={index} {...item} />;
            })}
        </Carousel>
      );
    }
  } else {
    return null;
  }
}

@inject("yourphone", "common")
@observer
export default class Home extends React.Component<IHomeProps, IHomeState> {
  public readonly state: Readonly<IHomeState> = {
    howitworksGroup: [
      [
        {
          index: 1,
          img: require("@/images/home/icon_1.png"),
          title: "Price Guarantee",
          content:
            "Go through our price calculator and we’ll provide you a minimum guaranteed price based on the condition and market value of your electronics. If we sell the device for more, you’ll get paid more."
        },
        {
          index: 2,
          img: require("@/images/home/icon_2.png"),
          title: "Clean & Package",
          content:
            "Worry free instructions will be provided to help you wipe and prepare your electronics for shipment. We don’t accept electronics that have been reported lost or stolen."
        }
      ],
      [
        {
          index: 3,
          img: require("@/images/home/icon_3.png"),
          title: "Ship for Free",
          content:
            "Shipping is on us. A prepaid shipping label will be sent to you for mailing your electronics to us."
        }
      ],
      [
        {
          index: 4,
          img: require("@/images/home/icon_4.png"),
          title: "You Get Paid Fast",
          content: "Multiple payment options to get cash how you want."
        },
        {
          index: 5,
          img: require("@/images/home/icon_5.png"),
          title: "You Get Paid More",
          content:
            "Unlike other trade in services, we cut out the middleman and pass on those savings directly to you. That means more cash in your pocket."
        }
      ]
    ],
    times: []
  };
  public async componentDidMount() {
    this.props.yourphone.getBrandsByCid();
    if (window["__SERVER_RENDER__INITIALSTATE__"]) {
      const initialState = window["__SERVER_RENDER__INITIALSTATE__"];
      this.props.common.reviewsPagation =
        initialState["common"].reviewsPagation;
      this.props.common.reviews = initialState["common"].reviews;
      this.props.common.moduleOn = initialState["common"].moduleOn;
      window["__SERVER_RENDER__INITIALSTATE__"] = null;
    } else {
      await this.props.common.getModuleOn();

      if (this.props.common.moduleOn) {
        this.props.common.getReviewsSort({
          page: 0,
          pageSize: 100,
          order: "desc"
        });
      }
    }
  }

  public render() {
    const { isMobile } = this.props.common;
    const url = require("./res/bannerPhone.png");
    return (
      <article className="page-home">
        <div className="home__intro">
          <div className="container">
            <section className="title">
              <h1>
                Sell Your Used Phone. <br />
                Fast, Easy, & High Prices
              </h1>
              <img className="mb-ele" src={url} />
              <div className="intro__icon-list">
                <RenderByCondition
                  ComponentPc={
                    <div className="wrap-container">
                      {brands
                        .filter((brand, index) => index < 6)
                        .map((brand, index) => (
                          <BrandLogo key={index} brand={brand} />
                        ))}
                    </div>
                  }
                  ComponentMb={
                    <>
                      <div className="wrap-container">
                        {brands
                          .filter((brand, index) => index < 3)
                          .map((brand, index) => (
                            <BrandLogo key={index} brand={brand} />
                          ))}
                      </div>
                      <div className="wrap-container">
                        {brands
                          .filter((brand, index) => index > 2 && index < 6)
                          .map((brand, index) => (
                            <BrandLogo key={index} brand={brand} />
                          ))}
                      </div>
                    </>
                  }
                />
              </div>
              <Link to={"/sell/yourphone/brand"}>
                <button className="common-button">Sell Now</button>
              </Link>
            </section>
            <div className="img-container">
              <img src={url} />
            </div>
          </div>
        </div>
        <section className="only-way-part">
          <h2>The Only Way To Sell</h2>
          <SectionIcons {...descPart1} />
        </section>
        <section className="sell-for-more-part">
          <h2>We Sell It For More</h2>
          <p>
            Your electronics will be listed on multiple markets at the same
            time, so you get the best possible payout.
          </p>
          <img
            src={
              isMobile
                ? require("./res/chart-mb.svg")
                : require("./res/chart-pc.svg")
            }
          />
          <LinkButton url={"/sell/yourphone/brand"}>Sell Now</LinkButton>
        </section>
        <section className="easy-sell-part">
          <h2>3 Easy Steps To Sell</h2>
          <video
            className="comp-video"
            poster={require("./res/video-poster.png")}
            src="https://www.w3school.com.cn/i/movie.ogg"
            controls={false}
          />
          <div className="bg-white-container">
            <SectionIcons {...descPart2} />
            <LinkButton url={"/sell/yourphone/brand"}>Learn More</LinkButton>
          </div>
        </section>
        <section className="home__review">
          <h2>See Why Customers Love UpTrade</h2>
          <div className="review__reviews-container">
            <RenderReviewList
              reviews={this.props.common.reviews}
              isMobile={isMobile}
            />
          </div>
        </section>
        <LinkButton url={"/sell/yourphone/brand"}>Sell Now</LinkButton>
      </article>
    );
  }
}

{
  /*<LinkButton url={"/sell/yourphone/brand"}>*/
}
{
  /*  */
}
{
  /*</LinkButton>*/
}
{
  /*<div className="search__container">*/
}
{
  /*  <div className="comp-search">*/
}
{
  /*    <label htmlFor="comp-search">*/
}
{
  /*      <Icon type="search" />*/
}
{
  /*    </label>*/
}
{
  /*    <input id="comp-search" placeholder="search" />*/
}
{
  /*  </div>*/
}
{
  /*  <Button type="primary" size="large">*/
}
{
  /*    Search*/
}
{
  /*  </Button>*/
}
{
  /*</div>*/
}
