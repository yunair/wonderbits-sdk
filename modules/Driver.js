const client = require("../client");
const utils = require("../utils");
/**
 * @module 驱动模块/Driver
 */
module.exports = {
  /**
   * @description 设置电机A转动
   * @param {int} moduleIndex 模块序号
   * @param {int} speed 转速：-100~100  符号不同表示转动方向不同，绝对值为转动速度
   * @param {int} time 变速时间，从当前转速转变到设置转速用到的时间，单位 ms  默认值为10
   * @param {bool} block 阻塞参数：  False表示不阻塞 True表示阻塞
   */
  setMotorA(moduleIndex, speed, time = 10, block = false) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(speed);
    utils.checkNotNull(time);
    block = block ? "True" : "False";
    return client._doCommand(
      `driver${moduleIndex}.set_motor_a(${speed},${time},${block})`
    );
  },
  /**
   * @description 设置电机A停止转动
   * @param {int} moduleIndex 模块序号
   */
  stopMotorA(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`driver${moduleIndex}.stop_motor_a()`);
  },
  /**
   * @description 设置电机B转动
   * @param {int} moduleIndex 模块序号
   * @param {int} speed 转速：-100~100  符号不同表示转动方向不同，绝对值为转动速度
   * @param {int} time 变速时间，从当前转速转变到设置转速用到的时间，单位 ms  默认值为10
   * @param {bool} block 阻塞参数：  False表示不阻塞 True表示阻塞
   */
  setMotorB(moduleIndex, speed, time = 10, block = false) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(speed);
    utils.checkNotNull(time);
    block = block ? "True" : "False";
    return client._doCommand(
      `driver${moduleIndex}.set_motor_b(${speed},${time},${block})`
    );
  },
  /**
   * @description 设置电机B停止转动
   * @param {int} moduleIndex 模块序号
   */
  stopMotorB(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`driver${moduleIndex}.stop_motor_b()`);
  },
  /**
   * @description 设置舵机1转动到指定角度 使用此函数后舵机1将拥有维持角度的扭矩，施加外力改变舵机1的角度会很困难
   * @param {int} moduleIndex 模块序号
   * @param {int} angle 角度：0~180
   */
  setServo1(moduleIndex, angle) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(angle);
    return client._doCommand(`driver${moduleIndex}.set_servo1(${angle})`);
  },
  /**
   * @description 关闭舵机1 使用此函数后舵机1将失去维持角度的扭矩，施加外力可以轻松改变舵机1的角度
   * @param {int} moduleIndex 模块序号
   */
  stopServo1(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`driver${moduleIndex}.stop_servo1()`);
  },
  /**
   * @description 设置舵机2转动到指定角度 使用此函数后舵机2将拥有维持角度的扭矩，施加外力改变舵机2的角度会很困难
   * @param {int} moduleIndex 模块序号
   * @param {int} angle 角度：0~180
   */
  setServo2(moduleIndex, angle) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(angle);
    return client._doCommand(`driver${moduleIndex}.set_servo2(${angle})`);
  },
  /**
   * @description 关闭舵机2 使用此函数后舵机2将失去维持角度的扭矩，施加外力可以轻松改变舵机2的角度
   * @param {int} moduleIndex 模块序号
   */
  stopServo2(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`driver${moduleIndex}.stop_servo2()`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`driver${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */

  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(utils.setOnboardRGB(`driver${moduleIndex}`, rgb));
  }
};
