import React from "react";
import "./index.less";
import Loading from "../../../../components/loading";

export default function ButtonGroup(props: any) {
  const {
    handleNext,
    handleBack,
    disabled,
    children,
    backContent,
    isLoading
  } = props;
  return (
    <div className="buttons-container button-group">
      <button
        className="common-button second"
        onClick={() => {
          if (handleBack) {
            handleBack();
          } else {
            props.history.goBack();
          }
        }}
      >
        {backContent ? backContent : `< Back to store`}
      </button>
      <button
        className="common-button"
        onClick={() => {
          if (!isLoading) {
            handleNext();
          }
        }}
        disabled={disabled || isLoading}
      >
        {children ? children : "Continue to shipping"}
        {isLoading ? <Loading /> : null}
      </button>
    </div>
  );
}
