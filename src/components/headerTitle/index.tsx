import React from "react";
import "./index.less";

interface IPageHeader {
  title: string;
}

export function HeaderTitle({ title }: IPageHeader) {
  return (
    <header className="page-header">
      <h1>{title}</h1>
    </header>
  );
}
