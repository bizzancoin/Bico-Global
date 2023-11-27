

function change(t) {
    if (t < 10) {
        return "0" + t;
    } else {
        return t;
    }
}

export default function conversion(timestamp){
    var date = '';
    // //时间戳为10位需*1000，时间戳为13位的话不需乘1000
    if(timestamp.length == 10){
		date = new Date(Number(timestamp) * 1000);
	}else{
		date = new Date(Number(timestamp));
    }

    var Y = date.getFullYear() + '/';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    var D = change(date.getDate()) + ' ';
    var h = change(date.getHours()) + ':';
    var m = change(date.getMinutes()) + ':';
    var s = change(date.getSeconds());
    
    var time = Y + M + D + h + m + s;
    return time;
}
