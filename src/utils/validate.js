/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  return true
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

/**
 * 校验是否是手机号码
 * @param rule
 * @param value
 * @param callback
 */
export function isMobile(rule, value, callback) {
  const regx = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (!regx.test(value)) {
    callback('手机号码格式不正确!')
  } else {
    callback()
  }
}

/**
 * 校验是否正确的身份证号码
 * @param rule
 * @param value
 * @param callback
 */
export function isIdCard(rule, value, callback) {
  const regx = /(^\d{8}(0\d|10|11|12)([0-2]\d|30|31)\d{3}$)|(^\d{6}(18|19|20)\d{2}(0\d|10|11|12)([0-2]\d|30|31)\d{3}(\d|X|x)$)/
  if (!regx.test(value)) {
    callback('身份证号码格式不正确!')
  } else {
    callback()
  }
}

/**
 * 校验是否是手机号码，空则不验证
 * @param rule
 * @param value
 * @param callback
 */
export function isMobileIgnoresNull(rule, value, callback) {
  if (!value) {
    callback()
    return
  }

  isMobile(rule, value, callback)
}

/**
 * 校验密码安全等级
 * @param rule
 * @param value
 * @param callback
 * @returns {boolean}
 */
export function checkPass(rule, value, callback) {
  if (!value) {
    callback()
    return false
  }


  const len = value.length

  if (len<8 || len>60) {
    callback('密码长度应为8-60位')
  }

  const regx1 = new RegExp(/.*\d+.*/)
  const regx2 = new RegExp(/.*[A-Z]+.*/)
  const regx3 = new RegExp(/.*[a-z]+.*/)
  const regx4 = new RegExp(/.*[~!@#$%^&*()_+|<>,.?/:;'\[\]{}"]+.*/)

  let kind = 0

  if (regx1.test(value)) {
    kind++
  }
  if (regx2.test(value)) {
    kind++
  }
  if (regx3.test(value)) {
    kind++
  }
  if (regx4.test(value)) {
    kind++
  }

  if (kind<3) {
    callback('密码应包含大写字母、小写字母、数字、特殊字符其中三种!')
  } else {
    callback()
  }
}

// URL格式校验
export function isUrl(rule, value, callback) {
  if (!value) {
    callback('URL不能为空！')
    return
  }
  const reg = /^(https|http):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|cn|cc|fun|co|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*$/
  if (!reg.test(value) && value !== '/') {
    callback('URL格式应为http或https开头的域名地址，如：https://www.yfhl.net')
  } else {
    callback()
  }
}

// URL格式校验
export function isUrl2(rule, value, callback) {
  if (!value) {
    callback('URL不能为空！')
    return
  }
  const reg = /^(https|http):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|cn|cc|fun|co|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*\/$/
  if (!reg.test(value) && value !== '/') {
    callback('URL格式应为http或https开头的域名地址，并以/结束，如：https://www.yfhl.net/')
  } else {
    callback()
  }
}

// 目录格式校验
export function isDirectory(rule, value, callback) {
  if (!value) {
    callback('目录不能为空！')
    return
  }
  const win = /^[c-zC-Z](:\/).*$/

  if (!value.endsWith('/') || (!value.startsWith('/') && !win.test(value))) {
    callback('目录格式必须以/开头,/结尾，或盘符开头，/结尾，如：/data/upload/ 或 D:/data/upload/')
  } else {
    callback()
  }
}

// 时间段校验
export function isDateRange(rule, value, callback) {
  if (!value || value.length !== 2 || !value[0] || !value[1]) {
    callback('时间段不能为空！')
    return
  }
  callback()
}

