import fetch from '@/config/fetch'

/**
 * 获取行情
 */
export const klineApi = data => fetch('/common/kline',data,false)
/**
 * 获取系统时间错
 */
export const sysTimeApi = () => fetch('/common/sysTime',{},false)

/**
 * 获取验证码
 */
export const sendMsgApi = data => fetch('/getMsg',data,false)

/**
 * 获取验证码2
 */
export const sendApi = data => fetch('/getMsg',data,true)

/**
 * 区号
 */
export const areaNumApi = () => fetch('/common/phoneCode',{},false)

/**
 * 注册
 */
export const registerApi = data => fetch('/register',data,false);

/**
 * 登陆
 */
export const loginApi = data => fetch('/login', data, false);

/***
 * 忘记密码
 */
export const updatePwdApi = data => fetch('/forgetPwd',data,false);

/***
 * ----------------------- 个人中心 ----------------
 */

 /**
 * 修改法币昵称
 */
export const updateNicknameApi = data => fetch('/nickName',data,true);

/**
 * 修改资产,登录密码
 */
export const updateAssetApi = data => fetch('/pwd',data,true);

/**
 * 绑定账号
 */
export const bindAccountApi = data => fetch('/bindAccount',data,true);

/**
 * 收款方式列表
 */
export const reciveApi = data => fetch('/cnyPayList',data,true);

/**
 * 添加收款方式
 */
export const addReciveApi = data => fetch('/cnyPayAdd',data,true);

/**
 * 删除收款方式
 */
export const delReciveApi = data => fetch('/cnyPayDel',data,true);

/**
 * 钱包资产
 */
export const walletApi = data => fetch('/wallet',data,true);


/**
 * 所有币种
 */
export const allCoinApi = data => fetch('/common/symbolsList',data,false);

/**
 * 充币地址
 */
export const rechargeAddressApi = data => fetch('/platformAddress',data,true);
// export const rechargeAddressApi = data => fetch('/rechargePage',data,true);

/**
 * 充币
 */
export const rechargeApi = data => fetch('/recharge',data,true);

/**
 * 充币、提币记录
 */
export const coinRecordApi = data => fetch('/coinRecord',data,true);

/**
 * 提币
 */
export const withdrawCoinApi = data => fetch('/withdrawCoin',data,true);

/**
 * 提币页面信息
 */
export const withdrawPageApi = data => fetch('/withdrawPage',data,true);

/**
 * 添加，删除提币钱包地址
 */
export const addAddressApi = data => fetch('/coin',data,true);

/**
 * 钱包地址
 */
export const walletAddressApi = data => fetch('/coinList',data,true);

/**
 *内部转账页面信息
 */
export const transferPageApi = () => fetch('/transferPage',{},true);

/**
 *内部转账
 */
export const transfersApi = data => fetch('/transfer',data,true);

/**
 *内部转账记录
 */
export const transfersRcordApi = data => fetch('/transferRecordFlow',data,true);

/**
 * 资产划转页面信息
 */
export const convertPageApi = data => fetch('/convertPage ',data,true);

/**
 * 资产划转
 */
export const convertApi = data => fetch('/convert',data,true);

/**
 * 流水类型
 */
export const assetsListApi = data => fetch('/common/flowTypeList',data,true);


/**
 * 图片上传
 */
export const fileUploadApi = data => fetch('/upload/uploadFile',data,true);

/**
 * 首页内容
*/
//banner图
export const bannerApi = data  => fetch('/common/carousel',data,false);

/**
 *合作平台
 */
export const partenApi = () => fetch('/common/partenshipList',{},false);

/**
 * 币种行情
 */
export const ticketApi = data => fetch('/common/huobiTicket',data,false);

/**法币页面 */
/**
 * 法币信息
 */
export const legalInformApi = () => fetch('/legalPage',{},true);

/**
 * 购买法币
 */
export const buyLegalApi = () => fetch('/legal',{},true);

/**
 * 购买法币记录
 */
export const buyLegalRecordApi = data => fetch('/legalList',data,true);



/**
 * 用户模块
*/
export const userInformApi = () => fetch('/info',{},true);

//实名认证
export const certificationApi = data => fetch('/verify',data,true);

//流水记录
export const assetsRecordApi = data => fetch('/cashflow',data,true);

//转币
// export const transferApi = data => fetch('/collect/transfer',data,true);

/**合约模块 */
/**
 * 合约列表
 */
export const contractListApi = data => fetch('/contractList',data,true);

/**
 *  币种深度行情
 */
export const tradeListApi = data => fetch('/common/tradeList',data,false);

/**
 *  币种实时交易行情
 */
export const realListApi = data => fetch('/common/realList',data,false);

/**
 * 取消委托
 */
export const cancelListApi = data => fetch('/cancelContract',data,true);

/**
 * 平仓
 */
export const outContractApi = data => fetch('/outContract',data,true);

/**
 * 设置止盈止损
 */
export const contractPlApi = data => fetch('/contractPl',data,true);

/**
 * 杠杆倍率列表
 */
export const leverageApi = data => fetch('/leverage',data,true);

/**
 * 百分比
 */
export const rateApi = () => fetch('/common/rate',{},false);

/**
 * 合约页面信息
 */
export const contractPageApi = data => fetch('/contractPage',data,true)


/**
 * 合约交易
 */
export const contractApi = data => fetch('/contract',data,true);


/**
 * 合约简介
 */
export const currentInfoApi = data => fetch('/common/currentInfo',data,false);
/*合约结束*/
/**
 * 期货永续黄金start
 */
/**
 * 合约列表
 */
export const futuresContractListApi = data => fetch('/futuresContractList',data,true);
/**
 * 取消委托
 */
export const cancelFuturesContractApi = data => fetch('/cancelFuturesContract',data,true);
/**
 * 平仓
 */
export const outFuturesContractApi = data => fetch('/outFuturesContract',data,true);

/**
 * 设置止盈止损
 */
export const futuresContractPlApi = data => fetch('/futuresContractPl',data,true);

/**
 * 合约简介
 */
export const futuresInfoApi = data => fetch('/common/futuresInfo',data,false);

/**
 * 期货永续合约页面信息
 * @param data
 */
export const futuresContractPageApi = data => fetch('/futuresContractPage',data,true)
/**
 * 期货永续合约交易
 * @param data
 */
export const futuresApi = data => fetch('/futures',data,true);
/**
 * 最新成交价
 */
export const futuresTradeApi = data => fetch('/common/futuresTrade',data,false);
/**
 * 期货永续黄金结束
 */

/**
 * 最新成交价
 */
export const currentTradeApi = data => fetch('/common/currentTrade',data,false);

/**
 * 退出登录
 */
export const userOutApi = () => fetch('/logout',{},true);

/**
 * 用户协议
 */
export const agreementApi = (data) => fetch('/common/declares',data,false);

/**
 * 服务条款，隐私政策
 */
export const aboutApi = data => fetch('/common/article',data,false);

/**
 * 帮助中心
 */
 export const helpApi = data => fetch('/common/problem',data,false);

 /**
  * 官方公告
  */
 export const noticeApi = data => fetch('/common/newsList',data,false);
/**
 * 检查邀请码
 */
export const checkInviteApi = data => fetch('/common/checkInviteCode',data,false);


/**
 * 币币交易
 */
export const coinTrasctionApi = data => fetch('/currency',data,true);

/**
 * 币币交易记录
 */
export const coinListApi = data => fetch('/currencyRecord',data,true);

/**
 * 币币交易撤销委托单
 */
export const cancelCoinApi = data => fetch('/cancelCurrency',data,true);

/**
 * 币币页面信息
 */
export const coinInformApi = data => fetch('/currencyPage',data,true);

// 联系客服
export const linkContactApi = () => fetch('/common/contact',{},false);

/**
 * 效验账号验证码是否正确
 */
export const checkSmsCodeApi = data => fetch('/checkSmsCode',data,true);

/**
 *获取下载地址
 */
export const versionApi = data => fetch('/common/version',data,false);

/**
 * 白皮书
 */
export const booksApi = data => fetch('/common/whiteBook',data,false);

/**
 * 币种列表
 */
 export const coinOptionListApi = () => fetch("/contractOptionCoin-coin-list",{},true);
 /**
  * 币种信息
  */
 export const coinInfoApi = data => fetch("/contractOptionCoin-coin-info",data,true);
/**
 * 币种信息
 */
export const timeCountApi = data => fetch("/timeCount",data,true);
 /**
  * 往期结果
  */
 export const historyListApi = data => fetch("/contractOption-history",data,true);
 /**
  * 开盘价
  */
 export const openingApi = data => fetch("/contractOption-opening",data,true);
 /**
  * 开始价
  */
 export const startingApi = data => fetch("/contractOption-starting",data,true);
 /**
  * 当前自己的订单1
  */
 export const orderCurrentApi = data => fetch('/contractOptionOrder-current',data,true);
 /**
  * 增加订单1
  */
 export const optionOrderAdd = data => fetch('/contractOptionOrder-add',data,true);
 /**
  * 历史订单 1
  */
 export const orderHistoryApi = data => fetch('/contractOptionOrder-history',data,true);

  /**
  * 获取周期利率 无参数 返回list
  */
export const finPeriodicListApi = data => fetch('/finPeriodicList',data,true);

  /**
  * 获取我的存款订单  参数开启token 返回订单list
  */
export const finPeriodicMyOrderListApi = data => fetch('/finPeriodicMyOrderList',data,true);
 /**
  *  "finPeriodicOrderAdd" --新增存款订单  参数开启token 周期利率id ，存入金额  返回成功活失败
  */
  export const finPeriodicOrderAddApi = data => fetch('/finPeriodicOrderAdd',data,true);

  /**
 * 币种行情
 */
export const teManagementListApi = data => fetch('/common/teManagementList',data,false);
//获取已购份数
export const knowTeManagementList = data => fetch('/common/knowTeManagementList',data,false);

/* 获取正在进行的认购单 */
export const getMyLogList0Api = data => fetch('/teManagementOrderList0',data,true) ;
//获取结束的认购单
export const getMyLogList1Api = () => fetch('/teManagementOrderList1',{},true) ;
//新增认购单
export const teManagementOrderAddApi = data => fetch('/teManagementOrderAdd',data,true) ;
//获取所有的币种teManagementListAllApi
export const teManagementListAllApi = () => fetch('/common/teManagementListAll',{},false) ;

/* 黄金start */

/**
 * 黄金币种列表
 */
 export const coinGoldListApi = data => fetch("/contractGoldCoin-coin-list",data,true);
 /**
  * 黄金币种信息
  */
 export const coinGoldInfoApi = data => fetch("/contractGoldCoin-coin-info",data,true);
 /**
  * 黄金往期结果
  */
 export const historyGoldListApi = data => fetch("/contractGold-history",data,true);
 /**
  * 黄金开盘价
  */
 export const openingGoldApi = data => fetch("/contractGold-opening",data,true);
 /**
  * 黄金开始价
  */
 export const startingGoldApi = data => fetch("/contractGold-starting",data,true);
 /**
  * 黄金当前自己的订单1
  */
 export const orderGoldCurrentApi = data => fetch('/contractGoldOrder-current',data,true);
 /**
  * 黄金增加订单1
  */
 export const goldOrderAdd = data => fetch('/contractGoldOrder-add',data,true);
 /**
  * 黄金历史订单 1
  */
 export const orderGoldHistoryApi = data => fetch('/contractGoldOrder-history',data,true);
/* 黄金end */

//上币申请
export const addCoinApply = data => fetch('/addCoinApply',data, true)
//团队明细
export const teamDetailApi = data => fetch('/teamDetail',data, true)
//收益记录
export const earningsPageApi = data => fetch('/earningsPage',data,true)
//划转记录
export const freeTransferForWalletLogApi = data => fetch('/freeTransferForWalletLog',data,true)
//划转
export const freeTransferForWalletApi = data => fetch('/freeTransferForWallet',data,true)
//我的收益
export const myearningsApi = () => fetch('/myearnings',{},true)
//我的收益
export const earningsInfosApi = () => fetch('/earningsInfo',{},true)
/**
 * 矿机离别
 */
export const miningListApi = data => fetch('/common/miningList',data,false)

/**
 * 添加矿机
 */
export const addMiningApi = data => fetch('/addMiningOrder',data,true)
/**
 * 矿机记录
 */
export const miningOrderApi = data => fetch('/miningOrder',data,true)
/**
 * 矿机记录
 */
export const miningOrderDetailApi = data => fetch('/miningOrderDetail',data,true)/**

   /*
   *   启动矿机
   */

export const startUpMiningOrderApi = data => fetch('/startUpMiningOrder',data,true)
    /**
    *  领取矿机收益
    */

    export const pickMiningOrderApi = data => fetch('/pickMiningOrder',data,true)
//签到页面配置
export const chenkDayConfigApi = () => fetch('/chenkDayConfig',{},true)//签到页面配置
export const checkInfoApi = () => fetch('/checkInfo',{},true)
export const checkInApi = () => fetch('/checkIn',{},true)
export const chatListApi = () => fetch('/getChatList',{},true)
export const checkChatPwdApi = data => fetch('/checkChatPwd',data,true)
export const chatConfigsApi = () => fetch('/common/getChatConfigs',{},true)
export const checkSmsSendApi = () => fetch('/common/checkSmsSend',{},false)
export const checkEmailSendApi = () => fetch('/common/checkEmailSend',{},false)
export const contractConfigApi = () => fetch('/common/getContractConfig',{},false)
export const inviteConfigApi = () => fetch('/common/getInviteConfig',{},false)
/**
 * 获取平台汇率
 */
export const platformRateApi = data => fetch('/common/platformRate',data,false);

export const addLoanApply= data=> fetch('/coinLoan',data,true)
