import { IOriginData } from "../../context/originData";

export interface IReducerAction {
  type: string;
  value?: any;
}

export interface ISsrFileStore {
  ssrConfig: {
    ssrTitle: string;
  };
  storeList: IOriginData[];
}
