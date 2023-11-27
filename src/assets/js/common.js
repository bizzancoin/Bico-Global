import myStorage from './myStorage';
// 添加自选
function addCustomList(data) {
    let customList = myStorage.get("customList");
    if (customList && customList.length > 0) {
        customList.map((item, i) => {
            if (
                item.tradcoin == data.tradcoin
            ) {
                customList.splice(i, 1);
            }
        });
        customList.push(data);
        
    } else {
        customList = [];
        customList.push(data);
    }
    myStorage.set("customList", customList);
}
// 移除自选
function removeCustomList(data) {
    let customList = myStorage.get("customList");
    if (customList) {
        customList.map((item, i) => {
            if (item.tradcoin == data.tradcoin && item.maincoin == item.maincoin) {
                customList.splice(i, 1);
            }
        });
    };
    myStorage.set("customList", customList);
    return customList;
};
//加载自选
function loadCustomList() {
    let customList = myStorage.get("customList");
    return customList;
}
// 列表匹配自选
function matchCustomList(rawData) {
    let customList = myStorage.get("customList");
    if (customList && rawData) {
        customList.map((cItem, i) => {
            rawData.map((dItem, j) => {
                if (
                    dItem.coinid == cItem.coinid &&
                    dItem.maincoinid == cItem.maincoinid
                ) {

                    rawData[j].isMyLike = true;
                }
            });
        });
    }
    return rawData;
}
function randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
export { addCustomList, removeCustomList, matchCustomList, randomString }