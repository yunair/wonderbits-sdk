const client = require("../client");
const utils = require("../utils");
/**
 * @module 豌豆小车/Buggy
 */
module.exports = {
  /**
   * @description 获取电池电量值
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 电池电量值，范围 0~100
   */
  getBatteryValue(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`buggy${moduleIndex}.get_battery_value()`);
  },
  /**
   * @description 设置蜂鸣器声音频率（Hz） 设置频率为0表示关闭蜂鸣器
   * @param {int} moduleIndex 模块序号
   * @param {int} frequency 频率：0~20000 Hz
   */
  setBuzzer(moduleIndex, frequency) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(frequency);
    return client._doCommand(`buggy${moduleIndex}.set_buzzer(${frequency})`);
  },
  /**
   * @description 设置led1灯颜色（r,g,b 参数都设置为0时，关闭LED）
   * @param {int} moduleIndex 模块序号
   * @param {int} r 红色：0~255
   * @param {int} g 绿色：0~255
   * @param {int} b 蓝色：0~255
   */
  setLed1(moduleIndex, r, g, b) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(r);
    utils.checkNotNull(g);
    utils.checkNotNull(b);
    return client._doCommand(`buggy${moduleIndex}.set_led1(${r},${g},${b})`);
  },
  /**
   * @description 设置led1灯颜色（r,g,b 参数都设置为0时，关闭LED）
   * @param {int} moduleIndex 模块序号
   * @param {int} r 红色：0~255
   * @param {int} g 绿色：0~255
   * @param {int} b 蓝色：0~255
   */
  setLed2(moduleIndex, r, g, b) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(r);
    utils.checkNotNull(g);
    utils.checkNotNull(b);
    return client._doCommand(`buggy${moduleIndex}.set_led2(${r},${g},${b})`);
  },
  /**
   * @description 设置电机A转动
   * @param {int} moduleIndex 模块序号
   * @param {int} speed_left 转速：-100~100  符号表示转动方向，绝对值为转动速度
   * @param {int} speed_right 转速：-100~100  符号表示转动方向，绝对值为转动速度
   */
  setMotors(moduleIndex, speed_left, speed_right) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(speed_left);
    utils.checkNotNull(speed_right);
    return client._doCommand(
      `buggy${moduleIndex}.set_motors(${speed_left},${speed_right})`
    );
  },
  /**
   * @description 获取s1检测的亮度值 亮度值代表相对强度，值越大代表亮度越强
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 亮度值，范围 0~100
   */
  getS1(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`buggy${moduleIndex}.get_s1()`);
  },
  /**
   * @description 获取s2检测的亮度值 亮度值代表相对强度，值越大代表亮度越强
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 亮度值，范围 0~100
   */
  getS2(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`buggy${moduleIndex}.get_s2()`);
  },
  /**
   * @description 判断循迹传感器是否全部检测为黑
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} True：循迹传感器全部检测为黑 False：循迹传感器任意一个检测到白
   */
  getTracerAllBlackState(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`buggy${moduleIndex}.get_tracer_all_black_state()`);
  },
  /**
   * @description 判断循迹传感器是否全部检测为白
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} True：循迹传感器全部检测为白 False：循迹传感器任意一个检测到黑
   */
  getTracerAllWhiteState(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`buggy${moduleIndex}.get_tracer_all_white_state()`);
  },
  /**
   * @description 判断某个循迹传感器是否检测为黑
   * @param {int} moduleIndex 模块序号
   * @param {int} channel 通道：1~5  表示t1~t5
   * @returns {Promise<bool>} True：对应循迹传感器全部检测为黑 False：对应循迹传感器全部检测为白
   */
  isTracerCheckBlack(moduleIndex, channel) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(channel);
    return client._doReport(
      `buggy${moduleIndex}.is_tracer_check_black(${channel})`
    );
  },
  /**
   * @description 获取某个循迹传感器的检测值
   * @param {int} moduleIndex 模块序号
   * @param {int} channel 通道：1~5  表示t1~τ5
   * @returns {Promise<float>}
   */
  getTracerValue(moduleIndex, channel) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(channel);
    return client._doReport(`buggy${moduleIndex}.get_tracer_value(${channel})`);
  },
  /**
   * @description 判断t6是否无遮挡
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} True：t6无遮挡 False：t6被遮挡
   */
  isT6CheckUnobstructed(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`buggy${moduleIndex}.is_t6_check_unobstructed()`);
  },
  /**
   * @description 判断t7是否无遮挡
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<bool>} True：t7无遮挡 False：t7被遮挡
   */
  isT7CheckUnobstructed(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`buggy${moduleIndex}.is_t7_check_unobstructed()`);
  },
  /**
   * @description 设置循迹传感器的阈值百分比为value 阈值 = 循迹传感器检测的黑色值 * value% + 循迹传感器检测的白色值 * （1 - value%）
   * @param {int} moduleIndex 模块序号
   * @param {int} value 值：0~100
   */
  setCalibrationPercentage(moduleIndex, value) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(value);
    return client._doCommand(
      `buggy${moduleIndex}.set_calibration_percentage(${value})`
    );
  },
  /**
   * @description 校准循迹传感器的黑色值
   * @param {int} moduleIndex 模块序号
   */
  calibrationBlack(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`buggy${moduleIndex}.calibration_black()`);
  },
  /**
   * @description 校准循迹传感器的白色值
   * @param {int} moduleIndex 模块序号
   */
  calibrationWhite(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`buggy${moduleIndex}.calibration_white()`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`buggy${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */
  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(utils.setOnboardRGB(`buggy${moduleIndex}`, rgb));
  },
  /**
   * @description 注册电池电量值上传，当电池电量发生改变时会接收到数据
   * @param  {int} moduleIndex 模块序号
   */
  regBatteryValue(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`buggy${moduleIndex}`, "battery_value", callback);
  },
  /**
   * @description 注册s1检测的光强值上传，当s1检测的光强值改变时会接收到数据
   * @param  {int} moduleIndex 模块序号
   */
  regS1(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`buggy${moduleIndex}`, "s1", callback);
  },
  /**
   * @description 注册s2检测的光强值上传，当s2检测的光强值改变时会接收到数据
   * @param  {int} moduleIndex 模块序号
   */
  regS2(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`buggy${moduleIndex}`, "s2", callback);
  },
  /**
   * @description 注册循迹传感器检测状态上传，当s循迹传感器检测状态改变时会接收到数据 True表示检测为黑色，False表示检测为白色 channel表示通道，1~5表示选择t1~t5通道 当channel为0时，上传数据为list(bool)， 5个通道的检测状态一起上传
   * @param  {int} moduleIndex 模块序号
   */
  regTracerState(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`buggy${moduleIndex}`, "tracer_state", callback);
  },
  /**
   * @description 注销电池电量值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregBatteryValue(moduleIndex) {
    client.eventUnregister(`buggy${moduleIndex}`, "battery_value");
  },
  /**
   * @description 注销s1检测的光强值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregS1(moduleIndex) {
    client.eventUnregister(`buggy${moduleIndex}`, "s1");
  },
  /**
   * @description 注销s2检测的光强值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregS2(moduleIndex) {
    client.eventUnregister(`buggy${moduleIndex}`, "s2");
  },
  /**
   * @description 注销循迹传感器检测状态上传
   * @param  {int} moduleIndex 模块序号
   */
  unregTracerState(moduleIndex) {
    client.eventUnregister(`buggy${moduleIndex}`, "tracer_state");
  }
};
