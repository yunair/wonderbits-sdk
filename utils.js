const checkNotNull = (arg) => {
    let param = arg
    if (param == null || param == undefined) {
        throw new Error("参数为空")
    }
    if (isString(param)) {
        param = param.toLowerCase()
        if (param === "null" || param === "undefined") {
            throw new Error("参数为空")
        }
    }
}

const isString = (str) => {
    return (typeof str == 'string') && str.constructor == String;
}

// RGB_R:1,RGB_G:2,RGB_B:3,RGB_LB:4,RGB_Y:5,RGB_P:6,RGB_W:7,RGB_OFF:8
const setOnboardRGB = (moduleName, rgb) => {
    checkNotNull(moduleName)
    checkNotNull(rgb)
    if (rgb < 1 || rgb > 8) {
        throw new Error("参数范围超过限制，范围为1-8")
    }
    return `${moduleName}.set_onboard_rgb(${rgb})`
}


module.exports = {
    checkNotNull,
    setOnboardRGB
}