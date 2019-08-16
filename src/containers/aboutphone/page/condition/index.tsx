import React, { useReducer, useState, useEffect } from "react";
import './index.less';
import { Collapse } from 'antd';
import {IAction} from '@/interface/index.interface'
import {IQuestion, IUserAnswer, IUserQuestionAnswer} from './index.interface'
import {WrapperPanel} from './components/wrapperPanel'
import {isCanMove} from './util'

/*
default 和 active似乎 遵从active
 */

function reducer(state: any, action: IAction) {
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
      // changedArr[findItemIndex] = answer;
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
    case "setUserPhoneInfo": {
      const { questionId, answerId, answer} = value;
      // 1 获取当前的 或者 做一个新的
      // 2 将answer 补充上。
      // 3 返回掉
      // 新建一个新的外层  最坏打算。
      const newQuestionAnswer: IUserQuestionAnswer = {id: questionId, subAnswerArr: []}
      // 获取整合后的（有个全新的。ok的。没有变更老的。老的复制）（有 questionId，就应该用老的，不应该每次都重置。只有初始化应该重置）
      const questionArr: IUserQuestionAnswer[] = changeTargetById(state.userPhoneInfoInput, questionId, newQuestionAnswer)
      // 再取出来（从新生里面拿出来需要操作）
      const targetArr = questionArr.find(item => item.id === questionId)
      // 新建一个正确的、新answer（这个是内部的必然替代项）（那也就意味着，你需要对answer的完整性，负完全责）（其实这边也有初始化的需求。如果完成了初始化，就应该是。。赋值需求。应该准确赋值。）
      const newAnswer : IUserAnswer = {id: answerId, answer: []}
      // 补充替换到target中（强行替换）
      // @ts-ignore
      targetArr.subAnswerArr = changeTargetById((targetArr as IUserQuestionAnswer).subAnswerArr, answerId, newAnswer)
      // 初始化赋值结束后
      // @ts-ignore
      targetArr.subAnswerArr.find(item => item.id === answerId).answer = answer
      // @ts-ignore
      questionArr[questionArr.findIndex(item => item.id === questionId)] = targetArr
      // 将target替换到原来的
      // const finalArr = changeTargetById(questionArr, questionId, targetArr)
      return { ...state, userPhoneInfoInput: questionArr};
    }
    case "setEditKey":
      // state 需要使用type吗？
      return { ...state, editKey: value };
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
    userPhoneInfoInput: phoneInfo,
    userAnswerInput: phoneConditionArr, // 用户输入的。
    editKey: [] // 用户输入的。
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
  return <ConditionForm state={state} dispatch={dispatch} questionArr={questionArr} />;
}


interface IConditionForm {
  dispatch: (action: IAction) => void,
  state: any,
  questionArr: IQuestion[],
}
const firstQuestionKey = "aboutYourPhone"
// 关于手机情况的 写死的 问题
const phoneInfoQuestion : IQuestion = {
  id: firstQuestionKey,
  title: 'About your phone',
  subQuestionArr: [
    {
      id: 'phoneInfoSubQuestion1',
      content: 'Phone Manufacture',
      isMoreCondition: ["true"],
      type: 'list',
    },
    {
      id: 'phoneInfoSubQuestion2',
      content: 'Model',
      isMoreCondition: ["true"],
      type: 'list',
    },
    {
      id: 'phoneInfoSubQuestion3',
      content: 'Storage',
      isMoreCondition: ["true"],
      type: 'list',
    },
    {
      id: 'phoneInfoSubQuestion4',
      content: 'Carrier',
      isMoreCondition: ["true"],
      type: 'list',
    }
  ]
}

export function ConditionForm(props: IConditionForm) {
  const [maxActiveKey, setMaxActiveKey] = useState("")
  const { state, dispatch } = props;
  
  // 这块怎么用语法写
  const userAnswerInput : IUserQuestionAnswer[] = state.userAnswerInput
  const userPhoneInfoInput : IUserQuestionAnswer[] = state.userPhoneInfoInput
  
  const editKey : string[] = state.editKey
  const {
    questionArr = [],
  } = props;
  const questionProcess = [firstQuestionKey].concat(questionArr.map((item) => item.id)).concat(['allFinish'])
  // 初始化设置
  useEffect(() => {
    if (geMaxActiveKey()) {
      setMaxActiveKey(geMaxActiveKey())
    }
  }, [])
  
  function getStatus(questionId: string) : string {
    const targetPos = questionProcess.findIndex(item => item === questionId)
    const currentPos = questionProcess.findIndex(item => item === maxActiveKey)
    if (currentPos === targetPos) {
      return 'doing'
    } else if (currentPos > targetPos) {
      if (editKey.includes(questionId)) {
        return 'edit'
      } else {
        return 'done'
      }
    } else if (currentPos < targetPos) {
      return 'close'
    }
    return ''
  }

  // 获取当前最max的。其实目前来说。要不first。要不last。但是需要考虑要求我缓存的需求。
  function geMaxActiveKey() {
    let current = firstQuestionKey
    questionArr.forEach((question: IQuestion) => {
      const { id: questionId, subQuestionArr } = question;
      if (current === '') {
        current = questionId
      }
      const findAnswer = userAnswerInput.find((answer) => {
        return answer.id === questionId
      })
      if (findAnswer && findAnswer.subAnswerArr && subQuestionArr && subQuestionArr.length) {
        if (findAnswer.subAnswerArr.length === subQuestionArr.length) {
          current = ''
        }
      }
    })
    return current
  }
  
  function onClickPanelHandler(questionId: string, isSave?: boolean) {
    // 如果已经完成 并且当前没有打开的
    if (getStatus(questionId) === 'done' && !(editKey && editKey.length)) {
      dispatch({type: "setEditKey", value: questionId})
    } else if (getStatus(questionId) === 'edit' && isSave) {
      dispatch({type: "setEditKey", value: []})
    }
    
  }
  
  // 每当用户输入变化的时候，重新跑一下。看是否触发next
  useEffect(() => {
    const findCurrent = questionArr.find(({id}) => {
      return id === maxActiveKey
    })
    if (findCurrent && isCanMove(findCurrent, userAnswerInput)) {
      nextStep()
    }
  }, [userAnswerInput])
  console.log(userAnswerInput)
  
  // 将active游标移动。本来想动态化active。不可行。强行维护比较好。因为continue的存在。（这其实和当时遇到的那个进度的问题一样一样）。说明这个问题非常的典型。
  function nextStep() {
    const findCurrent = questionProcess.findIndex((key: string) => key === maxActiveKey)
    if (findCurrent !== -1) {
      if (findCurrent < questionProcess.length - 1) {
        setMaxActiveKey(questionProcess[findCurrent + 1])
      } else {
        setMaxActiveKey('')
      }
    }
  }
  const extraQuestion : number = 1
  return (
      <div>
        <Collapse
          activeKey={[maxActiveKey].concat(editKey)}
        >
          <WrapperPanel
            isContinue={true}
            continueNextStep={nextStep}
            onUserInputHandler={(value: any) => {
              dispatch({type: 'setUserPhoneInfo', value: value})
            }}
            status={getStatus(firstQuestionKey)}
            onClickPanel={onClickPanelHandler}
            index={extraQuestion}
            total={questionArr.length + extraQuestion}
            key={firstQuestionKey}
            questionInfo={phoneInfoQuestion}
            answerInfo={userPhoneInfoInput[0]}
          />
          {questionArr.map((question: IQuestion, index) => {
            const { id } = question;
            // 外面设置 还是里面设置 谁更合理？谁该负责？里面进行参数缺省更加合理。
            // 这两个WrapperPanel是否可以通用？
            const answerInfo = userAnswerInput.find(userAnswer => userAnswer.id === id)
            return (
              <WrapperPanel
                isContinue={ index === 0 }
                continueNextStep={nextStep}
                onUserInputHandler={(value: any) => {
                  dispatch({type: 'setAnswerArr', value: value})
                }}
                status={getStatus(id)}
                onClickPanel={onClickPanelHandler}
                index={index + extraQuestion + 1}
                total={questionArr.length + extraQuestion}
                key={id}
                questionInfo={question}
                answerInfo={answerInfo}
              />
            );
          })}
        </Collapse>
        {maxActiveKey === 'allFinish' ? 'finish' : null}
      </div>
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
//         if (ppn) {
//           ppv = ppn.pricePropertyValues.find(v => v.id === this.props.yourphone.activeConditions[key]) || null;
//         }
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
//       } catch (error) { }
//
//       let path = '/sell/yourphone/shipping'
//       if (this.props.user.preOrder.appendOrderDetail) {
//         path = '/sell/yourphone/done'
//       }
//       // 询价成功，提示用户，有保证金的存在，只存在于PC，因为移动端价格面板在最上面啦
//       if (!this.props.common.isMobile) {
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