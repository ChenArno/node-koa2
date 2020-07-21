const http = require('http');

// const options = {
// 	host: 'and.alpha-rfid.com',
// 	port: 80,
// 	path: '/a1/deptManage/btn/addBtn',
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json;charset=UTF-8',// 不写这个参数，后台会接收不到数据
// 		'accesstoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU4NDU1NTYsImlhdCI6MTU5NTI0MDc1NiwidXNlcm5hbWUiOiJhZG1pbiJ9.g5XMTnCY6YGJE9KOeeIMJro6haCMGOyn4h0RKoSCkuc'
// 	}
// };

class Axios {
	options = {
		host: 'and.alpha-rfid.com',
		port: 80,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json;charset=UTF-8',// 不写这个参数，后台会接收不到数据
		}
	};
	constructor({ host, port = 80, method = 'get', headers = {} }) {
		headers['Content-Type'] = 'application/json;charset=UTF-8'
		this.options = { ...this.options, ...{ host, port, method, headers } }
	}

	setOptions(option) {
		const headers = this.options.headers
		const arr = { ...headers, ...option.headers }
		this.options = { ...this.options, ...option, headers: arr }
	}

	setRequest(url, method, param) {
		let result = {};
		return new Promise((resolve, reject) => {
			this.options.path = url;
			this.options.method = method;
			let data = JSON.stringify(param);
			// console.log(this.options)
			const req = http.request(this.options, function (res) {
				// console.log('STATUS:' + res.statusCode);
				// console.log('HEADERS:' + JSON.stringify(res.headers));
				result.statusCode = res.statusCode
				result.headers = res.headers
				res.setEncoding('utf-8');
				res.on('data', function (body) {
					console.log('BODY：' + body);
					result.body = JSON.parse(body)
				});
				res.on('end', function () {
					// console.log('end')
					resolve(result)
				})
			});

			req.on('err', function (err) {
				if (e) {
					// console.info(e);
					reject(e)
				}
			});
			//  参数
			// console.log(data);
			req.write(data, 'utf-8');
			req.end();
		})
	}

	postFun(url, data) {
		return new Promise((resolve, reject) => {
			this.setRequest(url, 'post', data).then(r => resolve(r)).catch(e => reject(e))
		})
	}
}

module.exports = Axios