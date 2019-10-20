import React, { useContext } from "react";
import { GlobalSettingContext, IGlobalSettingContext } from "../../context";

interface IRenderByCondition {
  ComponentMb: any;
  ComponentPc: any;
}
export function RenderByCondition(props: IRenderByCondition) {
  const globalSettingContext = useContext(GlobalSettingContext);
  const {
    globalSettingContextValue
  } = globalSettingContext as IGlobalSettingContext;
  const { isMobile } = globalSettingContextValue;
  const { ComponentMb, ComponentPc } = props;
  if (isMobile) {
    return ComponentMb;
  } else {
    return ComponentPc;
  }
}
