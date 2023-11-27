const myStorage = (function () {
    let storage = window.localStorage;
    let ms = "mystorage";
    if (!storage) {
        console.log('浏览器不支持localStorage');
        return false;
    }
    function init() {
        storage.setItem(ms, '{"data":{}}');
    }
    return {
        get(key) {
            //读取
            let data = storage.getItem(ms);
            if (!data) return false;
            data = JSON.parse(data);
            return data.data[key];
        },
        set(key, val) {
            let data = storage.getItem(ms);
            if (!data) {
                init();
                data = storage.getItem(ms);
            }
            data = JSON.parse(data);
            data.data[key] = val;
            storage.setItem(ms, JSON.stringify(data));
        },
        remove(key) {
            let data = storage.getItem(ms);
            if (!data) return false;
            data = JSON.parse(data);
            delete data.data[key];
            storage.setItem(ms, JSON.stringify(data));
        },
        clear() {
            storage.removeItem(ms);
        }
    }
}());
export default myStorage;