import React from "react";
import RouterLink from "../routerLink";
export default function FooterComponent(props: any) {
  const { arr, onClickHandler } = props;
  return arr.map(({ subTitle, href, Component, isBuy }: any, index: number) => {
    return (
      <li
        key={index}
        onClick={() => {
          onClickHandler && onClickHandler();
        }}
      >
        {Component ? (
          <Component />
        ) : (
          <RouterLink isBuy={isBuy} to={href} onClick={() => {}}>
            {subTitle}
          </RouterLink>
        )}
      </li>
    );
  });
}
