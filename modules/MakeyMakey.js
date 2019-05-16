const client = require("../client");
const utils = require("../utils");
/**
 * @module 创意键盘模块/MakeyMakey
 */
module.exports = {
  /**
   * @description 获取触摸组的某通道是否被触摸
   * @param {int} moduleIndex 模块序号
   * @param {int} channel 通道号：1~6
   * @returns {Promise<bool>} True: 该通道被触摸 False: 该通道没有被触摸
   */
  isTouching(moduleIndex, channel) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(channel);
    return client._doReport(`makeyMakey${moduleIndex}.is_touching(${channel})`);
  },
  /**
   * @description 获取鼠标组的某通道是否被导通
   * @param {int} moduleIndex 模块序号
   * @param {int} channel 通道号：1~6
   * @returns {Promise<bool>} True: 该通道被导通 False: 该通道没有被导通
   */
  isMouseConnected(moduleIndex, channel) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(channel);
    return client._doReport(
      `makeyMakey${moduleIndex}.is_mouse_connected(${channel})`
    );
  },
  /**
   * @description 获取键盘组的某通道是否被导通
   * @param {int} moduleIndex 模块序号
   * @param {int} channel 通道号：1~6
   * @returns {Promise<bool>} True: 该通道被导通 False: 该通道没有被导通
   */
  isKeyboardConnected(moduleIndex, channel) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(channel);
    return client._doReport(
      `makeyMakey${moduleIndex}.is_keyboard_connected(${channel})`
    );
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`makeyMakey${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */

  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(
      utils.setOnboardRGB(`makeyMakey${moduleIndex}`, rgb)
    );
  },
  /**
   * @description 注册触摸组值上传，当触摸组的任意通道发生触摸或触摸放手时会接收到数据，返回类型为list(bool)
   * @param  {int} moduleIndex 模块序号
   */
  regTouch(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`makeyMakey${moduleIndex}`, "touch", callback);
  },
  /**
   * @description 注册鼠标组值上传，当鼠标组的任意通道发生触摸或触摸放手时会接收到数据，返回类型为list(bool)
   * @param  {int} moduleIndex 模块序号
   */
  regMouse(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`makeyMakey${moduleIndex}`, "mouse", callback);
  },
  /**
   * @description 注册键盘组值上传，当键盘组的任意通道发生触摸或触摸放手时会接收到数据，返回类型为list(bool)
   * @param  {int} moduleIndex 模块序号
   */
  regKeyboard(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`makeyMakey${moduleIndex}`, "keyboard", callback);
  },
  /**
   * @description 注销触摸组值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregTouch(moduleIndex) {
    client.eventUnregister(`makeyMakey${moduleIndex}`, "touch");
  },
  /**
   * @description 注销鼠标组值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregMouse(moduleIndex) {
    client.eventUnregister(`makeyMakey${moduleIndex}`, "mouse");
  },
  /**
   * @description 注销键盘组值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregKeyboard(moduleIndex) {
    client.eventUnregister(`makeyMakey${moduleIndex}`, "keyboard");
  }
};
