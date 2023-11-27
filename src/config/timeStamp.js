
export default function timeStamp(time,type){
    var date = '';
    if(time.length == 10){
        date = new Date(time * 1000);
    }else{
        date = new Date(time);
    }
    var year = date.getFullYear();//年份
    var month = date.getMonth() + 1;//月份
    var dataTime = date.getDate();//日期

    var monthTxt = '';
    switch (month) {
        case 1:
            monthTxt = 'Jan'
            break;
        case 2:
            monthTxt = 'Feb'
            break;
        case 3:
            monthTxt = 'Mar'
            break;
        case 4:
            monthTxt = 'Apr'
            break;
        case 5:
            monthTxt = 'May'
            break;
        case 6:
            monthTxt = 'June'
            break;
        case 7:
            monthTxt = 'July'
            break;
        case 8:
            monthTxt = 'August'
            break;
        case 9:
            monthTxt = 'Sep'
            break;
        case 10:
            monthTxt = 'Oct'
            break;
        case 11:
            monthTxt = 'Nov'
            break;
        case 12:
            monthTxt = 'Dec'
            break;
        default:
            break;
    }
    
    if(type == 'en'){//获取英文月份
        return year+'/'+monthTxt+'/'+dataTime
    }

    
}