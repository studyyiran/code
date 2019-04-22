import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { IBlogDetailProps } from './interface/blog.interface';
import './bolg.less';
import * as moment from 'moment-timezone';

@inject('blog')
@observer
export default class BlogDetail extends React.Component<IBlogDetailProps> {
  public async componentDidMount() {
    if (window['__SERVER_RENDER__INITIALSTATE__'] && window['__SERVER_RENDER__INITIALSTATE__'].blog.detail) {
      const initialState = window['__SERVER_RENDER__INITIALSTATE__'];
      this.props.blog.detail = initialState.blog.detail;
      window['__SERVER_RENDER__INITIALSTATE__'] = null;
    } else {
      const res = await this.props.blog.getPageDetail(this.props.match.params.slug);
      if (!res) {
        this.props.history.replace('/notfound')
      }
      if (this.props.blog.detail) {
        document.title = this.props.blog.detail.title;
      }
      try {
        window.scrollTo(0, 0)
      } catch (e) {
        console.warn(e);
      }
    }
  }
  public componentWillUnmount() {
    this.props.blog.detail = null;
  }
  public render() {
    const detail = this.props.blog.detail;
    if (!detail) {
      return null;
    }
    return (
      <div className="page-statig-blog-container">
        <h1>{detail.title}</h1>
        <div className="small">
          <span>{moment.tz(detail.releaseDt, "America/Chicago").format('MMM DD, YYYY')}</span>
          <div className="right">
            <em />
            <em />
          </div>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ '__html': detail.content }} />
      </div>
    )
  }
}