import * as React from "react";
import { observer, inject } from "mobx-react";
import { IBlogListProps, IBlog } from "./interface/blog.interface";
import "./list.less";
import "./common.less";
import { shareComponent } from "@/utils/function";
import Blog from "@/containers/blog/components/blogCard";
@inject("blog")
@observer
export default class BlogList extends React.Component<IBlogListProps> {
  public componentDidMount() {
    if (window["__SERVER_RENDER__INITIALSTATE__"]) {
      const initialState = window["__SERVER_RENDER__INITIALSTATE__"];
      this.props.blog.tagPageListPagination =
        initialState.blog.tagPageListPagination;
      this.props.blog.tagPageList = initialState.blog.tagPageList;
      this.props.blog.viewTagMore = initialState.blog.viewTagMore;
      window["__SERVER_RENDER__INITIALSTATE__"] = null;
    } else {
      this.props.blog.tagPageListPagination = {
        tagSlug: this.props.match.params.tag,
        pageIndex: 0,
        pageSize: 10
      };
      this.props.blog.getTagPageList();
      try {
        window.scrollTo(0, 0);
      } catch (e) {
        console.warn(e);
      }
    }

    shareComponent.show();
  }
  public componentWillUnmount() {
    this.props.blog.destory();
    shareComponent.hide();
  }
  public render() {
    const blog = this.props.blog;
    return (
      <div className="blog-list-part-container">
        <section className="blog-list-part">
          <header>{blog.currentTag}</header>
          <nav>
            {blog.tagPageList.map(props => {
              return <Blog {...props} key={props.title} />;
            })}
          </nav>
        </section>
        {/*{this.props.blog.viewTagMore && (*/}
        {/*  <div className="button-group">*/}
        {/*    <Button*/}
        {/*      type="primary"*/}
        {/*      ghost={true}*/}
        {/*      size="large"*/}
        {/*      className="view-more"*/}
        {/*      onClick={this.handleMore}*/}
        {/*    >*/}
        {/*      VIEW MORE*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*)}*/}
      </div>
    );
  }

  private handleMore = () => {
    this.props.blog.tagPageListPagination.pageIndex =
      this.props.blog.tagPageListPagination.pageIndex + 1;
    this.props.blog.getTagPageList();
  };
}
