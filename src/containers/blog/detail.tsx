import * as React from "react";
import { inject, observer } from "mobx-react";
import { IBlog, IBlogDetailProps } from "./interface/blog.interface";
import "./detail.less";
import * as moment from "moment-timezone";
import { shareComponent } from "@/utils/function";
import { Link } from "react-router-dom";
import { HeaderTitle } from "@/components/headerTitle";
@inject("blog")
@observer
export default class BlogDetail extends React.Component<IBlogDetailProps> {
  public async componentDidMount() {
    if (
      window["__SERVER_RENDER__INITIALSTATE__"] &&
      window["__SERVER_RENDER__INITIALSTATE__"].blog.detail
    ) {
      const initialState = window["__SERVER_RENDER__INITIALSTATE__"];
      this.props.blog.detail = initialState.blog.detail;
      window["__SERVER_RENDER__INITIALSTATE__"] = null;
    } else {
      this.props.blog.getLastestList();
      this.props.blog.getTagList();
      if (
        window["__SERVER_RENDER__INITIALSTATE__"] &&
        !window["__SERVER_RENDER__INITIALSTATE__"].blog.detail
      ) {
        window["__SERVER_RENDER__INITIALSTATE__"] = null;
      }
      const res = await this.props.blog.getPageDetail(
        this.props.match.params.slug
      );
      if (!res) {
        this.props.history.replace("/notfound");
      }
      if (this.props.blog.detail) {
        document.title = this.props.blog.detail.title;
      }
      try {
        window.scrollTo(0, 0);
      } catch (e) {
        console.warn(e);
      }
    }

    shareComponent.show();
  }
  public componentWillUnmount() {
    this.props.blog.detail = null;
    shareComponent.hide();
  }
  public render() {
    console.log("render");
    console.log();
    const detail = this.props.blog.detail;
    if (!detail) {
      return null;
    }
    return (
      <div className="blog-detail">
        <HeaderTitle title={"Tech Talk"} />
        <div className="blog-detail__content">
          <section className="content-part">
            <h2>{detail.title}</h2>
            <span className="date">
              {moment
                .tz(detail.releaseDt, "America/Chicago")
                .format("MMM DD, YYYY")}
            </span>
            <div
              className="html-content"
              dangerouslySetInnerHTML={{ __html: detail.content }}
            />
          </section>
          <div className="nav-part">
            <section>
              <h3>Latest Posts</h3>
              {renderNavList(this.props.blog.lastest)}
            </section>
            <section>
              <h3>Latest Posts</h3>
              {renderNavList(this.props.blog.lastest)}
            </section>
          </div>
        </div>
        <div className="button-container">
          <button className="common-button">View more</button>
        </div>
        
      </div>
    );
  }
}

function renderNavList(list: any) {
  return (
    <nav className="url-container">
      {(list || [])
        .filter((item: any, index: number) => {
          return index < 4;
        })
        .map((item: IBlog, index: number) => (
          <Blog key={index} {...item} />
        ))}
    </nav>
  );
}

function Blog(props: any) {
  const { slug, title, thumbnailFullUrl } = props;
  return (
    <Link to={"/" + slug} className="common-link">
      <img src={thumbnailFullUrl} alt={thumbnailFullUrl + " | UpTradeit.com"} />
      <h3>{title}</h3>
    </Link>
  );
}
