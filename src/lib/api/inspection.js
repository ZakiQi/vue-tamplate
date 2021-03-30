import API from '@/lib/services/index.js'

// 对外接口列表总数接口
const interfaceListInfoCount = async (payoad) => {
  return await API.post({
    url: '/inspection/interfaceListInfoCount',
    data: payoad
  })
}

const getInterfaceListInfo = (payoad) => {
  return API.post({
    url: '/inspection/interfaceListInfo',
    data: payoad
  })
}

//  应用服务列表总数接口
const applicationListInfoCount = (payoad) => {
  return API.post({
    url: '/inspection/applicationListInfoCount',
    data: payoad
  })
}

// 应用服务列表接口
const getApplicationListInfo = (payoad) => {
  return API.post({
    url: '/inspection/applicationListInfo',
    data: payoad
  })
}

// 服务器列表接口
const serverListInfo = (payoad) => {
  return API.post({
    url: '/inspection/serverListInfo',
    data: payoad
  })
}

// 服务器列表总数接口
const serverListInfoCount = (payoad) => {
  return API.post({
    url: '/inspection/serverListInfoCount',
    data: payoad
  })
}

// 集群列表接口
const colonyListInfo = (payoad) => {
  return API.post({
    url: '/inspection/colonyListInfo',
    data: payoad
  })
}

// 集群列表总数接口
const colonyListInfoCount = (payoad) => {
  return API.post({
    url: '/inspection/colonyListInfoCount',
    data: payoad
  })
}

const errorListInfo = (payoad) => {
  return API.post({
    url: '/inspection/errorListInfo',
    data: payoad
  })
}

const errorListInfoCount = (payoad) => {
  return API.post({
    url: '/inspection/errorListInfoCount',
    data: payoad
  })
}

// 获取磁盘分区信息
const queryDiskJson = (payoad) => {
  return API.post({
    url: '/inspection/queryDiskJson',
    data: payoad
  })
}

// 分区阈值修改
const updateInspectionCodeByCode = (payoad) => {
  return API.post({
    url: '/inspectionCode/updateInspectionCodeByCode',
    data: payoad
  })
}

const queryInspectionCodeByCode = (payoad) => {
  return API.post({
    url: '/inspectionCode/queryInspectionCodeByCode',
    data: payoad
  })
}

export {
  interfaceListInfoCount,
  getInterfaceListInfo,
  applicationListInfoCount,
  getApplicationListInfo,
  serverListInfo,
  serverListInfoCount,
  colonyListInfo,
  colonyListInfoCount,
  errorListInfo,
  errorListInfoCount,
  queryDiskJson,
  updateInspectionCodeByCode,
  queryInspectionCodeByCode
}