import React from "react";
import "./index.less";
import { Rate } from "antd";
import { IReview } from "../../context/interface";

export function ReviewListPart({ reviewList }: { reviewList: IReview[] }) {
  if (reviewList && reviewList.length) {
    return (
      <div className="review-part-list">
        <header>
          <h2 className="sub-title">Customer Reviews</h2>
          <div>
            <Rate disabled={true} defaultValue={5} allowHalf />
            <span>Baesd on {reviewList.length} reviews</span>
          </div>
        </header>
        {reviewList
          .sort((a, b) => Number(b.rating) - Number(a.rating))
          .slice(0, 3)
          .map(item => {
            return <ReviewPart item={item} key={item.store_review_id} />;
          })}
      </div>
    );
  } else {
    return null;
  }
}

function ReviewPart({ item }: { item: IReview }) {
  return (
    <div className="review-part-info">
      <div className="header">
        <h2>
          {item.reviewer.first_name} {item.reviewer.last_name}
        </h2>
        <div className="rating">
          <Rate
            value={Math.ceil(Number(item.rating))}
            disabled={true}
            defaultValue={Math.ceil(Number(item.rating))}
          />
        </div>
      </div>
      <p className="content">{item.comments}</p>
      <div className="time">{item.timeago}</div>
    </div>
  );
}
