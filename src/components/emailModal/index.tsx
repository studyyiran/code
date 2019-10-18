import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Icon, Form, Input, Modal, Button } from 'antd'
import commonStore from 'store/common';
import { FormComponentProps } from 'antd/lib/form';
import { ICommonStore } from 'store/interface/common.interface'


class FormItem extends React.Component<{ common: ICommonStore, onCancel: () => void } & FormComponentProps> {
  public state = {
    loading: false
  }
  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
        title={<span><Icon type="close-circle" theme="filled" style={{ fontSize: 20, color: '#FC2249', marginRight: 10, position: 'relative', top: 2 }} />We're sorry about our technical difficulties!</span>}
        visible={this.props.common.showEmailModal}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        footer={
          <>
            <Button key="close" onClick={this.handleCancel} style={{ border: '2px solid #00CFFF', color: '#00CFFF' }}>Close</Button>
            <Button key="submit" type="primary" loading={this.state.loading} onClick={this.handleOk}>Submit</Button>
          </>
        }
      >
        <p>Please leave your email and a customer representative will reach out to you within one business day.</p>
        <br />
        <Form>
          <Form.Item>
            {getFieldDecorator('userEmail', {
              rules: [{
                required: true,
                message: 'Please enter a valid email address',
                pattern: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/
              }],
              validateTrigger: 'onBlur'
            })(
              <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Enter your email" />
            )}
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  private handleOk = () => {
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({
          loading: true
        })
        const result = await this.props.common.collectException(values.userEmail);
        this.setState({
          loading: false
        })
        if (result) {
          this.handleCancel();
        }
      }
    });
  }

  private handleCancel = () => {
    this.props.onCancel();
  }
}


const EmailModal = Form.create<{ common: ICommonStore, onCancel: () => void } & FormComponentProps>()(FormItem)



export default () => {
  commonStore.showEmailModal = true;

  // 插入toast提示的容器至body
  const div = document.createElement('div');
  document.body.appendChild(div);

  const onCancel = () => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(div);

      if (div.parentNode) {
        div.parentNode.removeChild(div);
      }
    })
  }

  // toast
  const node = (
    <EmailModal common={commonStore} onCancel={onCancel} />
  );


  // 渲染toast
  ReactDOM.render(node, div);
}


