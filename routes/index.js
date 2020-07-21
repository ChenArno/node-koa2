const Router = require('koa-router')
const router = new Router()
const user = require('./user')
const nadd = require('./user/nadd')

router.get('/', async (ctx, next) => {
  // ctx.body = 'Hello World'
  ctx.state = {
    title: 'Koa2'
  }
  await ctx.render('index', ctx.state)
})

module.exports = {
  index: router.routes(),
  user,
  nadd
}
