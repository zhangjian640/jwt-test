const router = require('koa-router')()
const { sign, verify } = require('jsonwebtoken')
const { SECRET } = require('../conf/constants')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/login', async (ctx, next) => {
  const { userName, password } = ctx.request.body
  let userInfo
  if (userName === 'zhangsan' && password === '123') {
    userInfo = {
      userId: 1,
      userName: 'zhangsan',
      nickName: '张三',
      gender: 1
    }

    let toke
    if (userInfo) {
      token = sign(userInfo, SECRET, {expiresIn: '1h'})
    }
  } else {
    ctx.body = {
      code: -1,
      msg: '登录失败'
    }
    return
  }
  ctx.body = {
    code: 0,
    data: token
  }
})

router.get('/getUserInfo', async (ctx, next) => {
  const token = ctx.header.authorization
  try {
    const payload = await verify(token.split(' ')[1], SECRET)
    ctx.body = {
      code: 0,
      userInfo: payload
    }
  } catch (e) {
    console.log(e)
    ctx.body = {
      code: -1,
      msg: '验证失败'
    }
  }
})
module.exports = router
