// views
import BaseComponent from 'components/BaseComponent/BaseComponent';
import Loader from 'components/Loader/Loader.View';
import Notification from 'components/Notification/Notification.View';

// constants
import STATUSES from 'services/requestHandler.Statuses';
import {
  SETTINGS, NOTIFICATIONS, ERRORS_LIST, BUTTONS, VALIDATOR_GROUPS, DEFAULT_SETTINGS_REPETITION,
} from '../Settings.Constants';

// layout
import getLayout from './Settings.Repetition.Layout';
import { getConfirmLayout } from '../Settings.Layout';

// handler
import {
  getSettingsList,
  loadSettings,
  prepareSettingsData,
  checkData,
  saveSettings,
} from '../Settings.Handler';

// Style
import './Settings.Repetition.scss';

class SettingsRepetition extends BaseComponent {
  prepareData() {
    this.notification = new Notification(this.component, 1);
    this.functionListForButtons = {
      [BUTTONS.SAVE_REPETITION]: (event) => this.saveRepetitionSettings(event),
      [BUTTONS.DEFAULT_MAIN]: () => this.resetSettings(),
      [BUTTONS.CONFIRM_DEFAULT_MAIN]: () => this.confirmDefaultSettings(),
      [BUTTONS.CANCEL]: () => this.cancel(),
    };
  }

  createLayout() {
    this.component.className = 'settings-page__repetition';
    this.component.innerHTML = getLayout();
  }

  async show() {
    await super.show();
    this.loader = new Loader();
    await this.loader.show();
    const settings = getSettingsList(this.component);
    await loadSettings(SETTINGS.REPETITION, settings);
    this.loader.hide();
  }

  async saveRepetitionSettings() {
    await this.loader.show();
    const settingsList = getSettingsList(this.component);
    const settings = prepareSettingsData(settingsList);
    const dataList = [
      [VALIDATOR_GROUPS.TIMERS, settings],
    ];
    const { isSuccess, errorName } = checkData(dataList);

    if (!isSuccess) {
      this.loader.hide();
      this.notification.add(ERRORS_LIST[errorName], 5000);
      return;
    }

    const { status } = await saveSettings(SETTINGS.REPETITION, settings);
    if (status !== STATUSES.OK) {
      this.loader.hide();
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      return;
    }

    this.loader.hide();
    this.notification.add(NOTIFICATIONS.SAVED_SUCCESSFULLY, 2000);
  }

  resetSettings() {
    const html = getConfirmLayout();
    this.notification.add(html);
  }

  async confirmDefaultSettings() {
    this.notification.drop();
    const { status } = await saveSettings(SETTINGS.REPETITION, DEFAULT_SETTINGS_REPETITION);
    if (status !== STATUSES.OK) {
      this.notification.add(NOTIFICATIONS.SAVE_ERROR, 5000);
      return;
    }

    const settings = getSettingsList(this.component);
    await loadSettings(SETTINGS.REPETITION, settings);
    this.notification.add(NOTIFICATIONS.SUCCESS_DEFAULT_SETTINGS, 3000);
  }

  cancel() {
    this.notification.drop();
  }
}

export default SettingsRepetition;
