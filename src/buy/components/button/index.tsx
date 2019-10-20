import Loading from "../loading";
import React from "react";

export default function Button(props: {
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => any;
  children: any;
}) {
  const { isLoading, onClick, disabled, children, className } = props;
  return (
    <button
      className={`common-button ${className ? className : ""}`}
      onClick={() => {
        if (!isLoading && onClick) {
          onClick();
        }
      }}
      disabled={disabled || isLoading}
    >
      {children}
      {isLoading ? <Loading /> : null}
    </button>
  );
}
