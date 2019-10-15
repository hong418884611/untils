"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Utils =
/*#__PURE__*/
function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, [{
    key: "formatDate",

    /* 
    时间戳转日期格式
    @timestamp(Number): 时间戳
    @type(Null): 类型
      date: YY-MM-DD 字符串
      null: 年月日时分秒对象
    */
    value: function formatDate() {
      var timestamp = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : +new Date();
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
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
          return "".concat(year, "-").concat(month, "-").concat(day);
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
    }
    /* 
    两个时间戳的差转日期格式
    @startTime(Number): 开始时间戳
    @endTime(Number): 结束时间戳
    @type(Null): 类型
      null: 年月日时分秒对象
    */

  }, {
    key: "diffTime",
    value: function diffTime() {
      var startTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : +new Date();
      var endTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : +new Date();
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

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

  }, {
    key: "formatHtml",
    value: function formatHtml(html) {
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
            word2 = "".concat(arr[0], "\"").concat(arr[1] || '', ";max-width: 100% !important;height: auto !important\"");
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
        word = "".concat(arr[0], "\"").concat(arr[1] || '', ";max-width: 100% !important;height: auto !important\"");
        return word;
      });
      return html;
    }
    /* 
      16进制转rgba
      @pageBg(String): 16进制字符串
      @opacity(String || Number): 透明度
    */

  }, {
    key: "transformationRGB",
    value: function transformationRGB(_pageBg, _opacity) {
      var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

      var sColor = _pageBg.toLowerCase();

      if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
          var sColorNew = "#";

          for (var i = 1; i < 4; i += 1) {
            sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
          }

          sColor = sColorNew;
        } //处理六位的颜色


        var sColorChange = [];

        for (var i = 1; i < 7; i += 2) {
          sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }

        return "rgba(" + sColorChange.join(",") + ',' + _opacity / 100 + ")";
      } else {
        return sColor;
      }
    }
  }]);

  return Utils;
}();

module.exports = new Utils();
