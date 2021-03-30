/* 数据处理公共方法 */

/**
 * 
 * @param {String} res [必须] 时间戳
 * @param {String} format [可选] 格式 ‘YY-MM-DD hh:mm:ss’
 * @description 默认根据时间出返回‘YY-MM-DD hh:mm:ss’格式的时间，根据需要传对应的格式，会返回对应时间戳和格式的时间，
 * 如‘YY-MM’或‘MM-DD hh:mm’，可识别单一格式时间（‘hh’）
 */ 
export const formatDate = (res, format) => {
  //没有毫秒的时间戳要乘1000，完整时间戳是13位的
  if (res.toString().length === 10) res = Number(res) * 1000
  const date = new Date(+res)
  const YY = date.getFullYear()
  const MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  const DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())

  const hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours())
  const mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes())
  const ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  
  let callbackInfo = ''

  if (format) {
    let spliteDate = format.split(' ')

    // 有年月日和时分秒两种格式
    if ( spliteDate.length === 2 ) {
      const ldate = spliteDate[0].split('-')
      const rdate = spliteDate[1].split(':')
      
      ldate.forEach((e, i) => {
        callbackInfo += eval(e) + (i < ldate.length - 1 ? '-' : ' ')
      })

      rdate.forEach((e, i) => {
        callbackInfo += eval(e) + (i < rdate.length - 1 ? ':' : '')
      })
    } else if (spliteDate.length === 1) { // 有年月日或时分秒其中一种格式
      const data = spliteDate[0]
      let hasX = data.includes('-')
      let hasM = data.includes(':')
      let hasXSplit = data.split('-')
      let hasMSplit = data.split(':')

      // 单一格式时间
      if (!hasX && !hasM) {
        return eval(data)
      }
      
      hasX && hasXSplit.forEach((e, i) => {
        callbackInfo += eval(e) + (i < hasXSplit.length - 1 ? '-' : '')
      })

      hasM && hasMSplit.forEach((e, i) => {
        callbackInfo += eval(e) + (i < hasMSplit.length - 1 ? ':' : '')
      })
    } else { // 容错数据
      return YY + '-' + MM+ '-' + DD + ' ' + hh + ':' + mm + ':' + ss
    }

    return callbackInfo
  } else {
    // 默认返回格式
    return YY + '-' + MM+ '-' + DD + ' ' + hh + ':' + mm + ':' + ss
  }
}