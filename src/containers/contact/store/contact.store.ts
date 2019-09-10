import { observable, action } from 'mobx';
import * as Api from '../api/contact.api';
import { IContact, IContactStore } from '../interface/contact.interface';
import { notification } from 'antd';

class Contact implements IContactStore {
  @observable public contact: IContact | null = null;

  @action public onSubmit = async (item: IContact) => {
    try {
      await Api.onSubmit<IContact>(item);
      notification.success({
        message: 'Successfully submitted.',
      });
    } catch (e) {
      return false;
    }

    return true;
  }
}

export default new Contact();