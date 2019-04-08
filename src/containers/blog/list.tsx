import * as React from 'react';
import { observer, inject } from 'mobx-react'
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Button } from 'antd'
import { IBlogListState, IBlogListProps, ITag, IBlog } from './interface/blog.interface';
import './list.less';
import * as moment from 'moment-timezone';

@inject('blog')
@observer
export default class BlogList extends React.Component<IBlogListProps, IBlogListState> {
  public readonly state = {
    translate: false,
  }
  public async componentDidMount() {
    if (window['__SERVER_RENDER__INITIALSTATE__']) {
      const initialState = window['__SERVER_RENDER__INITIALSTATE__'];
      this.props.blog.features = initialState.blog.features;
      this.props.blog.lastest = initialState.blog.lastest;
      this.props.blog.tags = initialState.blog.tags;
      this.props.blog.tagPageList = initialState.blog.tagPageList;
      window['__SERVER_RENDER__INITIALSTATE__'] = null;
    } else {
      this.props.blog.getFeatureList();
      this.props.blog.getLastestList();
      this.props.blog.getTagList();
    }
    this.toggleArrow();
  }

  public componentDidUpdate() {
    this.toggleArrow();
  }

  public render() {
    const { features, tags, tagPageList, lastest, activeTag } = this.props.blog;
    return (
      <div className="page-blog-list-container">
        {
          features.length >= 3 && (
            <div className="featured-list-wrapper">
              <header>Featured</header>
              <div className="list-box">
                <div className="left list">
                  <Link to={'/' + features[0].slug}>
                    <div className="img" style={{ backgroundImage: `url(${features[0].thumbnailFullUrl})` }} />
                    <img src={features[0].thumbnailFullUrl} alt={features[0].thumbnailFullUrl + " | UpTradeit.com"} />
                    <div className="tips-box">
                      <h2>{features[0].title}</h2>
                      <p>{features[0].summary}</p>
                    </div>
                  </Link>
                </div>
                <div className="right">
                  <div className="list">
                    <Link to={'/' + features[1].slug}>
                      <div className="img" style={{ backgroundImage: `url(${features[1].thumbnailFullUrl})` }} />
                      <img src={features[1].thumbnailFullUrl} alt={features[1].thumbnailFullUrl + " | UpTradeit.com"} />
                      <div className="tips-box">
                        <h2>{features[1].title}</h2>
                        <p>{features[2].summary}</p>
                      </div>
                    </Link>
                  </div>

                  <div className="list">
                    <Link to={'/' + features[2].slug}>
                      <div className="img" style={{ backgroundImage: `url(${features[2].thumbnailFullUrl})` }} />
                      <img src={features[2].thumbnailFullUrl} alt={features[2].thumbnailFullUrl + " | UpTradeit.com"} />
                      <div className="tips-box">
                        <h2>{features[2].title}</h2>
                        <p>{features[2].summary}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        }

        <div className="tag-list-wrapper">
          <div className="tag-list-box">
            <div className={classnames('tag-list', { active: !!this.state.translate })}>
              <div className="tag-wrapper" id="tag-wrapper">
                {
                  tags.map((item: ITag, index: number) => {
                    return <div className={classnames('tag', { active: activeTag && activeTag.id === item.id })} key={index} onClick={this.handleChangeActiveTag.bind(this, item)}>{item.name}</div>
                  })
                }
              </div>
            </div>
            <div className={classnames('arrow', { active: !!this.state.translate })} onClick={this.handleChangeArrow} style={{ display: 'none' }} id="arrow-right" />
          </div>
          <div className="list-box">
            {
              tagPageList.map((item: IBlog, index: number) => {
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
          <div className="button-group">
            <Link to={`/tag/${this.props.blog.activeTag ? this.props.blog.activeTag.slug : ''}`} className="tag-link"><img src={require('@/images/yourphone/circle-arrow.png')} />How to find the local FedEx location</Link>
          </div>
        </div>

        <div className="bloglist-list-wrapper">
          <header>Lastest</header>
          <div className="list-box">
            {
              lastest.map((item: IBlog, index: number) => {
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
            this.props.blog.viewLastestMore && (
              <div className="button-group">
                <Button type="primary" ghost={true} size="large" className="view-more">VIEW MORE</Button>
              </div>
            )
          }
        </div>
      </div>
    )
  }

  private handleChangeArrow = () => {
    this.setState({
      translate: true
    })
  }

  private handleChangeActiveTag = (tag: ITag) => {
    this.props.blog.activeTag = tag;
  }

  private toggleArrow = () => {
    const tagWrapper = document.querySelector('#tag-wrapper');
    const arrowRight = document.querySelector('#arrow-right');
    if (tagWrapper && tagWrapper['offsetHeight'] > 40) {
      if (arrowRight) {
        arrowRight['style'].display = 'block';
      }
    }
  }
}