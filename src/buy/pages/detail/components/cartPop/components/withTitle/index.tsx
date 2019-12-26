import React from "react";

export function WithTitle(props: { title: string; children: any }) {
  const { title, children } = props;
  return (
    <div className="with-title-container">
      <h2>{title}</h2>
      {children}
    </div>
  );
}