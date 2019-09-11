/**
 * 时间格式化
 * 其中的 yyyy | MM | dd | hh | mm 是分别匹配 年 | 月 | 日 | 时 | 分 的关键字
 * 。其中的连字符是可以随意替换的，只展示年月将其他关键字去掉即可
 * yyyy-MM-dd -> 2019年09月7日
 * hh-mm -> 16分53秒
 * @param {Date,String,Number} oldDate 
 * @param {yyyy-MM-dd hh:mm} fmt  
 */
export function formatDate(oldDate, fmt) {
    let date = new Date()
    if (typeof oldDate === 'string' || typeof oldDate === 'number') {
        date = new Date(+oldDate)
    } else {
        date = oldDate
    }
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }

    function padLeftZero(str) {
        return ('00' + str).substr(str.length)
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}
/**
 * 以“天”为单位获取响应的时间戳
 * 12 个小时之前的时间 -> setDate(-.5)
 * 24 个小时之前的时间 -> setDate(-1)
 * 三天后的时间 -> setDate(3)
 * @param {*} num 
 */
export function setDate(num) {
    return Date.now() + num * 24 * 60 * 60 * 1000
}

/**
 *  防抖
 * @param {fn} func 
 * @param {ms} wait 
 */
export function debounce(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);

        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait);
    }
}
/**
 * 节流
 * @param {fn} func 
 * @param {ms} wait 
 */
export function throttle(func, wait) {
    let previous = 0;
    return function () {
        let now = Date.now();
        let context = this;
        let args = arguments;
        if (now - previous > wait) {
            func.apply(context, args);
            previous = now;
        }
    }
}
/**
 * 获取 URL 中的参数
 * http://xuyuechao.top?a=3&b=5&c=8888
 * getUrlParams('a') -> 3
 * @param {string} param 
 */
export function getUrlParams(param) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == param) {
            return pair[1];
        }
    }
    return (false);
}
/**
 * 深度拷贝
 * @param {object} obj 
 */
export function deepClone(obj) {
    function isClass(o) {
        if (o === null) return "Null";
        if (o === undefined) return "Undefined";
        return Object.prototype.toString.call(o).slice(8, -1);
    }
    var result;
    var oClass = isClass(obj);
    if (oClass === "Object") {
        result = {};
    } else if (oClass === "Array") {
        result = [];
    } else {
        return obj;
    }
    for (var key in obj) {
        var copy = obj[key];
        if (isClass(copy) == "Object") {
            result[key] = arguments.callee(copy); //递归调用    
        } else if (isClass(copy) == "Array") {
            result[key] = arguments.callee(copy);
        } else {
            result[key] = obj[key];
        }
    }
    return result;
}

/**
 * 数组降维度 m 端适用
 * @param {array} ary 
 */
export function arrayCompress(ary) {
    return ary.flat(Infinity)
}
/**
 * 数组最小值
 * @param {array} array 
 */
export function small(array) {
    return Math.min.apply(Math, array);
}
/**
 * 数组最大值
 * @param {array} array 
 */
export function large(array) {
    return Math.max.apply(Math, array);
}
/**
 * 是否相等
 * epsEqu(1.1+0.1,1.2)
 * @param {number} x 
 * @param {*} y 
 */
function epsEqu(x, y) {
    return Math.abs(x - y) < Math.pow(2, -53);
}

// 手机端判断浏览器类型
export const BrowserInfo = {
    isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
    isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
    isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
    isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
    isAli: Boolean(navigator.userAgent.match(/AlipayClient/ig)),
    isPhone: Boolean(/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent))
}