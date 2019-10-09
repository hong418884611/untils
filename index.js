"use strict";

var Utils =
/*#__PURE__*/
function () {
  function Utils() {}

  var _proto = Utils.prototype;

  // 时间戳转日期格式
  _proto.formatDate = function formatDate(timestamp, type) {
    if (timestamp === void 0) {
      timestamp = +new Date();
    }

    if (type === void 0) {
      type = null;
    }

    var date = new Date(Number(timestamp)),
        year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes(),
        second = date.getSeconds();

    if (month < 10) {
      month = '0' + month;
    }

    if (day < 10) {
      day = '0' + day;
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    if (minute < 10) {
      minute = '0' + minute;
    }

    if (second < 10) {
      second = '0' + second;
    }

    switch (type) {
      case 'date':
        return year + "-" + month + "-" + day;
        break;

      default:
        return {
          year: year,
          month: month,
          day: day,
          hour: hour,
          minute: minute,
          second: second
        };
    }
  } // 两个时间戳的差转日期格式
  ;

  _proto.diffTime = function diffTime(startTime, endTime, type) {
    if (startTime === void 0) {
      startTime = +new Date();
    }

    if (endTime === void 0) {
      endTime = +new Date();
    }

    if (type === void 0) {
      type = null;
    }

    if (startTime >= endTime) {
      return {
        day: '00',
        hour: '00',
        minute: '00',
        second: '00',
        total_hour: '00',
        stopFlag: true
      };
    }

    var time = endTime - startTime; // 毫秒数

    var s = 1000,
        m = s * 60,
        h = m * 60,
        d = h * 24;
    var day = Math.floor(time / d),
        hour = Math.floor(time % d / h),
        minute = Math.floor(time % h / m),
        second = Math.floor(time % m / s),
        total_hour = day <= 0 ? hour : day * 24 + hour;

    if (day < 10) {
      day = '0' + day;
    }

    if (hour < 10) {
      hour = '0' + hour;
    }

    if (minute < 10) {
      minute = '0' + minute;
    }

    if (second < 10) {
      second = '0' + second;
    }

    if (total_hour < 10) {
      total_hour = '0' + total_hour;
    }

    switch (type) {
      default:
        return {
          day: day,
          hour: hour,
          minute: minute,
          second: second,
          total_hour: total_hour
        };
    }
  } // 富文本html处理
  ;

  _proto.formatHtml = function formatHtml(html) {
    var arrEntities = {
      "lt": "<",
      "gt": ">",
      "amp": "&",
      "nbsp": " ",
      "quot": "\"",
      '&quot;': "\""
    };
    html = html ? html.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) {
      return arrEntities[t];
    }) : '';
    html = html.replace(/<img+[^<>]+(\/)?>/g, function (word) {
      if (word.indexOf('style') != -1) {
        word = word.replace(/style="([^""]+)?"/, function (word2) {
          var arr = word2.split('"');
          word2 = arr[0] + "\"" + (arr[1] || '') + ";max-width: 100% !important;height: auto !important\"";
          return word2;
        });
      } else {
        word = word.replace(/(\/)?>/, 'style="max-width: 100%; height:auto" />');
      }

      return word;
    });
    html = html.replace(/section/g, 'div');
    html = html.replace(/style="[^""]+"/g, function (word) {
      var arr = word.split('"');
      word = arr[0] + "\"" + (arr[1] || '') + ";max-width: 100% !important;height: auto !important\"";
      return word;
    });
    return html;
  };

  return Utils;
}();

module.exports = new Utils();