module.exports = {
    initConnection: require('./client').init,
    doReport: require('./client').doReport,
    doCommand: require('./client').doCommand,
    setOnOriginDataReceivedCallback: require('./client').setOnOriginDataReceivedCallback,
    getConnectedModuleNames: require('./client').getConnectedModuleNames,
    addResetListener: require("./client").addResetListener,
    clearResetListener: require("./client").clearResetListener,
    addDisconnectListener: require('./client').addDisconnectListener,
    addConnectSuccessListener: require('./client').addConnectSuccessListener
}