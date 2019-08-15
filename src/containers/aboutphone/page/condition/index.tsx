import React, { useReducer } from "react";
import './index.less';
import { Collapse } from 'antd';
import {IAction} from '@/interface/index.interface'
import {IQuestion, IUserAnswer, IUserQuestionAnswer} from './index.interface'
import {WrapperPanel} from './components/wrapperPanel'

/*
default 和 active似乎 遵从active
 */

function reducer(state: any, action: IAction) {
  console.log(arguments)
  const { type, value } = action;
  function changeTargetById (arr: any[], changedId: string, answer: any) {
    // copy
    const changedArr = arr.slice(0);
    const findItemIndex = arr.findIndex((item: any) => {
      const { id } = item;
      return id === changedId;
    });
    if (findItemIndex === -1) {
      changedArr.push(answer);
    } else {
      changedArr[findItemIndex] = answer;
    }
    return changedArr
  }
  switch (type) {
    case "setAnswerArr": {
      const { questionId, answerId, answer} = value;
      // 1 获取当前的 或者 做一个新的
      // 2 将answer 补充上。
      // 3 返回掉
      // 新建一个新的
      const newQuestionAnswer: IUserQuestionAnswer = {id: questionId, subAnswerArr: []}
      // 获取整合后的
      const questionArr: IUserQuestionAnswer[] = changeTargetById(state.userAnswerInput, questionId, newQuestionAnswer)
      // 再取出来
      const targetArr = questionArr.find(item => item.id === questionId)
      // 新建一个正确的、新answer
      const newAnswer : IUserAnswer = {id: answerId, answer: answer}
      // 补充替换到target中
      // @ts-ignore
      targetArr.subAnswerArr = changeTargetById((targetArr as IUserQuestionAnswer).subAnswerArr, answerId, newAnswer)
      // 将target替换到原来的
      const finalArr = changeTargetById(questionArr, questionId, targetArr)
      return { ...state, userAnswerInput: finalArr};
    }
    case "setCurrentActive":
      return { ...state };
    case "set":
      return { ...state };
  }
}

// for fix sell
export default function () {
  return <Conditions />
}

// 后端接口
interface IConditions {
  phoneInfo?: any,
  phoneConditionArr?: any,
}

export function Conditions(props: IConditions) {
  const {phoneInfo = [], phoneConditionArr = []} = props
  const initState = {
    userAnswerInput: phoneConditionArr // 用户输入的。
  };
  const questionArr = [
    {
      id: "0",
      title: "power",
      subQuestionArr: [
        {
          id: "00",
          content: "Does your phone power on to the home screen?",
          type: 'default',
        }
      ]
    },
    {
      id: "1",
      title: "scratch",
      subQuestionArr: [
        {
          id: "10",
          content: "Are there any scratches ib the phone",
          type: 'default',
        }
      ]
    },
  ]
  const [state, dispatch] = useReducer(reducer, initState);
  return <ConditionForm state={state} dispatch={dispatch} questionArr={questionArr} phoneInfo={phoneInfo} />;
}


interface IConditionForm {
  dispatch: (action: IAction) => void,
  state: any,
  questionArr: IQuestion[],
  phoneInfo: any[],
}

// 关于手机情况的 写死的 问题
const phoneInfoQuestion : IQuestion = {
  id: 'phoneInfoQuestion',
  title: 'About your phone',
  subQuestionArr: [
    {
      id: 'phoneInfoSubQuestion1',
      content: 'Phone Manufacture',
      type: 'list',
    },
    {
      id: 'phoneInfoSubQuestion2',
      content: 'Model',
      type: 'list',
    },
    {
      id: 'phoneInfoSubQuestion3',
      content: 'Storage',
      type: 'list',
    },
    {
      id: 'phoneInfoSubQuestion4',
      content: 'Carrier',
      type: 'list',
    }
  ]
}

export function ConditionForm(props: IConditionForm) {
  const { state, dispatch } = props;
  const userAnswerInput : IUserQuestionAnswer[] = state.userAnswerInput
  const {
    questionArr = [],
    phoneInfo = {}
  } = props;
  const currentQuestion = questionArr.find((question: IQuestion) => {
    const { id: questionId } = question;
    return !userAnswerInput.some((answer) => {
      const {id: answerQuestionId, subAnswerArr} = answer
      const result =  answerQuestionId === (questionId && subAnswerArr.length);
      return result
    });
  });
  const actionKey = []
  if (currentQuestion && currentQuestion.id) {
    actionKey.push(currentQuestion.id)
  }
  console.log(state)
  return (
    <Collapse
      activeKey={actionKey}
    >
      <WrapperPanel
        key={'first'}
        dispatch={dispatch}
        questionInfo={phoneInfoQuestion}
        answerInfo={(phoneInfo as IUserQuestionAnswer)}
      />
      {questionArr.map((question: IQuestion, index) => {
        const { id } = question;
        // 外面设置 还是里面设置 谁更合理？谁该负责？
        const answerInfo = userAnswerInput.find(userAnswer => userAnswer.id === id) || {}
        return (
          <WrapperPanel
            key={id}
            dispatch={dispatch}
            questionInfo={question}
            answerInfo={answerInfo as IUserQuestionAnswer}
          />
        );
      })}
    </Collapse>
  );
}

// import { IConditionProps } from './index.interface';
// import { inject, observer } from 'mobx-react';


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