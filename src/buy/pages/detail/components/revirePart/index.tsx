import React from "react";
import "./index.less";
import { Carousel, Rate } from "antd";
import { IReviews, IReview } from "../../context/interface";

export function ReviewListPart({
  reviewListInfo
}: {
  reviewListInfo: IReviews;
}) {
  const { reviews } = reviewListInfo;
  if (reviews && reviews.length) {
    return (
      <div className="review-part-list title-with-border">
        <header className="title-with-border">
          {/*<Rate disabled={true} defaultValue={5} allowHalf />*/}
          <h2 className="sub-title-size-main">Customer Reviews</h2>
          <span className="total-rate">
            {reviewListInfo.stats
              ? `${reviewListInfo.stats.average_rating} `
              : ""}
            Rating based on {reviews.length} reviews
          </span>
          <div className="data-from">
            <span>Data From</span>
            <img src={require("images/home/reviews_logo.png")} alt="" />
          </div>
        </header>
        <Carousel className="mb-carousel">
          {reviews
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
