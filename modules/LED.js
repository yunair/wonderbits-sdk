const client = require("../client");
const utils = require("../utils");
/**
 * @module 彩灯模块/Led
 */
module.exports = {
  /**
   * @description 设置彩灯颜色 三个参数都为0时，表示灯不发光
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
    return client._doCommand(`led${moduleIndex}.set_rgb(${r},${g},${b})`);
  },
  /**
   * @description 设置彩灯由当前颜色渐变到目标颜色
   * @param {int} moduleIndex 模块序号
   * @param {int} r 目标红色：0~255
   * @param {int} g 目标绿色：0~255
   * @param {int} b 目标蓝色：0~255
   * @param {int} time 渐变时间：0~60000ms  经过这个时间变化到目标颜色
   * @param {int} step 变化次数：  在渐变时间内经过多少次变化达到目标颜色
   * @param {bool} block 阻塞参数：  False表示不阻塞 True表示阻塞
   */
  fadeToRgb(moduleIndex, r, g, b, time, step = 50, block = false) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(r);
    utils.checkNotNull(g);
    utils.checkNotNull(b);
    utils.checkNotNull(time);
    utils.checkNotNull(step);
    block = block ? "True" : "False";
    return client._doCommand(
      `led${moduleIndex}.fade_to_rgb(${r},${g},${b},${time},${step},${block})`
    );
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`led${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */

  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(utils.setOnboardRGB(`led${moduleIndex}`, rgb));
  }
};
