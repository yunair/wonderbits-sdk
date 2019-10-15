# WonderBits SDK

## 使用方法

### 第一步

安装 WonderBits JS SDK

```js
npm install wonderbits-sdk
或者
npm install git+https://github.com/yunair/wonderbits-sdk
```

### 第二步

根据对应平台选择接入方式:

安装`MFElink`软件并打开的方式:

- [win 64 位](https://pan.baidu.com/s/16FUR-z6bH0-YOnGBxMc1og)
- [win 32 位](https://pan.baidu.com/s/1xozl-A_m8LLqJXm5IsxTcg)
- [mac](https://pan.baidu.com/s/1zcCbBiC4hYM2mjCFTKavVw)

集成开发 SDK 的方式:

- [Android BLE](https://github.com/yunair/wonderbits/wiki/BLE-%E6%8E%A5%E5%85%A5JS-SDK)
- [Android USB](https://github.com/yunair/wonderbits/wiki/USB-%E6%8E%A5%E5%85%A5JS-SDK)

### 第三步

初始化 WonderBits JS SDK

```js
const wonderBitsSdk = require("wonderbits-sdk");
wonderBitsSdk.initConnection(() => {
  console.log("初始化成功");
});
```

### 第四步

使用需要的模块，调用

- `doReport`
- `doCommand`

来给硬件发送指令。

#### 例子

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
{ "module": ${moduleName}, "target": ${target}, "value": ${value}}
```
