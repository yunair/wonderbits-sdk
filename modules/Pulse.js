const client = require("../client");
const utils = require("../utils");
/**
 * @module 脉搏模块/Pulse
 */
module.exports = {
  /**
   * @description 该函数用于获取模块检测的脉搏，此处的脉搏值表示一分钟脉搏跳动的次数 测量时要求找到模块有汉字的一面，然后将手指轻轻的贴在此面，需要耐心等待一会则会测量出脉搏
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 模块检测的脉搏，范围40~140
   */
  getHeartRate(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`pulse${moduleIndex}.get_heart_rate()`);
  },
  /**
   * @description 该函数用于获取脉搏波形队列中未读内容的个数，最多存储10个未读内容
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 脉搏波形队列中未读内容的个数，范围0~10
   */
  getUnreadWaveCount(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`pulse${moduleIndex}.get_unread_wave_count()`);
  },
  /**
   * @description 该函数用于获取脉搏波形队列中的未读波形值，读取后会删除这个数据 如果没有未读的数据返回上一次的返回值
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 脉搏波形队列中最早的未读波形值，范围0~255
   */
  getHeartWave(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`pulse${moduleIndex}.get_heart_wave()`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`pulse${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */

  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(utils.setOnboardRGB(`pulse${moduleIndex}`, rgb));
  },
  /**
   * @description 注册模块检测的脉搏值上传，当模块检测的脉搏改变会接收到数据，返回类型为int
   * @param  {int} moduleIndex 模块序号
   */
  regHeartRate(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`pulse${moduleIndex}`, "heart_rate", callback);
  },
  /**
   * @description 注册模块脉搏波形值上传，当模块更新脉搏波形值时会接收到数据，返回类型为list
   * @param  {int} moduleIndex 模块序号
   */
  regHeartWaveReceived(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `pulse${moduleIndex}`,
      "heart_wave_received",
      callback
    );
  },
  /**
   * @description 注销模块检测的脉搏值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregHeartRate(moduleIndex) {
    client.eventUnregister(`pulse${moduleIndex}`, "heart_rate");
  },
  /**
   * @description 注销模块脉搏波形值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregHeartWaveReceived(moduleIndex) {
    client.eventUnregister(`pulse${moduleIndex}`, "heart_wave_received");
  }
};
