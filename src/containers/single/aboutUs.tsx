import * as React from "react";
import { Button } from "antd";
import { RouteComponentProps } from "react-router";
import "./aboutUs.less";

interface IArticle {
  className: string;
  img: string;
  title: string;
  text: string;
}

const articles: IArticle[] = [
  {
    className: "width320",
    img: require("@/images/single/about-icon-1.png"),
    title: "Customer’s First",
    text:
      "Treat customers great and great customers will treat you well. We are customer focused and continuously measure against our customer’s success."
  },
  {
    className: "width320",
    img: require("@/images/single/about-icon-2.png"),
    title: "Think Sustainably",
    text:
      "Make environmentally sustainable decisions that last for generations through recycling, reusing, or trading."
  },
  {
    className: "",
    img: require("@/images/single/about-icon-3.png"),
    title: "Earn Trust Through Service",
    text:
      "Be honest and transparent through every interaction with customers, employees, and partners."
  },
  {
    className: "",
    img: require("@/images/single/about-icon-4.png"),
    title: "Execution is Key",
    text: "Ideas are worthless without fast execution."
  },
  {
    className: "",
    img: require("@/images/single/about-icon-5.png"),
    title: "Invent and Simplify",
    text:
      "Never settle for what has been done. Be creative and innovative using first principle thinking while reducing complexity."
  },
  {
    className: "width320",
    img: require("@/images/single/about-icon-6.png"),
    title: "Do Good and Be Responsible",
    text:
      "Be kind and take care of your neighbor. Do what is right, do what is good, and find balance."
  },
  {
    className: "width320",
    img: require("@/images/single/about-icon-7.png"),
    title: "Collaborative Teamwork",
    text:
      "We believe in fostering an inclusive work environment where all ideas are heard by building a positive culture and family spirit."
  }
];

const ArticleComp = (props: {
  className: string;
  img: string;
  title: string;
  text: string;
}) => (
  <div className={"article-comp " + props.className}>
    <img src={props.img} alt="" />
    <p className="article-title">{props.title}</p>
    <p className="article-text">{props.text}</p>
  </div>
);

class AboutUs extends React.Component<RouteComponentProps> {
  public render() {
    return (
      <section className="page-about-us">
        <div className="article">
          <div className="col-1">
            <p>Mission</p>
            <p>Statement</p>
            <p>
              Our vision is to make today better so that the world will be
              brighter tomorrow; to build a company where the life of used
              electronics is extended through the hands of others or recycled to
              help reduce carbon footprint. We are committed to providing a
              fast, easy, safe, and trustworthy service for everyone.
            </p>
          </div>
          <div className="col-2">
            <img src={require("@/images/single/aboutusbanner.png")} alt="" />
          </div>
        </div>
        <div className="our-values">
          <p className="title">Our Values</p>
          <section className="two-content">
            {articles.map((v, i) => (
              <ArticleComp key={i} {...v} />
            ))}
          </section>
          <div className="button-group">
            <Button
              className="sell-it-now"
              size="large"
              type="primary"
              style={{ width: 232, height: 64 }}
              onClick={this.onGoToSell}
            >
              SELL NOW
            </Button>
          </div>
        </div>
      </section>
    );
  }
  private onGoToSell = () => {
    this.props.history.push("/sell/account");
  };
}
export default AboutUs;
