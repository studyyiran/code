import React, { useContext } from "react";
import { GlobalSettingContext, IGlobalSettingContext } from "../../context";

export function RenderByIsFive(props: {
  renderFive: any;
  ComponentNormal: any;
}) {
  const { renderFive, ComponentNormal } = props;
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue,
  } = globalSettingContext as IGlobalSettingContext;
  const { isBlackHappyHour, blackHappyCountDown } = globalSettingContextValue;
  if (isBlackHappyHour) {
    return renderFive(blackHappyCountDown);
  } else {
    return ComponentNormal;
  }
}
