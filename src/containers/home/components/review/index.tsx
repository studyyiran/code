import * as React from 'react';
import { observer } from 'mobx-react'
import Star from '@/components/star';
import { IReview } from './index.interface';
import './index.less';
{/*<article className="comp-review-card">*/}
{/*  <div className="review-card__rate">1 2 3</div>*/}
{/*  <p>"is good"</p>*/}
{/*  <div className="review-card__footer">*/}
{/*    <span>sun yiran</span>*/}
{/*    <span>icon</span>*/}
{/*  </div>*/}
{/*</article>*/}
export default observer((props: IReview) => {
  return <div className="comp-review-card">
    <div className="top">
      <div className="reviews-rating-list">
        <Star size="small" gray={true} rate={Number(props.rating)} />
      </div>
    </div>
    <p className="content">{props.comments}</p>
    <div className="review-card__footer">
      <span>{props.reviewer.first_name} {props.reviewer.last_name}</span>
      <span>icon</span>
    </div>
  </div>
})