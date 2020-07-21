const Router = require('koa-router')
const router = new Router()
const response = require('../../commons/response')
const xlsx = require('node-xlsx');
const fs = require('fs');
const Axios = require('../../utils/http_client')

const axios = new Axios({
	host: 'and.alpha-rfid.com',
	port: 80
})

router.prefix('/nadd') // 路由层级

let array = []

function postFun(index) {
	if (index >= array.length) return;
	const currParam = array[index];
	axios.postFun('/a1/deptManage/btn/addBtn', currParam).then(r => {
		console.log(r.body)
		postFun(index + 1)
	}).catch(e => { console.log(e) })
}

router.get('/', async (ctx, next) => {
	ctx.body = 'nadd';
	axios.setOptions({
		headers: {
			'accesstoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU4NDU1NTYsImlhdCI6MTU5NTI0MDc1NiwidXNlcm5hbWUiOiJhZG1pbiJ9.g5XMTnCY6YGJE9KOeeIMJro6haCMGOyn4h0RKoSCkuc'
		}
	})
	await next();
})

router.get('/post', async (ctx, next) => {
	// 写xlsx
	// var buffer = xlsx.build(data);
	// fs.writeFile('./resut.xls', buffer, function (err) {
	// 	if (err)
	// 		throw err;
	// 	console.log('Write to xls has finished');

	// 	// 读xlsx
	// })
	axios.setOptions({
		headers: {
			'accesstoken': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTU4NDU1NTYsImlhdCI6MTU5NTI0MDc1NiwidXNlcm5hbWUiOiJhZG1pbiJ9.g5XMTnCY6YGJE9KOeeIMJro6haCMGOyn4h0RKoSCkuc'
		}
	})
	const obj = xlsx.parse("/Users/chenarno/Downloads/" + "xls.xlsx");
	// console.log(obj[0].data)
	array = obj[0].data.filter((r, i) => i > 1 && r.length > 0).map(item => {
		const l = (item.length - 3) / 3
		let detailVoList = []
		for (let j = 0; j < l; j++) {
			detailVoList[j] = { "btnTemplateId": item[3 * (j + 1)], "btnOrder": item[3 * (j + 1) + 1], "dsId": item[3 * (j + 1) + 2] }
		}
		return {
			deptId: item[1],
			btnCode: item[0],
			btnName: item[2],
			detailVoList: detailVoList
		}
	})
	postFun(0)
	ctx.body = { ...response, msg: '添加成功', data: array }
})

module.exports = router.routes()
