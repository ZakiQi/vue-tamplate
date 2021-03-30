/**
 * @author YQ
 * @date 2020/08/11
 * @class socket
 * @description websocket心跳重连
 */
function socket(data) {
  /* websocket实例 */
  this.ws = null

  /* 参数 */
  this.url = data.url || ''
  //心跳时间, 默认60秒一次
  this.heartBeat = data.heartBeat || 60000
  //心跳信息
  this.heartMsg = data.heartMsg || 'connectTest'

  // 外部需要获取的message信息,callback为外部传入的回调的方法
  this.callback = data.callback || ''

  //重连次数
  this.reConnectTimes = data.reConnectTimes || 10
  // 当前重连次数，每次响应数据时被重置
  this.currentConnectNum = 0

  /*内部变量，不暴露到外部*/
  //重连状态  避免不间断的重连操作
  this.isreConnect = false
  this.timer = null
  this.serverTimer = null

  this.onopen = () => {
    this.onStart()
    console.log('package: 链接成功:', data.url)
  }

  this.onmessage = e => {
    // 每次拿到消息重新计时，清空重连次数
    this.onReset()
    this.currentConnectNum = 0

    // 不是心跳返回的数据callback到外部
    if (e.data !== this.heartMsg && this.callback) {
      this.callback(e.data)
    }
  }

  //自定义webSocket异常事件：webSocket报错后触发重连
  this.onerror = e => {
    console.log('error', e)
    if (this.currentConnectNum < this.reConnectTimes) {
      this.reConnect()
    }
  }

  //自定义webSocket关闭事件：webSocket连接关闭后触发重连
  this.onclose = e => {
    console.log('close', e)
    if (this.currentConnectNum < this.reConnectTimes) {
      this.reConnect()
    }
  }

  this.initWs(data)
}

/**
 * @description webSocket心跳计时重启
 */
socket.prototype.onReset = function() {
  clearTimeout(this.timer)
  clearTimeout(this.serverTimer)
  this.onStart()
}

/**
 * @description 间隔事件发送心跳消息
 */
socket.prototype.onStart = function() {
  let self = this
  this.timer = setTimeout(() => {
    self.ws.send(self.heartMsg)
    self.serverTimer = setTimeout(() => {
      self.ws.onclose()
    }, self.heartBeat)
  }, this.heartBeat)
}

/**
 *
 * @method webSocket初始化方法
 * @param {Object} data 实例化传入的参数
 */
socket.prototype.initWs = function() {
  if ('WebSocket' in window) {
    if (!this.url) return

    this.ws = new WebSocket(this.url)

    /* 绑定webSocket事件 */
    this.ws.onopen = e => {
      this.onopen(e)
    }
    this.ws.onmessage = e => {
      this.onmessage(e)
    }
    this.ws.onerror = e => {
      this.onerror(e)
    }
    this.ws.onclose = e => {
      this.onclose(e)
    }
  } else {
    console.log('您的浏览器不支持websocket')
  }
  return this
}

/**
 * @method webSocket重连
 */
socket.prototype.reConnect = function() {
  let ts = this
  if (this.isreConnect) return
  this.isreConnect = true

  // 没连接上会一直重连，设置延迟避免请求过多
  setTimeout(function() {
    ts.initWs()
    ts.isreConnect = false
    ts.currentConnectNum++
  }, this.heartBeat)
}

/**
 * @method 发送信息
 */
socket.prototype.send = function(data) {
  this.ws.send(data)
}

export default socket
