// constants
import STATUSES from 'services/requestHandler.Statuses';

// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// layout
import { getLayout, getLayoutOfConfirmDelete } from './Settings.User.Layout';

// constants
import {
  BUTTONS, VALIDATOR_GROUPS, NOTIFICATIONS, ERRORS_LIST,
} from '../Settings.Constants';

// User domain
import UserDomain from '../../../domain-models/User/User';

// Views
import Notification from '../../Notification/Notification.View';

// handler
import { checkData } from '../Settings.Handler';

class SettingsUser extends BaseComponent {
  prepareData() {
    this.notification = new Notification(this.component);
    this.functionListForButtons = {
      [BUTTONS.DELETE_ACCOUNT]: () => this.deleteAccount(),
      [BUTTONS.CONFIRM_DELETE_ACCOUNT]: () => this.confirmDeleteAccount(),
      [BUTTONS.CANCEL_DELETE_ACCOUNT]: () => this.cancelDeleteAccount(),
      [BUTTONS.SAVE_USER]: (event) => this.saveUserSettings(event),
    };
  }

  createLayout() {
    this.component.className = 'settings-page__user';
    this.component.innerHTML = getLayout();
  }

  async saveUserSettings(event) {
    event.preventDefault();

    this.email = document.forms
      .updatedUserData
      .updatedEmail
      .value;
    this.password = document.forms
      .updatedUserData
      .updatedPassword
      .value;
    this.confirmedPassword = document.forms
      .updatedUserData
      .updatedConfirmPassword
      .value;

    const dataList = [
      [VALIDATOR_GROUPS.EMAIL, this.email],
      [VALIDATOR_GROUPS.PASSWORD, this.password],
      [VALIDATOR_GROUPS.CONFIRM_PASSWORD, {
        password: this.password,
        confirmedPassword: this.confirmedPassword,
      }],
    ];
    const { isSuccess, errorName } = checkData(dataList);

    if (!isSuccess) {
      this.notification.add(ERRORS_LIST[errorName]);
      return;
    }

    const { status } = await UserDomain.update(
      {
        email: this.email,
        password: this.password,
      },
    );
    if (status !== STATUSES.OK) {
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      return;
    }

    this.notification.add(NOTIFICATIONS.SAVED_SUCCESSFULLY);
  }

  deleteAccount() {
    this.layoutOfConfirmDelete = getLayoutOfConfirmDelete();
    this.component.append(this.layoutOfConfirmDelete);
  }

  cancelDeleteAccount() {
    this.layoutOfConfirmDelete.remove();
  }

  async confirmDeleteAccount() {
    const { status } = await UserDomain.remove();
    if (status !== STATUSES.NO_CONTENT) {
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
    }
  }
}

export default SettingsUser;
