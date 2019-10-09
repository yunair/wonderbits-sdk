module.exports = {
    initConnection: require('./client').default.init,
    setOnOriginDataReceivedCallback: require('./client').default.setOnOriginDataReceivedCallback,
    getConnectedModuleNames: require('./client').default.getConnectedModuleNames,
    addResetListener: require("./client").default.addResetListener,
    clearResetListener: require("./client").default.clearResetListener,
    addDisconnectListener: require('./client').default.addDisconnectListener,
    addConnectSuccessListener: require('./client').default.addConnectSuccessListener
}