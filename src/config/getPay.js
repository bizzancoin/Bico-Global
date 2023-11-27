
import i18n from '@/i18n/index'

export default function getPay(payMethod){
    var txt = '',
        img = '';
    switch (payMethod) {
        case 'ALI_PAY':
            txt = i18n.t('payMethods.alipay');
            img = require('@/assets/aiplay_icon.png');
            break;
        case 'WE_CHAT':
            txt = i18n.t('payMethods.wechat');
            img = require('@/assets/wechat_icon.png');
            break;
        case 'BANK':
            txt = i18n.t('payMethods.bank');
            img = require('@/assets/bank_icon.png');
            break;
        case 'PAYPAL':
            txt = 'PayPal';
            img = require('@/assets/paypal_icon.png');
            break;
        default:
            break;
    }

    var obj = {
        'txt':txt,
        'img':img
    };

    return obj
}