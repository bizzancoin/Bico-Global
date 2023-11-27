
// 法币交易模块


import fetch from '@/config/fetch'
/**
 * 法币币种
 */
export const contractOptionConfigApi = data => fetch('/contractOptionConfig',data,true);
/**
* 我要购买、我要出售列表
*/
export const tradeListApi = data => fetch('/tradeList',data,true);


/**
 * 挂单购买
 */
export const otcBuyApi = data => fetch('/otcBuy',data,true);

/**
 * 挂单出售
 */
export const otcSellApi = data => fetch('/otcSell',data,true);

/**
 * 挂单出售=>收款方式
 */
export const otcPayMethodApi = data => fetch('/otcPayMethod',data,true);

/**
 * 申请成为承兑商缴纳
 */
export const depositPageApi = () => fetch('/depositPage',{},true);

/**
 * 申请成为承兑商
 */
export const depositApi = data => fetch('/deposit',data,true);

/**
 * 申请成为承兑商的状态
 */
export const legalMgrPageApi = () => fetch('/legalMgrPage',{},true);

/**
 * 补缴押金
 */
export const makeUpDepositApi = data => fetch('/makeUpDeposit',data,true);

/**
 * 退还押金
 */
export const backDepositApi = () => fetch('/backDeposit',{},true);

/**
 * 我的订单（购买、出售）
 */
export const otcBillListApi = data => fetch('/otcBillList',data,true);

/**
 * 我的订单（挂单购买..挂单出售）
 */
export const otcOrderListApi = data => fetch('/otcOrderList',data,true);

/**
 * 我的订单（挂单、出售列表）
 */
export const tradeBuyWaitPageApi = data => fetch('/tradeBuyWaitPage',data,true);

/**
 * 我的订单-挂单中-撤单
 */
export const cancelOrderApi = data => fetch('/cancelOrder',data,true);


/**
 * 法币交易-下单购买
 */
export const tradeBuyApi = data => fetch('/tradeBuy',data,true);

/**
 * 法币交易-下单出售
 */
export const tradeSellApi = data => fetch('/tradeSell',data,true);

/**
 * 法币交易-待付款-取消订单
 */
export const tradeCancelApi = data => fetch('/tradeCancel',data,true);

/**
 *  法币交易-待付款-已完成付款
 */
export const tradePaidApi = data => fetch('/tradePaid',data,true);

/**
 * 法币交易-已付款-申诉
 */
export const tradeAppealApi = data => fetch('/tradeAppeal',data,true);

/**
 * 法币交易-已付款-放币
 */
export const otcFinishApi = data => fetch('/otcFinish',data,true);

/**
 * 取消提示
 */
export const cancelThreeApi = data => fetch('/tradeCancelPre',data,true);
/**
 * 上传凭证
 */
export const uploadBuyProofApi = data=>fetch("/uploadBuyProof",data,true);
