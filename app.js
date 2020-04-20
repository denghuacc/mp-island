import { createToken } from './models/token'

App({
  onLaunch: function () {
    const token = createToken()
    token.verify()
  }
})
