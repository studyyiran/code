import * as React from "react";
import { Button } from "antd";
import { RouteComponentProps } from "react-router";
import "./aboutUs.less";
import { HeaderTitle } from "@/components/headerTitle";

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
      <article className="page-about-us">
        <HeaderTitle title={"Our mission"} />
        <div className="statement">
          <img src={require('@/images/test/bg.jpg')} />
          <section className="statement__content">
            <h2>Mission Statement</h2>
            <p>
              Our mission is to make today better so that the world will be
              brighter tomorrow; to build a company where the life of used
              electronics is extended through the hands of others or recycled to
              help reduce carbon footprint. We are committed to providing a
              fast, easy, safe, and trustworthy service for everyone.
            </p>
          </section>
        </div>
        <section className="values">
          <h2>Our Values</h2>
          <ul className="values-list">
            {articles.map(({ title, text }) => {
              return (
                <li className="values-list__item" key={title}>
                  <svg
                    className="icon"
                    aria-hidden="true"
                  >
                    <use xlinkHref="#uptrade_duigou" />
                  </svg>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              );
            })}
          </ul>
        </section>
        {/*<section className="team">*/}
        {/*  <h2>Our Team</h2>*/}
        {/*  <ul className="intro-card-list">*/}
        {/*    <li className="common-card">*/}
        {/*      <img />*/}
        {/*      <h3></h3>*/}
        {/*      <span></span>*/}
        {/*    </li>*/}
        {/*  </ul>*/}
        {/*</section>*/}
        <div className="button-container">
          <button onClick={this.onGoToSell}>Sell it now</button>
        </div>
      </article>
    );
  }
  private onGoToSell = () => {
    this.props.history.push("/sell/yourphone/brand");
  };
}
export default AboutUs;
