export default (function () {
    return {
        toFix(number, place) {
            if (!isNaN(number)) {
                let n = (number * 1).toFixed(place ? place : 8);
                return n;
            }
        },
        getFullNum(num) {
            //处理非数字
            if (isNaN(num)) { return num };

            //处理不需要转换的数字
            var str = '' + num;
            if (!/e/i.test(str)) { return num; };

            //先获取到精确的小数位
            var fixed = ('' + num).match(/\d+$/)[0];

            //拿到保留指定的小数
            return new Number(num).toFixed(fixed);
        }
    }
}());