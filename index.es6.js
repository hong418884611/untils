class Utils {
  /* 
  时间戳转日期格式
  @timestamp(Number): 时间戳
  @type(Null): 类型
    date: YY-MM-DD 字符串
    null: 年月日时分秒对象
  */
  formatDate(timestamp = +new Date(),type = null) {
    let date = new Date(Number(timestamp)),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds()

    if (month < 10) {
      month = '0' + month
    }
    if (day < 10) {
      day = '0' + day
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }

    switch(type) {
      case 'date':
        return `${year}-${month}-${day}`
        break;
      default:
          return {
            year,
            month,
            day,
            hour,
            minute,
            second
          }
    }
  }

  /* 
  两个时间戳的差转日期格式
  @startTime(Number): 开始时间戳
  @endTime(Number): 结束时间戳
  @type(Null): 类型
    null: 年月日时分秒对象
  */
  diffTime(startTime = +new Date(), endTime = +new Date(), type = null) {
    if (startTime >= endTime) {
      return {
        day: '00',
        hour: '00',
        minute: '00',
        second: '00',
        total_hour: '00',
        stopFlag: true
      }
    }

    let time = endTime - startTime

    // 毫秒数
    let s = 1000,
        m = s * 60,
        h = m * 60,
        d = h * 24

    let day = Math.floor(time / d),
        hour = Math.floor((time % d) / h),
        minute = Math.floor((time % h) / m),
        second = Math.floor((time % m) / s),
        total_hour =  day <= 0 ? hour : day * 24 + hour;

    if (day < 10) {
      day = '0' + day
    }
    if (hour < 10) {
      hour = '0' + hour
    }
    if (minute < 10) {
      minute = '0' + minute
    }
    if (second < 10) {
      second = '0' + second
    }
    if (total_hour < 10) {
      total_hour = '0' + total_hour
    }

    switch(type) {
      default:
          return {
            day,
            hour,
            minute,
            second,
            total_hour
          }
    }
  }

  // 富文本html处理
  formatHtml(html) {
    let arrEntities = {
        "lt": "<",
        "gt": ">",
        "amp": "&",
        "nbsp": " ",
        "quot": "\"",
        '&quot;': "\""
    }
    html = html ? html.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; }) : ''

    html = html.replace(/<img+[^<>]+(\/)?>/g, (word) => {
        if (word.indexOf('style') != -1) {
            word = word.replace(/style="([^""]+)?"/, (word2) => {
                let arr = word2.split('"');
                word2 = `${arr[0]}"${arr[1] || ''};max-width: 100% !important;height: auto !important"`
                return word2
            })
        } else {
            word = word.replace(/(\/)?>/, 'style="max-width: 100%; height:auto" />')
        }
        return word
    })
    html = html.replace(/section/g, 'div')
    html = html.replace(/style="[^""]+"/g, (word) => {
        let arr = word.split('"');
        word = `${arr[0]}"${arr[1] || ''};max-width: 100% !important;height: auto !important"`
        return word
    })
    return html
  }

  /* 
    16进制转rgba
    @pageBg(String): 16进制字符串
    @opacity(String || Number): 透明度
  */
  transformationRGB(_pageBg,_opacity) {
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    var sColor = _pageBg.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      //处理六位的颜色
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + ',' + (_opacity / 100) + ")";
    } else {
      return sColor;
    }
  }

  /* 
    把一个数组拆分成由x个数组组成的数组
    @arr(Array): 需要拆分的数组
    @len(Number): 子数组的个数
  */
  splitArray(arr = [], len = 1) {
    var a_len = arr.length;
    var result = [];
    for(var i = 0; i < a_len; i += len) {
      result.push(arr.slice(i, i + len));
    }
    return result;
  }

  /* 
    返回某个范围的随机数
    @star(Number): 最小值
    @end(Number): 最大值
  */
  creatNum(star = 0,end = 10){
    return Math.random() * ( end - star ) + star
  }

  /* 
    获取url参数
    @str(String): 需要获取参数网络地址
  */
  getUrlParams(str) {
    var reg_url = /^[^\?]+\?([\w\W]+)$/,
      reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
      arr_url = reg_url.exec(str),
      ret = {};
    if(arr_url && arr_url[1]) {
      var str_para = arr_url[1],
        result;
      while((result = reg_para.exec(str_para)) != null) {
        ret[result[1]] = result[2];
      }
    }
    return ret;
  }

  /* 
    获取千分符数字
    @num(Number): 需要获取千分符的数字
  */
  formatNumber(num) { 
    if (isNaN(num)) { 
      throw new TypeError("num is not a number"); 
    } 
    
    return ("" + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, "$1,");  
  } 
}

module.exports = new Utils()