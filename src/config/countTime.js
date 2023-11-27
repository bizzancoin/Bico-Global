
var countDown = 15;
export default function countTime(value) {//value下单时间
    //获取当前时间
    var date = new Date();
   
    var now = date.getTime();

    var end = Number(value) + Number((countDown * 60 * 1000));//下单时间加倒计时的时间， 换成时间戳(分钟乘以60秒乘以1000)

    //时间差
    var differTime = Number(end) - Number(now);

    //定义变量,h,m,s保存倒计时的时间
    var h, m, s;
    if (differTime > 0) {
        h = Math.floor(differTime / 1000 / 60 / 60);
        m = Math.floor(differTime / 1000 / 60 % 60);
        s = Math.floor(differTime / 1000 % 60);
        var M = m < 10 ? ("0" + m) : m;
        var S = s < 10 ? ("0" + s) : s;


        return M+":"+S
    } else {

        return -1
	}
}