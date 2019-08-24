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
      <div className="page-statig-blog-container">
        <HeaderTitle title={detail.title} />
        <RenderTest title="123123" list={this.props.blog.lastest} />
        <div className="small">
          <span>
            {moment
              .tz(detail.releaseDt, "America/Chicago")
              .format("MMM DD, YYYY")}
          </span>
          <div className="right">
            <em />
            <em />
          </div>
        </div>
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: detail.content }}
        />
      </div>
    );
  }
}

function RenderTest(props: any) {
  const { title, list } = props;
  return (
    <ul>
      <h2>{title}</h2>
      {renderBlogDesc(list)}
    </ul>
  );
}

// 磨刀不误砍柴功？
function renderBlogDesc(list: any) {
  return (list || []).map((item: IBlog, index: number) => {
    return (
      <li className="list" key={index}>
        <Link to={"/" + item.slug}>
          <div className="img-box">
            <h3>{item.title}</h3>
            <div
              className="img"
              style={{ backgroundImage: `url(${item.thumbnailFullUrl})` }}
            />
            <img
              src={item.thumbnailFullUrl}
              alt={item.thumbnailFullUrl + " | UpTradeit.com"}
            />
          </div>
        </Link>
      </li>
    );
  });
}
