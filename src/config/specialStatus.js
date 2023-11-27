
import Vue from 'vue'

export default function specialStatus(codeStatus,minute,callback){
    var tip = "";
    var lang = sessionStorage.getItem('language');
    console.log(lang)
	switch (codeStatus){
		case 4011:
            var txt = '';
            
			if(lang == 'en'){
				txt = 'Three cancellations today, unable to purchase within '+minute+' minutes'
			}else if(lang == 'jp'){
				txt = '今日は3回キャンセルしましたが、'+minute+'分以内は購入できません。'
			}else if(lang == 'ko'){
				txt = '오늘 3 회 취소'+minute+'분간 구 매 불가'
			}else if(lang == 'tc'){
				txt = '今日三次取消 '+minute+' 分鐘內無法繼續購買'
			}else{
				txt = '今日三次取消'+minute+'分钟内无法继续购买'
			}
			tip = txt;
			break;
		case 4012:
			var txt = '';
			if(lang == 'en'){
				txt = 'Cannot continue to purchase within '+minute+' minutes'
			}else if(lang == 'jp'){
				txt = minute+' 分以内は継続できません。'
			}else if(lang == 'ko'){
				txt = minute+' 분 동안 계속 구 매 불가 입 니 다.'
			}else if(lang == 'tc'){
				txt = minute+' 分鐘內無法繼續購買'
			}else{
				txt = minute+'分钟内无法继续购买'
			}
			tip = txt;
			break;
        case 21001:
            var txt = '';
            if(lang == 'en'){
                txt = 'You have cancelled twice today. If you cancel again, you cannot place an order within '+minute+' minutes. Do you want to continue to cancel'
            }else if(lang == 'jp'){
                txt = ' 今日はもう二回キャンセルしました。もし再度キャンセルしたら、'+minute+' 分以内に注文できません。キャンセルを続けますか？'
            }else if(lang == 'ko'){
                txt = '당신 은 오늘 이미 2 회 취 소 했 습 니 다. 다시 취소 하면 '+minute+' 분 내 주문 구 매 불가, 계속 취소 하 시 겠 습 니까?'
            }else if(lang == 'tc'){
                txt = ' 您今日已取消2次，如再次取消，'+minute+'分鐘內無法下單購買，是否繼續取消'
            }else{
                txt = '您今日已取消2次，如再次取消，'+minute+'分钟内无法下单购买，是否继续取消'
            }
            tip = txt;
            break;
        default:
            break;
    }
    callback(tip)
}