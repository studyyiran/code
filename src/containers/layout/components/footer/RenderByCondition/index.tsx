import {inject, observer} from "mobx-react";
import React from "react";
import {
  IHomeProps,
  IHomeState
} from "@/containers/home/interface/index.interface";

interface IRenderByCondition {
  isMobile?: boolean;
  ComponentMb: any;
  ComponentPc: any;
}

@inject("common")
@observer
export class RenderByCondition extends React.Component<any> {
  public render() {
    const { common, ComponentMb, ComponentPc } = this.props;
    if (common) {
      const { isMobile } = common;
      if (isMobile) {
        return ComponentMb;
      } else {
        return ComponentPc;
      }
    } else {
      return <div>no common waiting</div>;
    }
  }
}