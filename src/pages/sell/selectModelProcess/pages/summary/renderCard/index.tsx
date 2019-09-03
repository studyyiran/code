import React from "react";

export default function RenderCard(props: any) {
  const { title, children, onEdit } = props;
  return (
    <div className="comp-info-card">
      <header>
        <h3>{title}</h3>
        {onEdit ? <span onClick={onEdit}>Edit</span> : null}
      </header>
      <div>{children}</div>
    </div>
  );
}