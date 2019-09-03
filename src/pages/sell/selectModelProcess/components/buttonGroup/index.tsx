import React from "react";

export default function ButtonGroup(props: any) {
  const { handleNext, disabled } = props;
  return (
    <div className="buttons-container">
      <button
        className="common-button second"
        onClick={() => {
          props.history.goBack();
        }}
      >
        {`< Go back`}
      </button>
      <button
        className="common-button"
        onClick={handleNext}
        disabled={disabled}
      >
        Next
      </button>
    </div>
  );
}
