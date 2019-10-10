const io = require("socket.io-client");

let eventCallback = {};
let socket = null;

let eventTarget = 0;

let resetCallbacks = [];
const runCommandErrorListeners = [];
let connectSuccessListeners = [];
let disconnectListeners = [];
let onOriginDataReceivedCallback = null;

function addResetListener(callback) {
    if (callback) {
        resetCallbacks.push(callback);
    }
}

function clearResetListener() {
    resetCallbacks = [];
}

/**
 * 执行命令出错的事件监听
 */
function addRunCommandErrorListener(cb) {
    if (typeof cb === "function") {
        runCommandErrorListeners.push(cb);
    }
}

/**
 * 可以正常通信的事件监听
 */
function addConnectSuccessListener(cb) {
    if (typeof cb === "function") {
        connectSuccessListeners.push(cb);
    }
}

/**
 * 不能正常通信的回调事件
 */
function addDisconnectListener(cb) {
    if (typeof cb === "function") {
        disconnectListeners.push(cb);
    }
}

function setOnOriginDataReceivedCallback(cb) {
    onOriginDataReceivedCallback = cb;
}

let inited = false;

const init = cb => {
    if (inited) {
        return;
    }
    socket = io("ws://localhost:8082", { reconnection: true });
    inited = true;
    addConnectSuccessListener(cb);
    eventTarget = 0;
    eventCallback = {};
    socket.on("event", data => {
        try {
            let obj = JSON.parse(data);
            let value = obj.value;
            if (obj.type == "event") {
                if (obj.valuetype == "string") {
                    //
                } else if (obj.valuetype == "list") {
                    value = value.split(",");
                } else {
                    value = value.toLowerCase();
                    if (value === "true" || value === "false") {
                        value = value === "true";
                    } else {
                        num = Number(value);
                        if (!isNaN(num)) {
                            value = num;
                        }
                    }
                }
            } else {}

            key = `${obj.target}`;
            eventCallback[key] && eventCallback[key]({ value: value });
        } catch (error) {
            console.error(data);
            return;
        }
    });

    /**
     * 消息通道建立成功
     */
    socket.on("mfe-normal-communication", () => {
        console.log("消息通道建立成功");
        connectSuccessListeners.forEach(cb => cb());
    });

    /**
     * 串口连接失败的通知
     */
    socket.on("mfe-fail-connect-serial", () => {
        console.log("串口连接失败");
        disconnectListeners.forEach(cb => cb());
    });
    /**
     * 命令执行失败的通知
     */
    socket.on("mfe-error-communication", err => {
        console.log("执行出错");
        runCommandErrorListeners.forEach(cb => cb(err));
    });

    /**
     * socket连接成功的回调
     */
    socket.once("connect", function() {
        console.log("连接服务器成功");
        connectSuccessListeners.forEach(cb => cb());
    });

    socket.on("disconnect", function() {
        console.log("与服务器断开");
        disconnectListeners.forEach(cb => cb());
    });

    socket.on("reconnect", function() {
        connectSuccessListeners.forEach(cb => cb());
        console.log("重新连接到服务器");
    });

    socket.on("mfe-data", data => {
        if (data && data.indexOf(">>>") === -1) {
            onOriginDataReceivedCallback && onOriginDataReceivedCallback(data.trim());
        }
    });

    socket.on("reset", () => {
        connectSuccessListeners.forEach(cb => cb());
        resetCallbacks.forEach(callback => {
            callback();
        });
    });
};

const getConnectedModuleNames = () => {
    return doReport("system.getModuleInformation()");
};

const doReport = cmd => {
    return new Promise((resolve, reject) => {
        socket.emit("mfe-reporter", cmd, err => {
            if (err) {
                reject(err);
                return;
            }
            let timeout = setTimeout(() => {
                console.log(`超时,获取值失败 >> ${cmd}`);
                reject("`超时,获取值失败");
            }, 3000);
            socket.once(cmd, data => {
                clearTimeout(timeout);

                if (data === "wonderbits_failed") {
                    console.log(`获取值失败 >> ${cmd}`);
                    reject("获取值失败");
                    return;
                }

                let value = data;
                if (value) {
                    value = value.toLowerCase();
                    if (value === "true" || value === "false") {
                        value = value === "true";
                    }
                }
                resolve(value);
            });
        });
    });
};

const doCommand = cmd => {
    return new Promise((resolve, reject) => {
        socket.emit("mfe-message", cmd, err => {
            if (err) {
                reject(err);
                return;
            }
            let timeout = setTimeout(() => {
                console.log(`超时, 发送命令失败 >> ${cmd}`);
                reject("超时, 发送命令失败");
            }, 3000);
            socket.once(cmd, data => {
                clearTimeout(timeout);
                if (data === "wonderbits_failed") {
                    console.log(`发送命令失败 >> ${cmd}`);
                    reject("发送命令失败");
                    return;
                }
                resolve(data);
            });
        });
    });
};

const eventRegister = (moduleName, source, trigger, value, internal, callback) => {
    let triggerValue = Number(trigger);
    if (isNaN(triggerValue)) {
        triggerValue = `'${trigger}'`
    }
    socket.emit(
        "mfe-message",
        `${moduleName}._register.${source}(${eventTarget},${triggerValue}, ${value}, ${internal})`
    );
    // console.log("event", `${moduleName}._register.${source}(${eventTarget},'${trigger}', ${value}, ${internal})`)
    eventCallback[`${eventTarget}`] = callback;
    eventTarget++;
};

// const eventUnregister = (moduleName, source) => {
//   socket.emit("mfe-message", `${moduleName}.ungister.${source}`);
//   eventCallback[`${moduleName}.${source}`] && delete eventCallback[`${moduleName}.${source}`];
// };

module.exports = {
    init,
    doReport,
    doCommand,
    getConnectedModuleNames,
    eventRegister,
    setOnOriginDataReceivedCallback,
    addResetListener,
    clearResetListener,
    addConnectSuccessListener,
    addDisconnectListener,
    addRunCommandErrorListener
};