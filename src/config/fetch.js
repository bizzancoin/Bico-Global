import { baseUrl } from './env'
import Vue from 'vue'
import router from '@/router/index'
import i18n from '@/i18n/index'
export default async(url, data, ifToken) => {
	var method = 'fetch';
	var type = 'POST';
	type = type.toUpperCase();
	url = baseUrl + url;
	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}
	if(ifToken == true){
		var getToken = sessionStorage.getItem('userToken');
    }else{
		var getToken = '';
	}
	
	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'token':getToken,
				'language':sessionStorage.getItem('language') || 'tc'
			},
			method: type,
		}

		if (type == 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: data
			})
		}
        var response = '';
		var  responseJson  = '';
		try {
			response = await fetch(url, requestConfig);
			responseJson = await response.json();
			if(response.ok){
				if(response.status == 200){
					return responseJson
				}
			}else if(response.status == 403){
				Vue.prototype.$message.error(i18n.t('user.token'));
				if(sessionStorage.getItem('userToken') != null){
					sessionStorage.removeItem('language');
					sessionStorage.removeItem('userToken');
					sessionStorage.removeItem('userInform');
					setTimeout(function(){
						window.location.reload();
					},1000)
				}
				router.push('/login');
				return responseJson
			}else if(response.status == 500){
				Vue.prototype.$message.error(i18n.t('codeTxt.serviceError'));
			}else {
				Vue.prototype.$message.error(responseJson.message);
			}
			
			
		} catch (error) {
			if(response.status == 403){
				// Vue.prototype.$message.error(i18n.t('user.token'));
				if(sessionStorage.getItem('userToken') != null){
					sessionStorage.removeItem('language');
					sessionStorage.removeItem('userToken');
					sessionStorage.removeItem('userInform');
					setTimeout(function(){
						window.location.reload();
					},1000)
				}
				router.push('/login');
				return responseJson
			}else if(response.status == 500){
				Vue.prototype.$message.error(i18n.t('codeTxt.serviceError'));
			}
			throw new Error(error)
		}
		return responseJson
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}
			let sendData = '';
			if (type == 'POST') {
				sendData = data;
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.setRequestHeader("token", getToken);
			requestObj.setRequestHeader('language',sessionStorage.getItem('language') || 'tc');
			requestObj.send(sendData);
			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}



