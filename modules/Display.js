const client = require("../client");
const utils = require("../utils");
/**
 * @module 显示模块/Display
 */
module.exports = {
  /**
   * @description 在某个位置显示内容
   * @param {int} moduleIndex 模块序号
   * @param {int} row 显示行数：1~16
   * @param {int} column 显示列数：1~15
   * @param {str} text 显示内容，可以是字符串，整数，小数
   * @param {int} size 设置显示的大小，默认为小号字体  SIZE_SMALL：小号字体，值为2 SIZE_BIG：大号字体（不支持汉字），值为4
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
   * @description 在指定坐标画一个点 在画点的页使用print函数会导致已经画过的点消失 切换到不同的页码在回到画点的页码也会导致已经画过的点消失
   * @param {int} moduleIndex 模块序号
   * @param {int} x X轴坐标：1~119
   * @param {int} y Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认第1页
   */
  drawDot(moduleIndex, x, y, page = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(x);
    utils.checkNotNull(y);
    utils.checkNotNull(page);
    return client._doCommand(
      `display${moduleIndex}.draw_dot(${x},${y},${page})`
    );
  },
  /**
   * @description 通过给定坐标画线段 在画线的页使用print函数会导致已经画过的线消失 切换到不同的页码在回到画线的页码也会导致已经画过的线消失
   * @param {int} moduleIndex 模块序号
   * @param {int} head_x 起始点X轴坐标：1~119
   * @param {int} head_y 起始点Y轴坐标：1~32
   * @param {int} tail_x 终止点X轴坐标：1~119
   * @param {int} tail_y 终止点Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认第1页
   */
  drawLine(moduleIndex, head_x, head_y, tail_x, tail_y, page = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(head_x);
    utils.checkNotNull(head_y);
    utils.checkNotNull(tail_x);
    utils.checkNotNull(tail_y);
    utils.checkNotNull(page);
    return client._doCommand(
      `display${moduleIndex}.draw_line(${head_x},${head_y},${tail_x},${tail_y},${page})`
    );
  },
  /**
   * @description 画折线图 以上次传入的坐标为起点，本次坐标为终点画线段。如果是首次使用，则只画单个点
   * @param {int} moduleIndex 模块序号
   * @param {int} x X轴坐标：1~119
   * @param {int} y Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认画点在第1页
   */
  drawChart(moduleIndex, x, y, page = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(x);
    utils.checkNotNull(y);
    utils.checkNotNull(page);
    return client._doCommand(
      `display${moduleIndex}.draw_chart(${x},${y},${page})`
    );
  },
  /**
   * @description 转到某页
   * @param {int} moduleIndex 模块序号
   * @param {int} page 页码：1~8
   */
  turnToPage(moduleIndex, page) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(page);
    return client._doCommand(`display${moduleIndex}.turn_to_page(${page})`);
  },
  /**
   * @description 清除某页显示的内容
   * @param {int} moduleIndex 模块序号
   * @param {int} page 清除的页码：1~8  默认第1页
   */
  clearPage(moduleIndex, page = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(page);
    return client._doCommand(`display${moduleIndex}.clear_page(${page})`);
  },
  /**
   * @description 清除全部8页显示的内容
   * @param {int} moduleIndex 模块序号
   * @param {bool} block 阻塞参数：  False: 不阻塞 True: 阻塞
   */
  clearAllPages(moduleIndex, block = false) {
    utils.checkNotNull(moduleIndex);
    block = block ? "True" : "False";
    return client._doCommand(`display${moduleIndex}.clear_all_pages(${block})`);
  },
  /**
   * @description 禁止翻页按键功能 禁止翻页按键功能后将不能通过翻页按键来切换不同页码的显示内容 系统默认开启翻页按键功能
   * @param {int} moduleIndex 模块序号
   */
  disablePageTurning(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.disable_page_turning()`);
  },
  /**
   * @description 开启翻页按键功能 系统默认开启翻页按键功能
   * @param {int} moduleIndex 模块序号
   */
  enablePageTurning(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.enable_page_turning()`);
  },
  /**
   * @description 获取翻页按钮状态
   * @param {int} moduleIndex 模块序号
   * @returns {Promise<int>} 翻页按钮状态 BUTTON_NONE：没有按键按下，值为1 BUTTON_L：左键按下，值为2 BUTTON_R：右键按下，值为4 BUTTON_M：中键按下，值为8
   */
  getButtonState(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doReport(`display${moduleIndex}.get_button_state()`);
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
   * @description 隐藏页码滚动指示条（屏幕右边的白色小点，用于指示当前页码） 系统默认显示页码滚动指示条 隐藏后每行最大显示字符数由15变为16
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
   * @description 禁止自动刷新显示功能 禁止自动刷新后，只能调用刷新函数refresh() 才能改变显示内容 系统默认开启自动刷新显示功能
   * @param {int} moduleIndex 模块序号
   */
  disableAutoRefresh(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.disable_auto_refresh()`);
  },
  /**
   * @description 开启自动刷新显示功能 系统默认开启自动刷新显示功能
   * @param {int} moduleIndex 模块序号
   */
  enableAutoRefresh(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.enable_auto_refresh()`);
  },
  /**
   * @description 更新一次显示内容 在禁止自动刷新显示功能后只能靠此函数来更新显示内容 系统默认开启自动刷新显示功能
   * @param {int} moduleIndex 模块序号
   */
  refresh(moduleIndex) {
    utils.checkNotNull(moduleIndex);
    return client._doCommand(`display${moduleIndex}.refresh()`);
  },
  /**
   * @description 在指定坐标画一个点 画点后始终存在，可以使用清屏擦除 可与print在同一页显示，显示位置冲突时以画点内容为主
   * @param {int} moduleIndex 模块序号
   * @param {int} x X轴坐标：1~119
   * @param {int} y Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认第1页
   */
  drawSaveDot(moduleIndex, x, y, page = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(x);
    utils.checkNotNull(y);
    utils.checkNotNull(page);
    return client._doCommand(
      `display${moduleIndex}.draw_save_dot(${x},${y},${page})`
    );
  },
  /**
   * @description 通过给定坐标画线段 画线后始终存在，可以使用清屏擦除 可与print在同一页显示，显示位置冲突时以画线内容为主
   * @param {int} moduleIndex 模块序号
   * @param {int} head_x 起始点X轴坐标：1~119
   * @param {int} head_y 起始点Y轴坐标：1~32
   * @param {int} tail_x 终止点X轴坐标：1~119
   * @param {int} tail_y 终止点Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认第1页
   */
  drawSaveLine(moduleIndex, head_x, head_y, tail_x, tail_y, page = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(head_x);
    utils.checkNotNull(head_y);
    utils.checkNotNull(tail_x);
    utils.checkNotNull(tail_y);
    utils.checkNotNull(page);
    return client._doCommand(
      `display${moduleIndex}.draw_save_line(${head_x},${head_y},${tail_x},${tail_y},${page})`
    );
  },
  /**
   * @description 画折线图 以上次传入的坐标为起点，本次坐标为终点画线段。如果是首次使用，则只画单个点
   * @param {int} moduleIndex 模块序号
   * @param {int} x X轴坐标：1~119
   * @param {int} y Y轴坐标：1~32
   * @param {int} page 显示页数：1~8  默认画点在第1页
   */
  drawSaveChart(moduleIndex, x, y, page = 1) {
    utils.checkNotNull(moduleIndex);
    utils.checkNotNull(x);
    utils.checkNotNull(y);
    utils.checkNotNull(page);
    return client._doCommand(
      `display${moduleIndex}.draw_save_chart(${x},${y},${page})`
    );
  },
  /**
   * @description 获取当前模块版本号
   * @param  {int} moduleIndex 模块序号
   * @returns {Promise(int)}
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
