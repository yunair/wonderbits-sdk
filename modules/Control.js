const client = require("../client");
const utils = require("../utils");
/**
 * @module 控制模块/Control
 */
module.exports = {
  /**
   * @description 该函数用于判断SW1是否被按下
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} SW1的状态（SW1被按下返回True，否则返回False）
   */
  isSw1Pressed(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.is_sw1_pressed()`);
  },
  /**
   * @description 该函数用于判断SW2是否被按下
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} SW2的状态（SW2被按下返回True，否则返回False）
   */
  isSw2Pressed(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.is_sw2_pressed()`);
  },
  /**
   * @description 该函数用于判断SW3的是否在1这侧
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} SW3的状态（开关在1返回True，开关在0返回False）
   */
  isSw3At1(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.is_sw3_at_1()`);
  },
  /**
   * @description 该函数用于判断获取SW4的位置
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 圆盘电阻器旋转位置，范围0~100
   */
  getSw4(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.get_sw4()`);
  },
  /**
   * @description 该函数用于判断获取M1与COM是否导通，导通的判断是根据M1与COM之间的电阻率是否低于阈值，低于阈值判断为导通，高于阈值判断为不导通
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} M1与COM之间的状态（M1与COM导通返回True，否则返回False）
   */
  isM1Connected(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.is_m1_connected()`);
  },
  /**
   * @description 该函数用于判断获取M2与COM是否导通，导通的判断是根据M2与COM之间的电阻率是否低于阈值，低于阈值判断为导通，高于阈值判断为不导通
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} M1与COM之间的状态（M1与COM导通返回True，否则返回False）
   */
  isM2Connected(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.is_m2_connected()`);
  },
  /**
   * @description 设置触摸灵敏度 通过设置灵敏度改变M1，M2的触发阈值 当get_m1_value或get_m2_value小于阈值时则认为M1或M2与COM导通
   * @param {int} moduleIndex 模块序号
   * @param {int} limit 灵敏度：0~100
   */
  setM1M2Sensitivity(moduleIndex, limit) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(limit);
    return client._doCommand(
      `control${moduleIndex}.set_m1_m2_sensitivity(${limit})`
    );
  },
  /**
   * @description 该函数用于获取M1的电阻率
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} M1的的电阻率，0代表短路，100代表绝缘，范围0~100
   */
  getM1Value(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.get_m1_value()`);
  },
  /**
   * @description 该函数用于获取M2的电阻率
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} M2的的电阻率，0代表短路，100代表绝缘，范围0~100
   */
  getM2Value(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.get_m2_value()`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`control${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */

  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(utils.setOnboardRGB(`control${moduleIndex}`, rgb));
  },
  /**
   * @description 注册sw1值上传，当sw1状态改变会触发事件并接收到数据，返回类型为bool
   * @param  {int} moduleIndex 模块序号
   */
  regSw1(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`control${moduleIndex}`, "sw1", callback);
  },
  /**
   * @description 注册sw2值上传，当sw2状态改变会触发事件并接收到数据，返回类型为bool
   * @param  {int} moduleIndex 模块序号
   */
  regSw2(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`control${moduleIndex}`, "sw2", callback);
  },
  /**
   * @description 注册sw3值上传，当sw3状态改变会触发事件并接收到数据，返回类型为bool
   * @param  {int} moduleIndex 模块序号
   */
  regSw3(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`control${moduleIndex}`, "sw3", callback);
  },
  /**
   * @description 注册sw4值上传，当sw4值改变会触发事件并接收到数据，返回类型为int
   * @param  {int} moduleIndex 模块序号
   */
  regSw4(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`control${moduleIndex}`, "sw4", callback);
  },
  /**
   * @description 注册m1值上传，当m1状态改变会触发事件并接收到数据，返回类型为bool
   * @param  {int} moduleIndex 模块序号
   */
  regM1(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`control${moduleIndex}`, "m1", callback);
  },
  /**
   * @description 注册m2值上传，当m2状态改变会触发事件并接收到数据，返回类型为bool
   * @param  {int} moduleIndex 模块序号
   */
  regM2(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`control${moduleIndex}`, "m2", callback);
  },
  /**
   * @description 注册m1电阻率值上传，当m1电阻率值改变会触发事件并接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regM1Value(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`control${moduleIndex}`, "m1_value", callback);
  },
  /**
   * @description 注册m2电阻率值上传，当m1电阻率值改变会触发事件并接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regM2Value(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`control${moduleIndex}`, "m2_value", callback);
  },
  /**
   * @description 注销sw3值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregSw3(moduleIndex) {
    client.eventUnregister(`control${moduleIndex}`, "sw3");
  },
  /**
   * @description 注销sw1值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregSw1(moduleIndex) {
    client.eventUnregister(`control${moduleIndex}`, "sw1");
  },
  /**
   * @description 注销sw2值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregSw2(moduleIndex) {
    client.eventUnregister(`control${moduleIndex}`, "sw2");
  },
  /**
   * @description 注销m1值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregM1(moduleIndex) {
    client.eventUnregister(`control${moduleIndex}`, "m1");
  },
  /**
   * @description 注销m2值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregM2(moduleIndex) {
    client.eventUnregister(`control${moduleIndex}`, "m2");
  },
  /**
   * @description 注销sw4值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregSw4(moduleIndex) {
    client.eventUnregister(`control${moduleIndex}`, "sw4");
  },
  /**
   * @description 注销m1电阻率值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregM1Value(moduleIndex) {
    client.eventUnregister(`control${moduleIndex}`, "m1_value");
  },
  /**
   * @description 注销m2电阻率值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregM2Value(moduleIndex) {
    client.eventUnregister(`control${moduleIndex}`, "m2_value");
  }
};
