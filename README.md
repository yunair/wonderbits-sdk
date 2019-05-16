# WonderBits SDK

## 使用方法

### 第一步

安装 WonderBits JS SDK

```js
npm install wonderbits-sdk
或者
npm install git+https://github.com/daejong123/wonderbits-sdk.git
```

### 第二步

根据对应平台选择接入方式:

安装`MFElink`软件并打开的方式:

- [win 64 位](https://pan.baidu.com/s/16FUR-z6bH0-YOnGBxMc1og)
- [win 32 位](https://pan.baidu.com/s/1xozl-A_m8LLqJXm5IsxTcg)
- [mac](https://pan.baidu.com/s/1zcCbBiC4hYM2mjCFTKavVw)

集成开发 SDK 的方式:

- [Android](https://github.com/yunair/wonderbits/wiki/%E6%8E%A5%E5%85%A5JS-SDK)

### 第三步

初始化 WonderBits JS SDK

```js
const wonderBitsSdk = require("wonderbits-sdk");
wonderBitsSdk.initConnection(() => {
  console.log("初始化成功");
});
```

### 第四步

使用具体模块。

左侧为具体模块列表。

主控模块连接电脑，其他模块连接到主控模块上。但是，左侧中任意一种模块可能有多块同时插入主控模块，所以，需要有自己的序号来分辨是该种模块的第几个。

模块序号默认从 1 开始。

当左侧某种模块还未插入到主控时，插入该种模块到主控模块上，此模块的序号会被设为 1。再次插入该种模块，则这两个模块的序号会被随机设为 1 和 2，以此类推。

所以，每个模块方法的第一个参数为模块序号。

了解了模块序号，就可以根据需要，在第三步的回调成功之后，即`console.log("初始化成功");`之后，调用各模块方法

#### 例子

下面就是调用具体模块的形式:

```
wonderBitsSdk.模块名.模块方法
```

具体模块名请参照左侧模块列表。

常用的函数有两类，一类为获取类函数，一类为设置类函数(返回类型均为`Promise`):

获取类函数的例子如下:

> 获取超声波检测的距离值

```js
wonderBitsSdk.ultrasonic.getDistance(1).then(distance => {
  console.log(distance);
});
```

设置类函数的例子如下:

> 设置彩灯颜色

```js
wonderBitsSdk.led.setRgb(1, 255, 0, 0);
```

每个模块的具体方法，请点击左侧模块列表查看.

<br>

### 高级用法说明

#### 监听硬件上传的原始数据

```js
wonderBitsSdk.setOnOriginDataReceivedCallback(data => {
  console.log(data);
});
```

#### 监听硬件复位回调

```js
wonderBitsSdk.addResetListener(() => {
  console.log("reset");
});
```

#### 清除监听硬件复位回调

```js
wonderBitsSdk.clearResetListener();
```

#### 获取连接在板子上的模块

```js
let moduleNames = wonderBitsSdk.getConnectedModuleNames();
```

#### 事件

含义：当指定情况发生时，会收到板子上传的数据，此时会调用注册事件时的`callback(obj)`，将处理后的数据返回。
返回数据的详细类型参见`事件回调`

#### 事件回调

事件将会返回 json
value 的类型根据对应事件值的不同而不同

```json
{ "module": `${moduleName}`, "source": `${sourceName}`, "value": `${value}` }
```
