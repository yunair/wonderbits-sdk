const client = require("../client");
const utils = require("../utils");
/**
 * @module 超声波测距模块/Ultrasonic
 */
module.exports = {
  /**
   * @description 获取超声波检测的距离值（cm）
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 距离值，范围 0~400 cm
   */
  getDistance(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`ultrasonic${moduleIndex}.get_distance()`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise(int)}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`ultrasonic${moduleIndex}.get_firmware_version()`);
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
      utils.setOnboardRGB(`ultrasonic${moduleIndex}`, rgb)
    );
  },
  /**
   * @description 注册超声波检测的距离值上传，当超声波检测的距离值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regDistance(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`ultrasonic${moduleIndex}`, "distance", callback);
  },
  /**
   * @description 注销超声波检测的距离值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregDistance(moduleIndex) {
    client.eventUnregister(`ultrasonic${moduleIndex}`, "distance");
  }
};
