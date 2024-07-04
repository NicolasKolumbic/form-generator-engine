import { Setting } from '../services/setting';
import { controlsSettingBase } from './controls-setting-base';

export function configurationSetter(setting: Partial<Setting>): Setting {
  if (setting.overwrittenControls) {
    if (!setting.overwrittenControls.switch) {
      setting.overwrittenControls.switch = controlsSettingBase.switch;
    }
    if (!setting.overwrittenControls.page) {
      setting.overwrittenControls.page = controlsSettingBase.page;
    }
    if (!setting.overwrittenControls.panel) {
      setting.overwrittenControls.panel = controlsSettingBase.panel;
    }
    if (!setting.overwrittenControls.panel) {
      setting.overwrittenControls.panel = controlsSettingBase.panel;
    }
    if (!setting.overwrittenControls.combobox) {
      setting.overwrittenControls.combobox = controlsSettingBase.combobox;
    }
    if (!setting.overwrittenControls.textfield) {
      setting.overwrittenControls.textfield = controlsSettingBase.textfield;
    }
    if (!setting.overwrittenControls.checkbox) {
      setting.overwrittenControls.checkbox = controlsSettingBase.checkbox;
    }
    if (!setting.overwrittenControls.question) {
      setting.overwrittenControls.question = controlsSettingBase.question;
    }
  } else {
    setting.overwrittenControls = controlsSettingBase;
  }

  return setting;
}
