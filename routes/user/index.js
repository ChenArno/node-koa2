const Router = require('koa-router')
const router = new Router()
const result = require('../../commons/response')

router.prefix('/user') // 路由层级

router.get('/', async (ctx, next) => {
	console.log(result)
	ctx.body = result
})

module.exports = router.routes()
