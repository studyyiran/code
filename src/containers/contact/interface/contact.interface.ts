import { FormComponentProps } from 'antd/lib/form';

export interface IContactFormProps extends FormComponentProps {
  onOk: (item: IContact) => void;
}

export interface IContactProps {
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