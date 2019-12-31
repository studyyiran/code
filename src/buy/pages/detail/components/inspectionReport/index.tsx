import EditorResolver from "../editorResolver";
import React from "react";
import Svg from "../../../../components/svg";

export function InspectionReport(props: {
  productDescription: any;
  buyProductHistoryPdf?: any;
  backGroundCheck: any;
  buyProductRemark: any;
}) {
  const {
    productDescription,
    buyProductRemark,
    buyProductHistoryPdf,
    backGroundCheck
  } = props;
  return (
    <div className="inspection-report">
      <h2>Inspection Report</h2>
      <InspectPersonInfo buyProductRemark={buyProductRemark} />
      <ul>
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
      </ul>
    </div>
  );
}

function WithTitle({ title, children }: { title: string; children: any }) {
  return (
    <li>
      <h2>{title}</h2>
      {children}
    </li>
  );
}

function InspectPersonInfo({ buyProductRemark }: { buyProductRemark: any }) {
  return (
    <div>
      <div>
        <img src={require("./res/inspection-notes.svg")} />
        <div>
          <h3 className="title-style">Inspected by</h3>
          <span>Hamza Shaikh</span>
        </div>
      </div>
      {buyProductRemark ? (
        <div>
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

function PhoneBackgroundHistory() {
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
  return (
    <ul>
      {staticArr.map(({ content, title }, index) => {
        if (content) {
          return (
            <li className="bg-check" key={index}>
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
}

function FullyFunctionalPart({ backGroundCheck }: { backGroundCheck: any[] }) {
  return (
    <li>
      <header>
        <img src={require("./res/background-check.svg")} />
        <h3>Background Check</h3>
      </header>
      <div>
        <ul>
          {backGroundCheck.map(({ content, title }, index) => {
            if (content) {
              return (
                <li className="bg-check" key={index}>
                  <label>{title}</label>
                  <span>{content}</span>
                  {index > 1 ? <Svg /> : null}
                </li>
              );
            } else {
              return null;
            }
          })}
        </ul>
      </div>
    </li>
  );
}
