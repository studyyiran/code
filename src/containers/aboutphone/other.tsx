import * as React from 'react';
import { Input, Form, Col } from 'antd';
import LayOut from 'containers/aboutphone/layout';
import classnames from 'classnames';
import { inject, observer } from 'mobx-react';
import { IOtherProps } from './interface/index.interface';
import Breadcrumb from 'containers/aboutphone/components/breadcrumb';
import './other.less';

const storage = ['16GB', '32GB', '64GB', '128GB', 'br', '256GB', '512GB', 'Other']

@inject('yourphone', 'user')
@observer
export default class Other extends React.Component<IOtherProps> {
  public render() {
    return (
      <div className="page-yourphone-other-container">
        <LayOut nextCb={this.gotoNext} disabled={!(this.props.yourphone.tbdInfo.modelName && this.props.yourphone.tbdInfo.storage)}>
          <div className="content-wrapper">
            <Breadcrumb
              brandName={this.props.yourphone.activeBrandsName}
              carrierName={this.props.yourphone.activeCarrierDescription}
            />
            <div className="content">
              <Form layout="vertical">
                <Col span={24}>
                  <Form.Item label="Model" colon={false} className="formitem">
                    <Input className="model-input" onChange={this.handleChangeModelName} value={this.props.yourphone.tbdInfo.modelName} />
                  </Form.Item>
                </Col>
                <Col span={24} className="form-col">
                  <Form.Item label="Storage" colon={false} className="formitem">
                    <div className="storage-list">
                      {
                        storage.map((v: string, index: number) => {
                          if (v === 'br') {
                            return <br />
                          }

                          return (
                            <span key={index} onClick={this.handleStorageClick.bind(this, v)} className={classnames('memory-item', { active: this.props.yourphone.tbdInfo.storage === v })}>{v}</span>
                          )
                        })
                      }
                    </div>
                  </Form.Item>
                </Col>
                <Col>
                  <span onClick={this.handleRecycleCheck} className={classnames('text-with-icon', { checked: this.props.yourphone.tbdInfo.donate })} ><p>Allow UpTrade to recycle my phone if the model is too old to be sold by UpTrade</p></span>
                </Col>
              </Form>
            </div>
            <div className="tips">Thank you for your interest! We will review your request and get back to you shortly.</div>
          </div>
        </LayOut>
      </div>
    )
  }

  private handleStorageClick = (item: string) => {
    this.props.yourphone.tbdInfo.storage = item;
  }

  private handleChangeModelName = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.yourphone.tbdInfo.modelName = e.target.value
  }

  private handleRecycleCheck = () => {
    this.props.yourphone.tbdInfo.donate = !this.props.yourphone.tbdInfo.donate;
  }

  private gotoNext = () => {
    this.props.yourphone.activeProductName = this.props.yourphone.tbdInfo.modelName
    this.props.yourphone.activeModelName = this.props.yourphone.tbdInfo.storage

    try {
      this.props.user.preOrder = {
        ...this.props.user.preOrder,
        productInfo: {
          ...this.props.user.preOrder.productInfo,
          productName: this.props.yourphone.activeProductName,
          modelName: this.props.yourphone.activeModelName
        },
        tbdInfo: this.props.yourphone.tbdInfo
      };
    } catch (error) { console.warn(error, 'in conditions page preOrder') }

    // const path = '/sell/yourphone/condition'
    // if (this.props.user.preOrder.appendOrderDetail) {
    //   path = '/sell/yourphone/done'
    // }

    // this.props.history.push(path);
  }
}