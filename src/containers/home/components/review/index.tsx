import * as React from "react";
import { observer } from "mobx-react";
import Star from "components/star";
import { IReview } from "./index.interface";
import "./index.less";
import { Rate } from "antd";
const ReviewItem = (props: IReview) => {
  return (
    <div className="comp-review-card">
      <header>
        <Rate disabled={true} defaultValue={Number(props.rating)} />
        <span className="date">{props.timeago}</span>
      </header>
      <p>{props.comments}</p>
      <div className="mb-ele">
        <Rate disabled={true} defaultValue={Number(props.rating)} />
      </div>
      <footer className="review-card__footer">
        <span>{props.reviewer.first_name} {props.reviewer.last_name}</span>
      </footer>
    </div>
  );
};
export default ReviewItem;
