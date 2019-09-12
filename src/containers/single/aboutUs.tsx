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
    img: require("./res/whoWeAre/fast.svg"),
    title: "Customer’s First",
    text:
      "Treat customers great and great customers will treat you well. We are customer focused and continuously measure against our customer’s success."
  },
  {
    className: "width320",
    img: require("./res/whoWeAre/lock.svg"),
    title: "Think Sustainably",
    text:
      "Make environmentally sustainable decisions that last for generations through recycling, reusing, or trading."
  },
  {
    className: "",
    img: require("./res/whoWeAre/wrong.svg"),
    title: "Earn Trust Through Service",
    text:
      "Be honest and transparent through every interaction with customers, employees, and partners."
  },
  {
    className: "",
    img: require("./res/whoWeAre/fast.svg"),
    title: "Execution is Key",
    text: "Ideas are worthless without fast execution."
  },
  {
    className: "",
    img: require("./res/whoWeAre/lock.svg"),
    title: "Invent and Simplify",
    text:
      "Never settle for what has been done. Be creative and innovative using first principle thinking while reducing complexity."
  },
  {
    className: "width320",
    img: require("./res/whoWeAre/wrong.svg"),
    title: "Do Good and Be Responsible",
    text:
      "Be kind and take care of your neighbor. Do what is right, do what is good, and find balance."
  },
  {
    className: "width320",
    img: require("./res/whoWeAre/fast.svg"),
    title: "Collaborative Teamwork",
    text:
      "We believe in fostering an inclusive work environment where all ideas are heard by building a positive culture and family spirit."
  }
];

interface IUserIntro {
  headimg: string;
  name: string;
  desc: string;
}

const userIntro: IUserIntro[] = [
  {
    headimg: require("./res/whoWeAre/head_1.png"),
    name: "Marco Mai",
    desc: "Head of Operations"
  },
  {
    headimg: require("./res/whoWeAre/head_2.png"),
    name: "Esteban Facundo",
    desc: "Head of Operations"
  },
  {
    headimg: require("./res/whoWeAre/head_3.png"),
    name: "Howard Huang",
    desc: "Head of Operations"
  },
  {
    headimg: require("./res/whoWeAre/head_4.png"),
    name: "Hamza Shaikh",
    desc: "Head of Operations"
  },
  {
    headimg: require("./res/whoWeAre/head_5.png"),
    name: "Christine Huang",
    desc: "Head of Operations"
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
          <div>
            <img src={require("@/images/test/bg.jpg")} />
          </div>
          <div className="flex-center-container">
            <section className="statement__content">
              <h2>Mission Statement</h2>
              <p>
                Our mission is to make today better so that the world will be
                brighter tomorrow; to build a company where the life of used
                electronics is extended through the hands of others or recycled
                to help reduce carbon footprint. We are committed to providing a
                fast, easy, safe, and trustworthy service for everyone.
              </p>
            </section>
          </div>
        </div>
        <section className="values">
          <h2>Our Values</h2>
          <ul className="values-list">
            {articles.map(({ title, text, img }) => {
              return (
                <li className="values-list__item" key={title}>
                  <img src={img} />
                  <h3>{title}</h3>
                  <p>{text}</p>
                </li>
              );
            })}
          </ul>
        </section>
        <section className="team">
          <h2>Our Team</h2>
          <ul className="intro-card-list">
            {userIntro.map(({ headimg, name, desc }) => {
              return (
                <li className="intro-card-list__item" key="name">
                  <img src={headimg} />
                  <h3>{name}</h3>
                  <span>{desc}</span>
                </li>
              );
            })}
          </ul>
        </section>
        <div className="button-container">
          <button className="common-button" onClick={this.onGoToSell}>
            Sell it now
          </button>
        </div>
      </article>
    );
  }
  private onGoToSell = () => {
    this.props.history.push("/sell/yourphone/brand");
  };
}
export default AboutUs;
