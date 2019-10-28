import * as React from "react";
import { observer } from "mobx-react";
import Footer from "./components/footer/footer";
@observer
export default class HeaderHoc extends React.Component {
  public render() {
    return (
        <Footer />
    );
  }
}
