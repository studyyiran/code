import { FormComponentProps } from 'antd/lib/form';
import { RouteComponentProps } from 'react-router';
export interface IContactFormProps extends FormComponentProps {
  onOk: (item: IContact) => Promise<boolean>;
}

export interface IContactProps extends RouteComponentProps {
  contact: IContactStore,
}

export interface IContactStore {
  contact: IContact | null,
  onSubmit: (item: IContact) => Promise<boolean>
}

export interface IContact {
  content: string  // 内容",
  userEmail: string  // 邮箱",
  userName: string  // 用户名"
}