const io = require("socket.io-client")

let eventCallback = {}
let socket = null;

let resetCallbacks = []
let connectSuccessListeners = []
let disconnectListeners = []
let onOriginDataReceivedCallback = null

function addResetListener(callback) {
    if (callback) {
        resetCallbacks.push(callback)
    }
}

function clearResetListener() {
    resetCallbacks = [];
}

/**
 * 可以正常通信的事件监听
 */
function addConnectSuccessListener(cb) {
    if (typeof cb === 'function') {
        connectSuccessListeners.push(cb)
    }
}

/**
 * 不能正常通信的回调事件
 */
function addDisconnectListener(cb) {
    if (typeof cb === 'function') {
        disconnectListeners.push(cb)
    }
}

function setOnOriginDataReceivedCallback(cb) {
    onOriginDataReceivedCallback = cb
}

let inited = false;

const init = (cb) => {
    if (inited) {
        return;
    }
    socket = io('ws://localhost:8082', { reconnection: true });
    inited = true;
    addConnectSuccessListener(cb);
    socket.on('event', (data) => {
        try {
            let obj = JSON.parse(data)
            let value = obj.value
            if (obj.type == "event") {
                if (obj.valuetype == "string") {
                    //
                } else {
                    value = value.toLowerCase()
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

            key = `${obj.module}.${obj.source}`;
            eventCallback[key] && eventCallback[key]({ "module": obj.module, "source": obj.source, "value": value });
        } catch (error) {
            console.error(data);
            return
        }
    });

    /**
     * 串口连接成功的通知
     */
    socket.on('mfe-success-connect-serial', () => {
        console.log('串口连接成功')
        connectSuccessListeners.forEach(cb => cb())
    })

    /**
     * 串口连接失败的通知
     */
    socket.on('mfe-fail-connect-serial', () => {
        console.log('串口连接失败');
        disconnectListeners.forEach(cb => cb());
    })

    /**
     * socket连接成功的回调
     */
    socket.on('connect', function() {
        connectSuccessListeners.forEach(cb => cb())
    });

    socket.on('disconnect', function() {
        console.log('与服务器断开');
        disconnectListeners.forEach(cb => cb())
    });

    socket.on('reconnect', function() {
        connectSuccessListeners.forEach(cb => cb())
        console.log('重新连接到服务器');
    });

    socket.on("mfe-data", (data) => {
        if (data && data.indexOf('>>>') === -1) {
            onOriginDataReceivedCallback && onOriginDataReceivedCallback(data.trim());
        }
    });

    socket.on("reset", () => {
        connectSuccessListeners.forEach(cb => cb())
        resetCallbacks.forEach(callback => {
            callback();
        });
    })
}

const getConnectedModuleNames = () => {
    return _doReport("system.getModuleInformation()");
}

const _doReport = (cmd) => {
    return new Promise((resolve, reject) => {
        socket.emit('mfe-reporter', cmd, (err) => {
            if (err) {
                resolve(err);
                return;
            }
            let timeout = setTimeout(() => {
                console.log(`获取值失败 >> ${cmd}`)
                resolve("")
            }, 3000);
            socket.once(cmd, (data) => {
                clearTimeout(timeout)
                let value = data
                if (value) {
                    value = value.toLowerCase()
                    if (value === "true" || value === "false") {
                        value = value === "true";
                    }
                }
                resolve(value);
            });
        });
    });
}

const _doCommand = (cmd) => {
    return new Promise((resolve, reject) => {
        socket.emit('mfe-message', cmd, (err) => {
            if (err) {
                resolve(err);
                return;
            }
            let timeout = setTimeout(() => {
                console.log(`发送命令失败 >> ${cmd}`)
                resolve("")
            }, 3000);
            socket.once(cmd, (data) => {
                clearTimeout(timeout)
                resolve(data);
            });
        });
    });
}

const _eventRegister = (moduleName, source, callback) => {
    socket.emit('mfe-message', `${moduleName}.register.${source}()`);
    eventCallback[`${moduleName}.${source}`] = callback;
}

const eventUnregister = (moduleName, source) => {
    socket.emit('mfe-message', `${moduleName}.ungister.${source}`);
    delete eventCallback[`${moduleName}.${source}`]
}

module.exports = {
    init,
    _doReport,
    _doCommand,
    getConnectedModuleNames,
    _eventRegister,
    eventUnregister,
    setOnOriginDataReceivedCallback,
    addResetListener,
    clearResetListener,
    addConnectSuccessListener,
    addDisconnectListener
}