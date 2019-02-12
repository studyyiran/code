import * as React from 'react';
import './brandheader.less';
import { Input } from 'antd';
export default class BrandHeader extends React.Component {
  public render() {
    const Search = Input.Search;
    return (
      <div className="comp-brand-header-container">
        <div className="left-wrapper">What kind of phone do you have？</div>
        <div className="right-wrapper">
          <Search
            placeholder="Search for..."
            onSearch={this.handleSearch}
            enterButton={true}
          />
        </div>
      </div>
    )
  }

  private handleSearch = (value: string) => {
    console.log(value);
  }
}