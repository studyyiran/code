import * as React from 'react';
import { Form, Select, Pagination } from 'antd'
import Star from '@/components/star';
import './reviews.less';



export default class Reviews extends React.Component {
  public render() {
    return (
      <div className="page-home-reviews-container">
        <div className="global-wrapper">
          <div className="top">
            <h1>UPTRADE REVIEWS</h1>
            <div className="rating-list">
              <Star rate={0.3} />
            </div>
          </div>
          <div className="bottom">
            <div className="text"><span>4.56 Rating</span>  <span>15,103 Reviews</span></div>
            <div className="right">
              <span>Data From</span>
              <img src={require('@/images/home/reviews_logo.png')} alt="" />
            </div>
          </div>
        </div>

        <div className="list-wrapper">
          <div className="filter-box">
            <Form className="form">
              <Form.Item label="Sort by" className="form-item item1">
                <Select>
                  <Select.Option value="111">1111</Select.Option>
                  <Select.Option value="222">222</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Filter" className="form-item item2">
                <Select>
                  <Select.Option value="111">1111</Select.Option>
                  <Select.Option value="222">222</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
          <div className="content-wrapper">
            <div className="list">
              <div className="header">
                <h2>Name</h2>
                <div className="rating">
                  <Star rate={3} size="small" />
                </div>

              </div>
              <p className="content">Very easy to use, quick response, and very thorough details for my car insurance search - much better than some others I looked at before. Came up with some very good rates, and I saved almost £150 against my expiring insurance for my two cars. Very happy!</p>
              <div className="time">Posted 11 minutes ago</div>
            </div>

            <div className="list">
              <div className="header">
                <h2>Name</h2>
                <div className="rating">
                  <Star rate={3} size="small" />
                </div>

              </div>
              <p className="content">Very easy to use, quick response, and very thorough details for my car insurance search - much better than some others I looked at before. Came up with some very good rates, and I saved almost £150 against my expiring insurance for my two cars. Very happy!</p>
              <div className="time">Posted 11 minutes ago</div>
            </div>

            <div className="list">
              <div className="header">
                <h2>Name</h2>
                <div className="rating">
                  <Star rate={3} size="small" />
                </div>

              </div>
              <p className="content">Very easy to use, quick response, and very thorough details for my car insurance search - much better than some others I looked at before. Came up with some very good rates, and I saved almost £150 against my expiring insurance for my two cars. Very happy!</p>
              <div className="time">Posted 11 minutes ago</div>
            </div>

            <div className="list">
              <div className="header">
                <h2>Name</h2>
                <div className="rating">
                  <Star rate={3} size="small" />
                </div>

              </div>
              <p className="content">Very easy to use, quick response, and very thorough details for my car insurance search - much better than some others I looked at before. Came up with some very good rates, and I saved almost £150 against my expiring insurance for my two cars. Very happy!</p>
              <div className="time">Posted 11 minutes ago</div>
            </div>
            <div className="page-box">
              <Pagination defaultCurrent={6} total={500} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}