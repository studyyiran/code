import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router-dom';
import { Button } from 'antd'
import { IBlogListProps, IBlog } from './interface/blog.interface';
import './list.less';
import * as moment from 'moment-timezone';

@inject('blog')
@observer
export default class BlogList extends React.Component<IBlogListProps> {
  public componentDidMount() {
    if (window['__SERVER_RENDER__INITIALSTATE__']) {
      const initialState = window['__SERVER_RENDER__INITIALSTATE__'];
      this.props.blog.tagPageListPagination = initialState.blog.tagPageListPagination;
      this.props.blog.tagPageList = initialState.blog.tagPageList;
      this.props.blog.viewTagMore = initialState.blog.viewTagMore;
      window['__SERVER_RENDER__INITIALSTATE__'] = null;
    } else {
      this.props.blog.tagPageListPagination = {
        tagSlug: this.props.match.params.tag,
        pageIndex: 0,
        pageSize: 10
      }
      this.props.blog.getTagPageList();
      try {
        window.scrollTo(0, 0)
      } catch (e) {
        console.warn(e);
      }
    }
  }
  public componentWillUnmount() {
    this.props.blog.destory();
  }
  public render() {
    const blog = this.props.blog;
    return (
      <div className="page-blog-list-container">
        <div className="bloglist-list-wrapper">
          <header>{blog.currentTag}</header>
          <div className="list-box">
            {
              blog.tagPageList.map((item: IBlog, index: number) => {
                return (
                  <div className="list" key={index}>
                    <Link to={'/' + item.slug}>
                      <div className="img-box">
                        <div className="img" style={{ backgroundImage: `url(${item.thumbnailFullUrl})` }} />
                        <img src={item.thumbnailFullUrl} alt={item.thumbnailFullUrl + " | UpTradeit.com"} />
                      </div>
                      <div className="right">
                        <h3>{item.title}</h3>
                        <small>{moment.tz(item.releaseDt, "America/Chicago").format('MMM DD, YYYY HHA')}</small>
                        <p>{item.summary}</p>
                      </div>
                    </Link>
                  </div>
                )
              })
            }
          </div>
          {
            this.props.blog.viewTagMore && (
              <div className="button-group">
                <Button type="primary" ghost={true} size="large" className="view-more" onClick={this.handleMore}>VIEW MORE</Button>
              </div>
            )
          }
        </div>
      </div>
    )
  }

  private handleMore = () => {
    this.props.blog.tagPageListPagination.pageIndex = this.props.blog.tagPageListPagination.pageIndex + 1;
    this.props.blog.getTagPageList();
  }
}