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
    console.log(activeTag)
    console.log(tagPageList)
    return (
      <div className="page-blog-list-container">
        <header>
          <h1>Tech Talk</h1>
        </header>
        {features && features.length ? (
          <section className="featured-part">
            <h2>Featured Tech Talk</h2>
            <section className="featured">
              <Link to={"/" + features[0].slug}>
                <img
                  src={features[0].thumbnailFullUrl}
                  alt={features[0].thumbnailFullUrl + " | UpTradeit.com"}
                />
                <div className="intro-info">
                  <span className="tag">tag</span>
                  <h3>{features[0].title}</h3>
                  <p className="summary">{features[0].summary}</p>
                  <span className="date">date</span>
                </div>
              </Link>
            </section>
          </section>
        ) : null}
        <section className="blog-list-part">
          {tags && tags.length ? (
            <Tabs
              className="tabs-container"
              onChange={this.handleChangeActiveTag}
            >
              {tags.map((item: ITag, index: number) => (
                <TabPane key={item.name} tab={item.name} />
              ))}
            </Tabs>
          ) : null}
          <nav>
            {tagPageList.map(props => (
              <Blog {...props} key={props.title} />
            ))}
          </nav>
          <Button
            type="primary"
            ghost={true}
            size="large"
            className="view-more"
            onClick={this.handleMore}
          >
            VIEW MORE
          </Button>
        </section>
      </div>
    );
  }

  private handleChangeActiveTag = (key: string) => {
    const tag = (this.props.blog.tags || []).find(item => item.name === key);
    if (tag) {
      console.log(tag);
      // @ts-ignore
      this.props.blog.activeTag = tag.name;
    }
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

function Blog(props: any) {
  const { slug, thumbnailFullUrl, title, releaseDt, summary } = props;
  return (
    <Link to={"/" + slug}>
      <img src={thumbnailFullUrl} alt={thumbnailFullUrl + " | UpTradeit.com"} />
      <section className="blog-intro">
        <header className="title">
          <h3>{title}</h3>
          <span className="date">
            {moment.tz(releaseDt, "America/Chicago").format("MMM DD, YYYY")}
          </span>
        </header>
        <p>{summary}</p>
      </section>
    </Link>
  );
}
