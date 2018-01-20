function urlParse() {
    let url = window.location.search;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
}

const setStore = (name, content) => {
    if (!name) {
        return;
    }
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.sessionStorage.setItem(name, content);
};

const getStore = name => {
    if (!name) {
        return;
    }
    return window.sessionStorage.getItem(name);
};

const removeStore = name => {
    if (!name) {
        return;
    }
    window.sessionStorage.removeItem(name);
};

const formatDate = function(date, fmt) {
    if (/(y+)/g.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : (('00' + str).substr(str.length)));
        }
    }
    return fmt;
};
const getZero = (data) => {
    return data < 10 ? '0' + data : data;
};
const getDate = () => {
    let currentTime = new Date();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth() + 1;
    let day = currentTime.getDate();
    let strDate = year + '-' + getZero(month) + '-' + getZero(day);
    return strDate;
};
const trim = (value) => {
     return value.replace(/(^\s*)|(\s*$)/g, '');
};

const setTitle = (t) => {
    document.title = t;
    let i = document.createElement('iframe');
    // i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function() {
        setTimeout(function() {
            i.remove();
        }, 9);
    };
    document.body.appendChild(i);
};

// const chinaMobile = /^134[0-8]\d{7}$|^(?:13[5-9]|147|15[0-27-9]|178|18[2-478])\d{8}$/;
// const chinaUnion = /^(?:13[0-2]|145|15[56]|176|18[56])\d{8}$/;
// const chinaTele = /^(?:133|153|177|18[019])\d{8}$/;
// const otherOperator = /^17[0135678]\d{8}$/;
const mobileFull = /^(13[0-9]|14[5|7]|15[012356789]|17[0135678]|18[0-9])\d{8}$/;

const isMobile = (value) => {
    if (!/^\d{11}$/.test(value)) {
        return false;
    }
    return mobileFull.test(value);
};

const isFixedLine = (value) => {
    return /^0\d{2,3}\d{7,8}$/.test(value);
};

const isIdNo = (value) => {
    value = value.toUpperCase();
    if (/^\d{6}(18|19|20){0,1}\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/.test(value) === false) {
        return false;
    }
    let area = {11: '北京', 12: '天津', 13: '河北', 14: '', 15: '内蒙古', 21: '辽宁', 22: '吉林', 23: '黑龙江 ', 31: '上海', 32: '江苏', 33: '浙江', 34: '安徽', 35: '福建', 36: '江西', 37: '山东', 41: '河南', 42: '湖北', 43: '湖南', 44: '广东', 45: '广西', 46: '海南', 50: '重庆', 51: '四川', 52: '贵州', 53: '云南', 54: '西藏', 61: '陕西', 62: '甘肃', 63: '青海', 64: '宁夏', 65: '新疆', 71: '台湾', 81: '香港', 82: '澳门', 91: '国外'};
    if (!area[value.substr(0, 2)]) {
        return false;
    }
    if (value.length !== 18) {
        return true;
    }
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    //18位身份证需要验证最后一位校验位
    let sum = 0;
    for (let i = 0; i < value.length - 1; i++) {
        sum += (parseInt(value.substr(i, 1), 10) * factor[i]);
    }
    let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    return parity[sum % 11] + '' === value.substr(17, 1);
};

const isBankCard = (value) => {
    let length = value.length;
    if (length < 12) {
        //长度必须大于12位
        return false;
    }
    if (!/^\d+$/.test(value)) {
        //必须全是数字
        return false;
    }
    let cardNoArr = [];
    for (let i = 0; i < length; i++) {
        cardNoArr.push(parseInt(value.substr(i, 1)));
    }
    for (let i = length - 2; i >= 0; i -= 2) {
        cardNoArr[i] <<= 1;
        cardNoArr[i] = parseInt(cardNoArr[i] / 10) + cardNoArr[i] % 10;
    }
    let sum = 0;
    for (let i = 0; i < length; i++) {
        sum += cardNoArr[i];
    }
    return sum % 10 === 0;
};

const isEmail = (value) => {
    // return /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$/.test(value);
    return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value);
};
// const isLink = (value) => {
//     return /^(http|https|ftp)://([a-zA-Z0-9.\-]+(:[a-zA-Z0-9.&%$\-]+)*@)?((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.[a-zA-Z]{2,4})(\:[0-9]+)?(/[^/][a-zA-Z0-9\.\,\?\'\\/\+&%\$#\=~_\-@]*)*$/.test(value);
// };

const chnName = (value) => {
    return /^[\u4E00-\u9FFFA-Za-z0-9]{2,}$/.test(value);
};
const isChinese = (value) => {
    return /^[\u4E00-\u9FFF]{0,}$/.test(value);
};
const dateFormat = function(time, format) {
    var t = new Date(time);
    var tf = function(i) { return (i < 10 ? '0' : '') + i; };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
        switch (a) {
            case 'yyyy':
                return tf(t.getFullYear());
                break;
            case 'MM':
                return tf(t.getMonth() + 1);
                break;
            case 'mm':
                return tf(t.getMinutes());
                break;
            case 'dd':
                return tf(t.getDate());
                break;
            case 'HH':
                return tf(t.getHours());
                break;
            case 'ss':
                return tf(t.getSeconds());
                break;
        };
    });
};

const password = (value) => {
    return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$|^\d{6,12}$/.test(value);
};
const isNumber = (value) => {
    return /^[0-9]+.?[0-9]*$/.test(value);
};
const toNumber = (value) => {
    return Number(value);
};
export {
    urlParse,
    setStore,
    getStore,
    removeStore,
    formatDate,
    setTitle,
    isMobile,
    chnName,
    isIdNo,
    isBankCard,
    isEmail,
    dateFormat,
    isFixedLine,
    isChinese,
    trim,
    password,
    isNumber,
    getDate,
    toNumber
};

