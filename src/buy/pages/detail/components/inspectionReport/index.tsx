import EditorResolver from "../editorResolver";
import React from "react";
import { IBackgroundCheckList } from "../../context/staticData";
import "./index.less";
import { RenderByCondition } from "../../../../components/RenderByCondition";
import { Carousel } from "antd";
import { IProductDetail } from "../../context/interface";
export function InspectionReport(props: {
  productDescription: any;
  buyProductHistoryPdf?: any;
  backGroundCheck: any;
  buyProductRemark: any;
  userInfo?: any;
}) {
  const {
    productDescription,
    buyProductRemark,
    buyProductHistoryPdf,
    backGroundCheck,
    userInfo
  } = props;
  return (
    <div className="inspection-report">
      <h2 className="sub-title-size-main">Inspection Report</h2>
      <InspectPersonInfo
        buyProductRemark={buyProductRemark}
        userInfo={userInfo}
      />
      <div className="item-list">
        <WithTitle title={"Fully Functional"}>
          <FullyFunctionalPart backGroundCheck={backGroundCheck} />
        </WithTitle>
        <WithTitle title={"Phone History"}>
          <PhoneBackgroundHistory />
        </WithTitle>
        {productDescription ? (
          <WithTitle title={"Phone Details"}>
            <EditorResolver editorContent={productDescription} />
          </WithTitle>
        ) : null}
      </div>
    </div>
  );
}

function WithTitle({ title, children }: { title: string; children: any }) {
  return (
    <section>
      <h2 className="sub-title-size">{title}</h2>
      {children}
    </section>
  );
}

function InspectPersonInfo({
  buyProductRemark,
  userInfo
}: {
  buyProductRemark: any;
  userInfo: IProductDetail["userInfo"];
}) {
  return (
    <div className="Inspect-person-info">
      <div className="first">
        <img src={userInfo.userImg || require("./res/defaulthead.png")} />
        <div className="name-part">
          <h3 className="title-style">Inspected by</h3>
          <span>{userInfo.userName}</span>
        </div>
      </div>
      {buyProductRemark ? (
        <div className="second">
          <h3 className="title-style">Inspection Notes</h3>
          <p>{buyProductRemark}</p>
        </div>
      ) : null}
    </div>
  );
}

// function renderReport() {
//   return (
//     <ul className="report">
//       <li>
//         <header>
//           <img src={require("./res/test.svg")} />
//           <h3>Functional Test</h3>
//         </header>
//         <div>
//           <ul>
//             <li className="fixtag">
//               All Pass <TipsIcon>{TipsAllPass}</TipsIcon>
//             </li>
//             <li>
//               <a
//                 target="_blank"
//                 className="report-link"
//                 href={buyProductHistoryPdf}
//               >
//                 View full phone history report
//               </a>
//             </li>
//           </ul>
//         </div>
//       </li>
//     </ul>
//   );
// }

function PhoneBackgroundHistory(): any {
  const staticArr = [
    {
      title: "Lost & Stolen - ",
      content: "Clear"
    },
    {
      title: "Fully Reset - ",
      content: "Clear"
    },
    {
      title: "Fully Sanitized - ",
      content: "Clear"
    },
    {
      title: "No Spamware - ",
      content: "Clear"
    },
    {
      title: "Blacklisted - ",
      content: "Clear"
    },

    {
      title: "Financed - ",
      content: "Clear"
    }
  ];
  const arr = splitByColumn(staticArr, 3);
  return (
    <div className="phone-background-history">
      {arr.map((item, index) => {
        return (
          <ul key={index}>
            {item.map(({ content, title }: any) => {
              if (content) {
                return (
                  <li key={title}>
                    <img src={require("./res/correct.png")} />
                    <label>{title}</label>
                    <span>{content}</span>
                  </li>
                );
              } else {
                return null;
              }
            })}
          </ul>
        );
      })}
    </div>
  );
}

function splitByColumn(list: any[], column: number) {
  // 计算大小.
  let start = 0;
  let end = 0;
  let arr = [] as any[];
  while (column > 0) {
    end = start + Math.ceil((list.length - start) / column);
    arr.push(list.slice(start, end));
    start = end;
    column--;
  }
  return arr;
}

function FullyFunctionalPart({
  backGroundCheck
}: {
  backGroundCheck: IBackgroundCheckList[];
}) {
  const arr = splitByColumn(
    backGroundCheck.filter(({ title, content }) => {
      return title && content !== "";
    }),
    3
  );

  return (
    <div className="fully-functional-part">
      <RenderByCondition
        ComponentPc={arr.map((backGroundItemList, index) => {
          return (
            <ul key={index}>
              {backGroundItemList.map(({ content, title, img }: any) => {
                return (
                  <li className="bg-check" key={title}>
                    {img ? <img src={require(`./res/${img}`)} /> : null}
                    <label>{title}</label>
                    {content ? <span>{content}</span> : null}
                  </li>
                );
              })}
            </ul>
          );
        })}
        ComponentMb={
          <Carousel className="mb-carousel">
            {arr.map((backGroundItemList, index) => {
              return (
                <ul key={index}>
                  {backGroundItemList.map(({ content, title, img }: any) => {
                    return (
                      <li className="bg-check" key={title}>
                        {img ? <img src={require(`./res/${img}`)} /> : null}
                        <label>{title}</label>
                        {content ? <span>{content}</span> : null}
                      </li>
                    );
                  })}
                </ul>
              );
            })}
          </Carousel>
        }
      />
    </div>
  );
}
