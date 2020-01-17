import { IOriginData } from "../../context/originData";

export interface IReducerAction {
  type: string;
  value?: any;
}

export interface ISsrFileStore {
  ssrConfig: {
    ssrTitle: string;
    metaDesc?: string;
    jsonInfo?: string;
  };
  storeList: IOriginData[];
}
