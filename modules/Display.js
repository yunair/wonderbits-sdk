const client = require("../client");
const utils = require("../utils");
/**
 * @module 显示模块/Display
 */
module.exports = {
  /**
   * @description 固定位置显示
   * @param {int} moduleIndex 模块序号
   * @param {int} row 显示行数：1~16
   * @param {int} column 显示列数：1~15
   * @param {str} text 显示内容，可以是字符串，整数，小数
   * @param {int} size 设置显示的大小，不填写此参数默认为小号字体  SIZE_SMALL为小号字体，值为2 SIZE_BIG为大号字体不支持汉字，值为4
   */
  print(moduleIndex, row, column, text, size = 2) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(row);
    utils.checkNotNull(column);
    utils.checkNotNull(text);
    utils.checkNotNull(size);
    text = text.toString().replace(/\'/g, "\\'");
    return client._doCommand(
      `display${moduleIndex}.print(${row},${column},'${text}',${size})`
    );
  },
  /**
   * @description 画点
   * @param {int} moduleIndex 模块序号
   * @param {int} x X轴坐标：1~120
   * @param {int} y Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认画点在第1页
   * @param {int} save 设置画点内容是否保存，不填写此参数默认为不保存  DRAW_NORMAL 为不保存画点内容，值为0 1. 当某页显示画点内容，转到其他页码再转回曾显示画点的页码画点内容将不存在 2. 不能与print在同一页显示   DRAW_SAVED 为保存画点内容，值为1 1. 当某页显示画点内容，转到其他页码再转回曾显示画点的页码画点内容仍会存在 2. 可与print在同一页显示，显示位置冲突时以画点内容为主 3. 使用清屏函数可以清除这样的点
   * @param {int} color 设置显示点的颜色  有色点值为1 无色点值为0
   */
  drawDot(moduleIndex, x, y, page = 1, save = 0, color = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(x);
    utils.checkNotNull(y);
    utils.checkNotNull(page);
    utils.checkNotNull(save);
    utils.checkNotNull(color);
    return client._doCommand(
      `display${moduleIndex}.draw_dot(${x},${y},${page},${save},${color})`
    );
  },
  /**
   * @description 画线
   * @param {int} moduleIndex 模块序号
   * @param {int} head_x 起始点X轴坐标：1~120
   * @param {int} head_y 起始点Y轴坐标：1~32
   * @param {int} tail_x 终止点X轴坐标：1~120
   * @param {int} tail_y 终止点Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认画线在第1页
   * @param {int} save 设置画点内容是否保存，不填写此参数默认为不保存  DRAW_NORMAL 为不保存画点内容，值为0 1. 当某页显示画点内容，转到其他页码再转回曾显示画点的页码画点内容将不存在 2. 不能与print在同一页显示   DRAW_SAVED 为保存画点内容，值为1 1. 当某页显示画点内容，转到其他页码再转回曾显示画点的页码画点内容仍会存在 2. 可与print在同一页显示，显示位置冲突时以画点内容为主 3. 使用清屏函数可以清除这样的点
   * @param {int} color 设置显示点的颜色  有色点值为1 无色点值为0
   */
  drawLine(
    moduleIndex,
    head_x,
    head_y,
    tail_x,
    tail_y,
    page = 1,
    save = 0,
    color = 1
  ) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(head_x);
    utils.checkNotNull(head_y);
    utils.checkNotNull(tail_x);
    utils.checkNotNull(tail_y);
    utils.checkNotNull(page);
    utils.checkNotNull(save);
    utils.checkNotNull(color);
    return client._doCommand(
      `display${moduleIndex}.draw_line(${head_x},${head_y},${tail_x},${tail_y},${page},${save},${color})`
    );
  },
  /**
   * @description 根据点坐标画折线 使用此函数会以上一次调用的坐标为起点，本次的坐标为终点划线 如果是第一次使用则是在该坐标画一个点
   * @param {int} moduleIndex 模块序号
   * @param {int} x X轴坐标：1~120
   * @param {int} y Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认画点在第1页
   * @param {int} save 设置画点内容是否保存，不填写此参数默认为不保存  DRAW_NORMAL 为不保存画点内容，值为0 1. 当某页显示画点内容，转到其他页码再转回曾显示画点的页码画点内容将不存在 2. 不能与print在同一页显示   DRAW_SAVED 为保存画点内容，值为1 1. 当某页显示画点内容，转到其他页码再转回曾显示画点的页码画点内容仍会存在 2. 可与print在同一页显示，显示位置冲突时以画点内容为主 3. 使用清屏函数可以清除这样的点
   * @param {int} color 设置显示点的颜色  有色点值为1 无色点值为0
   */
  drawChart(moduleIndex, x, y, page = 1, save = 0, color = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(x);
    utils.checkNotNull(y);
    utils.checkNotNull(page);
    utils.checkNotNull(save);
    utils.checkNotNull(color);
    return client._doCommand(
      `display${moduleIndex}.draw_chart(${x},${y},${page},${save},${color})`
    );
  },
  /**
   * @description 转到某页
   * @param {int} moduleIndex 模块序号
   * @param {int} page 跳转到的页码：1~8
   */
  turnToPage(moduleIndex, page) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(page);
    return client._doCommand(`display${moduleIndex}.turn_to_page(${page})`);
  },
  /**
   * @description 清除某页
   * @param {int} moduleIndex 模块序号
   * @param {int} page 清除的页码：1~8  默认清除第1页
   */
  clearPage(moduleIndex, page = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(page);
    return client._doCommand(`display${moduleIndex}.clear_page(${page})`);
  },
  /**
   * @description 清除全部8页屏幕的内容
   * @param {int} moduleIndex 模块序号
   * @param {bool} block 阻塞参数：  False表示不阻塞 True表示阻塞
   */
  clearAllPages(moduleIndex, block = false) {
    utils.checkNotNull(moduleIndex);
    block = block ? "True" : "False";
    return client._doCommand(`display${moduleIndex}.clear_all_pages(${block})`);
  },
  /**
   * @description 该函数用于获取翻页按钮状态
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 翻页按钮状态 BUTTON_NONE：没有按键按下，值为1 BUTTON_L：左键按下，值为2 BUTTON_R：右键按下，值为4 BUTTON_M：中键按下，值为8
   */
  getButtonState(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`display${moduleIndex}.get_button_state()`);
  },
  /**
   * @description 禁止翻页按键功能 在开启翻页按键功能的情况下使用该函数可以禁止翻页按键功能，禁止翻页按键功能后将不能通过翻页按键来切换不同页码的显示内容，只能使用turn_to_page函数来切换页码 系统默认开启翻页按键功能
   * @param {int} moduleIndex 模块序号
   */
  disablePageTurning(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.disable_page_turning()`);
  },
  /**
   * @description 开启翻页按键功能 在禁止翻页按键功能的情况下使用该函数可以开启翻页按键功能 系统默认开启翻页按键功能
   * @param {int} moduleIndex 模块序号
   */
  enablePageTurning(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.enable_page_turning()`);
  },
  /**
   * @description 设置显示方向为翻转显示方向，使用该函数后显示内容将会进行180°翻转
   * @param {int} moduleIndex 模块序号
   */
  setDirectionReverse(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.set_direction_reverse()`);
  },
  /**
   * @description 设置显示方向为系统默认显示方向
   * @param {int} moduleIndex 模块序号
   */
  setDirectionRegular(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.set_direction_regular()`);
  },
  /**
   * @description 隐藏页码滚动指示条，使用该函数后将不会再显示内容界面看到页码滚动指示条 系统默认显示页码滚动指示条
   * @param {int} moduleIndex 模块序号
   */
  hideScrollbar(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.hide_scrollbar()`);
  },
  /**
   * @description 显示页码滚动指示条 系统默认显示页码滚动指示条
   * @param {int} moduleIndex 模块序号
   */
  showScrollbar(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.show_scrollbar()`);
  },
  /**
   * @description 禁止自动刷新显示功能 在禁止自动刷新显示功能后只能靠手动刷新显示界面实现更新显示内容 系统默认开启自动刷新显示功能
   * @param {int} moduleIndex 模块序号
   */
  disableAutoRefresh(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.disable_auto_refresh()`);
  },
  /**
   * @description 开启自动刷新显示功能 在开启自动刷新显示功能后系统将智能识别当前显示内容是否需要更新，如果需要则会更新显示内容 系统默认开启自动刷新显示功能
   * @param {int} moduleIndex 模块序号
   */
  enableAutoRefresh(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.enable_auto_refresh()`);
  },
  /**
   * @description 更新显示内容 在禁止自动刷新显示功能后只能靠该函数来实现手动刷新显示界面实现更新显示内容 系统默认开启自动刷新显示功能
   * @param {int} moduleIndex 模块序号
   */
  refresh(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.refresh()`);
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise<int>}
   */
  getFirmwareVersion(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`display${moduleIndex}.get_firmware_version()`);
  },
  /**
   * @description 设置板载LED的颜色
   * @param  {int} moduleIndex 模块序号
   * @param  {int} rgb '红': 1,'绿':2,'蓝':3,'浅蓝':4,'黄':5,'紫':6,'白': 7,'不亮': 8
   */

  setOnboardRGB(moduleIndex, rgb) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(rgb);
    return client._doCommand(utils.setOnboardRGB(`display${moduleIndex}`, rgb));
  },
  /**
   * @description 注册翻页按键值上传，当翻页按键状态改变会触发事件并接收到数据，返回类型为int
   * @param  {int} moduleIndex 模块序号
   */
  regButton(moduleIndex, callback) {
    utils.checkNotNull(moduleIndex);
    client._eventRegister(`display${moduleIndex}`, "button", callback);
  },
  /**
   * @description 注销翻页按键值上传
   * @param  {int} moduleIndex 模块序号
   */
  unregButton(moduleIndex) {
    client.eventUnregister(`display${moduleIndex}`, "button");
  }
};
