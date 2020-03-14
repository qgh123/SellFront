function plugin(Vue) {
  Vue.filter('dateFormat', function (value, fmt) {

    fmt = fmt == null ? 'yyyy-MM-dd' : fmt;

    if (value == null) {
      return '';
    }
    var date;

    if ((value instanceof Date)) {
      date = value;
    } else if (typeof value == 'number') {

      if (value.toString().length == 10) {
        value = value * 1000;
      }
      date = new Date(value);
    } else {
      return value;
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
      }
    }
    return fmt;
  });
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin);
}

module.exports = plugin;
