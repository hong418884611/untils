class Utils {
  
  // 时间戳转日期格式
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

  // 两个时间戳的差转日期格式
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
}

module.exports = new Utils()