import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

//const messages = {};

const i18n = new VueI18n({
	locale:sessionStorage.getItem('language') || 'en',
	messages :{ /**必须为 messages*/

		'en':require('@/i18n/language/i18n_en'),//英文
		'hy':require('@/i18n/language/i18n_ko'),//韩语
		'jp':require('@/i18n/language/i18n_jp'),//日语
		'hk':require('@/i18n/language/i18n_tc'),//繁体
		'zh':require('@/i18n/language/i18n_zh'),//中文
		'dy':require('@/i18n/language/i18n_dy'),//德语
		'yn':require('@/i18n/language/i18n_yn'),//越语
		'ty':require('@/i18n/language/i18n_ty'),//泰语



	}
})


export default i18n
