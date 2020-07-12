// views
import BaseComponent from 'components/BaseComponent/BaseComponent';

// constants
import STATUSES from 'services/requestHandler.Statuses';
import {
  SETTINGS, NOTIFICATIONS, ERRORS_LIST, BUTTONS, VALIDATOR_GROUPS,
} from '../Settings.Constants';

// layout
import getLayout from './Settings.Main.Layout';

// Notification
import Notification from '../../Notification/Notification.View';

// handler
import {
  getSettingsList,
  loadSettings,
  prepareSettingsData,
  checkData,
  saveSettings,
} from '../Settings.Handler';

class SettingsMain extends BaseComponent {
  prepareData() {
    this.notification = new Notification(this.component, 0);
    this.functionListForButtons = {
      [BUTTONS.SAVE_MAIN]: (event) => this.saveMainSettings(event),
    };
  }

  createLayout() {
    this.component.className = 'settings-page__main';
    this.component.innerHTML = getLayout();
  }

  async show() {
    await super.show();

    const settings = getSettingsList(this.component);
    await loadSettings(SETTINGS.MAIN, settings);
  }

  async saveMainSettings() {
    const settingsList = getSettingsList(this.component);
    const settings = prepareSettingsData(settingsList);
    const dataList = [
      [VALIDATOR_GROUPS.WORDS, settings],
      [VALIDATOR_GROUPS.DISPLAYING, settings],
    ];
    const { isSuccess, errorName } = checkData(dataList);

    if (!isSuccess) {
      this.notification.add(ERRORS_LIST[errorName]);
      return;
    }

    const { status } = await saveSettings(SETTINGS.MAIN, settings);
    if (status !== STATUSES.OK) {
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      return;
    }

    this.notification.add(NOTIFICATIONS.SAVED_SUCCESSFULLY);
  }
}

export default SettingsMain;
