import API from '@/lib/services/index.js'

//获取用户信息
const GetUserInformation = (data) => {
  return API.post({
    url: '/common/userInfo/?id=960000000000060',
    data: data
  })
}




export {
  GetUserInformation
}