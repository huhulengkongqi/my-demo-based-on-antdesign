import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const username = ['admin', 'super', 'huhu']
const password = ['8914de686ab28dc22f30d3d8e107ff6c', '21232f297a57a5a743894a0e4a801fc3', 'c4b2197eb9738dce58e12695ea92d177'] // admin, ant.design,  wojiaohu
const roles = ['admin', 'admin', 'neirong']

const login = (options) => {
  const body = getBody(options)
  console.log('mock: body', body)

  const userIndex = username.indexOf(body.username)
  const passIndex = password.indexOf(body.password)

  if (userIndex === -1 || passIndex === -1 || userIndex !== passIndex) {
    return builder({ isLogin: true }, '账户或密码错误', 401)
  }

  const roleId = roles[userIndex]
  return builder({
    'id': Mock.mock('@guid'),
    'name': Mock.mock('@name'),
    'username': body.username,
    'password': body.password,
    'avatar': 'https://gw.alipayobjects.com/zos/rmsportal/jZUIxmJycoymBprLOUbT.png',
    'status': 1,
    'telephone': '',
    'lastLoginIp': '27.154.74.117',
    'lastLoginTime': 1534837621348,
    'creatorId': 'admin',
    'createTime': 1497160610259,
    'deleted': 0,
    'roleId': roleId,
    'lang': 'zh-CN',
    'token': '4291d7da9005377ec9aec4a71ea837f'
  }, '', 200, { 'Custom-Header': Mock.mock('@guid') })
}

const logout = () => {
  return builder({}, '[测试接口] 注销成功')
}

const smsCaptcha = () => {
  return builder({ captcha: Mock.mock('@integer(10000, 99999)') })
}

const twofactor = () => {
  return builder({ stepCode: Mock.mock('@integer(0, 1)') })
}

Mock.mock(/\/auth\/login/, 'post', login)
Mock.mock(/\/auth\/logout/, 'post', logout)
Mock.mock(/\/account\/sms/, 'post', smsCaptcha)
Mock.mock(/\/auth\/2step-code/, 'post', twofactor)
