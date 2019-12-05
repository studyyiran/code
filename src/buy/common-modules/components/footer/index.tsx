import React from "react";
import RouterLink from "../routerLink";
export default function FooterComponent(props: any) {
  const {arr, onClickHandler} = props
  return arr.map(({ subTitle, href, Component, isBuy }: any) => {
      return (
        <li
          key={subTitle}
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
    })
}