// import * as React from 'react';
// import { Link } from 'react-router-dom';
// import { observer } from 'mobx-react'
// import { Button } from 'antd'
// import Star from '@/components/star';
// import { ICommonProps } from '@/store/interface/common.interface';
// import './review/index.less';
//
// export default observer((props: ICommonProps) => {
//   const reviews = props.common.reviews;
//   if (!reviews) {
//     return null;
//   }
//   return <div className="list">
//     <div className="top">
//       <div className="reviews-rating-list">
//         <Star size="small" gray={true} rate={Number(props.rating)} />
//       </div>
//       <div className="time">{props.timeago}</div>
//     </div>
//     <p className="content">{props.comments}</p>
//     <div className="reviewer">{props.reviewer.first_name} {props.reviewer.last_name}</div>
//   </div>
//   return (
//     <div className="comp-home-index-reviews-container">
//       <h2>What Our Customers Say</h2>
//       <div className="rating-list">
//         <Star rate={Number(reviews.stats.average_rating)} />
//       </div>
//       <div className="reviews">
//         <span>{reviews.stats.average_rating} Rating</span>
//       </div>
//
//       <div className="reviews-list">
//         <div className="reviews-list-scroll-box">
//           <div className="block" />
//           {
//            
//           }
//           <div className="block" />
//         </div>
//       </div>
//
//       <Link to="/reviews"><Button type="primary" ghost={true} size="large" className="view-more">VIEW MORE</Button></Link>
//     </div>
//   )
// })