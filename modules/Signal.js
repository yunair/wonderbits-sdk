const client = require("../client");
const utils = require("../utils");
/**
 * @module 信号模块/Signal
 */
module.exports = {
  /**
   * @description 设置LED灯颜色 三个参数都为0时，表示灯不发光
   * @param {int} moduleIndex 模块序号
   * @param {int} r 红色：0~255
   * @param {int} g 绿色：0~255
   * @param {int} b 蓝色：0~255
   */
  setRgb(moduleIndex, r, g, b) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(r);
    utils.checkNotNull(g);
    utils.checkNotNull(b);
    return client._doCommand(`signal${moduleIndex}.set_rgb(${r},${g},${b})`);
  },
  /**
   * @description 设置蜂鸣器声音频率，单位 Hz 设置频率为0表示关闭蜂鸣器 参数为1~20时发出的是同一个声音
   * @param {int} moduleIndex 模块序号
   * @param {int} frequency 频率：0~20000 Hz
   */
  setBuzzer(moduleIndex, frequency) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(frequency);
    return client._doCommand(`signal${moduleIndex}.set_buzzer(${frequency})`);
  },
  /**
   * @description 设置震动马达的震动幅度 这里的振动幅度没有单位，值越大表示震动幅度越大，参数为0则停止震动
   * @param {int} moduleIndex 模块序号
   * @param {int} strength 振动幅度：0~100
   */
  setVibration(moduleIndex, strength) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(strength);
    return client._doCommand(`signal${moduleIndex}.set_vibration(${strength})`);
  },
  /**
   * @description 设置蜂鸣器以一个固定频率发声并保持一段时间后关闭蜂鸣器
   * @param {int} moduleIndex 模块序号
   * @param {int} frequency 频率：20~20000 Hz
   * @param {int} time 时间: 50~60000 ms
   * @param {bool} block 阻塞参数：  False表示不阻塞 True表示阻塞
   */
  playANote(moduleIndex, frequency, time, block = false) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(frequency);
    utils.checkNotNull(time);
    block = block ? "True" : "False";
    return client._doCommand(
      `signal${moduleIndex}.play_a_note(${frequency},${time},${block})`
    );
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`signal${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */

  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(utils.setOnboardRGB(`signal${moduleIndex}`, rgb));
  }
};
