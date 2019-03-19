import * as React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react'
import { Button } from 'antd'
import Star from '@/components/star';
import './reviews.less';

export default observer(() => {
  return (
    <div className="comp-home-index-reviews-container">
      <h2>What Our Customers Say</h2>
      <div className="rating-list">
        <Star rate={5} />
      </div>
      <div className="reviews">
        <span>4.56 Rating</span>  <span>15,103 Reviews</span>
      </div>

      <div className="reviews-list">
        <div className="list">
          <div className="top">
            <div className="reviews-rating-list">
              <Star size="small" gray={true} rate={1.5} />
            </div>
            <div className="time">Posted 11 minutes ago</div>
          </div>
          <p className="content">Great price，higher than my expectation！Great price，higher than my expectation！Great price，higher than my expectation！</p>
          <div className="reviewer">Snodgress Jason</div>
        </div>

        <div className="list">
          <div className="top">
            <div className="reviews-rating-list">
              <Star size="small" gray={true} rate={3.2} />
            </div>
            <div className="time">Posted 11 minutes ago</div>
          </div>
          <p className="content">Great price，higher than Great price，higher than Great price，higher than Great price，higher than my expectation！Great price，higher than my expectation！Great price，higher than my expectation！</p>
          <div className="reviewer">Snodgress Jason</div>
        </div>

        <div className="list">
          <div className="top">
            <div className="reviews-rating-list">
              <Star size="small" gray={true} rate={3.5} />
            </div>
            <div className="time">Posted 11 minutes ago</div>
          </div>
          <p className="content">Great price，higher than my expectation！Great price，higher than my expectation！Great price，higher than my expectation！</p>
          <div className="reviewer">Snodgress Jason</div>
        </div>


      </div>

      <Link to="/reviews"><Button type="primary" ghost={true} size="large" className="view-more">VIEW MORE</Button></Link>
    </div>
  )
})