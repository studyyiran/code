import React from "react";
import "./index.less";

interface IPageHeader {
  title: string;
}

export function HeaderTitle({ title }: IPageHeader) {
  return (
    <header className="header-title">
      <h1>{title}</h1>
    </header>
  );
}
