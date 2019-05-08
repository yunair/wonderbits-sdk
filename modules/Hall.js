const client = require("../client");
const utils = require("../utils");
/**
 * @module 霍尔模块/Hall
 */
module.exports = {
  /**
   * @description 该函数用于获取霍尔检测的磁场强度值
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 霍尔检测的磁场强度值（绝对值表示强度，符号表示方向），范围-100~100
   */
  getMagnetic(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`hall${moduleIndex}.get_magnetic()`);
  },
  /**
   * @description 校准霍尔传感器零点 使用该函数时，霍尔模块指示灯会在校准执行过程中变为黄色，校准完成后回复原有颜色。 校准过程中保证没有磁性物体靠近模块，否则会导致校准后的零点不准确。
   * @param {int} moduleIndex 模块序号
   * @param {bool} block 阻塞参数：  False表示不阻塞 True表示阻塞
   */
  calibrate(moduleIndex, block = true) {
    utils.checkNotNull(moduleIndex);
    block = block ? "True" : "False";
    return client._doCommand(`hall${moduleIndex}.calibrate(${block})`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`hall${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */

  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(utils.setOnboardRGB(`hall${moduleIndex}`, rgb));
  },
  /**
   * @description 注册霍尔检测的磁场强度值上传，当霍尔检测的磁场强度值改变会接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regMagnetic(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`hall${moduleIndex}`, "magnetic", callback);
  },
  /**
   * @description 注销霍尔检测的磁场强度值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregMagnetic(moduleIndex) {
    client.eventUnregister(`hall${moduleIndex}`, "magnetic");
  }
};
