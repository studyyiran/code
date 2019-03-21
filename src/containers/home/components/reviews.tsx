import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react'
import { Button } from 'antd'
import Star from '@/components/star';
import { ICommonProps, IReview } from '@/store/interface/common.interface';
import './reviews.less';

export default observer((props: ICommonProps) => {
  const reviews = props.common.reviews;
  if (!reviews) {
    return null;
  }
  return (
    <div className="comp-home-index-reviews-container">
      <h2>What Our Customers Say</h2>
      <div className="rating-list">
        <Star rate={Number(reviews.stats.average_rating)} />
      </div>
      <div className="reviews">
        <span>{reviews.stats.average_rating} Rating</span>  <span>{reviews.stats.total_reviews.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')} Reviews</span>
      </div>

      <div className="reviews-list">
        <div className="reviews-list-scroll-box">
          <div className="block" />
          {
            reviews.reviews.slice(0, 3).map((item: IReview, index: number) => {
              return (
                <div className="list" key={index}>
                  <div className="top">
                    <div className="reviews-rating-list">
                      <Star size="small" gray={true} rate={Number(item.rating)} />
                    </div>
                    <div className="time">{item.timeago}</div>
                  </div>
                  <p className="content">{item.comments}</p>
                  <div className="reviewer">{item.reviewer.first_name} {item.reviewer.last_name}</div>
                </div>
              )
            })
          }
          <div className="block" />
        </div>
      </div>

      <Link to="/reviews"><Button type="primary" ghost={true} size="large" className="view-more">VIEW MORE</Button></Link>
    </div>
  )
})