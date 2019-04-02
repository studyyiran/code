import * as React from 'react';
import classnames from 'classnames';
import './conditionitem.less';
import { IProductPPVN } from '../interface/index.interface';
const isMatch = (activeConditions: object | null, conditionId: number, ppvnValueId: number): boolean => {
  if (activeConditions === null) {
    return false;
  }
  return activeConditions[conditionId] === ppvnValueId;
};
export default (props: IProductPPVN & { onConditionItemClick: (conditionId: number, ppvnValueId: number) => void; activeConditions: object | null }) => {
  const middle = props.illustrationContent && props.illustrationContent.propertyIllustrationContentText;
  const morePPV = props.pricePropertyValues && props.pricePropertyValues.length > 2;
  return (
    <div className={classnames('comp-condition-item-container', { middle: middle, moreppv: morePPV })}>
      <div className="left-wrapper">
        <p className="condition">{props.name}</p>
        {
          props.illustrationContent && props.illustrationContent.propertyIllustrationContentText &&
          <p className="detail">{props.illustrationContent.propertyIllustrationContentText}</p>
        }

      </div>
      <div className="right-wrapper">
        {
          props.pricePropertyValues.map((property, index) => {
            const isActive = isMatch(props.activeConditions, props.id, property.id);
            return (
              <span
                key={index}
                className={classnames('option', { active: isActive })}
                onClick={props.onConditionItemClick.bind(null, props.id, property.id)}
              >
                <span className="text">{property.value}</span>
              </span>
            )
          })
        }
      </div>
    </div>
  )
}