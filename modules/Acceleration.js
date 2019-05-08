const client = require("../client");
const utils = require("../utils");
/**
 * @module 加速度模块/Acceleration
 */
module.exports = {
  /**
   * @description 该函数用于获取加速度传感器检测的x轴加速度值，单位                                                         m/s2
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 加速度传感器检测的x轴加速度值，范围-80~80
   */
  getXAcceleration(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`acceleration${moduleIndex}.get_x_acceleration()`);
  },
  /**
   * @description 该函数用于获取加速度传感器检测的y轴加速度值，单位                                                         m/s2
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 加速度传感器检测的y轴加速度值，范围-80~80
   */
  getYAcceleration(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`acceleration${moduleIndex}.get_y_acceleration()`);
  },
  /**
   * @description 该函数用于获取加速度传感器检测的z轴加速度值，单位                                                         m/s2
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 加速度传感器检测的z轴加速度值，范围-80~80
   */
  getZAcceleration(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`acceleration${moduleIndex}.get_z_acceleration()`);
  },
  /**
   * @description 该函数用于获取加速度传感器检测的x、y、z三轴合加速度值，单位                                                         m/s2
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 加速度传感器检测的x、y、z三轴合加速度值，范围-80~80
   */
  getAcceleration(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`acceleration${moduleIndex}.get_acceleration()`);
  },
  /**
   * @description 该函数用于获取加速度传感器检测的x轴角速度值，单位                                                         °/s
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 加速度传感器检测的x轴角速度值，范围-1000~1000
   */
  getXAngularVelocity(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(
      `acceleration${moduleIndex}.get_x_angular_velocity()`
    );
  },
  /**
   * @description 该函数用于获取加速度传感器检测的y轴角速度值，单位                                                         °/s
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 加速度传感器检测的y轴角速度值，范围-1000~1000
   */
  getYAngularVelocity(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(
      `acceleration${moduleIndex}.get_y_angular_velocity()`
    );
  },
  /**
   * @description 该函数用于获取加速度传感器检测的z轴角速度值，单位                                                         °/s
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 加速度传感器检测的z轴角速度值，范围-1000~1000
   */
  getZAngularVelocity(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(
      `acceleration${moduleIndex}.get_z_angular_velocity()`
    );
  },
  /**
   * @description 校准加速度传感器零点                                                          使用该函数时，加速度模块指示灯会在校准执行过程中变为黄色，校准完成后回复原有颜色。                                                                                                               校准过程中需要保证加速度模块且保持静止不动，有汉字的一面朝上。
   * @param {int} moduleIndex 模块序号
   * @param {bool} block 阻塞参数：  False表示不阻塞 True表示阻塞
   */
  calibrate(moduleIndex, block = true) {
    utils.checkNotNull(moduleIndex);
    block = block ? "True" : "False";
    return client._doCommand(`acceleration${moduleIndex}.calibrate(${block})`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(
      `acceleration${moduleIndex}.get_firmware_version()`
    );
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
      utils.setOnboardRGB(`acceleration${moduleIndex}`, rgb)
    );
  },
  /**
   * @description 注册加速度传感器检测的x轴加速度值上传，当加速度传感器检测的x轴加速度值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regXAcceleration(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `acceleration${moduleIndex}`,
      "x_acceleration",
      callback
    );
  },
  /**
   * @description 注册加速度传感器检测的y轴加速度值上传，当加速度传感器检测的y轴加速度值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regYAcceleration(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `acceleration${moduleIndex}`,
      "y_acceleration",
      callback
    );
  },
  /**
   * @description 注册加速度传感器检测的z轴加速度值上传，当加速度传感器检测的z轴加速度值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regZAcceleration(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `acceleration${moduleIndex}`,
      "z_acceleration",
      callback
    );
  },
  /**
   * @description 注册加速度传感器检测的x、y、z三轴合加速度值上传，当加速度传感器检测的x、y、z三轴合加速度值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regAcceleration(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `acceleration${moduleIndex}`,
      "acceleration",
      callback
    );
  },
  /**
   * @description 注册加速度传感器检测的x轴角速度值上传，当加速度传感器检测的x轴角速度值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regXAngularVelocity(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `acceleration${moduleIndex}`,
      "x_angular_velocity",
      callback
    );
  },
  /**
   * @description 注册加速度传感器检测的y轴角速度值上传，当加速度传感器检测的y轴角速度值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regYAngularVelocity(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `acceleration${moduleIndex}`,
      "y_angular_velocity",
      callback
    );
  },
  /**
   * @description 注册加速度传感器检测的z轴角速度值上传，当加速度传感器检测的z轴角速度值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regZAngularVelocity(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `acceleration${moduleIndex}`,
      "z_angular_velocity",
      callback
    );
  },
  /**
   * @description 注销加速度传感器检测的x轴加速度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregXAcceleration(moduleIndex) {
    client.eventUnregister(`acceleration${moduleIndex}`, "x_acceleration");
  },
  /**
   * @description 注销加速度传感器检测的y轴加速度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregYAcceleration(moduleIndex) {
    client.eventUnregister(`acceleration${moduleIndex}`, "y_acceleration");
  },
  /**
   * @description 注销加速度传感器检测的Z轴加速度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregZAcceleration(moduleIndex) {
    client.eventUnregister(`acceleration${moduleIndex}`, "z_acceleration");
  },
  /**
   * @description 注销加速度传感器检测的x、y、z轴合加速度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregAcceleration(moduleIndex) {
    client.eventUnregister(`acceleration${moduleIndex}`, "acceleration");
  },
  /**
   * @description 注销加速度传感器检测的x轴角速度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregXAngularVelocity(moduleIndex) {
    client.eventUnregister(`acceleration${moduleIndex}`, "x_angular_velocity");
  },
  /**
   * @description 注销加速度传感器检测的y轴角速度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregYAngularVelocity(moduleIndex) {
    client.eventUnregister(`acceleration${moduleIndex}`, "y_angular_velocity");
  },
  /**
   * @description 注销加速度传感器检测的z轴角速度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregZAngularVelocity(moduleIndex) {
    client.eventUnregister(`acceleration${moduleIndex}`, "z_angular_velocity");
  }
};
