import * as React from "react";
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { Tabs } from "@/components/tabs";
// @ts-ignore
const TabPane = Tabs.TabPane;
import {
  IBlogListState,
  IBlogListProps,
  ITag,
  IBlog
} from "./interface/blog.interface";
import "./list.less";
import * as moment from "moment-timezone";
import { shareComponent } from "@/utils/function";

@inject("blog")
@observer
export default class BlogList extends React.Component<
  IBlogListProps,
  IBlogListState
> {
  public readonly state = {
    translate: false
  };
  public async componentDidMount() {
    if (window["__SERVER_RENDER__INITIALSTATE__"]) {
      const initialState = window["__SERVER_RENDER__INITIALSTATE__"];
      this.props.blog.features = initialState.blog.features;
      this.props.blog.lastest = initialState.blog.lastest;
      this.props.blog.tags = initialState.blog.tags;
      this.props.blog.tagPageList = initialState.blog.tagPageList;
      this.props.blog.activeTag = initialState.blog.activeTag;
      this.props.blog.viewLastestMore = initialState.blog.viewLastestMore;
      window["__SERVER_RENDER__INITIALSTATE__"] = null;
    } else {
      this.props.blog.getFeatureList();
      this.props.blog.getLastestList();
      this.props.blog.getTagList();
      try {
        window.scrollTo(0, 0);
      } catch (e) {
        console.warn(e);
      }
    }
    this.toggleArrow();
    shareComponent.show();
  }

  public componentDidUpdate() {
    this.toggleArrow();
  }

  public componentWillUnmount() {
    shareComponent.hide();
  }

  public render() {
    const { features, tags, tagPageList, lastest, activeTag } = this.props.blog;
    return (
      <div className="page-blog-list-container">
        {features.length >= 3 && this.renderTop(features)}
        {tags.length > 0 &&
          this.renderSecond({
            tagPageList,
            activeTag,
            tags
          })}
        <div className="bloglist-list-wrapper">
          <header>Lastest</header>
          <div className="list-box">{this.renderBlogDesc(lastest)}</div>
          {this.props.blog.viewLastestMore && (
            <div className="button-group">
              <Button
                type="primary"
                ghost={true}
                size="large"
                className="view-more"
                onClick={this.handleMore}
              >
                VIEW MORE
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  private renderSecond(props: any) {
    const { activeTag, tags, tagPageList } = props;
    return (
      <div className="tag-list-wrapper">
        <Tabs
          className="tabs-container"
          onChange={this.handleChangeActiveTag}
        >
          {tags.map((item: ITag, index: number) => (
            <TabPane key={item.name} tab={item.name} />
          ))}
        </Tabs>
        {/*<div className="list-box">{this.renderBlogDesc(tagPageList)}</div>*/}
        <div className="button-group">
          <Link
            to={`/tag/${
              this.props.blog.activeTag ? this.props.blog.activeTag.slug : ""
            }`}
            className="tag-link"
          >
            <img src={require("@/images/yourphone/circle-arrow.png")} />
            More about{" "}
            {this.props.blog.activeTag && this.props.blog.activeTag.name}
          </Link>
        </div>
      </div>
    );
  }

  private renderBlogDesc(list: any) {
    console.log(list)
    return list.map((item: IBlog, index: number) => {
      return (
        <div className="list" key={index}>
          <Link to={"/" + item.slug}>
            <div className="img-box">
              <div
                className="img"
                style={{ backgroundImage: `url(${item.thumbnailFullUrl})` }}
              />
              <img
                src={item.thumbnailFullUrl}
                alt={item.thumbnailFullUrl + " | UpTradeit.com"}
              />
            </div>
            <div className="right">
              <h3>{item.title}</h3>
              <small>
                {moment
                  .tz(item.releaseDt, "America/Chicago")
                  .format("MMM DD, YYYY")}
              </small>
              <p>{item.summary}</p>
            </div>
          </Link>
        </div>
      );
    });
  }

  private renderTop(features: any) {
    return (
      <div className="featured-list-wrapper">
        <header>Featured</header>
        <div className="list-box">
          <div className="left list">
            <Link to={"/" + features[0].slug}>
              <div
                className="img"
                style={{
                  backgroundImage: `url(${features[0].thumbnailFullUrl})`
                }}
              />
              <img
                src={features[0].thumbnailFullUrl}
                alt={features[0].thumbnailFullUrl + " | UpTradeit.com"}
              />
              <div className="tips-box">
                <h2>{features[0].title}</h2>
                <p>{features[0].summary}</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  private handleChangeActiveTag = (key: string) => {
    console.log(key)
    // this.props.blog.activeTag = tag;
  };

  private toggleArrow = () => {
    const tagWrapper = document.querySelector("#tag-wrapper");
    const arrowRight = document.querySelector("#arrow-right");
    if (tagWrapper && tagWrapper["offsetHeight"] > 40) {
      if (arrowRight) {
        // arrowRight['style'].display = 'block';
      }
    }
  };

  private handleMore = () => {
    this.props.blog.lastestPagination.pageIndex =
      this.props.blog.lastestPagination.pageIndex + 1;
    this.props.blog.getLastestList();
  };
}
