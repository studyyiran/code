import { FormComponentProps } from "antd/lib/form";
import { IUserStoreNew } from "@/store/interface/user.interface";
import * as H from 'history';
export interface IAboutYouProps extends FormComponentProps {
  handleSubmit: () => void;
  user: IUserStoreNew;
  history: H.History
}

export interface IAboutYouState {
  isValidate: boolean;
  validateStatus: string | undefined,
  help: React.ReactNode | undefined,
  value?: string
}