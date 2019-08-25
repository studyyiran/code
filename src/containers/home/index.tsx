import * as React from "react";
import { Link } from "react-router-dom";
import { inject, observer } from "mobx-react";
import "./index.less";
// import "./test.less";
import "./test2.less";
import { Button, Icon } from "antd";
import { IHomeProps, IHomeState } from "./interface/index.interface";
import ReviewItem from "./components/review";
import { IReview } from "./components/review/index.interface";
import { BrandLogo } from "./components/brandLogo";
import { SectionIcons } from "./components/sectionIcons";

const descPart1 = {
  title: "Hello World! Sell You Phone!",
  descArr: [
    {
      descTitle: "You Get Paid Fast",
      icon: require("@/images/home/icon_4.png"),
      content: "Multiple payment options to get cash how you want."
    },
    {
      descTitle: "You Get Paid Fast",
      icon: require("@/images/home/icon_4.png"),
      content: "Multiple payment options to get cash how you want."
    },
    {
      descTitle: "You Get Paid Fast",
      icon: require("@/images/home/icon_4.png"),
      content: "Multiple payment options to get cash how you want."
    }
  ]
};

const descPart2 = {
  title: "How it works",
  descArr: [
    {
      descTitle: "Step 1",
      icon: require("@/images/home/icon_4.png"),
      content: "Multiple payment options to get cash how you want."
    },
    {
      descTitle: "Step 2",
      icon: require("@/images/home/icon_4.png"),
      content: "Multiple payment options to get cash how you want."
    },
    {
      descTitle: "Step 3",
      icon: require("@/images/home/icon_4.png"),
      content: "Multiple payment options to get cash how you want."
    }
  ]
};

interface ILinkButton {
  children: string;
  className?: string;
  url: string;
}

function LinkButton(props: ILinkButton) {
  const { children, url, className } = props;
  return (
    <Link to={url} className={`comp-link-button ${className}`}>
      <Button type="primary" size="large" className="link-button__button">
        {children}
      </Button>
    </Link>
  );
}

function RenderReviewList(props: any) {
  const { reviews } = props;
  if (reviews && reviews.reviews) {
    return (reviews.reviews || [])
      .slice(0, 3)
      .map((item: IReview, index: number) => {
        return <ReviewItem key={index} {...item} />;
      });
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
    const { brands } = this.props.yourphone;
    const { isMobile } = this.props.common;
    console.log(isMobile);
    return (
      <main className="page-home">
        <div className="home__intro">
          <div className="flex-block" />
          <section>
            <h1>Sell your devices for the best price. No up-front fees.</h1>
            <img className="mb-ele" src={require("./bg.jpg")} />
            <LinkButton className={"mb-ele"} url={"/sell/yourphone/brand"}>
              Sell Now
            </LinkButton>
            <div className="search__container">
              <div className="comp-search">
                <label htmlFor="comp-search">
                  <Icon type="search" />
                </label>
                <input id="comp-search" placeholder="search" />
              </div>
              <Button type="primary" size="large">
                Search
              </Button>
            </div>
            <div className="intro__icon-list">
              {brands
                .filter((brand, index) => index < 6)
                .map((brand, index) => (
                  <BrandLogo key={index} brand={brand} />
                ))}
            </div>
          </section>
          <div className="flex-block" />
          <img src={require("@/images/home/main_bg1.png")} />
        </div>
        <SectionIcons {...descPart1}>
          <LinkButton url={"/sell/yourphone/brand"}>Sell my device</LinkButton>
        </SectionIcons>
        <SectionIcons {...descPart2} className="home__how-it-work">
          <div className="how-it-work__container">
            <video
              className="comp-video"
              src="https://www.w3school.com.cn/i/movie.ogg"
              controls={true}
            />
            <LinkButton url={"/sell/yourphone/brand"}>Learn More</LinkButton>
          </div>
        </SectionIcons>
        <SectionIcons title="See why customer" className={"home__review"}>
          <Link to="/reviews" className="review__new-review">
            <Icon type="plus-circle" />
            <span>Write a review</span>
          </Link>
          <div className="review__reviews-container">
            <RenderReviewList reviews={this.props.common.reviews} />
          </div>
        </SectionIcons>
      </main>
    );
  }
}
