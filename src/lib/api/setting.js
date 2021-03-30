import API from '@/lib/services/index.js'

// 巡检人列表
const inspectorListInfo = (payoad) => {
  return API.post({
    url: '/inspector/inspectorListInfo',
    data: payoad
  })
}

// 巡检人总数
const inspectorListInfoCount = (payoad) => {
  return API.post({
    url: '/inspector/inspectorListInfoCount',
    data: payoad
  })
}

// 获取组织数据
const getInspectorPostTree = (data) => {
  return API.post({
    url: '/newUsers/getInspectorPostTree',
    data: data
  })
}

// 获取巡检人数据
const getInspectorUserTree = (data) => {
  return API.post({
    url: '/newUsers/getInspectorUserTree',
    data: data
  })
}

// 保存巡检人
const saveInspector = (data) => {
  return API.post({
    url: '/inspector/saveOrUpdateInspector',
    data: data
  })
}

// 修改巡检人状态
const updateInspectorStatus = (data) => {
  return API.post({
    url: '/inspector/updateInspectorStatus',
    data: data
  })
}


export {
  getInspectorPostTree,
  saveInspector,
  updateInspectorStatus,
  getInspectorUserTree,
  inspectorListInfo,
  inspectorListInfoCount
}