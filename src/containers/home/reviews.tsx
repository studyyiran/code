import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Form, Select, Pagination, Skeleton } from 'antd'
import Star from '@/components/star';
import { ICommonProps, IReview } from '@/store/interface/common.interface';
import './reviews.less';

@inject('common')
@observer
export default class Reviews extends React.Component<ICommonProps> {
  public async componentDidMount() {
    if (window['__SERVER_RENDER__INITIALSTATE__']) {
      const initialState = window['__SERVER_RENDER__INITIALSTATE__'];
      this.props.common.reviewsPagation = initialState['common'].reviewsPagation;
      this.props.common.reviews = initialState['common'].reviews;
      window['__SERVER_RENDER__INITIALSTATE__'] = null;
    } else {
      this.props.common.getReviews({
        pageSize: 100,
        order: 'desc'
      });
    }
  }

  public componentWillUnmount() {
    this.props.common.reviewsPagation = {
      page: 0,
      list: [],
      rating: ''
    }
    this.props.common.reviews = null;
  }
  public render() {
    const reviews = this.props.common.reviews;
    const total = reviews ? reviews.reviews.length : 0;
    return (
      <div className="page-home-reviews-container">
        <div className="global-wrapper">
          <div className="top">
            <h1>UPTRADE REVIEWS</h1>
            <div className="rating-list">
              {reviews && <Star rate={Number(reviews.stats.average_rating)} />}
            </div>
          </div>
          <div className="bottom">
            <div className="text">
              <span>{reviews ? reviews.stats.average_rating : ''} Rating</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span>{reviews ? reviews.stats.total_reviews.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') : ''} Reviews</span>
            </div>
            <div className="right">
              <span>Data From</span>
              <img src={require('@/images/home/reviews_logo.png')} alt="" />
            </div>
          </div>
        </div>

        <div className="list-wrapper">
          <div className="filter-box">
            <Form className="form">
              {
                !this.props.common.reviewsPagation.rating && (
                  <Form.Item label="Sort by" className="form-item item1">
                    <Select defaultValue="desc" onChange={this.handleChangeOrder}>
                      <Select.Option value="desc">Most Recent</Select.Option>
                      <Select.Option value="rating">Highest Rated</Select.Option>
                    </Select>
                  </Form.Item>
                )
              }
              <Form.Item label="Filter" className="form-item item2">
                <Select defaultValue={this.props.common.reviewsPagation.rating} onChange={this.handleChangeStar}>
                  <Select.Option value="">None</Select.Option>
                  <Select.Option value="5">5 Stars</Select.Option>
                  <Select.Option value="4">4 Stars</Select.Option>
                  <Select.Option value="3">3 Stars</Select.Option>
                  <Select.Option value="2">2 Stars</Select.Option>
                  <Select.Option value="1">1 Stars</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
          <div className="content-wrapper">
            {
              this.props.common.reviewsLoading && (
                <>
                  <Skeleton active={true} />
                  <Skeleton active={true} />
                  <Skeleton active={true} />
                  <Skeleton active={true} />
                  <Skeleton active={true} />
                </>
              )
            }
            {!this.props.common.reviewsLoading && (
              this.props.common.reviewsPagation.list.length > 0 ?
                <>
                  {this.props.common.reviewsPagation.list.map((item: IReview, index: number) => {
                    return (
                      <div className="list" key={index}>
                        <div className="header">
                          <h2>{item.reviewer.first_name} {item.reviewer.last_name}</h2>
                          <div className="rating">
                            <Star rate={Number(item.rating)} size="small" />
                          </div>

                        </div>
                        <p className="content">{item.comments}</p>
                        <div className="time">{item.timeago}</div>
                      </div>)
                  })}
                  < div className="page-box">
                    <Pagination current={this.props.common.reviewsPagation.page + 1} total={total} onChange={this.handlePageChange} />
                  </div>
                </>
                : <div className="no-reviews">
                  <img src={require('@/images/yourphone/no-product.png')} alt="" />
                  <h3>No results match this filter query</h3>
                </div>
            )
            }
          </div>
        </div>
      </div >
    )
  }

  private handleChangeOrder = (value: string) => {
    this.props.common.getReviews({
      page: 0,
      pageSize: 100,
      order: value
    });
  }

  private handleChangeStar = (value: string) => {
    this.props.common.reviewsPagation.rating = value;
    this.props.common.getReviews({
      page: 0,
      pageSize: 100,
      order: 'desc',
      min_rating: value,
      max_rating: value
    });
  }

  // private filterList = () => {
  //   if (this.props.common.reviews) {
  //     this.setState({
  //       list: this.props.common.reviews.reviews.slice(this.state.page * 10, this.state.page * 10 + 10)
  //     })
  //   }
  // }

  private handlePageChange = (page: number) => {
    this.props.common.reviewsPagation.page = page - 1;
    this.props.common.filterReviews();
    window.scrollTo(0, 0)
  }
}