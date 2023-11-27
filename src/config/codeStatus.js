

import i18n from '@/i18n/index'

//验证码状态
export default function codeStatus(codeStatus,callback){
	var tip = "";

	switch (codeStatus){
		case 100:
			tip = i18n.t('codeTxt.error')
			break;
		case 400:
			tip = i18n.t('codeTxt.errorRequire')
			break;
		case 404:
			tip = i18n.t('codeTxt.noFind')
			break;
		case 500:
			tip = i18n.t('codeTxt.serviceError')
			break;
		case 1001:
			tip = i18n.t('codeTxt.cross');
			break;
		case 2001:
			tip = i18n.t('codeTxt.codeError')
			break;
		case 2002:
			tip = i18n.t('codeTxt.transPwd')
			break;
		case 2003:
			tip = i18n.t('recharge.setPwd')
			break;
		case 2004:
			tip = i18n.t('codeTxt.noAuthentication')
			break;
		case 2005:
			tip = i18n.t('codeTxt.noWallet')
			break;
		case 2006:
			tip = i18n.t('codeTxt.oldPwd')
			break;
		case 2007:
			tip = i18n.t('codeTxt.noRecomment')
			break;
		case 2008:
			tip = i18n.t('form.pwdDifferent')
			break;
		case 2009:
			tip = i18n.t('codeTxt.loginPwdError')
			break;
		case 2010:
			tip = i18n.t('codeTxt.accountOr')
			break;
		case 2011:
			tip = i18n.t('codeTxt.userNoFind')
			break;
		case 2012:
			tip = i18n.t('codeTxt.hasAcount')
			break;
		case 2013:
			tip = i18n.t('codeTxt.hasEmail')
			break;
		case 2014:
			tip = i18n.t('codeTxt.hasPhone')
			break;
		case 2015:
			tip = 'Not yet open';//暂未开放
			break;
		case 2016:
			tip = i18n.t('codeTxt.AccountDisable')
			break;
		case 2017:
			tip = i18n.t('codeTxt.accountExit')
			break;
		case 2018:
			tip = i18n.t('codeTxt.rulePay')
			break;
		case 2019:
			tip = i18n.t('codeTxt.hasNickName')
			break;
		case 2020:
			tip = i18n.t('codeTxt.setNickname')
			break;
		case 2021:
			tip = i18n.t('codeTxt.placeOrder')
			break;
		case 2022:
			tip =  i18n.t('codeTxt.withdrawNum')
			break;
		case 2023:
			tip = i18n.t('codeTxt.profileHigh')
			break;
		case 2024:
			tip = i18n.t('codeTxt.lossLow')
			break;
		case 2025:
			tip = i18n.t('codeTxt.profileLow')
			break;
		case 2026:
			tip = i18n.t('codeTxt.lossHigh')
			break;
		case 2027:
			tip = i18n.t('codeTxt.transferNum')
			break;
		case 2028:
			tip = i18n.t('contract.noTransfer')
			break;
		case 2029:
			tip = i18n.t('codeTxt.fundingloss')
			break;
		case 2030:
			tip = i18n.t('form.oldPwdEmpty')
			break;
		case 2031:
			tip = i18n.t('form.newPwdEmpty')
			break;
		case 2032:
			tip = i18n.t('form.loginSureEmpty')
			break;
		case 2033:
			tip = i18n.t('recharge.assetEmpty')
			break;
		case 2034:
			tip = i18n.t('codeTxt.inputNickname')
			break;
		case 2035:
			tip = i18n.t('codeTxt.hasNickName')
			break;
		case 2036:
			tip = i18n.t('codeTxt.hasReciveAccount')
			break;
		case 2037:
			tip = i18n.t('codeTxt.hasBankAccount')
			break;
		case 2038:
			tip = i18n.t('payMethods.bankNameInput')
			break;
		case 2039:
			tip = i18n.t('form.phoneInput')
			break;
		case 2040:
			tip = i18n.t('form.emailNoEmpty')
			break;
		case 2041:
			tip = i18n.t('recharge.setPwd')
			break;
		case 2042:
			tip = i18n.t('form.bindPhone')
			break;
		case 2043:
			tip = i18n.t('form.bindEmail')
			break;
		case 2044:
			tip = i18n.t('form.emailError')
			break;
		case 2045:
			tip = i18n.t('form.phoneSmsError')
			break;
		case 2046:
			tip = i18n.t('withdraw.mySelf')
			break;
		case 2047:
			tip = i18n.t('codeTxt.appleWait')
			break;
		case 2048:
			tip = i18n.t('codeTxt.appleWait')
			break;
		case 2049:
			tip = i18n.t('codeTxt.mustRepair')
			break;
		case 2050:
			tip = i18n.t('codeTxt.cannotLoss')
			break;
		case 2051:
			tip = i18n.t('codeTxt.cannotHigh')
			break;
		case 2052:
			tip = i18n.t('codeTxt.cannotSurplus')
			break;
		case 2053:
			tip = i18n.t('contract.minClose')
			break;
		case 2054:
			tip = i18n.t('layer.emptyArea')
			break;
		case 2055:
		tip = i18n.t('bico.W195')
		    break;
		case 2056:
		tip = i18n.t('bico.W196')
		    break;
		case 2057:
		tip = i18n.t('bico.W197')
		    break;
		case 2058:
		tip = i18n.t('bico.W198')
		    break;
		case 2059:
		tip=i18n.t('bico.W199')
		    break;
		case 2060:
		tip=i18n.t('bico.W200')
		    break;
		case 2061:
			tip=i18n.t('bico.W205')
		    break;
		case 2062:
			tip=i18n.t('bico.W306')
		  break;
		case 2063:
			tip=i18n.t('bico.W307')
		  break;
		case 2064:
			tip=i18n.t('bico.W322')
			break;
		case 3001:
			tip = i18n.t('codeTxt.lowWithdraw')
			break;
		case 3002:
			tip = i18n.t('codeTxt.appleWait')
			break;
		case 3003:
			tip = i18n.t('codeTxt.addressError')
			break;
		case 3004:
			tip = i18n.t('codeTxt.lowBuy')
			break;
		case 4001:
			tip = i18n.t('verification.myself')
			break;
		case 4002:
			tip = i18n.t('codeTxt.cancelOrder')
			break;
		case 4003:
			tip = i18n.t('codeTxt.noOrder')
			break;
		case 4004:
			tip = i18n.t('codeTxt.closeOrder')
			break;
		case 4005:
			tip = i18n.t('layer.noSetHigh')
			break;
		case 4006:
			tip = i18n.t('layer.noSetLoss')
			break;
		case 4007:
			tip = i18n.t('layer.noSetLoss')
			break;
		case 4008:
			tip = i18n.t('layer.hasOrder')
			break;
		case 4009:
			tip = i18n.t('layer.noDeal')
			break;
		case 4010:
			tip = i18n.t('layer.returnPair')
			break;
		case 4013:
			tip = i18n.t('layer.waitTry')
			break;
		case 4014:
			tip = i18n.t('layer.customer')
			break;
		case 4015:
			tip = i18n.t('layer.customer')
			break;
		case 4016:
			tip = i18n.t('layer.cannotNum')
			break;
		case 4017:
			tip = i18n.t('layer.orderFinish')
			break;
		case 4018:
			tip = i18n.t('layer.sendFair')
			break;
		case 4030:
		tip = i18n.t('bico.W201')
		    break;
		case 4031:
		tip = i18n.t('bico.W202')
		    break;
		case 4032:
		tip = i18n.t('bico.W203')
		    break;
		case 21002:
			tip = i18n.t('layer.canCelOrder')
			break;
		case 5021:
			tip = i18n.t('layer.refresh')
			break;
		case 5022:
			tip = i18n.t('layer.updated')
			break;
		case 5023:
		tip = i18n.t('bico.W204')
		    break;
			default:
			break;
		}

	callback(tip)
}
