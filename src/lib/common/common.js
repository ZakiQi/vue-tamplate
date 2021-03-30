const getCookie = (objname) => {
  const arrstr = document.cookie.split(';')
  let res = ''
  for (var i = 0; i < arrstr.length; i++){
    var temp = arrstr[i].split('=')
    if (temp[0].trim() === objname.trim()) {
      res = temp[1]
    }
  }
  return res
}

export {
  getCookie
}
