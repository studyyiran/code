// tslint:disable
import React, { useReducer } from "react";
// import { IConditionProps } from './index.interface';
import './index.less';
// import { inject, observer } from 'mobx-react';
import { Collapse, Button } from 'antd';
const {Panel} = Collapse

// import Layout from '@/containers/aboutphone/layout';
// import ConditionItem from '@/containers/aboutphone/components/conditionitem';

// import { IConditionsProps, ISubSkuPricePropertyValues } from './interface/index.interface';
// import { message } from 'antd';
// import { IProductInfo } from '@/store/interface/user.interface';
// import { conditionPageValidate, noteUserModal } from '@/containers/aboutphone/pageValidate';
// import Breadcrumb from '@/containers/aboutphone/components/breadcrumb';
// import ProgressBar from '@/containers/aboutphone/components/progressbar--mobile';
// import classnames from 'classnames';

// const TBDPPNS = [
//   { "id": 316, "name": "Can your phone power on to the Home screen?", "isSkuProperty": false, "pricePropertyValues": [{ "id": 2026, "propertyName": 316, "value": "Turns on", "isPreferred": true, "isSkuProperty": false }, { "id": 2027, "propertyName": 316, "value": "Doesn't turn on", "isPreferred": false, "isSkuProperty": false }], "illustrationContent": null },
//   { "id": 345, "name": "Is your phone 100% functional?", "isSkuProperty": false, "pricePropertyValues": [{ "id": 2104, "propertyName": 345, "value": "Fully functional", "isPreferred": true, "isSkuProperty": false }, { "id": 2105, "propertyName": 345, "value": "Have functional problems", "isPreferred": false, "isSkuProperty": false }], "illustrationContent": null },
//   { "id": 351, "name": "Is your display cracked?", "isSkuProperty": false, "pricePropertyValues": [{ "id": 2118, "propertyName": 351, "value": "No Cracks", "isPreferred": true, "isSkuProperty": false }, { "id": 2122, "propertyName": 351, "value": "Cracked", "isPreferred": false, "isSkuProperty": false }], "illustrationContent": null }
// ]

function SaveButton(props: any) {
  return <Button onClick={props.onClick}>Save</Button>;
}

interface IMyPanel {
  dispatch: any,
  questionInfo: {
    id: string,
    question: string,
  },
  answerInfo: {
    answer: string
  },
}

function MyPanel(props: IMyPanel) {
  const { dispatch, questionInfo, answerInfo } = props;
  const { id, question } = questionInfo;
  const { answer } = answerInfo;
  return (
    <Panel
      {...props}
      showArrow={false}
      header={
        <div>
          {/*<img src={require("")} />*/}
          <span>123</span>
        </div>
      }
      key={id}
      extra={<span>Step 4 of 7</span>}
    >
      <p>{question}</p>
      <p>{answer}</p>
      <SaveButton
        onClick={() => {
          dispatch("setAnswerArr", {
            questionId: id,
            answer: "123123"
          });
        }}
      />
    </Panel>
  );
}

/*
default 和 active似乎 遵从active
 */

interface IAction {
  type: string,
  value: any
}

function reducer(action: IAction, state: any) {
  const { type, value } = action;
  switch (type) {
    case "setAnswerArr": {
      const { questionId, answer } = value;
      const answerArr = state.answerArr.slice(0);
      const answerIndex = answerArr.findIndex((answerItem: any) => {
        const { id } = answerItem;
        return id === questionId;
      });
      const newAnswer = {
        id: questionId,
        answer
      };
      if (answerIndex === -1) {
        answerArr.push(newAnswer);
      } else {
        answerArr[answerIndex] = newAnswer;
      }
      return { ...state, answerArr };
    }
    case "setCurrentActive":
      return { ...state };
    case "set":
      return { ...state };
  }
}

export function Conditions() {
  const initState = {
    answerArr: [] // 用户输入的。
  };
  const questionArr = [
    {
      id: "1",
      question: "111"
    },
    {
      id: "2",
      question: "222"
    }
  ]
  const [state, dispatch] = useReducer(reducer, initState);
  return <ConditionForm state={state} dispatch={dispatch} questionArr={questionArr} phoneConditionArr={[]}/>;
}

interface IQuestion {
  id: string,
  question: string
}

interface IAnswer {
  id: string,
  answer: string
}

interface IConditionForm {
  dispatch: any,
  state: any,
  questionArr: IQuestion[],
  phoneConditionArr: IAnswer[]
}

export function ConditionForm(props: IConditionForm) {
  const { state, dispatch } = props;
  const { answerArr = [] } = state;
  const {
    questionArr = [],
    phoneConditionArr = []
  } = props;
  const activeQuestion = questionArr.find((question: IQuestion) => {
    const { id } = question;
    return answerArr.every((answer: IAnswer) => {
      return answer.id !== id;
    });
  });
  console.log(activeQuestion);
  return (
    <Collapse
      activeKey={activeQuestion && activeQuestion.id}
      onChange={e => {
        console.log(e);
      }}
    >
      {questionArr.map((question, index) => {
        const { id } = question;
        return (
          <MyPanel
            key={id}
            dispatch={dispatch}
            questionInfo={question}
            answerInfo={phoneConditionArr[question.id] || {}}
          />
        );
      })}
    </Collapse>
  );
}


// @inject('yourphone')
// @observer
// export default class Index extends React.Component<IConditionProps> {
//   public render() {
//     return <Collapse>
//      
//       <Panel header="This is panel header 2" key="2">
//         <p>{2}</p>
//       </Panel>
//       <Panel header="This is panel header 3" key="3">
//         <p>{3}</p>
//       </Panel>
//     </Collapse>
//     return <div className="page-condition">
//       <div className="comp-process"></div>
//       <h1 className="condition">Phone condition details</h1>
//       <Collapse>
//         <Panel>
//           <span className="icon"></span>
//           <span className="title"></span>
//           <span className="click">Edit Step null</span>
//         </Panel>
//         <div className="question" onChangeHendler={true}>
//           <select>
//            
//           </select>
//         </div>
//       </Collapse>
//     </div>
//   }
// }

// @inject('yourphone', 'user', 'common')
// @observer
// export default class Index extends React.Component<IConditionsProps> {
//   public state = {
//     progress: 3,
//     disabled: true
//   }
//   public async componentDidMount() {
//     // 显示左侧价格模块
//     this.props.user.isShowLeftPrice = true;
//     if (!conditionPageValidate()) {
//       this.props.history.push('/sell/yourphone/brand');
//       return;
//     }
//     // tbd 赛默认选项
//     if (this.props.yourphone.isTBD) {
//       this.props.yourphone.productPPVNS = TBDPPNS;
//     } else {
//       // 非 tbd 调用正常的询价项
//       await this.props.yourphone.getProductPPVN();
//     }
//
//     // 初次进入页面判断是否要高亮
//     if (this.props.yourphone.isAllConditionSelected) {
//       this.setState({
//         progress: 4,
//         // disabled: false
//       })
//     }
//
//     // done页面，允许父组件调用里面的方法
//     if (typeof this.props.onRef === 'function') {
//       this.props.onRef!(this);
//     }
//   }
//
//   public validateData = (): Promise<boolean> => {
//     return new Promise(async (resolve) => {
//       const yourphone = this.props.yourphone
//
//       if (!yourphone.isAllConditionSelected) {
//         message.info('Please make sure you have chosen all of items.');
//         resolve(false);
//       }
//
//       const isInquiryKeyCreated = await this.props.yourphone.createInquiry();
//       resolve(isInquiryKeyCreated);
//     });
//   }
//
//   public render() {
//     const conditionList: React.ReactNode = (
//       this.props.yourphone.productPPVNS.map((ppvn, index) => (
//         <ConditionItem
//           key={index}
//           {...ppvn}
//           activeConditions={this.props.yourphone.activeConditions}
//           onConditionItemClick={this.onConditionItemClick}
//         />
//       ))
//     );
//
//     return (
//       <div className={classnames('page-conditions-container', { 'notlayout': this.props.hideLayout })}>
//         {
//           !this.props.hideLayout
//             ? (
//               <Layout nextCb={this.handleNext} progress={this.state.progress} disabled={!this.props.yourphone.isAllConditionSelected}>
//                 <>
//                   {
//                     this.props.common.isMobile && <ProgressBar />
//                   }
//                   <Breadcrumb
//                     brandName={this.props.yourphone.activeBrandsName}
//                     carrierName={this.props.yourphone.activeCarrierDescription}
//                     modelName={`${this.props.yourphone.activeProductName} ${this.props.yourphone.activeModelName}`}
//                   />
//                   {conditionList}
//                 </>
//               </Layout>
//             )
//             : (conditionList)
//         }
//       </div>
//     )
//   }
//
//   private onConditionItemClick = (conditionId: number, ppvnValueId: number) => {
//     this.props.yourphone.activeConditions = { ...this.props.yourphone.activeConditions, [conditionId]: ppvnValueId };
//     if (this.props.yourphone.isAllConditionSelected) {
//       this.setState({
//         progress: 4,
//         // disabled: false
//       })
//     }
//   }
//
//   private handleNext = async () => {
//     if (this.props.yourphone.isTBD) {
//       this.props.yourphone.tbdInfo.properties = [];
//       Object.keys(this.props.yourphone.activeConditions).forEach((key: string) => {
//         const ppn = TBDPPNS.find(v => v.id.toString() === key);
//         let ppv: ISubSkuPricePropertyValues | null = null;
//         console.log(ppn)
//         if (ppn) {
//           ppv = ppn.pricePropertyValues.find(v => v.id === this.props.yourphone.activeConditions[key]) || null;
//         }
//         console.log(ppv)
//         if (ppv) {
//           this.props.yourphone.tbdInfo.properties.push(ppv.value);
//         }
//       })
//       this.props.history.push('/sell/yourphone/shipping');
//       return;
//     }
//     const isInquiryKeyCreated = await this.validateData();
//
//     if (isInquiryKeyCreated) {
//       try {
//         const productInfo: Partial<IProductInfo> = {
//           ...this.props.user.preOrder.productInfo,
//           priceUnits: [...Object.values(this.props.yourphone.activeConditions), this.props.yourphone.activeModelId],
//         }
//         this.props.user.preOrder = {
//           ...this.props.user.preOrder,
//           inquiryKey: this.props.yourphone.inquiryKey,
//           productInfo
//         };
//       } catch (error) { console.warn(error, 'in conditions page preOrder') }
//
//       let path = '/sell/yourphone/shipping'
//       if (this.props.user.preOrder.appendOrderDetail) {
//         path = '/sell/yourphone/done'
//       }
//       // 询价成功，提示用户，有保证金的存在，只存在于PC，因为移动端价格面板在最上面啦
//       if (!this.props.common.isMobile) {
//         console.log(this.props.yourphone.inquiryDetail)
//         noteUserModal({
//           title: 'Your UpTrade Offer',
//           content: (<>Your {this.props.yourphone.inquiryDetail!.product.name} Guaranteed Price is ${this.props.yourphone.inquiryDetail!.priceDollar} <br /> <br />This window will be closed after 15 seconds.</>),
//           type: 'success',
//           seconds: 15,
//           update: (seconds) => (<>Your {this.props.yourphone.inquiryDetail!.product.name} Guaranteed Price is ${this.props.yourphone.inquiryDetail!.priceDollar} <br /> <br />This window will be closed after {seconds} seconds.</>),
//           customerOk: () => this.props.history.push(path)
//         });
//       } else {
//         this.props.history.push(path);
//       }
//
//     }
//   }
// }