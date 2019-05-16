const client = require("../client");
const utils = require("../utils");
/**
 * @module 监测模块/Observer
 */
module.exports = {
  /**
   * @description 获取温度值（°C）
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 温度值，范围 -20~100°C
   */
  getTemperature(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`observer${moduleIndex}.get_temperature()`);
  },
  /**
   * @description 获取湿度值(%RH）
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 湿度值，范围 0~100%RH
   */
  getHumidity(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`observer${moduleIndex}.get_humidity()`);
  },
  /**
   * @description 获取亮度值 亮度值代表相对强度，值越大代表亮度越强
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 亮度值，范围 0~100
   */
  getLight(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`observer${moduleIndex}.get_light()`);
  },
  /**
   * @description 获取声音强度值 声音强度值代表相对强度，值越大代表声音越响
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 声音强度值，范围 0~100
   */
  getVolume(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`observer${moduleIndex}.get_volume()`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise(int)}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`observer${moduleIndex}.get_firmware_version()`);
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
      utils.setOnboardRGB(`observer${moduleIndex}`, rgb)
    );
  },
  /**
   * @description 注册模块检测的温度值上传，当模块检测的温度值改变会接收到数据，返回类型为int
   * @param  {int} moduleIndex 模块序号
   */
  regTemperature(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`observer${moduleIndex}`, "temperature", callback);
  },
  /**
   * @description 注册模块检测的湿度值上传，当模块检测的湿度值改变会接收到数据，返回类型为int
   * @param  {int} moduleIndex 模块序号
   */
  regHumidity(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`observer${moduleIndex}`, "humidity", callback);
  },
  /**
   * @description 注册模块检测的亮度值上传，当模块检测的亮度值改变会接收到数据，返回类型为int
   * @param  {int} moduleIndex 模块序号
   */
  regLight(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`observer${moduleIndex}`, "light", callback);
  },
  /**
   * @description 注册模块检测的声音强度值上传，当模块检测的声音强度值改变会接收到数据，返回类型为int
   * @param  {int} moduleIndex 模块序号
   */
  regVolume(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`observer${moduleIndex}`, "volume", callback);
  },
  /**
   * @description 注销模块检测的温度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregTemperature(moduleIndex) {
    client.eventUnregister(`observer${moduleIndex}`, "temperature");
  },
  /**
   * @description 注销模块检测的湿度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregHumidity(moduleIndex) {
    client.eventUnregister(`observer${moduleIndex}`, "humidity");
  },
  /**
   * @description 注销模块检测的亮度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregLight(moduleIndex) {
    client.eventUnregister(`observer${moduleIndex}`, "light");
  },
  /**
   * @description 注销模块检测的声音强度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregVolume(moduleIndex) {
    client.eventUnregister(`observer${moduleIndex}`, "volume");
  }
};
