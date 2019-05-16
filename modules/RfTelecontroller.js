const client = require("../client");
const utils = require("../utils");
/**
 * @module 射频遥控器模块/RfTelecontroller
 */
module.exports = {
  /**
   * @description 使用该函数可得到最近一次通信收到的内容，如果在程序开始后或使用clear_msg函数后没有发生过通信将返回None
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 最新的通信内容，如果没有内容返回None
   */
  getMsg(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`rfTelecontroller${moduleIndex}.get_msg()`);
  },
  /**
   * @description 清除最新的通信内容，在再次接收到新的通信内容之前调用get_msg只会返回None 调用此函数并不会影响get_unread_msg_count和read的使用
   * @param {int} moduleIndex 模块序号
   */
  clearMsg(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`rfTelecontroller${moduleIndex}.clear_msg()`);
  },
  /**
   * @description 该函数用于获取通信存储队列中未读内容的个数，最多存储32个未读内容
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 通信存储队列中未读内容的个数，范围0~32
   */
  getUnreadMsgCount(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(
      `rfTelecontroller${moduleIndex}.get_unread_msg_count()`
    );
  },
  /**
   * @description 该函数用于获取通信存储队列中未读内容，读取后会删除这个数据
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<float>} 通信存储队列中最早的未读内容，如果没有未读的数据返回None
   */
  read(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`rfTelecontroller${moduleIndex}.read()`);
  },
  /**
   * @description 发送数据。调用此函数后，与本模块通信名字相同的模块将会受到发送的内容
   * @param {int} moduleIndex 模块序号
   * @param {float} number 发送的数值
   */
  send(moduleIndex, number) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(number);
    return client._doCommand(`rfTelecontroller${moduleIndex}.send(${number})`);
  },
  /**
   * @description 设置模块通信名字。只有通信名字相同的模块之间才可以互相通信，不想互相通信的模块需要设置不同的通信名字
   * @param {int} moduleIndex 模块序号
   * @param {str} name 通信名字
   */
  init(moduleIndex, name = "public") {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(name);
    name = name.toString().replace(/\'/g, "\\'");
    return client._doCommand(`rfTelecontroller${moduleIndex}.init('${name}')`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(
      `rfTelecontroller${moduleIndex}.get_firmware_version()`
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
      utils.setOnboardRGB(`rfTelecontroller${moduleIndex}`, rgb)
    );
  },
  /**
   * @description 注册接收消息事件，当收到消息的时候会触发事件并接收到数据，返回类型为float
   * @param  {int} moduleIndex 模块序号
   */
  regMsgReceived(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(
      `rfTelecontroller${moduleIndex}`,
      "msg_received",
      callback
    );
  },
  /**
   * @description 注销接收消息事件
   * @param  {int} moduleIndex 模块序号
   */
  unregMsgReceived(moduleIndex) {
    client.eventUnregister(`rfTelecontroller${moduleIndex}`, "msg_received");
  }
};
