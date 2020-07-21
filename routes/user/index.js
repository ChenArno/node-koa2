const Router = require('koa-router')
const router = new Router()

router.prefix('/user') // 路由层级

router.get('/', async (ctx, next) => {
	ctx.body = { code: 0, msg: '查询成功', data: {} }
})

module.exports = router.routes()
