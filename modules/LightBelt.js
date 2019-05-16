const client = require("../client");
const utils = require("../utils");
/**
 * @module 灯带模块/LightBelt
 */
module.exports = {
  /**
   * @description 设置一段LED灯颜色（r,g,b 参数都设置为0时，关闭LED）
   * @param {int} moduleIndex 模块序号
   * @param {int} start 起始位置：1~100
   * @param {int} end 结束位置：1~100
   * @param {int} r 红色：0~255
   * @param {int} g 绿色：0~255
   * @param {int} b 蓝色：0~255
   */
  setLedsRgb(moduleIndex, start, end, r, g, b) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(start);
    utils.checkNotNull(end);
    utils.checkNotNull(r);
    utils.checkNotNull(g);
    utils.checkNotNull(b);
    return client._doCommand(
      `lightBelt${moduleIndex}.set_leds_rgb(${start},${end},${r},${g},${b})`
    );
  },
  /**
   * @description 设置单个LED灯颜色（r,g,b 参数都设置为0时，关闭LED）
   * @param {int} moduleIndex 模块序号
   * @param {int} num 灯的位置：1~100
   * @param {int} r 红色：0~255
   * @param {int} g 绿色：0~255
   * @param {int} b 蓝色：0~255
   */
  setSingleLedRgb(moduleIndex, num, r, g, b) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(num);
    utils.checkNotNull(r);
    utils.checkNotNull(g);
    utils.checkNotNull(b);
    return client._doCommand(
      `lightBelt${moduleIndex}.set_single_led_rgb(${num},${r},${g},${b})`
    );
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`lightBelt${moduleIndex}.get_firmware_version()`);
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
      utils.setOnboardRGB(`lightBelt${moduleIndex}`, rgb)
    );
  }
};
