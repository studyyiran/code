import React from "react";
import "./index.less";
import { Carousel, Rate } from "antd";
import { IReview } from "../../context/interface";

export function ReviewListPart({ reviewList }: { reviewList: IReview[] }) {
  if (reviewList && reviewList.length) {
    return (
      <div className="review-part-list">
        <header>
          <h2 className="sub-title-size">Customer Reviews</h2>
          <div className="total-rate">
            <Rate disabled={true} defaultValue={5} allowHalf />
            <span>Based on {reviewList.length} reviews</span>
          </div>
        </header>
        <Carousel className="mb-carousel">
          {reviewList
            .sort((a, b) => Number(b.rating) - Number(a.rating))
            .slice(0, 3)
            .map(item => {
              return <ReviewPart item={item} key={item.store_review_id} />;
            })}
        </Carousel>
      </div>
    );
  } else {
    return null;
  }
}

function ReviewPart({ item }: { item: IReview }) {
  return (
    <div className="review-part-info">
      <Rate
        value={Math.ceil(Number(item.rating))}
        disabled={true}
        defaultValue={Math.ceil(Number(item.rating))}
      />
      <h2>
        {item.reviewer.first_name} {item.reviewer.last_name}
      </h2>
      <p>{item.comments}</p>
      <span>{item.timeago}</span>
    </div>
  );
}
