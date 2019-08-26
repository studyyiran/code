import * as React from "react";
import { observer } from "mobx-react";
import Star from "@/components/star";
import { IReview } from "./index.interface";
import "./index.less";
const ReviewItem = (props: IReview) => {
  return (
    <div className="comp-review-card">
      <header>
        <Star size="small" gray={true} rate={Number(props.rating)} />
        <span className="date">{props.reviewer.last_name}</span>
      </header>
      <p>{props.comments}</p>
      <div className="mb-ele">
        <Star size="small" gray={true} rate={Number(props.rating)} />
      </div>
      <footer className="review-card__footer">
        <span>{props.reviewer.first_name}</span>
      </footer>
    </div>
  );
};
export default ReviewItem;
