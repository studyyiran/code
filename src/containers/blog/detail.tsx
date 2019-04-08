import * as React from 'react';
import { inject, observer } from 'mobx-react'
import { IBlogDetailProps } from './interface/blog.interface';
import './bolg.less';
import * as moment from 'moment-timezone';

@inject('blog')
@observer
export default class BlogDetail extends React.Component<IBlogDetailProps> {
  public componentDidMount() {
    this.props.blog.getPageDetail(this.props.match.params.slug);
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
          <span>{moment.tz(detail.releaseDt, "America/Chicago").format('MMM DD, YYYY HHA')}</span>
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