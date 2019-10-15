/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(28)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(23)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(4),
  /* template */
  __webpack_require__(18),
  /* scopeId */
  "data-v-077da1d8",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\components\\Datetimepicker.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Datetimepicker.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-077da1d8", Component.options)
  } else {
    hotAPI.reload("data-v-077da1d8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'datetimepicker',
    props: {
        id: '',
        date: '',
        type: '',
        time: '', //date:只顯示日期不顯示時間、time:顯示日期與時間
        position: '' //點擊目標在畫面上的座標
    },
    data() {
        return {
            week_en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            now_page_year: '', //當頁年份
            now_page_month: '', //當頁月份
            today: { 'year': '', 'month': '', 'day': '' }, //當天年月日
            totime: { 'hour': '00', 'minute': '00' }, //當天小時分鐘
            month_olympic: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //閏年每月天數
            month_normal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //正常年每月天數
            new_date: '', //所選日期
            new_time: '', //所選時間
            istime: false,
            top_or_bottom: false // true = top , false = bottom 月曆會在目標的上方還是下方
        };
    },
    computed: {
        data_for_month: function () {
            let self = this;
            var array_a = [];
            var result_arr = [];
            var totalDay = self.daysMonth(self.now_page_month, self.now_page_year); //獲取該月總天數
            var firstDay = self.dayStart(self.now_page_month, self.now_page_year); //获取该月第一天是星期几
            for (var i = 0; i < firstDay; i++) {
                var json = {};
                json.week = i % 7; //禮拜幾
                json.day = '';
                json.month = '';
                json.year = '';
                array_a.push(json);
                result_arr.push(json);
            }
            for (var i = 0; i < totalDay; i++) {
                var json = {};
                var array_b = [];
                var cd = new Date(self.now_page_year, self.now_page_month, i + 1);
                json.week = cd.getDay();
                json.day = cd.getDate();
                json.month = self.now_page_month;
                json.year = self.now_page_year;
                array_a.push(json);
                result_arr.push(json);
            }
            var num = Math.ceil(array_a.length / 7);
            for (var i = 0; i < num * 7 - array_a.length; i++) {
                var json = {};
                json.week = (array_a.length + i) % 7; //禮拜幾
                json.day = '';
                json.month = '';
                json.year = '';
                result_arr.push(json);
            }
            return result_arr;
        }
    },
    methods: {
        init: function () {
            let self = this;
            if (this.position) {
                var index_height = $(window).height();
                if (index_height - this.position.y < 400) {
                    self.top_or_bottom = true;
                } else {
                    self.top_or_bottom = false;
                }
            }
            if (this.date) {
                var cd = new Date(this.date);
                if (this.time) {
                    if (cd.getHours() < 10) {
                        self.totime.hour = '0' + cd.getHours();
                    } else {
                        self.totime.hour = cd.getHours();
                    }
                    if (cd.getMinutes() < 10) {
                        self.totime.minute = '0' + cd.getMinutes();
                    } else {
                        self.totime.minute = cd.getMinutes();
                    }
                    self.new_time = self.totime.hour + ':' + self.totime.minute;
                }
            } else {
                var cd = new Date();
                if (this.time) {
                    if (cd.getHours() < 10) {
                        self.totime.hour = '0' + cd.getHours();
                    } else {
                        self.totime.hour = cd.getHours();
                    }
                    if (cd.getMinutes() < 10) {
                        self.totime.minute = '0' + cd.getMinutes();
                    } else {
                        self.totime.minute = cd.getMinutes();
                    }
                    self.new_time = self.totime.hour + ':' + self.totime.minute;
                }
            }
            if (this.time) {
                self.istime = true;
            } else {
                self.istime = false;
            }
            self.now_page_year = cd.getFullYear();
            self.now_page_month = cd.getMonth();
            self.today.year = cd.getFullYear();
            self.today.month = cd.getMonth();
            self.today.day = cd.getDate();
            self.new_date = cd.getFullYear() + "-" + (cd.getMonth() + 1) + "-" + cd.getDate();
        },
        //刪除該欄位日期的設定
        closeDateTimePicker: function () {
            let self = this;
            var json = {};
            if (this.type == 'pt_id') {
                json.pt_id = this.id;
            } else if (this.type == 'pst_id') {
                json.pst_id = this.id;
            } else if (this.type == 'ai_id') {
                json.ai_id = this.id;
            } else if (this.type == 'url_id') {
                json.url_id = this.id;
            }
            json.date = '';
            self.$emit('get-newdate', json);

            self.now_page_year = '';
            self.now_page_month = '';
            self.today = { 'year': '', 'month': '', 'day': '' };
            self.totime = { 'hour': '', 'minute': '' };
            self.$emit('get-close', true);
        },
        //送出日期
        submitDate: function () {
            let self = this;
            var json = {};
            if (this.type == 'pt_id') {
                json.pt_id = this.id;
            } else if (this.type == 'pst_id') {
                json.pst_id = this.id;
            } else if (this.type == 'ai_id') {
                json.ai_id = this.id;
            } else if (this.type == 'url_id') {
                json.url_id = this.id;
            } else if (this.type == 'bbr_id') {
                json.bbr_id = this.id;
            }
            if (self.istime) {
                json.date = self.new_date + ' ' + self.new_time;
            } else {
                json.date = self.new_date;
            }
            self.$emit('get-newdate', json);

            self.now_page_year = '';
            self.now_page_month = '';
            self.today = { 'year': '', 'month': '', 'day': '' };
            self.totime = { 'hour': '', 'minute': '' };
            self.$emit('get-close', true);
        },
        //切換月份
        changeMonth: function (type) {
            let self = this;
            var cd = new Date();
            if (type == 'pre') {
                if (self.now_page_month == 0) {
                    self.now_page_year = self.now_page_year - 1;
                    self.now_page_month = 11;
                } else {
                    self.now_page_month = self.now_page_month - 1;
                }
            } else if (type == 'today') {
                self.now_page_year = cd.getFullYear();
                self.now_page_month = cd.getMonth();
            } else if (type == 'next') {
                if (self.now_page_month == 11) {
                    self.now_page_year = self.now_page_year + 1;
                    self.now_page_month = 0;
                } else {
                    self.now_page_month = self.now_page_month + 1;
                }
            }
        },
        //取得某年某月的天數
        daysMonth: function (month, year) {
            let self = this;
            var tmp = year % 4;
            if (tmp == 0) {
                return self.month_olympic[month];
            } else {
                return self.month_normal[month];
            }
        },
        //取得某年某月第一天是星期幾
        dayStart: function (month, year) {
            var tmpDate = new Date(year, month, 1);
            return tmpDate.getDay();
        },
        //選擇時間
        selectThisTime: function () {
            let self = this;
            var hour = $('input.hour').val();
            var minute = $('input.minute').val();
            if (hour.length == 1) {
                self.totime.hour = '0' + hour;
            } else if (hour.length == 0) {
                self.totime.hour = '00';
            } else if (hour > 23) {
                self.totime.hour = '23';
            } else {
                self.totime.hour = hour.substr(hour.length - 2);
            }
            if (minute.length == 1) {
                self.totime.minute = '0' + minute;
            } else if (minute.length == 0) {
                self.totime.minute = '00';
            } else if (minute > 59) {
                self.totime.minute = 59;
            } else {
                self.totime.minute = minute.substr(minute.length - 2);
            }
            self.new_time = self.totime.hour + ':' + self.totime.minute;
        },
        //選擇某個日期
        selectThisDay: function (year, month, day) {
            let self = this;
            self.today.year = year;
            self.today.month = month;
            self.today.day = day;
            self.new_date = year + "-" + (month + 1) + "-" + day;
        }
    },
    watch: {},
    mounted: function () {
        this.init();
    }
});

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'hoverwrap',
    props: {
        title: '',
        subtitle: '',
        date: '',
        position: '',
        user: ''
    },
    data() {
        return {
            stylelist: {} //該彈窗的座標
        };
    },
    created: function () {},
    computed: {},
    methods: {
        init: function () {
            let self = this;
            //從這邊設定座標
            var index_width = $(window).width();
            var index_height = $(window).height();
            var json = {};
            if (index_width - this.position.x < 400) {
                json.right = index_width - this.position.x + 'px';
            } else {
                json.left = this.position.x + 'px';
                self.stylelist = { top: this.position.y + 'px', left: this.position.x + 'px' };
            }
            if (index_height - this.position.y < 200) {
                json.bottom = index_height - this.position.y + 'px';
            } else {
                json.top = this.position.y + 'px';
            }
            self.stylelist = json;
        }
    },
    watch: {},
    mounted: function () {
        this.init();
    }
});

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'reminderwrap',
    props: {
        id: '', //使用者編號
        admin: '' //是否為管理員
        // type:'',//所屬部門
    },
    data() {
        return {
            reminderdata: []
        };
    },
    created: function () {
        let self = this;
        setInterval(function () {
            self.getUserReminderData();
        }, 1000);
    },
    computed: {},
    methods: {
        init: function () {
            let self = this;
        },
        getUserReminderData: function () {
            let self = this;
            var json = {};
            json.ud_id = this.id;
            if (this.admin) {
                axios.post('/adminallreminderdata', json).then(function (response) {
                    self.reminderdata = response.data;
                    if (self.reminderdata.length > 0) {
                        for (var i = 0; i < self.reminderdata.length; i++) {
                            self.appendReminderWrap(self.reminderdata[i]);
                        }
                    }
                }).catch(function (response) {
                    return false;
                });
            } else {
                axios.post('/userallreminderdata', json).then(function (response) {
                    self.reminderdata = response.data;
                    if (self.reminderdata.length > 0) {
                        for (var i = 0; i < self.reminderdata.length; i++) {
                            self.appendReminderWrap(self.reminderdata[i]);
                        }
                    }
                }).catch(function (response) {
                    return false;
                });
            }
        },
        appendReminderWrap: function (data) {
            let self = this;
            if (data.pst_name) {
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>" + data.pst_name + "</p></div>";
                $('#reminderwrap').append(string);
            } else if (data.ai_title) {
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>" + data.ai_title + "</p></div>";
                $('#reminderwrap').append(string);
            } else {
                var string = "<div class='reminder'><i class='fas fa-bell'></i><p>" + data.url_message + "</p></div>";
                $('#reminderwrap').append(string);
            }
            $('.reminder').on('click', function () {
                $(this).remove();
            });
        }
    },
    watch: {},
    mounted: function () {
        this.init();
    }
});

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Datetimepicker_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Datetimepicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Datetimepicker_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'singlepage',
    components: {
        datetimepicker: __WEBPACK_IMPORTED_MODULE_0__components_Datetimepicker_vue___default.a
    },
    props: {
        userdata: '', //使用者資訊
        type: '', //所屬table的開頭 pt pst ai ud al bi ...
        id: '', //所屬的編號
        cate: '', // 1 主任務、 2 子任務、 3 公告、 4 使用者帳號、 5 權限等級、 6 書籍...
        group: '' //所屬組別
    },
    data() {
        return {
            //是否為管理員
            isadmin: false,
            //所有欄位全部的選項
            milestone_cate: [], //里程碑所有選項
            requiresort_cate: [], //需求分類所有選項
            priority_cate: [], //優先權所有選項
            status_cate: [], //狀態所有選項
            executeitem_cate: [], //執行項目選項
            group_cate: [], //群組所有選項
            type_cate: [], //部門所有選項
            user_cate: [], //所有使用者
            user_group: [], //使用者所屬群組
            user_tags: [], //使用者的標籤資訊
            user_status: [], //使用者資訊
            user_auth: [], //使用者權限
            user_reminderdate: [], //使用者提醒專案資訊
            subprojectsort_cate: [],
            // authoritylevel_cate:[],//權限等級資訊
            user_data: {}, //單一使用者資料
            user_id: '', //單一使用者的編號
            auths: [], //所有權限等級資料
            auth_level: {}, //單一權限等級資料
            auth_id: '', //單一權限等級的編號
            book_status: [], //單一書籍狀態
            book_sort: [], //單一書籍分類
            book_data: {}, //單一書籍資料
            imageurl: '', //書籍圖片路徑暫存區
            book_id: '', //單一書籍編號
            project: [],
            project_ann: [],
            project_infors: [], //某專案任務所有的專案訊息
            project_records: [], //某專案任務所有的專案紀錄
            project_cate: '', //單一專案任務目前顯示的 1.專案任務 2.專案子任務 3.公告 4.....
            project_id: '', //單一專案任務目前顯示的專案任務資料的id
            project_infor_id: '', //單一專案任務目前顯示的專案訊息
            project_record_id: '', //單一專案任務目前顯示的專案紀錄
            single_title: [], //單一專案任務頁面左側主任務title顯示
            single_title_sub: [], //單一專案任務頁面左側子任務title顯示
            sub_loading: false, //單一專案加載框 顯示與否
            pro_type: '', //1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
            ann_type: '', //1.公告資訊 2.公告訊息 3.書籍借閱 4.書籍資訊 5.書籍分類 6.資產管理 7.wifi申請
            delete_id: '', //需要刪除的目標的id
            prompt_box_open: false, //提示框 顯示與否
            sub_project_input_open: false, //新增子任務區塊 顯示與否
            show_submit_btn: true, //送出按鈕功能 顯示與否
            project_ann_id: '', //單一專案任務目前顯示的專案任務資料的id
            ann_message_id: '', //單一專案公告目前顯示的公告訊息的id
            project_ann_messages: [], //某專案公告所有的公告訊息
            project_nav_open: 'information', //單一專案任務頁面-nav區塊 顯示與否
            //拖拉相關
            drag_pt_id: '',
            drag_pst_id: '',
            dropdown: { 'item': '', 'type': '', 'id': '' }, //用於判斷要開啟哪個下拉選單
            //文字編輯器設定
            editor_content: "",
            editing: false,
            create_infor_editor_open: false, //新增訊息區塊 顯示與否
            create_record_editor_open: false, //新增紀錄區塊 顯示與否
            create_message_editor_open: false, //新增訊息區塊(專案公告的) 顯示與否
            //上傳下載
            fileList: [],
            csrfToken: $('meta[name="csrf-token"]').attr('content'),
            amid: '' //公告訊息的編號
        };
    },
    computed: {},
    methods: {
        init: function () {
            let self = this;
            // self.showLoadingBlock();

            self.project_cate = this.cate;

            if (this.userdata.ud_admin) {
                self.isadmin = true;
            } else if (this.type == 'pt' && this.userdata.auth.pt_admin) {
                self.isadmin = true;
            } else if (this.type == 'ai' && this.userdata.auth.ai_admin) {
                self.isadmin = true;
            } else if (this.type == 'bi' && this.userdata.auth.bi_admin) {
                self.isadmin = true;
            }

            //傳入的type所牽涉到的設定 'pt' 'pst' ...
            if (this.type == 'pt') {
                var json = {};
                json.type = this.type;
                json.id = this.id;
                axios.post('/getSingleProjectData', json).then(function (response) {
                    self.project = response.data.project;
                    self.project_id = response.data.project_id;
                    self.single_title = response.data.single_title;
                    self.single_title_sub = response.data.single_title_sub;
                    self.project_infors = response.data.project_infors;
                    self.project_records = response.data.project_records;
                    self.user_tags = response.data.user_tags;
                    self.project_cate = 1;
                    self.project_nav_open = 'information';
                    self.clickImgToOpenNewTab();
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'pst') {
                var json = {};
                json.type = this.type;
                json.id = this.id;
                axios.post('/getSingleProjectData', json).then(function (response) {
                    self.project = response.data.project;
                    self.project_id = response.data.project_id;
                    self.single_title = response.data.single_title;
                    self.single_title_sub = response.data.single_title_sub;
                    self.project_infors = response.data.project_infors;
                    self.project_records = response.data.project_records;
                    self.user_reminderdate = response.data.user_reminderdate;self.project_cate = 2;
                    self.project_nav_open = 'information';
                    self.clickImgToOpenNewTab();
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'ai') {
                var json = {};
                json.id = this.id;
                axios.post('/getSingleAnnouncementData', json).then(function (response) {
                    self.project_ann = response.data.project_ann;
                    self.project_ann_id = response.data.project_ann_id;
                    self.project_ann_messages = response.data.project_ann_messages;
                    self.user_reminderdate = response.data.user_reminderdate;
                    self.ann_message_id = '';
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'ud' && this.id) {
                var json = {};
                json.id = this.id;
                axios.post('/getSingleUserData', json).then(function (response) {
                    self.user_data = response.data.user_data;
                    self.user_id = response.data.user_id;
                    self.imageurl = response.data.imageurl;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'al' && this.id) {
                var json = {};
                json.id = this.id;
                axios.post('/getSingleAuthorityData', json).then(function (response) {
                    self.auth_level = response.data.auth_level;
                    self.auth_id = response.data.auth_id;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.type == 'bi' && this.id) {
                var json = {};
                json.id = this.id;
                axios.post('/getSingleBookData', json).then(function (response) {
                    self.book_data = response.data.book_data;
                    self.book_id = response.data.book_id;
                    self.imageurl = response.data.imageurl;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }

            if (this.cate == 1 || this.cate == 2) {
                var json = {};
                json.cate = this.cate;
                json.group = this.group;
                axios.post('/getSingleCateData', json).then(function (response) {
                    self.subprojectsort_cate = response.data.subprojectsort_cate;
                    self.executeitem_cate = response.data.executeitem_cate;
                    self.milestone_cate = response.data.milestone_cate;
                    self.requiresort_cate = response.data.requiresort_cate;
                    self.priority_cate = response.data.priority_cate;
                    self.status_cate = response.data.status_cate;
                    self.user_cate = response.data.user_cate;
                    self.pro_type = json.cate;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.cate == 4 || this.cate == 5) {
                var json = {};
                json.cate = this.cate;
                json.type = 'ALL';
                axios.post('/getSingleCateData', json).then(function (response) {
                    self.auths = response.data.auths;
                    self.group_cate = response.data.group_cate;
                    self.type_cate = response.data.type_cate;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (this.cate == 6) {
                var json = {};
                json.cate = this.cate;
                json.type = 'ALL';
                axios.post('/getSingleCateData', json).then(function (response) {
                    self.book_sort = response.data.book_sort;
                    self.book_status = response.data.book_status;
                    self.user_cate = response.data.user_cate;
                    self.resetSinglePage();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        ////////////////////////檔案上傳下載功能/////////////////////////
        ///
        ///
        ///
        downloadProFile: function (id, name) {
            let self = this;
            let type = self.project.ug_id;
            axios({
                methods: 'GET',
                url: '/downloadprofile?pi_id=' + id + '&name=' + name + '&type=' + type,
                responseType: 'blob' }).then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', name); //or any other extension
                document.body.appendChild(link);
                link.click();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        downloadAnnFile: function (id, name) {
            let self = this;
            axios({
                methods: 'GET',
                url: '/downloadannfile?am_id=' + id + '&name=' + name,
                responseType: 'blob' }).then(function (response) {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.setAttribute('download', name); //or any other extension
                document.body.appendChild(link);
                link.click();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        submitProUpload: function (id) {
            let self = this;
            let new_data = [];
            if (!self.editing) {
                new_data = $('input[name=newPro]')[0].files;
            } else {
                new_data = $('input[name=upPro]')[0].files;
            }
            let form = new FormData();
            if (new_data.length > 0) {
                for (var i = 0; i < new_data.length; i++) {
                    form.append("file[" + i + "]", new_data[i]);
                }
            }
            form.append("type", self.project.ug_id);
            form.append("pi_id", id);
            form.append("nowdata", self.fileList.length > 0 ? JSON.stringify(self.fileList) : '');
            axios.post('/uploadprofile', form).then(function (response) {
                self.getProjectInfor();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        submitAnnUpload: function (id) {
            let self = this;
            let new_data = [];
            if (!self.editing) {
                new_data = $('input[name=newAnn]')[0].files;
            } else {
                new_data = $('input[name=upAnn]')[0].files;
            }
            let form = new FormData();
            if (new_data.length > 0) {
                for (var i = 0; i < new_data.length; i++) {
                    form.append("file[" + i + "]", new_data[i]);
                }
            }

            form.append("am_id", id);
            form.append("nowdata", self.fileList.length > 0 ? JSON.stringify(self.fileList) : '');
            axios.post('/uploadannfile', form).then(function (response) {
                self.getProjectAnnMessage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        handleError: function (err, file, fileList) {
            return true;
        },
        handleSuccess: function (response, file, fileList) {},
        handleChange: function (file, filelist) {
            let self = this;
            self.fileList = filelist;
        },
        handlePreview: function (file) {
            let self = this;
        },
        handleRemove: function (file, filelist) {
            let self = this;
            self.fileList = filelist;
        },
        ///
        ///
        ///
        ////////////////////////檔案上傳下載功能 end////////////////////////
        ////////////////////////拖拉功能////////////////////////
        ///
        ///
        ///
        //我們必須阻止某一DOM元素對dragover的默認行為，才能使drop事件在其上正確執行
        allowDrop: function (event) {
            event.preventDefault();
        },
        //拖拉對調順序
        dragToChangeProjectSort: function (style, pt_id, pst_id) {
            let self = this;
            if (style == 'start') {
                self.drag_pt_id = pt_id;
                self.drag_pst_id = pst_id;
            } else if (style == 'drop') {
                if (self.drag_pt_id == pt_id && self.drag_pst_id != pst_id) {
                    var sort = '';
                    var dragTargetIndex = '';
                    var dropTargetIndex = '';
                    var pss_id = '';
                    //先取得是哪個專案底下的子任務排序列表
                    for (var i = 0; i < self.subprojectsort_cate.length; i++) {
                        if (self.subprojectsort_cate[i].pt_id == pt_id) {
                            sort = JSON.parse(self.subprojectsort_cate[i].pss_sort);
                            pss_id = self.subprojectsort_cate[i].pss_id;
                        }
                    }
                    var newsort = [];
                    //抓取拖拉的目標以及要前往的目標的排序第幾順位
                    for (var i = 0; i < sort.length; i++) {
                        if (sort[i] == self.drag_pst_id) {
                            dragTargetIndex = i;
                        } else if (sort[i] == pst_id) {
                            dropTargetIndex = i;
                        }
                    }
                    //排出新的排序列表
                    for (var i = 0; i < sort.length; i++) {
                        //拖拉目標往後移動
                        if (dragTargetIndex < dropTargetIndex) {
                            if (sort[i] == self.drag_pst_id) {} else {
                                if (sort[i] == pst_id) {
                                    newsort.push(sort[i]);
                                    newsort.push(self.drag_pst_id);
                                } else {
                                    newsort.push(sort[i]);
                                }
                            }
                            //拖拉目標往前移動
                        } else if (dragTargetIndex > dropTargetIndex) {
                            if (sort[i] == self.drag_pst_id) {} else {
                                if (sort[i] == pst_id) {
                                    newsort.push(self.drag_pst_id);
                                    newsort.push(sort[i]);
                                } else {
                                    newsort.push(sort[i]);
                                }
                            }
                            //拖拉目標並沒有移動
                        } else {
                            newsort.push(sort[i]);
                        }
                    }
                    //儲存新的排序列表
                    var json = {};
                    json.pss_id = pss_id;
                    json.pss_sort = JSON.stringify(newsort);
                    axios.post('/project-sort-modify', json) //修改 - 子任務排序
                    .then(function (response) {
                        if (response.data.result) {
                            self.getSingleTitle(pt_id);
                            self.getSubProjectsSortCate();
                        } else {
                            self.notification(response.data.string, 'failure');
                        }
                    }).catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯', 'failure');
                    });
                }
            } else if (style == 'end') {
                self.drag_pt_id = '';
                self.drag_pst_id = '';
                self.drag_over_pst_id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////拖拉功能 end////////////////////////
        ////////////////////////取得所需資料////////////////////////
        ///
        ///
        ///
        //取得單一書籍狀態
        getBookStatusCate: function () {
            let self = this;
            axios.get('/bookstatuscate').then(function (response) {
                self.book_status = response.data;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一書籍分類
        getBookSort: function () {
            let self = this;
            axios.get('/booksort').then(function (response) {
                self.book_sort = response.data;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一書籍資料
        getBookData: function ($bi_id) {
            let self = this;
            axios.get('/book/' + $bi_id).then(function (response) {
                self.book_data = response.data;
                self.book_id = response.data.bi_id;
                self.imageurl = response.data.bi_fileurl;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得全部權限等級資料
        getAuths: function () {
            let self = this;
            var json = {};
            json.order = '';
            json.sort = '';
            axios.post('/auths', json).then(function (response) {
                self.auths = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一權限等級資料
        getAuthorityLevel: function ($al_id) {
            let self = this;
            axios.get('/authority/' + $al_id).then(function (response) {
                self.auth_level = response.data;
                self.auth_id = response.data.al_id;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一使用者資料
        getUserData: function ($ud_id) {
            let self = this;
            axios.get('/user/' + $ud_id).then(function (response) {
                self.user_data = response.data;
                self.user_id = response.data.ud_id;
                self.imageurl = response.data.ud_icon;
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一公告資料
        getProjectAnn: function ($ai_id) {
            let self = this;

            axios.get('/announcement/' + $ai_id).then(function (response) {
                self.project_ann = response.data;
                self.project_ann_id = response.data.ai_id;
                self.ann_message_id = '';
                //取得該專案公告的訊息
                self.getProjectAnnMessage();
                self.resetSinglePage();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案公告的資訊
        getProjectAnnMessage: function () {
            let self = this;
            var json = {};
            if (self.project_ann.ai_id) {
                json.ai_id = self.project_ann.ai_id;
            }
            axios.post('/announcementmessages', json).then(function (response) {
                self.project_ann_messages = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案任務資料
        getProject: function ($pt_id) {
            let self = this;
            axios.get('/project/' + $pt_id).then(function (response) {
                self.project = response.data;
                self.project_id = response.data.pt_id;
                //改變顯示專案類別
                self.project_cate = 1;
                //取得該專案任務nav title
                self.getSingleTitle(response.data.pt_id);
                //取得該專案任務的專案訊息
                self.getProjectInfor();
                //取得該專案任務的專案紀錄
                self.getProjectRecord();
                self.resetSinglePage();
                self.project_nav_open = 'information';
                self.getUserTags(response.data.ug_id);
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案子任務資料
        getSubProject: function ($pst_id) {
            let self = this;
            axios.get('/subproject/' + $pst_id).then(function (response) {
                self.project = response.data;
                self.project_id = response.data.pst_id;
                //改變顯示專案類別
                self.project_cate = 2;
                //取得該專案任務nav title
                self.getSingleTitle(response.data.pt_id);
                //取得該專案任務的專案訊息
                self.getProjectInfor();
                //取得該專案任務的專案紀錄
                self.getProjectRecord();
                self.resetSinglePage();
                self.project_nav_open = 'information';
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得專案訊息
        getProjectInfor: function () {
            let self = this;
            var json = {};
            if (self.project.pt_id) {
                json.pt_id = self.project.pt_id;
            }
            if (self.project.pst_id) {
                json.pst_id = self.project.pst_id;
            }
            axios.post('/projectinfors', json).then(function (response) {
                self.project_infors = response.data;
                self.clickImgToOpenNewTab();
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得專案紀錄
        getProjectRecord: function () {
            let self = this;
            var json = {};
            if (self.project.pt_id) {
                json.pt_id = self.project.pt_id;
            }
            if (self.project.pst_id) {
                json.pst_id = self.project.pst_id;
            }
            axios.post('/projectrecords', json).then(function (response) {
                self.project_records = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案任務頁面左側title
        getSingleTitle: function ($pt_id) {
            let self = this;
            axios.get('/singletitle/' + $pt_id).then(function (response) {
                self.single_title = response.data.project;
                self.single_title_sub = response.data.projectsub;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得群組資料
        getGroupCate: function () {
            let self = this;
            axios.get('/usergroups').then(function (response) {
                self.group_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得部門資料
        getDepartmentCate: function () {
            let self = this;
            axios.get('/usertype').then(function (response) {
                self.type_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得權限等級資料(all)
        // getAuthorityLevelCate:function(){
        //     let self = this;
        //     axios.get('/authoritylevelcate')
        //         .then(function (response) {
        //             self.authoritylevel_cate = response.data;
        //         })
        //         .catch(function (response) {
        //             console.log(response);
        //             self.notification('系統出錯','failure');
        //         });
        // },
        //取得子任務排序資料
        getSubProjectsSortCate: function () {
            let self = this;
            axios.get('/subprojectsortcate').then(function (response) {
                self.subprojectsort_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得執行項目資料
        getExecuteitemCate: function () {
            let self = this;
            axios.get('/executeitemcate').then(function (response) {
                self.executeitem_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得里程碑資料
        getMilestoneCate: function () {
            let self = this;
            axios.get('/milestonecate').then(function (response) {
                self.milestone_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得需求類別資料
        getRequiresortCate: function () {
            let self = this;
            axios.get('/requiresortcate').then(function (response) {
                self.requiresort_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得優先權資料
        getPriorityCate: function () {
            let self = this;
            axios.get('/prioritycate').then(function (response) {
                self.priority_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得狀態資料
        getStatusCate: function () {
            let self = this;
            axios.get('/statuscate').then(function (response) {
                self.status_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得所有使用者
        getAllUserCate: function () {
            let self = this;
            axios.get('/users').then(function (response) {
                self.user_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得各部門使用者
        getUserCate: function () {
            let self = this;
            axios.get('/usercate').then(function (response) {
                self.user_cate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得使用者自定義標籤
        getUserTags: function (id) {
            let self = this;
            var json = {};
            json.ug_id = id;
            json.ud_id = this.userdata.ud_id;
            axios.post('/usertags', json).then(function (response) {
                self.user_tags = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //取得使用者有設定提醒的專案資料
        getReminderDate: function (id) {
            let self = this;
            var json = {};
            json.ud_id = this.userdata.ud_id;
            json.ut_id = this.userdata.ut_id;
            if (this.type == 'ai') {
                json.ai_id = id;
            } else {
                json.pst_id = id;
            }
            axios.post('/userreminderdate', json).then(function (response) {
                self.user_reminderdate = response.data;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //將所選的權限等級填入使用者資料裡
        selectAuth: function (auth) {
            let self = this;
            self.user_data.al_id = auth.al_id;
            self.user_data.al_name = auth.al_name;
            self.user_data.al_remark = auth.al_remark;
            self.user_data.pt_admin = auth.pt_admin;
            self.user_data.ai_admin = auth.ai_admin;
            self.user_data.pm_admin = auth.pm_admin;
            self.user_data.bi_admin = auth.bi_admin;
        },
        //新增自訂標籤的圖片
        getFile(file, fileList) {
            let self = this;
            const isLt2M = file.size / 1024 / 1024 < 1;
            var str = file.name;
            var res = str.split(".");
            var isImage = false;
            if (res.length > 0) {
                if (res[res.length - 1] == 'png' || res[res.length - 1] == 'jpg' || res[res.length - 1] == 'jpeg') {
                    isImage = true;
                }
            }
            if (!isLt2M) {
                self.notification('圖片大小不能超過1M', 'failure');
            } else if (!isImage) {
                self.notification('上傳圖示只能是JPG或PNG格式', 'failure');
            } else {
                this.getBase64(file.raw).then(res => {
                    if (this.type == 'bi') {
                        self.book_data.bi_fileurl = res;
                    } else if (this.type == 'ud') {
                        self.user_data.ud_icon = res;
                    }
                    self.imageurl = res;
                });
            }
        },
        //將圖片轉成base64
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function () {
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
        //如果未達某位數就補0
        zeroPadding: function (num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        ///
        ///
        ///
        ////////////////////////取得所需資料 end////////////////////
        ////////////////////////打開或關閉某物件////////////////////
        ///
        ///
        ///
        //計算年資
        showSeniority: function (ud_code) {
            let self = this;
            var year = ud_code.substr(0, 4);
            var month = ud_code.substr(4, 2);
            var day = ud_code.substr(6, 2);
            var date = year + '-' + month + '-' + day;

            var now = new Date();
            var num = parseInt(Math.abs(Date.parse(now).valueOf() - Date.parse(date).valueOf()) / 1000 / 60 / 60 / 24 / 365);
            return num;
        },
        //顯示input
        showInput: function () {
            let self = this;
            $('.project_name input').removeClass('none');
            $('.project_name span').addClass('none');
            $('.project_name input').focus();
        },
        //顯示loading區塊
        showLoadingBlock: function () {
            let self = this;
            // self.sub_loading = true;
            setTimeout(function () {
                self.sub_loading = false;
            }, 1000);
        },
        //展開或關閉單一專案頁面其中一個紀錄
        viewMore: function (id) {
            let self = this;
            var target = '.item' + id;
            if ($(target).find('.record_content').hasClass('close')) {
                $(target).find('.record_content').removeClass('close');
            } else {
                $(target).find('.record_content').addClass('close');
            }
        },
        //展開或關閉單一公告頁面其中一個資訊
        openThisMessageItem: function (id) {
            let self = this;
            var target = '.item' + id;
            self.editing = false;
            if ($(target).find('.infor_content').hasClass('close')) {
                $(target).find('.infor_content').removeClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
            } else {
                $(target).find('.infor_content').addClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-down');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-up');
            }
        },
        //展開或關閉單一專案頁面其中一個資訊
        openThisInforItem: function (id) {
            let self = this;
            var target = '.infor' + id;
            self.editing = false;
            if ($(target).find('.infor_content').hasClass('close')) {
                $(target).find('.infor_content').removeClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
            } else {
                $(target).find('.infor_content').addClass('close');
                $(target).find('.infor_icon').removeClass('fa-chevron-circle-down');
                $(target).find('.infor_icon').addClass('fa-chevron-circle-up');
            }
        },
        openThisMessageEditor: function (id, am_fileurl) {
            let self = this;
            var target = '.item' + id;
            self.editing = true;
            if (am_fileurl) {
                self.fileList = JSON.parse(am_fileurl);
            } else {
                self.fileList = [];
            }
            if (self.ann_message_id != '' && self.ann_message_id != id) {
                var ex_target = '.infor' + self.ann_message_id;
                $(ex_target).find('.infor_content').removeClass('close');
                $(ex_target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(ex_target).find('.infor_icon').addClass('fa-chevron-circle-down');
            }
            self.ann_message_id = id;
            $(target).find('.infor_content').addClass('close');
            $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
            $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
        },
        closeMessageEditor: function () {
            let self = this;
            self.editing = false;
            self.ann_message_id = '';
            $('.infor_content').removeClass('close');
        },
        openThisInforEditor: function (id, pi_fileurl) {
            let self = this;
            var target = '.infor' + id;
            self.editing = true;
            if (pi_fileurl) {
                self.fileList = JSON.parse(pi_fileurl);
            } else {
                self.fileList = [];
            }
            if (self.project_infor_id != '' && self.project_infor_id != id) {
                var ex_target = '.infor' + self.project_infor_id;
                $(ex_target).find('.infor_content').removeClass('close');
                $(ex_target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                $(ex_target).find('.infor_icon').addClass('fa-chevron-circle-down');
            }
            self.project_infor_id = id;
            $(target).find('.infor_content').addClass('close');
            $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
            $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
        },
        closeInforEditor: function () {
            let self = this;
            self.editing = false;
            self.project_infor_id = '';
            $('.infor_content').removeClass('close');
        },
        //點擊圖片開新視窗
        clickImgToOpenNewTab: function () {
            setTimeout(function () {
                $('.message img').unbind();
                $('.message img').on('click', function () {
                    var string = $(this).prop('src');
                    var iframe = "<iframe width='100%' height='100%' frameborder='no' border='0' marginwidth='0' marginheight='0' scrolling='no' allowtransparency='yes' src='" + string + "'></iframe>";
                    var x = window.open();
                    x.document.open();
                    x.document.write(iframe);
                    x.document.close();
                });
                $('.message a').prop('target', '_blank');
            }, 1000);
        },
        //判斷是否能打開
        checkToOpen: function (item, type, id) {
            let self = this;
            if (self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id) {
                return true;
            } else {
                return false;
            }
        },
        //打開列表頁的下拉選單
        openDropdownMenu: function (item, type, id, e) {
            let self = this;
            var classname = e.target.className;
            var string = 'dropdown_item';
            var boolean = false;
            if (classname.match(string)) {
                boolean = true;
            }
            if (boolean) {
                if (self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id) {
                    self.dropdown.item = '';
                    self.dropdown.type = '';
                    self.dropdown.id = '';
                } else {
                    self.dropdown.item = item;
                    self.dropdown.type = type;
                    self.dropdown.id = id;
                }
            }
        },
        //關閉月曆
        closeDateTimePicker: function (obj) {
            let self = this;
            if (obj) {
                self.dropdown.item = '';
                self.dropdown.type = '';
                self.dropdown.id = '';
            }
        },
        //關閉目前的單一頁面
        closeNowPage: function () {
            let self = this;
            self.$emit('get-close', true);
        },
        ///
        ///
        ///
        ////////////////////////打開或關閉某物件 end////////////////
        ///////////////////////////新增相關///////////////////////////
        ///
        ///
        ///
        //新增公告訊息
        createMessage: function () {
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if ($('input[name=am_title]').val() != '') {
                json.am_title = $('input[name=am_title]').val();
            } else {
                self.notification('公告標題尚未填入', 'failure');
                return false;
            }
            if ($('.vue-html5-editor .content').html() != '') {
                json.am_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('公告內容尚未填入', 'failure');
                return false;
            }

            json.ai_id = self.project_ann.ai_id;
            axios.post('/announcement-create/2', json) //新增 - 公告訊息
            .then(function (response) {
                if (response.data.result) {
                    self.submitAnnUpload(response.data.id);
                    self.create_message_editor_open = false;
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統錯誤', 'failure');
            });
        },
        //新增專案子任務
        createSubProject: function (pt_id) {
            let self = this;
            var json = {};
            json.pt_id = pt_id;
            if ($('.create_subproject_input textarea[name=pst_name]').val() != '') {
                json.pst_name = $('.create_subproject_input textarea[name=pst_name]').val();
            } else {
                self.notification('請填入子任務名稱', 'failure');
                return false;
            }
            axios.post('/project-create/2', json) //新增 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    //設定單一專案任務id
                    self.project_id = response.data.id;
                    self.getSubProject(self.project_id);
                    $('textarea[name=pst_name]').val('');
                    self.sub_project_input_open = false;
                    //變更單一專案顯示類別為專案主任務
                    self.project_cate = 2;
                    self.getSubProjectsSortCate();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //新增專案訊息
        createInformation: function () {
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if ($('input[name=pi_title]').val() != '') {
                json.pi_title = $('input[name=pi_title]').val();
            } else {
                self.notification('訊息標題尚未填入', 'failure');
                return false;
            }
            if ($('.vue-html5-editor .content').html() != '') {
                json.pi_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('訊息內容尚未填入', 'failure');
                return false;
            }

            if (self.project_cate == 1) {
                json.pt_id = self.project.pt_id;
            } else if (self.project_cate == 2) {
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-create/3', json) //新增 - 專案訊息
            .then(function (response) {
                if (response.data.result) {
                    self.submitProUpload(response.data.id);
                    // self.project_infors = response.data.data;
                    self.create_infor_editor_open = false;
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //新增專案紀錄
        createRecord: function () {
            let self = this;
            var json = {};
            //檢查各欄位是否確實填入
            if ($('.vue-html5-editor .content').html() != '') {
                json.pr_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('紀錄內容尚未填入', 'failure');
                return false;
            }

            if (self.project_cate == 1) {
                json.pt_id = self.project.pt_id;
            } else if (self.project_cate == 2) {
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-create/4', json) //新增 - 專案紀錄
            .then(function (response) {
                if (response.data.result) {
                    self.project_records = response.data.data;
                    self.create_record_editor_open = false;
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        ///
        ///
        ///
        ////////////////////////新增相關 end///////////////////////
        ////////////////////////修改相關///////////////////////////
        ///
        ///
        ///
        //設定書籍所有人
        changeBookUser: function (ud_id, ud_name) {
            let self = this;
            self.book_data.ud_id = ud_id;
            self.book_data.ud_name = ud_name;
        },
        //設定進貨日期
        changePurchaseDate: function (obj) {
            let self = this;
            self.book_data.bi_purchasedate = obj.date;
        },
        //新增或修改書籍
        changeBook: function () {
            let self = this;
            var json = {};
            json = self.book_data;
            //檢查全部欄位是否填入
            if (!json.bi_name) {
                self.notification('請填入書籍名稱', 'failure');
                return false;
            } else if (!json.bs_id) {
                self.notification('請選擇分類', 'failure');
                return false;
            } else if (!json.bi_purchasedate) {
                self.notification('請選擇進貨日期', 'failure');
                return false;
            } else if (!json.ud_id) {
                self.notification('請設定所有人', 'failure');
                return false;
            } else if (!json.bsc_id) {
                self.notification('請設定狀態', 'failure');
                return false;
            } else if (!json.bi_fileurl) {
                self.notification('請上傳一張書籍圖片', 'failure');
                return false;
            }
            if (self.book_id) {
                json.bi_id = self.book_id;
                axios.post('/book-modify/4', json) //修改書籍
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else {
                axios.post('/book-create/4', json) //新增書籍
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //新增或修改使用者資料
        changeUserData: function () {
            let self = this;
            var json = {};
            json = self.user_data;
            //檢查帳號
            if (!self.user_id) {
                if (!json.ud_account) {
                    self.notification('請填入帳號', 'failure');
                    return false;
                } else if (/[^0-9A-Za-z]/g.test(json.ud_account)) {
                    self.notification('帳號只能是英文和數字的組合字串', 'failure');
                    return false;
                }
            }

            //檢查密碼
            if (self.user_id) {
                //修改
                if (json.ud_password && json.ud_password_confirm) {
                    if (json.ud_password != json.ud_password_confirm) {
                        self.notification('密碼與確認密碼不相符', 'failure');
                        return false;
                    }
                }
            } else {
                //新增
                if (!json.ud_password) {
                    self.notification('請填入密碼', 'failure');
                    return false;
                } else if (!json.ud_password_confirm) {
                    self.notification('請填入確認密碼', 'failure');
                    return false;
                } else if (json.ud_password != json.ud_password_confirm) {
                    self.notification('密碼與確認密碼不相符', 'failure');
                    return false;
                }
            }

            //檢查必填欄位
            if (!json.ud_name) {
                self.notification('請填入使用者名稱', 'failure');
                return false;
            } else if (!json.ut_id) {
                self.notification('請選擇部門', 'failure');
                return false;
            } else if (!json.ug_id) {
                self.notification('請選擇群組', 'failure');
                return false;
            }

            //檢查選填項目
            if (json.ud_code) {
                var reg = /^[\d]+$/;
                var boolean = reg.test(json.ud_code);
                if (!boolean) {
                    self.notification('員工代號只能輸入數字', 'failure');
                    return false;
                } else if (json.ud_code.length != 10) {
                    self.notification('員工代號只限10碼', 'failure');
                    return false;
                }
            }

            //檢查是否設定權限
            if (!json.al_id) {
                self.notification('請選擇權限等級', 'failure');
                return false;
            }

            if (self.user_id) {
                axios.post('/user-modify/1', json) //修改使用者資料
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                        if (!self.isadmin) {
                            var sub_json = {};
                            sub_json.url_message = json.ud_name + '修改了個人資料';
                            var f_year = self.zeroPadding(1900 + new Date().getYear(), 4);
                            var f_month = self.zeroPadding(1 + new Date().getMonth(), 2);
                            var f_day = self.zeroPadding(new Date().getDate(), 2);
                            sub_json.url_reminderdate = f_year + '-' + f_month + '-' + f_day;
                            axios.post('/reminderdate-modify', sub_json) //修改使用者資料
                            .then(function (response) {}).catch(function (response) {
                                console.log(response);
                                self.notification('系統出錯', 'failure');
                            });
                        }
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else {
                axios.post('/user-create/1', json) //新增使用者資料
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //新增或修改權限等級
        changeAuthorityLevel: function () {
            let self = this;
            var json = {};
            json = self.auth_level;
            //檢查全部欄位是否填入
            if (!json.al_name) {
                self.notification('請填入權限名稱', 'failure');
                return false;
            } else if (!json.pt_admin && json.pt_admin != 0) {
                self.notification('請設定專案權限', 'failure');
                return false;
            } else if (!json.ai_admin && json.ai_admin != 0) {
                self.notification('請設定公告權限', 'failure');
                return false;
            } else if (!json.pm_admin && json.pm_admin != 0) {
                self.notification('請設定資產權限', 'failure');
                return false;
            } else if (!json.bi_admin && json.bi_admin != 0) {
                self.notification('請設定書籍權限', 'failure');
                return false;
            }
            if (self.auth_id) {
                json.al_id = self.auth_id;
                axios.post('/auth-modify/7', json) //修改權限等級
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else {
                axios.post('/auth-create/7', json) //新增權限等級
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeNowPage();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //停啟用使用者
        changeUserStatus: function ($ud_id, $ud_status) {
            let self = this;
            var json = {};
            json.ud_id = $ud_id;
            if ($ud_status == 1) {
                json.ud_status = 0;
            } else {
                json.ud_status = 1;
            }

            axios.post('/user-modify/1', json) //修改使用者資料
            .then(function (response) {
                if (response.data.result) {
                    self.notification(response.data.string, 'success');
                    self.getUserData($ud_id);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改使用者暱稱
        changeUserName: function () {
            let self = this;
            var json = {};
            json.ud_id = self.user_id;
            //檢查各欄位是否確實填入
            if ($('input[name=ud_name]').val() != '') {
                json.ud_name = $('input[name=ud_name]').val();
            } else {
                self.notification('使用者暱稱不能為空', 'failure');
                return false;
            }

            axios.post('/user-modify/1', json) //修改 - 公告資訊
            .then(function (response) {
                if (response.data.result) {
                    self.getUserData(self.user_id);
                    self.notification(response.data.string, 'success');
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改公告置頂與否
        changeAnnTopping: function (id, boolean) {
            let self = this;
            var json = {};
            if (boolean) {
                //改為置頂
                json.ai_topping = 1;
                json.ai_id = id;
            } else {
                //取消置頂
                json.ai_topping = 0;
                json.ai_id = id;
            }
            if (self.isadmin) {
                axios.post('/announcement-modify/1', json) //修改 - 公告資訊
                .then(function (response) {
                    if (response.data.result) {
                        self.getProjectAnn(id);
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //修改公告標題
        changeAnnTitle: function () {
            let self = this;
            var json = {};
            json.ai_id = self.project_ann_id;
            //檢查各欄位是否確實填入
            if ($('input[name=ai_title]').val() != '') {
                json.ai_title = $('input[name=ai_title]').val();
            } else {
                self.notification('公告標題不能為空', 'failure');
                return false;
            }
            axios.post('/announcement-modify/1', json) //修改 - 公告資訊
            .then(function (response) {
                if (response.data.result) {
                    self.project_ann.ai_title = json.ai_title;
                    self.notification(response.data.string, 'success');
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改公告訊息
        changeMessage: function (id) {
            let self = this;
            var target = '.item' + id;
            var json = {};
            json.am_id = id;
            //檢查各欄位是否確實填入
            if ($(target).find('.am_title').val() != '') {
                json.am_title = $('input[name=am_title]').val();
            } else {
                self.notification('公告標題尚未填入', 'failure');
                return false;
            }
            if ($(target).find('.vue-html5-editor .content').html() != '') {
                json.am_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('公告內容尚未填入', 'failure');
                return false;
            }
            json.ai_id = self.project_ann.ai_id;
            axios.post('/announcement-modify/2', json) //修改 - 公告訊息
            .then(function (response) {
                if (response.data.result) {
                    self.submitAnnUpload(id);
                    self.editing = false;
                    var target = '.item' + self.ann_message_id;
                    $(target).find('.infor_content').removeClass('close');
                    $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                    $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
                    self.ann_message_id = '';
                    self.notification(response.data.string, 'success');
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改到期日期 - 專案公告
        changeAnnExecutiondate: function (obj) {
            let self = this;
            var json = {};
            json.ai_id = obj.ai_id;
            json.ai_expirydate = obj.date;
            axios.post('/announcement-modify/1', json) //修改 - 公告資訊
            .then(function (response) {
                if (response.data.result) {
                    self.project_ann.ai_expirydate = json.ai_expirydate;
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改專案訊息
        changeInformation: function (id) {
            let self = this;
            var target = '.item' + id;
            var json = {};
            json.pi_id = id;
            //檢查各欄位是否確實填入
            if ($(target).find('.pi_title').val() != '') {
                json.pi_title = $('input[name=pi_title]').val();
            } else {
                self.notification('訊息標題尚未填入', 'failure');
                return false;
            }
            if ($(target).find('.vue-html5-editor .content').html() != '') {
                json.pi_message = $('.vue-html5-editor .content').html();
            } else {
                self.notification('訊息內容尚未填入', 'failure');
                return false;
            }
            if (self.project_cate == 1) {
                json.pt_id = self.project.pt_id;
            } else if (self.project_cate == 2) {
                json.pt_id = self.project.pt_id;
                json.pst_id = self.project.pst_id;
            }
            axios.post('/project-modify/3', json) //修改 - 專案訊息
            .then(function (response) {
                if (response.data.result) {
                    self.submitProUpload(id);
                    self.editing = false;
                    var target = '.infor' + self.project_infor_id;
                    $(target).find('.infor_content').removeClass('close');
                    $(target).find('.infor_icon').removeClass('fa-chevron-circle-up');
                    $(target).find('.infor_icon').addClass('fa-chevron-circle-down');
                    self.project_infor_id = '';
                    self.notification(response.data.string, 'success');
                    self.clickImgToOpenNewTab();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
        },
        //修改標籤
        changeTag: function (id) {
            let self = this;
            var json = {};
            json.pt_id = self.project_id;
            json.tm_id = id;
            self.changeForProject('pt', self.project_id, json);
        },
        //修改執行時間
        changeSpendTime: function (pst_id) {
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            if ($('input[name=pst_spendtime]').val() != '') {
                json.pst_spendtime = $('input[name=pst_spendtime]').val();
            } else {
                self.notification('請填入執行時間', 'failure');
                return false;
            }
            self.changeForProject('pst', pst_id, json);
        },
        //修改執行項目
        changeExecuteItem: function (pst_id, peic_id) {
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            json.peic_id = peic_id;
            self.changeForProject('pst', pst_id, json);
        },
        //修改狀態
        changeStatus: function (pst_id, psc_id) {
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            json.psc_id = psc_id;
            self.changeForProject('pst', pst_id, json);
        },
        //修改執行人
        changeUser: function (pst_id, ud_id) {
            let self = this;
            var json = {};
            json.pst_id = pst_id;
            json.ud_id = ud_id;
            self.changeForProject('pst', pst_id, json);
        },
        //修改專案主任務名稱或子任務名稱
        changeProjectName: function () {
            let self = this;
            var json = {};
            if (self.project_cate == 1) {
                json.pt_id = self.project_id;
                json.ug_id = self.project_ug_id;
                json.pt_name = $('.project_name input[name=pt_name]').val();
                self.changeForProject('pt', self.project_id, json);
            } else if (self.project_cate == 2) {
                json.pst_id = self.project_id;
                json.pt_id = self.project.pt_id;
                json.ug_id = self.project_ug_id;
                json.pst_name = $('.project_name input[name=pst_name]').val();
                self.changeForProject('pst', self.project_id, json);
            }
        },
        //修改里程碑
        changeMilestone: function ($pmc_id) {
            let self = this;
            var json = {};
            json.pt_id = self.project_id;
            json.pmc_id = $pmc_id;
            self.changeForProject('pt', self.project_id, json);
        },
        //修改優先權
        changePriority: function ($ppc_id) {
            let self = this;
            var json = {};
            if (self.project_cate == 1) {
                json.pt_id = self.project_id;
                json.ppc_id = $ppc_id;
                self.changeForProject('pt', self.project_id, json);
            } else if (self.project_cate == 2) {
                json.pst_id = self.project_id;
                json.ppc_id = $ppc_id;
                self.changeForProject('pst', self.project_id, json);
            }
        },
        //修改需求類別
        changeRequireSort: function ($prsc_id) {
            let self = this;
            var json = {};
            if (self.project_cate == 1) {
                json.pt_id = self.project_id;
                json.prsc_id = $prsc_id;
                self.changeForProject('pt', self.project_id, json);
            } else if (self.project_cate == 2) {
                json.pst_id = self.project_id;
                json.prsc_id = $prsc_id;
                self.changeForProject('pst', self.project_id, json);
            }
        },
        //修改需求日期
        changeRequireDate: function (obj) {
            let self = this;
            var json = {};
            if (self.project_cate == 1) {
                json.pt_id = obj.pt_id;
                json.pt_requiredate = obj.date;
                self.changeForProject('pt', obj.pt_id, json);
            } else if (self.project_cate == 2) {
                json.pst_id = obj.pst_id;
                json.pst_requiredate = obj.date;
                self.changeForProject('pst', obj.pst_id, json);
            }
        },
        //修改執行日期
        changeExecutiondate: function (obj) {
            let self = this;
            var json = {};
            json.pst_id = obj.pst_id;
            json.pst_executiondate = obj.date;
            self.changeForProject('pst', obj.pst_id, json);
        },
        //修改完成日期
        changeCompletiondate: function (obj) {
            let self = this;
            var json = {};
            json.pst_id = obj.pst_id;
            json.pst_completiondate = obj.date;
            self.changeForProject('pst', obj.pst_id, json);
        },
        //修改提醒時間
        changeReminderdate: function (obj) {
            let self = this;
            var json = {};
            json.ud_id = this.userdata.ud_id;
            json.url_id = obj.url_id;
            json.url_reminderdate = obj.date;
            if (this.type == 'ai') {
                json.ai_id = self.project_ann_id;
            } else {
                json.pst_id = self.project_id;
            }
            var now = new Date();
            if (Date.parse(obj.date).valueOf() < Date.parse(now).valueOf()) {
                self.notification('提醒時間不能早於現在', 'failure');
            } else {
                axios.post('/reminderdate-modify', json) //修改 - 提醒時間
                .then(function (response) {
                    if (response.data.result) {
                        if (json.pst_id) {
                            self.getReminderDate(self.project_id);
                        } else if (json.ai_id) {
                            self.getReminderDate(self.project_ann_id);
                        }
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                    self.closeAllDropdownMenu();
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                    self.closeAllDropdownMenu();
                });
            }
        },
        //修改備份相關資訊
        changeBackupDate: function (id) {
            let self = this;
            var json = {};
            json.pt_id = id;
            if ($('input[name=pt_backupurl]').val() != '') {
                json.pt_backup = 1;
                json.pt_backupurl = $('input[name=pt_backupurl]').val();
            } else {
                self.notification('請填入備份路經方可備份', 'failure');
                return false;
            }
            self.changeForProject('pt', id, json);
        },
        //專案相關統一由這個送到後端
        changeForProject: function (type, id, json) {
            let self = this;
            if (type == 'pt') {
                axios.post('/project-modify/1', json) //修改 - 專案任務
                .then(function (response) {
                    self.closeAllDropdownMenu();
                    if (response.data.result) {
                        self.getProject(id);
                        $('.pro .project_name input').addClass('none');
                        $('.pro .project_name span').removeClass('none');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                    self.closeAllDropdownMenu();
                });
            } else if (type == 'pst') {
                axios.post('/project-modify/2', json) //修改 - 專案子任務
                .then(function (response) {
                    self.closeAllDropdownMenu();
                    if (response.data.result) {
                        self.getSubProject(id);
                        $('.pro .project_name input').addClass('none');
                        $('.pro .project_name span').removeClass('none');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                    self.closeAllDropdownMenu();
                });
            }
        },
        ///
        ///
        ///
        ////////////////////////修改相關 end///////////////////////
        ////////////////////////刪除相關///////////////////////////
        ///
        ///
        ///
        //刪除專案任務相關的資料
        deleteProject: function () {
            let self = this;
            self.show_submit_btn = false;
            setTimeout(function () {
                self.show_submit_btn = true;
            }, 1000);
            var json = {};
            if (self.pro_type !== '') {
                if (self.pro_type == 1) {
                    json.pt_id = self.delete_id;
                } else if (self.pro_type == 2) {
                    json.pst_id = self.delete_id;
                } else if (self.pro_type == 3) {
                    json.pi_id = self.delete_id;
                } else if (self.pro_type == 4) {
                    json.pr_id = self.delete_id;
                }
                axios.post('/project-delete/' + self.pro_type, json) //刪除 - 專案訊息
                .then(function (response) {
                    if (self.pro_type == 1) {
                        self.$emit('get-close', true);
                    } else if (self.pro_type == 2) {
                        self.getProject(self.project.pt_id);
                    } else if (self.pro_type == 3) {
                        self.getProjectInfor();
                    } else if (self.pro_type == 4) {
                        self.getProjectRecord();
                    }
                    if (response.data.result) {
                        self.closePrompt();
                        self.notification(response.data.string, 'success');
                    } else {
                        self.closePrompt();
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    console.log(response);
                    self.notification('系統出錯', 'failure');
                });
            } else if (self.ann_type !== '') {
                if (self.ann_type == 1) {
                    json.ai_id = self.delete_id;
                } else if (self.ann_type == 2) {
                    json.am_id = self.delete_id;
                } else if (self.ann_type == 4) {
                    json.bi_id = self.delete_id;
                }
                if (self.ann_type == 1 || self.ann_type == 2) {
                    axios.post('/announcement-delete/' + self.ann_type, json) //刪除 - 公告相關
                    .then(function (response) {
                        if (self.ann_type == 1) {
                            self.getProjectAnns();
                        } else if (self.ann_type == 2) {
                            self.getProjectAnnMessage();
                        }
                        if (response.data.result) {
                            self.closePrompt();
                            self.notification(response.data.string, 'success');
                        } else {
                            self.closePrompt();
                            self.notification(response.data.string, 'failure');
                        }
                    }).catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯', 'failure');
                    });
                } else {
                    axios.post('/book-delete/' + self.ann_type, json) //刪除 - 書籍
                    .then(function (response) {
                        if (response.data.result) {
                            self.closePrompt();
                            self.notification(response.data.string, 'success');
                            if (self.ann_type == 4) {
                                self.closeNowPage();
                            }
                        } else {
                            self.closePrompt();
                            self.notification(response.data.string, 'failure');
                        }
                    }).catch(function (response) {
                        console.log(response);
                        self.notification('系統出錯', 'failure');
                    });
                }
            } else if (self.user_type !== '') {}
        },
        //移除秒數
        removeSecond: function (date) {
            let self = this;
            var d = new Date(date);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var day = d.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var hour = d.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            var minute = d.getMinutes();
            if (minute < 10) {
                minute = '0' + minute;
            }
            var datetime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            return datetime;
        },
        ///
        ///
        ///
        ////////////////////////刪除相關 end///////////////////////
        ////////////////////////提示框/////////////////////////////
        ///
        ///
        ///
        //重置單一專案頁面所有設定
        resetSinglePage: function () {
            let self = this;
            self.create_infor_editor_open = false;
            self.create_record_editor_open = false;
            self.create_message_editor_open = false;
            self.editing = false;
            self.project_record_id = '';
            self.project_infor_id = '';
        },
        //關閉所有彈出的下拉選單
        closeAllDropdownMenu: function () {
            let self = this;
            self.dropdown.item = '';
            self.dropdown.type = '';
            self.dropdown.id = '';
        },
        colseInput: function (e) {
            let self = this;
            var classname = e.target.className;
            var array = ['pro_input', 'ann_input'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if (classname.match(array[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                $('.pro .project_name input').addClass('none');
                $('.pro .project_name span').removeClass('none');
                $('.ann .project_name input').addClass('none');
                $('.ann .project_name span').removeClass('none');
            }
        },
        colseIfClickOutside: function (e) {
            let self = this;
            var classname = e.target.className;
            var array = ['dropdown_item', 'dd_wrap'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if (classname.match(array[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                self.dropdown.item = '';
                self.dropdown.type = '';
                self.dropdown.id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////刪除相關 end///////////////////////
        ////////////////////////提示框/////////////////////////////
        ///
        ///
        ///
        //彈出提示框
        prompt: function (string, type, boolean) {
            //string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
            let self = this;
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_title').find('h2').text(string);
            if (type == 'question') {
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-question');
                $('.prompt_btn_group').find('.btn_cancel').show();
                $('.prompt_btn_group').find('.btn_submit').show();
                $('.prompt_btn_group').find('p').hide();
            } else if (type == 'success') {
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-check');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.closePrompt();
                                // self.init(true);
                            } else {
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            } else if (type == 'failure') {
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').addClass('fa-times');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.closePrompt();
                                // self.init(true);
                            } else {
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
            self.prompt_box_open = true;
            $('html').addClass('over_hidden');
        },
        //關閉提示框
        closePrompt: function () {
            let self = this;
            self.prompt_box_open = false;
            $('html').removeClass('over_hidden');
        },
        //推撥提示框
        notification: function (string, type) {
            if (type == 'success') {
                var block = "<div class='remove_wrapper success'><i class='fa fa-check'></i><span>" + string + "</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function () {
                    $(this).remove();
                });
                setTimeout(function () {
                    $('.remove_wrapper').remove();
                }, 3000);
            } else if (type == 'failure') {
                var block = "<div class='remove_wrapper failure'><i class='fa fa-times'></i><span>" + string + "</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function () {
                    $(this).remove();
                });
                setTimeout(function () {
                    $('.remove_wrapper').remove();
                }, 3000);
            }
        },
        //開啟刪除專案的提示詢問窗
        openDeleteProjectPromptBox: function (id, type) {
            //1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
            let self = this;
            var string = '';
            if (type == 6) {
                self.ann_type = type;
                self.pro_type = '';
                self.delete_id = id;
            } else {
                self.ann_type = '';
                self.pro_type = type;
                self.delete_id = id;
            }
            if (type == 1) {
                string = '確定要刪除該專案任務？';
            } else if (type == 2) {
                string = '確定要刪除該專案子任務？';
            } else if (type == 3) {
                string = '確定要刪除該專案訊息？';
            } else if (type == 4) {
                string = '確定要刪除該專案紀錄？';
            }
            self.prompt(string, 'question', false);
        },
        //開啟刪除公告的提示詢問窗
        openDeleteAnnPromptBox: function (id, type) {
            //1.公告資訊 2.公告訊息 4.書籍
            let self = this;
            var string = '';
            self.pro_type = '';
            self.ann_type = type;
            self.delete_id = id;
            if (type == 1) {
                string = '確定要刪除該公告資訊？';
            } else if (type == 2) {
                string = '確定要刪除該公告訊息？';
            } else if (type == 4) {
                string = '確定要刪除該書籍？';
            }
            self.prompt(string, 'question', false);
        }
        ///
        ///
        ///
        ////////////////////////提示框 end/////////////////////////
    },
    watch: {},
    mounted: function () {
        this.init();
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Singlepage_vue__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Singlepage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Singlepage_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Hoverwrap_vue__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Hoverwrap_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_Hoverwrap_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Reminderwrap_vue__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Reminderwrap_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Reminderwrap_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Datetimepicker_vue__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Datetimepicker_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Datetimepicker_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({
    components: {
        singlepage: __WEBPACK_IMPORTED_MODULE_0__components_Singlepage_vue___default.a,
        hoverwrap: __WEBPACK_IMPORTED_MODULE_1__components_Hoverwrap_vue___default.a,
        reminderwrap: __WEBPACK_IMPORTED_MODULE_2__components_Reminderwrap_vue___default.a,
        datetimepicker: __WEBPACK_IMPORTED_MODULE_3__components_Datetimepicker_vue___default.a
    },
    data() {
        return {
            url_show_block: 'index', //分頁根據
            loading: false, //加載框 顯示與否
            user_status: [], //使用者的基本資料
            user_auth: [], //使用者權限
            user_group: [], //使用者所屬群組
            user_cate: [], //所有使用者
            //單一頁面所需的值
            single: { 'userdata': '', 'type': '', 'id': '', 'cate': '', 'group': '' },
            //用於判斷要開啟哪個下拉選單
            dropdown: { 'item': '', 'type': '', 'id': '', 'position': '' },
            //hover專案會談出的小框所需要的資訊
            hoverwrap: { 'title': '', 'subtitle': '', 'date': '', 'position': { 'x': '', 'y': '' } },
            //查詢功能設定
            search_show: false, //搜尋框 顯示與否
            composing: true, //監聽搜尋框輸入
            search_condition: { //搜尋關鍵字
                book_content: '',
                ann_content: '',
                user_content: '',
                auth_content: '',
                property_content: '',
                pro_content: ''
            },
            prompt_box_open: false, //提示框 顯示與否
            show_submit_btn: true, //送出按鈕功能 顯示與否
            //下拉選單設定
            top_or_bottom: false, // true = top , false = bottom 下拉選單會在目標的上方還是下方
            //上傳圖片
            image_url: '', //上傳標籤的預覽圖
            delete_id: '', //要刪除的資料的編號
            ann_type: '',
            index: {
                //所有會用到的資料
                system_urls: [], //系統連結資料
                sub_projects_month: [], //當月子任務資料
                sub_projects_week: [], //當週子任務資料
                sub_projects_all: [], //全部子任務資料
                read_more: false, //顯示月曆與否
                firstday: '',
                lastday: '',
                //時鐘相關
                date: '', //日期
                time: '', //時間
                one_week: '',
                month_en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                week_cn: ['週日', '週一', '週二', '週三', '週四', '週五', '週六'],
                //月曆相關
                now_page_year: '', //當頁年份
                now_page_month: '', //當頁月份
                today: { 'year': '', 'month': '', 'day': '' }, //當天年月日
                month_olympic: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31], //閏年每月天數
                month_normal: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31] //正常年每月天數
            },
            book: {
                //所有會用到的資料
                data_books: [], //書籍列表資料
                data_bookborrows: [], //書籍借閱資料
                data_booksorts: [], //書籍分類
                book_infor: { 'bs_id': '', 'bs_name': '', 'bi_id': '', 'bi_name': '' }, //現在所瀏覽的書籍的資訊
                cate_bookstatus: [], //書籍狀態
                create_book_data: {}, //新增借閱紀錄暫存資料區
                //所有顯示區塊判斷用值
                create_book_open: false //新增借閱區塊 顯示與否
            },
            announcement: {
                //所有會用到的資料
                sub_nav: 0, //ann:公告
                data_anns: [], //公告列表資料
                reminder_data: [], //使用者提醒列表
                //所有顯示區塊判斷用值
                create_ann_open: false, //新增公告區塊 顯示與否
                tabHover: -1 //顯示圖片為hover或是尚未hover
            },
            property: {
                //所有會用到的資料
                data_propertys: [], //資產列表資料
                create_property_data: {}, //新增資產暫存資料區
                //所有顯示區塊判斷用值
                create_property_open: false, //新增資產區塊 顯示與否
                //asset(資產)所有顯示的欄位
                property_field_show_or_not: {
                    'ud_name': true, //人員
                    'pm_host': true, //主機
                    'pm_screenone': true, //螢幕1
                    'pm_screentwo': true, //螢幕2
                    'pm_telephone': true, //話機
                    'pm_canvas': true, //繪圖板
                    'pm_other': true, //其他
                    'pm_adobe': true //adobe
                }
            },
            account: {
                users: [], //全部使用者資料
                auths: [], //全部權限等級資料
                //基本設定值
                sub_nav: 'account_management',
                //排序功能的參數
                user_order: 'ud_code',
                user_sort: 'DESC',
                auth_order: 'al_name',
                auth_sort: 'DESC'
            },
            project: {
                //右鍵功能相關設定
                menudata: {
                    boxStyle: "width:150px;background:#f55;", // 菜单box的样式   Menu box style
                    optionStyle: "border: 1px solid #EEEEEE;background:#EDF2F6;color:#4F5A6A;line-height:30px;font-size:12px;", // 菜单选项的样式 Style of menu options
                    menus: [//按下右鍵跳出的按鈕
                    {
                        content: "修改標籤",
                        callback: "modifyTagStyle"
                    }, {
                        content: "刪除標籤",
                        callback: "deleteTagStyle"
                    }, {
                        content: "新增人員",
                        callback: "openUserTagWrap"
                    }]
                },
                //list所有顯示的欄位
                list_field_show_or_not: {
                    'all': {
                        'pmc_name': true, //里程碑
                        'prsc_name': true, //需求類別
                        'peic_name': true, //執行項目
                        'pst_requiredate': true, //需求日期
                        'pst_executiondate': true, //執行日期
                        'pst_completiondate': true, //完成日期
                        'ud_name': true, //執行者
                        'psc_name': true, //狀態
                        'ppc_name': true, //優先權
                        'pst_spendtime': true, //執行時間
                        'pt_backup': true //備份
                    },
                    'wait': {
                        'pmc_name': true, //里程碑
                        'prsc_name': true, //需求類別
                        'peic_name': true, //執行項目
                        'pst_requiredate': true, //需求日期
                        'pst_executiondate': true, //執行日期
                        'pst_completiondate': true, //完成日期
                        'ud_name': true, //執行者
                        'psc_name': true, //狀態
                        'ppc_name': true, //優先權
                        'pst_spendtime': true, //執行時間
                        'pt_backup': true //備份
                    },
                    'finish': {
                        'pmc_name': true, //里程碑
                        'prsc_name': true, //需求類別
                        'peic_name': true, //執行項目
                        'pst_requiredate': true, //需求日期
                        'pst_executiondate': true, //執行日期
                        'pst_completiondate': true, //完成日期
                        'ud_name': true, //執行者
                        'psc_name': true, //狀態
                        'ppc_name': true, //優先權
                        'pst_spendtime': true, //執行時間
                        'pt_backup': true //備份
                    },
                    'else': {
                        'pmc_name': true, //里程碑
                        'prsc_name': true, //需求類別
                        'peic_name': true, //執行項目
                        'pst_requiredate': true, //需求日期
                        'pst_executiondate': true, //執行日期
                        'pst_completiondate': true, //完成日期
                        'ud_name': true, //執行者
                        'psc_name': true, //狀態
                        'ppc_name': true, //優先權
                        'pst_spendtime': true, //執行時間
                        'pt_backup': true //備份
                    }
                },
                //所有欄位全部的選項
                milestone_cate: [], //里程碑所有選項
                requiresort_cate: [], //需求分類所有選項
                priority_cate: [], //優先權所有選項
                status_cate: [], //狀態所有選項
                executeitem_cate: [], //執行項目選項
                subprojectsort_cate: [],
                //所有會用到的資料
                project_ug_id: '', //該專案任務頁面是哪個組別 1.介面A 2.介面B 3.平台/遊戲A 4.平台/遊戲B
                user_tags: [], //使用者的標籤資訊
                user_favorites: [], //使用者的最愛專案
                sub_nav: 'all', //wait:待排程,all:全部任務,finish:完成任務,所有數字都是使用者自定義的標籤編號
                project_status: '全部任務',
                projects: [], //專案任務複數
                sub_projects: [], //專案子任務複數
                user_tag_projects: [], //使用者自定義標籤所包含的專案
                project: [], //專案任務單數
                sub_project: [], //專案子任務單數
                //各種顯示區塊
                create_tag_open: false, //新增標籤頁面 顯示與否
                add_user_tag_open: false, //新增使用者到標籤區塊 顯示與否
                create_project_status: false, //新增專案任務區塊 顯示與否
                create_subproject_status: false, //新增專案子任務區塊 顯示與否
                create_project_ann_status: false, //新增專案任務公告區塊 顯示與否
                subprojects_show: true, //列表呈現子任務 顯示與否
                project_show: false, //列表所顯示的專案任務狀態區塊 顯示與否
                project_nav_open: 'information', //單一專案任務頁面-nav區塊 顯示與否
                prompt_box_open: false, //提示框 顯示與否
                sub_project_input_open: false, //新增子任務區塊 顯示與否
                show_submit_btn: true, //送出按鈕功能 顯示與否
                search_show: false, //搜尋框 顯示與否
                //判別用的設定
                open_list_item: '', //列表頁 下拉選單所屬的欄位
                open_list_id: '', //列表頁 所打開的下拉選單為哪個id
                open_project_id: '', //列表頁 所打開的添加子任務輸入框為哪個id
                //拖拉功能設定
                drag_data: {},
                drag_pt_id: '',
                drag_pst_id: '',
                drag_over_pst_id: '',
                //標籤新增修改相關設定
                tag_type: '',
                tag_data: {},
                tag_user_data: [], //該標籤的所有成員資料
                tag_search_udname: '',
                tag_owner_id: '' //該標籤的擁有者的使用者編號
            }
        };
    },
    created: function () {
        let self = this;
        //擷取路徑抓取到ug_id
        let url = new URL(location.href);
        var array = url.hash.split("#/");
        if (array[1] != '') {
            self.url_show_block = array[1];
            if (!isNaN(self.url_show_block)) {
                self.project.project_ug_id = self.url_show_block;
            }
        } else {
            this.$router.replace('/index');
        }

        //設定時鐘
        var timerID = setInterval(self.updateTime(), 1000);

        //設定周曆
        self.index.one_week = self.getDaysOfWeek();

        //抓取一周的頭跟尾日期
        var cd = new Date();
        var timesStamp = cd.getTime();
        var currenDay = cd.getDay();
        var f_year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getYear();
        var f_month = 1 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getMonth();
        var f_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (0 - (currenDay + 7) % 7)).getDate();

        self.index.firstday = f_year + '-' + f_month + '-' + f_day;

        var l_year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getYear();
        var l_month = 1 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getMonth();
        var l_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (6 - (currenDay + 7) % 7)).getDate();

        self.index.lastday = l_year + '-' + l_month + '-' + l_day;
    },
    mounted: function () {
        this.init();
    },
    computed: {
        data_for_month: function () {
            let self = this;
            var array_a = [];
            var result_arr = [];
            var totalDay = self.daysMonth(self.index.now_page_month, self.index.now_page_year); //獲取該月總天數
            var firstDay = self.dayStart(self.index.now_page_month, self.index.now_page_year); //获取该月第一天是星期几
            for (var i = 0; i < firstDay; i++) {
                var json = {};
                json.week = i % 7; //禮拜幾
                json.day = '';
                json.month = '';
                json.year = '';
                array_a.push(json);
                result_arr.push(json);
            }
            for (var i = 0; i < totalDay; i++) {
                var json = {};
                var array_b = [];
                var cd = new Date(self.index.now_page_year, self.index.now_page_month, i + 1);
                json.week = cd.getDay();
                json.day = cd.getDate();
                json.month = self.index.now_page_month;
                json.year = self.index.now_page_year;
                for (var j = 0; j < self.index.sub_projects_month.length; j++) {
                    var nd = new Date(self.index.sub_projects_month[j].pst_completiondate);
                    if (cd.getDay() == nd.getDay() && cd.getDate() == nd.getDate() && self.index.now_page_month == nd.getMonth() && self.index.now_page_year == nd.getFullYear()) {
                        array_b.push(self.index.sub_projects_month[j]);
                    }
                }
                if (array_b.length > 0) {
                    json.sub_projects_month = array_b;
                }
                array_a.push(json);
                result_arr.push(json);
            }
            var num = Math.ceil(array_a.length / 7);
            for (var i = 0; i < num * 7 - array_a.length; i++) {
                var json = {};
                json.week = (array_a.length + i) % 7; //禮拜幾
                json.day = '';
                json.month = '';
                json.year = '';
                result_arr.push(json);
            }
            return result_arr;
        },
        data_for_week: function () {
            let self = this;
            var result_arr = [];
            var currentDate = new Date();
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            for (var i = 0; i < 7; i++) {
                var f_year = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getYear();
                var f_month = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getMonth();
                var f_day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDate();
                var array_a = [];
                for (var j = 0; j < self.index.sub_projects_week.length; j++) {
                    var dd = new Date(self.index.sub_projects_week[j].pst_completiondate);
                    if (dd.getYear() == f_year && dd.getMonth() == f_month && dd.getDate() == f_day) {
                        array_a.push(self.index.sub_projects_week[j]);
                    }
                }
                result_arr.push(array_a);
            }
            return result_arr;
        },
        new_data: function () {
            let self = this;
            if (self.url_show_block == 'book-list') {
                var array_a = [];
                var array_b = [];
                if (!Array.isArray(self.book.data_bookborrows)) {
                    array_a.push(self.book.data_bookborrows);
                } else {
                    array_a = self.book.data_bookborrows;
                }
                if (self.search_condition.book_content != '') {
                    for (var j = 0; j < array_a.length; j++) {
                        var ss = array_a[j].ud_name;
                        var tt = new RegExp(self.search_condition.book_content, "i");
                        if (ss.match(tt)) {
                            array_b.push(array_a[j]);
                        }
                    }
                    return array_b;
                } else {
                    return array_a;
                }
            } else if (self.url_show_block == 'announcement-list') {
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_d = [];
                var array_e = [];
                for (var i = 0; i < self.announcement.data_anns.length; i++) {
                    if (self.announcement.sub_nav == 0) {
                        if (self.announcement.data_anns[i].ai_cate == 2) {
                            array_e.push(self.announcement.data_anns[i]);
                        }
                    } else {
                        if (self.announcement.data_anns[i].ai_cate == 1 && self.announcement.data_anns[i].ug_id == self.announcement.sub_nav) {
                            array_e.push(self.announcement.data_anns[i]);
                        }
                    }
                }
                for (var i = 0; i < array_e.length; i++) {
                    if (array_e[i].ai_topping == 1) {
                        array_a.push(array_e[i]);
                    } else {
                        array_b.push(array_e[i]);
                    }
                }
                array_c = array_a.concat(array_b);
                if (self.search_condition.ann_content != '') {
                    for (var j = 0; j < array_c.length; j++) {
                        var ss = array_c[j].ai_title;
                        var tt = new RegExp(self.search_condition.ann_content, "i");
                        if (ss.match(tt)) {
                            array_d.push(array_c[j]);
                        }
                    }
                    for (var k = 0; k < array_d.length; k++) {
                        var boolean = true;
                        for (var l = 0; l < self.announcement.reminder_data.length; l++) {
                            if (array_d[k].ai_id == self.announcement.reminder_data[l].ai_id) {
                                array_d[k].url_reminderdate = self.announcement.reminder_data[l].url_reminderdate;
                                boolean = false;
                            }
                        }
                        if (boolean) {
                            array_c[k].url_reminderdate = null;
                        }
                    }
                    return array_d;
                } else {
                    for (var k = 0; k < array_c.length; k++) {
                        var boolean = true;
                        for (var l = 0; l < self.announcement.reminder_data.length; l++) {
                            if (array_c[k].ai_id == self.announcement.reminder_data[l].ai_id) {
                                array_c[k].url_reminderdate = self.announcement.reminder_data[l].url_reminderdate;
                                boolean = false;
                            }
                        }
                        if (boolean) {
                            array_c[k].url_reminderdate = null;
                        }
                    }
                    return array_c;
                }
            } else if (self.url_show_block == 'property-list') {
                let self = this;
                var array_a = [];
                var array_b = [];
                array_a = self.property.data_propertys;
                if (self.search_condition.property_content != '') {
                    for (var j = 0; j < array_a.length; j++) {
                        var ss = array_a[j].ud_name;
                        var tt = new RegExp(self.search_condition.property_content, "i");
                        if (ss.match(tt)) {
                            array_b.push(array_a[j]);
                        }
                    }
                    return array_b;
                } else {
                    return array_a;
                }
            }
        },
        books: function () {
            let self = this;
            var array_a = [];
            var array_b = [];
            for (var i = 0; i < self.book.data_books.length; i++) {
                if (self.book.book_infor.bs_id == self.book.data_books[i].bs_id) {
                    array_a.push(self.book.data_books[i]);
                }
            }
            return array_a;
        },
        new_users: function () {
            let self = this;
            var array_a = [];
            var array_b = [];
            array_a = self.account.users;
            if (self.search_condition.user_content != '') {
                for (var j = 0; j < array_a.length; j++) {
                    var ss = array_a[j].ud_name;
                    var tt = array_a[j].ud_account;
                    var uu = new RegExp(self.search_condition.user_content, "i");
                    if (ss.match(uu) || tt.match(uu)) {
                        array_b.push(array_a[j]);
                    }
                }
                return array_b;
            } else {
                return array_a;
            }
        },
        new_auths: function () {
            let self = this;
            var array_a = [];
            var array_b = [];
            array_a = self.account.auths;
            if (self.search_condition.auth_content != '') {
                for (var j = 0; j < array_a.length; j++) {
                    var ss = array_a[j].al_name;
                    var tt = array_a[j].al_remark;
                    var uu = new RegExp(self.search_condition.auth_content, "i");
                    if (ss) {
                        if (ss.match(uu)) {
                            array_b.push(array_a[j]);
                        }
                    } else if (tt) {
                        if (tt.match(uu)) {
                            array_b.push(array_a[j]);
                        }
                    }
                }
                return array_b;
            } else {
                return array_a;
            }
        },
        projects_for_group: function () {
            let self = this;
            var array_a = self.project.projects;
            var array_b = [];
            if (array_a.length > 0) {
                for (var i = 0; i < array_a.length; i++) {
                    if (array_a[i].ug_id == self.url_show_block) {
                        array_b.push(array_a[i]);
                    }
                }
            }
            return array_b;
        },
        new_projects: function () {
            let self = this;
            if (self.project.sub_nav == 'all') {
                if (self.project.project_status == '全部任務') {
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if (tt && self.projects_for_group[i].is_show) {
                            array_b.push(self.projects_for_group[i]);
                        }
                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        if (array_d.length > 0) {
                            array_c[i].sub_projects = array_d;
                            array_e.push(array_c[i]);
                        } else {
                            if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                                array_c[i].sub_projects = array_d;
                                array_e.push(array_c[i]);
                            }
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                } else if (self.project.project_status == '最愛') {
                    var array_a = [];
                    var array_f = [];
                    var array_e = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                    }
                    for (var i = 0; i < array_a.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_a[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        if (array_d.length > 0) {
                            array_a[i].sub_projects = array_d;
                            array_e.push(array_a[i]);
                        } else {
                            if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                                array_e.push(array_a[i]);
                            }
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                } else if (self.project.project_status == '待排程') {
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if (tt && self.projects_for_group[i].is_show) {
                            array_b.push(self.projects_for_group[i]);
                        }
                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }

                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if (array_c[i].sub_projects[j].psc_id == 2) {
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if (tt) {
                            array_e.push(array_c[i]);
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                } else if (self.project.project_status == '待確認') {
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if (tt && self.projects_for_group[i].is_show) {
                            array_b.push(self.projects_for_group[i]);
                        }
                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }

                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if (array_c[i].sub_projects[j].psc_id == 3) {
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if (tt) {
                            array_e.push(array_c[i]);
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                } else if (self.projectf.project_status == '進行中') {
                    var array_a = [];
                    var array_b = [];
                    var array_c = [];
                    var array_e = [];
                    var array_f = [];
                    for (var i = 0; i < self.projects_for_group.length; i++) {
                        var tt = true;
                        var array_c = [];
                        for (var j = 0; j < self.project.user_favorites.length; j++) {
                            if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show) {
                                array_a.push(self.projects_for_group[i]);
                                tt = false;
                            }
                        }
                        if (tt && self.projects_for_group[i].is_show) {
                            array_b.push(self.projects_for_group[i]);
                        }
                    }
                    array_c = array_a.concat(array_b);
                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        for (var j = 0; j < self.project.sub_projects.length; j++) {
                            if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                                array_d.push(self.project.sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                    }

                    for (var i = 0; i < array_c.length; i++) {
                        var array_d = [];
                        var tt = false;
                        for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                            if (array_c[i].sub_projects[j].psc_id == 4) {
                                tt = true;
                                array_d.push(array_c[i].sub_projects[j]);
                            }
                        }
                        array_c[i].sub_projects = array_d;
                        if (tt) {
                            array_e.push(array_c[i]);
                        }
                    }
                    if (self.search_condition.pro_content != '') {
                        for (var j = 0; j < array_e.length; j++) {
                            var ss = array_e[j].pt_name;
                            var tt = new RegExp(self.search_condition.pro_content, "i");
                            if (ss.match(tt)) {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        if (xx.match(self.search_condition.pro_content)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                        }
                                    }
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                } else {
                                    array_f.push(array_e[j]);
                                }
                            } else {
                                if (array_e[j].sub_projects.length > 0) {
                                    var vv = [];
                                    var boolean = false;
                                    for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                        var xx = array_e[j].sub_projects[k].pst_name;
                                        var yy = new RegExp(self.search_condition.pro_content, "i");
                                        if (xx.match(yy)) {
                                            vv.push(array_e[j].sub_projects[k]);
                                            boolean = true;
                                        }
                                    }
                                    if (boolean) {
                                        array_e[j].sub_projects = vv;
                                        array_f.push(array_e[j]);
                                    }
                                }
                            }
                        }
                        return array_f;
                    } else {
                        return array_e;
                    }
                }
            } else if (self.project.sub_nav == 'wait') {
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_e = [];
                var array_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    var array_c = [];
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id && self.projects_for_group[i].is_show == 0) {
                            array_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if (tt && self.projects_for_group[i].is_show == 0) {
                        array_b.push(self.projects_for_group[i]);
                    }
                }
                array_c = array_a.concat(array_b);
                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                            array_d.push(self.project.sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                }

                if (self.search_condition.pro_content != '') {
                    for (var j = 0; j < array_c.length; j++) {
                        var ss = array_c[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if (ss.match(tt)) {
                            if (array_c[j].sub_projects.length > 0) {
                                var vv = [];
                                for (var k = 0; k < array_c[j].sub_projects.length; k++) {
                                    var xx = array_c[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(array_c[j].sub_projects[k]);
                                    }
                                }
                                array_c[j].sub_projects = vv;
                                array_f.push(array_c[j]);
                            } else {
                                array_f.push(array_c[j]);
                            }
                        } else {
                            if (array_c[j].sub_projects.length > 0) {
                                var vv = [];
                                var boolean = false;
                                for (var k = 0; k < array_c[j].sub_projects.length; k++) {
                                    var xx = array_c[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(array_c[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if (boolean) {
                                    array_c[j].sub_projects = vv;
                                    array_f.push(array_c[j]);
                                }
                            }
                        }
                    }
                    return array_f;
                } else {
                    return array_c;
                }
            } else if (self.project.sub_nav == 'finish') {
                var array_a = [];
                var array_b = [];
                var array_c = [];
                var array_e = [];
                var array_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    var array_c = [];
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id) {
                            array_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if (tt) {
                        array_b.push(self.projects_for_group[i]);
                    }
                }
                array_c = array_a.concat(array_b);
                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if (self.project.sub_projects[j].pt_id == array_c[i].pt_id) {
                            array_d.push(self.project.sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                }

                for (var i = 0; i < array_c.length; i++) {
                    var array_d = [];
                    var tt = false;
                    for (var j = 0; j < array_c[i].sub_projects.length; j++) {
                        if (array_c[i].sub_projects[j].psc_id == 6 || array_c[i].sub_projects[j].psc_id == 7 || array_c[i].sub_projects[j].psc_id == 8 || array_c[i].sub_projects[j].psc_id == 9) {
                            tt = true;
                            array_d.push(array_c[i].sub_projects[j]);
                        }
                    }
                    array_c[i].sub_projects = array_d;
                    if (tt) {
                        array_e.push(array_c[i]);
                    }
                }
                if (self.search_condition.pro_content != '') {
                    for (var j = 0; j < array_e.length; j++) {
                        var ss = array_e[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if (ss.match(tt)) {
                            if (array_e[j].sub_projects.length > 0) {
                                var vv = [];
                                for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                    var xx = array_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(array_e[j].sub_projects[k]);
                                    }
                                }
                                array_e[j].sub_projects = vv;
                                array_f.push(array_e[j]);
                            } else {
                                array_f.push(array_e[j]);
                            }
                        } else {
                            if (array_e[j].sub_projects.length > 0) {
                                var vv = [];
                                var boolean = false;
                                for (var k = 0; k < array_e[j].sub_projects.length; k++) {
                                    var xx = array_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(array_e[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if (boolean) {
                                    array_e[j].sub_projects = vv;
                                    array_f.push(array_e[j]);
                                }
                            }
                        }
                    }
                    return array_f;
                } else {
                    return array_e;
                }
            } else if (self.project.sub_nav != 'department_ann') {
                var toto_a = [];
                var toto_b = [];
                var toto_c = [];
                var toto_e = [];
                var toto_f = [];
                for (var i = 0; i < self.projects_for_group.length; i++) {
                    var tt = true;
                    for (var j = 0; j < self.project.user_favorites.length; j++) {
                        if (self.project.user_favorites[j].pt_id == self.projects_for_group[i].pt_id) {
                            toto_a.push(self.projects_for_group[i]);
                            tt = false;
                        }
                    }
                    if (tt) {
                        toto_b.push(self.projects_for_group[i]);
                    }
                }
                toto_c = toto_a.concat(toto_b);
                for (var i = 0; i < toto_c.length; i++) {
                    var gg = [];
                    for (var j = 0; j < self.project.sub_projects.length; j++) {
                        if (toto_c[i].pt_id == self.project.sub_projects[j].pt_id) {
                            gg.push(self.project.sub_projects[j]);
                        }
                    }
                    toto_c[i].sub_projects = gg;
                }
                for (var i = 0; i < toto_c.length; i++) {
                    if (toto_c[i].tm_id == self.project.sub_nav) {
                        toto_e.push(toto_c[i]);
                    }
                }
                if (self.search_condition.pro_content != '') {
                    for (var j = 0; j < toto_e.length; j++) {
                        var ss = toto_e[j].pt_name;
                        var tt = new RegExp(self.search_condition.pro_content, "i");
                        if (ss.match(tt)) {
                            if (toto_e[j].sub_projects.length > 0) {
                                var vv = [];
                                for (var k = 0; k < toto_e[j].sub_projects.length; k++) {
                                    var xx = toto_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(toto_e[j].sub_projects[k]);
                                    }
                                }
                                toto_e[j].sub_projects = vv;
                                toto_f.push(toto_e[j]);
                            } else {
                                toto_f.push(toto_e[j]);
                            }
                        } else {
                            if (toto_e[j].sub_projects.length > 0) {
                                var vv = [];
                                var boolean = false;
                                for (var k = 0; k < toto_e[j].sub_projects.length; k++) {
                                    var xx = toto_e[j].sub_projects[k].pst_name;
                                    var yy = new RegExp(self.search_condition.pro_content, "i");
                                    if (xx.match(yy)) {
                                        vv.push(toto_e[j].sub_projects[k]);
                                        boolean = true;
                                    }
                                }
                                if (boolean) {
                                    toto_e[j].sub_projects = vv;
                                    toto_f.push(toto_e[j]);
                                }
                            }
                        }
                    }
                    return toto_f;
                } else {
                    return toto_e;
                }
            }
        },
        usercate_for_group: function () {
            let self = this;
            var array_a = self.user_cate;
            var array_b = [];
            for (var i = 0; i < array_a.length; i++) {
                if (array_a[i].ug_id == self.url_show_block) {
                    array_b.push(array_a[i]);
                }
            }
            return array_b;
        },
        search_user_data: function () {
            let self = this;
            var array_a = [];
            var array_b = [];
            var array_c = [];
            if (self.project.tag_search_udname) {
                for (var i = 0; i < self.usercate_for_group.length; i++) {
                    var name = self.usercate_for_group[i].ud_name;
                    var boolean = true;
                    for (var j = 0; j < self.project.tag_user_data.length; j++) {
                        if (self.project.tag_user_data[j].ud_id == self.usercate_for_group[i].ud_id) {
                            boolean = false;
                        }
                    }
                    var string = new RegExp(self.project.tag_search_udname, "i");
                    if (boolean && name.match(string)) {
                        array_a.push(self.usercate_for_group[i]);
                    }
                }
                return array_a;
            } else {
                return array_b;
            }
        }
    },
    methods: {
        init: function () {
            let self = this;
            //取得初始化所有的資料
            var json_index = {};
            json_index.firstday = self.index.firstday;
            json_index.lastday = self.index.lastday;
            axios.post('/getAllIndexData', json_index).then(function (response) {
                self.user_group = response.data.user_group;
                self.user_status = response.data.user_status;
                self.user_auth = response.data.user_status.auth;
                self.index.system_urls = response.data.system_urls;
                self.index.sub_projects_week = response.data.sub_projects_week;
                self.index.sub_projects_all = response.data.sub_projects_all;
            }).catch(function (response) {
                console.log(response);
                self.notification(response, 'failure');
            });
            var json_book = {};
            axios.post('/getAllBookData', json_book).then(function (response) {
                self.book.data_books = response.data.data_books;
                self.book.book_infor = response.data.data_books[0];
                self.book.data_bookborrows = response.data.data_bookborrows;
                self.book.data_booksorts = response.data.data_booksorts;
                self.book.cate_bookstatus = response.data.cate_bookstatus;
                self.user_cate = response.data.user_cate;
            }).catch(function (response) {
                console.log(response);
                self.notification(response, 'failure');
            });
            var json_announcement = {};
            axios.post('/getAllAnnouncementData', json_announcement).then(function (response) {
                self.announcement.reminder_data = response.data.reminder_data;
                self.announcement.data_anns = response.data.data_anns;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
            var json_account = {};
            json_account.auth_order = self.account.auth_order;
            json_account.auth_sort = self.account.auth_sort;
            json_account.user_order = self.account.user_order;
            json_account.user_sort = self.account.user_sort;
            axios.post('/getAllAccountData', json_account).then(function (response) {
                self.account.auths = response.data.auths;
                self.account.users = response.data.users;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
            var json_property = {};
            axios.post('/getAllPropertyData', json_property).then(function (response) {
                self.property.data_propertys = response.data.data_propertys;
            }).catch(function (response) {
                console.log(response);
                self.notification('系統出錯', 'failure');
            });
            var json_project = {};
            axios.post('/getAllProjectData', json_project).then(function (response) {
                self.project.user_tags = response.data.user_tags;
                self.project.user_favorites = response.data.user_favorites;
                self.project.projects = response.data.projects;
                if (!self.user_status.ud_admin && !self.user_auth.pt_admin && self.project.sub_projects.length == 0) {
                    var string = '';
                    for (var i = 0; i < response.data.sub_projects.length; i++) {
                        if (string != response.data.sub_projects[i].pt_id) {
                            string = response.data.sub_projects[i].pt_id;
                            var json = {};
                            json.pt_id = string;
                            axios.post('/getsubprojectsofproject', json).then(function (response) {
                                self.project.sub_projects = self.project.sub_projects.concat(response.data);
                            }).catch(function (response) {
                                self.notification('系統出錯', 'failure');
                            });
                        }
                    }
                } else if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                    self.project.sub_projects = response.data.sub_projects;
                }
                self.project.subprojectsort_cate = response.data.subprojectsort_cate;
                self.project.executeitem_cate = response.data.executeitem_cate;
                self.project.status_cate = response.data.status_cate;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //切換頁面
        changePage: function (page) {
            let self = this;
            if (page != self.url_show_block) {
                self.$router.replace('/' + page);
                self.url_show_block = page;
            }
        },
        //關閉彈跳視窗
        closeHover: function () {
            let self = this;
            self.hoverwrap = { 'title': '', 'subtitle': '', 'date': '', 'position': {} };
        },
        //開啟彈跳視窗
        openHover: function (pt_name, pst_name, date, user, e) {
            let self = this;
            self.hoverwrap.title = pt_name;
            self.hoverwrap.subtitle = pst_name;
            if (date) {
                self.hoverwrap.date = date;
            } else {
                self.hoverwrap.date = '尚未設定';
            }
            if (user) {
                self.hoverwrap.user = user;
            } else {
                self.hoverwrap.user = '待排程';
            }
            self.hoverwrap.position.x = e.x;
            self.hoverwrap.position.y = e.y;
        },
        //判斷是否開啟彈跳視窗
        checkToOpenHover: function () {
            let self = this;
            var boolean = true;
            if (self.hoverwrap.title == '') {
                return false;
            } else if (self.hoverwrap.subtitle == '') {
                return false;
            } else if (self.hoverwrap.date == '') {
                return false;
            }
            return boolean;
        },
        //打開月曆
        openCalendar: function () {
            let self = this;
            self.index.read_more = true;
            var cd = new Date();
            self.index.now_page_year = cd.getFullYear();
            self.index.now_page_month = cd.getMonth();
            self.index.today.year = cd.getFullYear();
            self.index.today.month = cd.getMonth();
            self.index.today.day = cd.getDate();
            self.getOneMonthProjectData();
        },
        //切換月份
        changeMonth: function (type) {
            let self = this;
            var cd = new Date();
            if (type == 'pre') {
                if (self.index.now_page_month == 0) {
                    self.index.now_page_year = self.index.now_page_year - 1;
                    self.index.now_page_month = 11;
                } else {
                    self.index.now_page_month = self.index.now_page_month - 1;
                }
            } else if (type == 'today') {
                self.index.now_page_year = cd.getFullYear();
                self.index.now_page_month = cd.getMonth();
            } else if (type == 'next') {
                if (self.index.now_page_month == 11) {
                    self.index.now_page_year = self.index.now_page_year + 1;
                    self.index.now_page_month = 0;
                } else {
                    self.index.now_page_month = self.index.now_page_month + 1;
                }
            }
            self.getOneMonthProjectData();
        },
        //如果未達某位數就補0
        zeroPadding: function (num, digit) {
            var zero = '';
            for (var i = 0; i < digit; i++) {
                zero += '0';
            }
            return (zero + num).slice(-digit);
        },
        //時鐘要素
        updateTime: function () {
            let self = this;
            var cd = new Date();
            self.index.time = self.zeroPadding(cd.getHours(), 2) + ':' + self.zeroPadding(cd.getMinutes(), 2) + ':' + self.zeroPadding(cd.getSeconds(), 2);
            self.index.date = self.zeroPadding(cd.getFullYear(), 4) + '/' + self.zeroPadding(cd.getMonth() + 1, 2) + '/' + self.zeroPadding(cd.getDate(), 2);
        },
        //取得當周每天的年月日
        getDaysOfWeek: function () {
            let self = this;
            var currentDate = new Date();
            var timesStamp = currentDate.getTime();
            var currenDay = currentDate.getDay();
            var dates = [];
            for (var i = 0; i < 7; i++) {
                var json = {};
                json.year = 1900 + new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getYear();
                json.month = self.index.month_en[new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getMonth()];
                json.day = new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDate();
                json.week = self.index.week_cn[new Date(timesStamp + 24 * 60 * 60 * 1000 * (i - (currenDay + 7) % 7)).getDay()];
                dates.push(json);
            }
            return dates;
        },
        //取得某年某月的天數
        daysMonth: function (month, year) {
            let self = this;
            var tmp = year % 4;
            if (tmp == 0) {
                return self.index.month_olympic[month];
            } else {
                return self.index.month_normal[month];
            }
        },
        //取得某年某月第一天是星期幾
        dayStart: function (month, year) {
            var tmpDate = new Date(year, month, 1);
            return tmpDate.getDay();
        },
        //變更排序方式
        changeUserSort: function (order) {
            let self = this;
            if (self.account.user_order == order) {
                if (self.account.user_sort == 'DESC') {
                    self.account.user_sort = 'ASC';
                    self.getUsers();
                } else {
                    self.account.user_sort = 'DESC';
                    self.getUsers();
                }
            } else {
                self.account.user_order = order;
                self.account.user_sort = 'DESC';
                self.getUsers();
            }
        },
        //變更排序方式
        changeAuthSort: function (order) {
            let self = this;
            if (self.account.auth_order == order) {
                if (self.account.auth_sort == 'DESC') {
                    self.account.auth_sort = 'ASC';
                    self.getAuths();
                } else {
                    self.account.auth_sort = 'DESC';
                    self.getAuths();
                }
            } else {
                self.account.auth_order = order;
                self.account.auth_sort = 'DESC';
                self.getAuths();
            }
        },
        //關閉新增子任務與主任務的欄位
        closeProjectInput: function () {
            let self = this;
            self.project.create_project_status = false; //新增專案任務區塊 顯示與否
            self.project.create_subproject_status = false; //新增專案子任務區塊 顯示與否
        },
        colseUserTagWrap: function (e) {
            let self = this;
            var classname = e.target.className;
            var array = ['user_tag_item'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if (classname.match(array[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                self.project.add_user_tag_open = false;
                self.project.tag_data = {};
                $('#TT_MASK').hide();
                self.image_url = '';
                self.project.tag_search_udname = '';
            }
        },
        //關閉自訂標籤的視窗
        closeTagWrap: function () {
            let self = this;
            self.project.create_tag_open = false;
            self.image_url = '';
            self.project.tag_data = {};
            $('.create_tag_wrap input[name=tm_name]').val('');
        },
        //////////////////// 單一框設定 ////////////////////
        ///
        //關閉單一顯示頁
        closeSinglePage: function (obj) {
            let self = this;
            if (obj) {
                self.init();
                self.single = { 'userdata': '', 'type': '', 'id': '', 'cate': '', 'group': '' };
            }
        },
        //開啟單一顯示頁
        openSinglePage: function (user, type, id, cate, group = 0) {
            let self = this;
            self.single.userdata = user;
            self.single.type = type;
            self.single.id = id;
            self.single.cate = cate;
            self.single.group = group;
        },
        //判斷是否開啟單一顯示頁
        checkToOpenSingle: function () {
            let self = this;
            var boolean = true;
            if (self.single.type == '') {
                return false;
            } else if (self.single.id == '') {
                return false;
            } else if (self.single.cate == '') {
                return false;
            }
            return boolean;
        },
        showAllSubprojectsOrNot: function (boolean) {
            let self = this;
            if (boolean) {
                $('.sub_item').removeClass('hidden');
            } else {
                $('.sub_item').addClass('hidden');
            }
        },
        showSubProject: function (e, id) {
            let self = this;
            var classname = e.target.className;
            var array_a = ['cell']; // 點擊範圍
            var array_b = ['dropdown_item'];
            var boolean = true;
            var string = '.list' + id;
            for (var i = 0; i < array_a.length; i++) {
                if (!classname.match(array_a[i])) {
                    boolean = false;
                }
            }
            for (var i = 0; i < array_b.length; i++) {
                if (classname.match(array_b[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                if ($(string).find('.sub_item').hasClass('hidden')) {
                    $(string).find('.sub_item').removeClass('hidden');
                } else {
                    $(string).find('.sub_item').addClass('hidden');
                }
            }
        },
        ///
        //////////////////// 單一框設定 end ////////////////////

        ////////////////////////拖拉功能////////////////////////
        ///
        ///
        ///
        //拖拉功能
        drag: function (type, id) {
            let self = this;
            var json = {};
            //如果拖拉主任務，就是連同底下的子任務都一起拖拉
            if (type == 'pt_id') {
                json.pt_id = id;
                //如果拖拉子任務，就只有單一子任務拖拉
            }
            self.project.drag_data = json;
        },
        dragOrNot: function () {
            let self = this;
            if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                return true;
            } else {
                return false;
            }
        },
        dragend: function () {
            let self = this;
            self.project.drag_data = {};
        },
        drop: function (id) {
            let self = this;
            self.project.drag_data.tm_id = id;
            self.project.drag_data.is_show = 1;
            self.project.drag_data.ug_id = self.project.project_ug_id;
            axios.post('/project-modify/1', self.project.drag_data) //修改 專案任務的標籤
            .then(function (response) {
                if (response.data.result) {
                    self.getProjects();
                    self.notification(response.data.string, 'success');
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //我們必須阻止某一DOM元素對dragover的默認行為，才能使drop事件在其上正確執行
        allowDrop: function (event) {
            event.preventDefault();
        },
        comingsoon: function (id) {
            let self = this;
            self.project.drag_over_pst_id = id;
        },
        //拖拉對調順序
        dragToChangeProjectSort: function (style, pt_id, pst_id) {
            let self = this;
            if (style == 'start') {
                self.project.drag_pt_id = pt_id;
                self.project.drag_pst_id = pst_id;
            } else if (style == 'drop') {
                if (self.project.drag_pt_id == pt_id && self.project.drag_pst_id != pst_id) {
                    var sort = '';
                    var dragTargetIndex = '';
                    var dropTargetIndex = '';
                    var pss_id = '';
                    //先取得是哪個專案底下的子任務排序列表
                    for (var i = 0; i < self.project.subprojectsort_cate.length; i++) {
                        if (self.project.subprojectsort_cate[i].pt_id == pt_id) {
                            sort = JSON.parse(self.project.subprojectsort_cate[i].pss_sort);
                            pss_id = self.project.subprojectsort_cate[i].pss_id;
                        }
                    }
                    var newsort = [];
                    //抓取拖拉的目標以及要前往的目標的排序第幾順位
                    for (var i = 0; i < sort.length; i++) {
                        if (sort[i] == self.project.drag_pst_id) {
                            dragTargetIndex = i;
                        } else if (sort[i] == pst_id) {
                            dropTargetIndex = i;
                        }
                    }
                    //排出新的排序列表
                    for (var i = 0; i < sort.length; i++) {
                        //拖拉目標往後移動
                        if (dragTargetIndex < dropTargetIndex) {
                            if (sort[i] == self.project.drag_pst_id) {} else {
                                if (sort[i] == pst_id) {
                                    newsort.push(sort[i]);
                                    newsort.push(self.project.drag_pst_id);
                                } else {
                                    newsort.push(sort[i]);
                                }
                            }
                            //拖拉目標往前移動
                        } else if (dragTargetIndex > dropTargetIndex) {
                            if (sort[i] == self.project.drag_pst_id) {} else {
                                if (sort[i] == pst_id) {
                                    newsort.push(self.project.drag_pst_id);
                                    newsort.push(sort[i]);
                                } else {
                                    newsort.push(sort[i]);
                                }
                            }
                            //拖拉目標並沒有移動
                        } else {
                            newsort.push(sort[i]);
                        }
                    }
                    //儲存新的排序列表
                    var json = {};
                    json.pss_id = pss_id;
                    json.pss_sort = JSON.stringify(newsort);
                    axios.post('/project-sort-modify', json) //修改 - 子任務排序
                    .then(function (response) {
                        if (response.data.result) {
                            self.getSubProjects();
                            self.getSubProjectsSortCate();
                        } else {
                            self.notification(response.data.string, 'failure');
                        }
                    }).catch(function (response) {
                        self.notification('系統出錯', 'failure');
                    });
                }
            } else if (style == 'end') {
                self.project.drag_pt_id = '';
                self.project.drag_pst_id = '';
                self.project.drag_over_pst_id = '';
            }
        },
        ///
        ///
        ///
        ////////////////////////拖拉功能 end////////////////////////

        ////////////////////////右鍵功能////////////////////////
        ///
        ///
        ///
        //右鍵功能 - 修改標籤
        modifyTagStyle: function () {
            let self = this;
            self.project.create_tag_open = true;
            self.project.tag_type = 'modify';
            $('#TT_MASK').hide();
        },
        //右鍵功能 - 刪除標籤
        deleteTagStyle: function () {
            let self = this;
            self.openDeletePromptBox(self.project.tag_data.tm_id, 5);
        },
        //右鍵功能 - 新增人員
        openUserTagWrap: function () {
            let self = this;
            self.getUserInThisTag();
            self.project.add_user_tag_open = true;
        },
        //將被點擊右鍵的自訂標籤資料存起來
        updateTagData: function (id, url, name) {
            let self = this;
            self.project.tag_data.tm_id = id;
            self.project.tag_data.tm_url = url;
            self.image_url = url;
            self.project.tag_data.tm_name = name;
        },
        ///
        ///
        ///
        ////////////////////////右鍵功能 end////////////////////////

        ////////////////////////查詢功能////////////////////////
        ///
        //查詢功能
        search: function () {
            let self = this;
            setTimeout(function () {
                if (self.composing) {
                    if (self.url_show_block == "book-list") {
                        self.search_condition.book_content = $('input[name=search_content]').val();
                    } else if (self.url_show_block == 'announcement-list') {
                        self.search_condition.ann_content = $('input[name=search_content]').val();
                    } else if (self.url_show_block == 'account-list') {
                        if (self.account.sub_nav == 'account_management') {
                            self.search_condition.user_content = $('input[name=search_content]').val();
                        } else if (self.account.sub_nav == 'authority_level') {
                            self.search_condition.auth_content = $('input[name=search_content]').val();
                        }
                    } else if (self.url_show_block == 'property-list') {
                        self.search_condition.property_content = $('input[name=search_content]').val();
                    } else if (!isNaN(self.url_show_block)) {
                        self.search_condition.pro_content = $('input[name=search_content]').val();
                    }
                }
            }, 10);
        },
        //查詢不在此標籤內的使用者
        searchUser: function () {
            let self = this;
            setTimeout(function () {
                if (self.composing) {
                    var json = {};
                    json.ud_name = $('.tag_input input[name=ud_name]').val();
                    json.tm_id = self.project.tag_data.tm_id;
                    self.project.tag_search_udname = $('.tag_input input[name=ud_name]').val();
                    axios.post('/userinthistag', json).then(function (response) {
                        self.project.tag_user_data = response.data;
                    }).catch(function (response) {
                        self.notification('系統出錯', 'failure');
                    });
                }
            }, 10);
        },
        //監聽搜尋框 注音輸入開始
        listen_input_start: function () {
            let self = this;
            self.composing = false;
        },
        //監聽搜尋框 注音輸入結束
        listen_input_end: function () {
            let self = this;
            self.composing = true;
        },
        //清除搜尋資料
        clearSearchCondition: function () {
            let self = this;
            self.search_condition = {
                book_content: '',
                ann_content: '',
                user_content: '',
                auth_content: '',
                property_content: '',
                pro_content: ''
            };
        },
        ///
        ////////////////////////查詢功能 end////////////////////

        ////////////////////////下拉功能////////////////////////
        ///
        //關閉月曆
        closeDateTimePicker: function (obj) {
            let self = this;
            if (obj) {
                self.closeAllDropdownMenu();
            }
        },
        //判斷是否開啟下拉選單
        checkToOpenDropDown: function (item, type, id) {
            let self = this;
            if (self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id) {
                return true;
            } else {
                return false;
            }
        },
        //打開列表頁的下拉選單
        openDropdownMenu: function (item, type, id, e) {

            let self = this;
            var classname = e.target.className;
            var string = 'dropdown_item';
            var boolean = false;

            if (classname.match(string)) {
                boolean = true;
            }
            var index_height = $(window).height();
            if (index_height - e.y < 400) {
                self.top_or_bottom = true;
            } else {
                self.top_or_bottom = false;
            }

            var json = {};
            json.x = e.x;
            json.y = e.y;
            if (boolean) {
                if (self.dropdown.item == item && self.dropdown.type == type && self.dropdown.id == id) {
                    self.closeAllDropdownMenu();
                } else {
                    self.dropdown.item = item;
                    self.dropdown.type = type;
                    self.dropdown.id = id;
                    self.dropdown.position = json;
                }
            }
        },
        //關閉所有彈出的下拉選單
        closeAllDropdownMenu: function () {
            let self = this;
            self.dropdown.item = '';
            self.dropdown.type = '';
            self.dropdown.id = '';
            self.dropdown.position = '';
        },
        ///
        ////////////////////////下拉功能 end/////////////////////

        //////////////////// 上傳圖片 ////////////////////
        ///
        //新增自訂標籤的圖片
        getFile(file, fileList) {
            let self = this;
            const isLt2M = file.size / 1024 / 1024 < 1;
            var str = file.name;
            var res = str.split(".");
            var isImage = false;
            if (res.length > 0) {
                if (res[res.length - 1] == 'png' || res[res.length - 1] == 'jpg' || res[res.length - 1] == 'jpeg') {
                    isImage = true;
                }
            }
            if (!isLt2M) {
                self.notification('圖片大小不能超過1M', 'failure');
            } else if (!isImage) {
                self.notification('上傳標籤圖示只能是JPG或PNG格式', 'failure');
            } else {
                this.getBase64(file.raw).then(res => {
                    self.image_url = res;
                });
            }
        },
        //將圖片轉成base64
        getBase64(file) {
            return new Promise(function (resolve, reject) {
                let reader = new FileReader();
                let imgResult = "";
                reader.readAsDataURL(file);
                reader.onload = function () {
                    imgResult = reader.result;
                };
                reader.onerror = function (error) {
                    reject(error);
                };
                reader.onloadend = function () {
                    resolve(imgResult);
                };
            });
        },
        ///
        //////////////////// 上傳圖片 end ////////////////////

        ////////////////////////取值專區 ////////////////////////
        ///
        //取得子任務排序資料
        getSubProjectsSortCate: function () {
            let self = this;
            axios.get('/subprojectsortcate').then(function (response) {
                self.project.subprojectsort_cate = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得執行項目資料
        getExecuteitemCate: function () {
            let self = this;
            axios.get('/executeitemcate').then(function (response) {
                self.project.executeitem_cate = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得狀態資料
        getStatusCate: function () {
            let self = this;
            axios.get('/statuscate').then(function (response) {
                self.project.status_cate = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //優先顯示加入最愛的專案
        showFavoriteFirst: function ($pt_id) {
            let self = this;
            for (var i = 0; i < self.project.user_favorites.length; i++) {
                if (self.project.user_favorites[i].pt_id == $pt_id) {
                    return true;
                }
            }
        },
        //取得使用者自定義標籤
        getUserTags: function () {
            let self = this;
            var json = {};
            json.ud_id = self.user_status.ud_id;
            axios.post('/usertags', json).then(function (response) {
                self.project.user_tags = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得使用者專案最愛
        getUserFavorites: function () {
            let self = this;
            //取得該使用者加最愛的專案
            axios.post('/userfavorites', self.user_status).then(function (response) {
                self.project.user_favorites = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得專案任務資料
        getProjects: function () {
            let self = this;
            axios.post('/projects').then(function (response) {
                self.project.projects = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一專案任務底下所有的子任務資料
        getSubProjects: function () {
            let self = this;
            axios.get('/subprojects').then(function (response) {
                if (!self.user_status.ud_admin && !self.user_auth.pt_admin && self.project.sub_projects.length == 0) {
                    var string = '';
                    // self.sub_projects = [];
                    for (var i = 0; i < response.data.length; i++) {
                        if (string != response.data[i].pt_id) {
                            string = response.data[i].pt_id;
                            var json = {};
                            json.pt_id = string;
                            axios.post('/getsubprojectsofproject', json).then(function (response) {
                                self.project.sub_projects = self.project.sub_projects.concat(response.data);
                            }).catch(function (response) {
                                self.notification('系統出錯', 'failure');
                            });
                        }
                    }
                    // self.sub_projects = array_a;
                } else if (self.user_status.ud_admin || self.user_auth.pt_admin) {
                    self.project.sub_projects = response.data;
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得某標籤裡的成員資料
        getUserInThisTag: function () {
            let self = this;
            var json = {};
            json.tm_id = self.project.tag_data.tm_id;
            axios.post('/userinthistag', json).then(function (response) {
                self.project.tag_user_data = response.data;
                for (var i = 0; i < self.project.tag_user_data.length; i++) {
                    if (self.project.tag_user_data[i].trm_owner) {
                        self.project.tag_owner_id = self.project.tag_user_data[i].ud_id;
                    }
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得資產列表資訊
        getPropertys: function () {
            let self = this;
            axios.get('/propertys').then(function (response) {
                self.property.data_propertys = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得全部權限等級資料
        getAuths: function () {
            let self = this;
            var json = {};
            json.order = self.account.auth_order;
            json.sort = self.account.auth_sort;
            axios.post('/auths', json).then(function (response) {
                self.account.auths = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得全部使用者資料
        getUsers: function () {
            let self = this;
            var json = {};
            json.order = self.account.user_order;
            json.sort = self.account.user_sort;
            axios.post('/users', json).then(function (response) {
                self.account.users = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得公告列表資訊
        getAnns: function (id) {
            let self = this;
            axios.get('/companyanns/' + id).then(function (response) {
                self.announcement.data_anns = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得書籍列表資訊
        getBooks: function () {
            let self = this;
            axios.get('/books').then(function (response) {
                if (response.data.length > 0) {
                    self.book.data_books = response.data;
                    self.book.book_infor = self.book.data_books[0];
                    self.getBorrowing(self.book.data_books[0].bi_id);
                } else {
                    self.book.book_infor = {};
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得單一書籍資訊
        getBook: function (id) {
            let self = this;
            axios.get('/book/' + id).then(function (response) {
                self.book.book_infor = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得某書籍借閱紀錄
        getBorrowing: function (id) {
            let self = this;
            axios.get('/borrowing/' + id).then(function (response) {
                self.book.data_bookborrows = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得書籍分類
        getBookSort: function () {
            let self = this;
            axios.get('/booksort').then(function (response) {
                self.book.data_booksorts = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得書籍狀態
        getBookStatusCate: function () {
            let self = this;
            axios.get('/bookstatuscate').then(function (response) {
                self.book.cate_bookstatus = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得所有使用者
        getUserCate: function () {
            let self = this;
            axios.get('/users').then(function (response) {
                self.user_cate = response.data;
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //取得系統連結資料
        getUrls: function () {
            let self = this;
            axios.get('/urls').then(function (response) {
                if (response.data) {
                    self.index.system_urls = response.data;
                } else {
                    self.notification('無法取得全部資料，請重新登入。', 'failure');
                }
            }).catch(function (response) {
                self.notification(response, 'failure');
            });
        },
        //取得某年某月資料
        getOneMonthProjectData: function () {
            let self = this;
            var json = {};
            json.year = self.index.now_page_year;
            json.month = self.index.now_page_month;
            axios.post('/onemonthproject', json).then(function (response) {
                if (response.data) {
                    self.index.sub_projects_month = response.data;
                } else {
                    self.notification('無法取得當月資料，請重新登入。', 'failure');
                }
            }).catch(function (response) {
                self.notification(response, 'failure');
            });
        },
        //取得當週資料
        getOneWeekProjectData: function () {
            let self = this;
            var json = {};
            json.firstday = self.index.firstday;
            json.lastday = self.index.lastday;

            axios.post('/oneweekproject', json).then(function (response) {
                if (response.data) {
                    self.index.sub_projects_week = response.data;
                } else {
                    self.notification('無法取得當週資料，請重新登入。', 'failure');
                }
            }).catch(function (response) {
                self.notification(response, 'failure');
            });
        },
        //取得該使用者全部資料
        getAllUserProjectData: function () {
            let self = this;
            axios.get('/allusersubproject').then(function (response) {
                if (response.data) {
                    self.index.sub_projects_all = response.data;
                } else {
                    self.notification('無法取得全部資料，請重新登入。', 'failure');
                }
            }).catch(function (response) {
                self.notification(response, 'failure');
            });
        },
        ///
        ////////////////////////取值專區 end////////////////////////

        ////////////////////////其他有用功能////////////////////////
        ///
        //移除秒數
        removeSecond: function (date) {
            let self = this;
            var d = new Date(date);
            var year = d.getFullYear();
            var month = d.getMonth() + 1;
            if (month < 10) {
                month = '0' + month;
            }
            var day = d.getDate();
            if (day < 10) {
                day = '0' + day;
            }
            var hour = d.getHours();
            if (hour < 10) {
                hour = '0' + hour;
            }
            var minute = d.getMinutes();
            if (minute < 10) {
                minute = '0' + minute;
            }
            var datetime = year + "-" + month + "-" + day + " " + hour + ":" + minute;
            return datetime;
        },
        //關閉所有打開的區塊或視窗或是重置任何數值
        closeAll: function () {
            let self = this;
            self.dropdown.item = '';
            self.dropdown.type = '';
            self.dropdown.id = '';
            self.dropdown.position = '';

            self.book.create_book_open = false;
            self.book.create_book_data = {};
            self.property.create_property_open = false;
            self.property.create_property_data = {};
            self.announcement.create_ann_open = false;

            $('.content_wrap').removeClass('modify');
            $('.content_text input').addClass('none');
            $('.content_text span').removeClass('none');
            //後續還有可以繼續新增
        },
        //點擊目標以外地方關閉所有下拉
        colseIfClickOutside: function (e) {
            let self = this;
            var classname = e.target.className;
            var array = ['dropdown_item', 'dd_wrap'];
            var boolean = true;
            for (var i = 0; i < array.length; i++) {
                if (classname.match(array[i])) {
                    boolean = false;
                }
            }
            if (boolean) {
                self.closeAll();
            }
        },
        //顯示某個欄位的input並且開始修改
        showThisFieldInput: function (field, id) {
            let self = this;
            var target = '.list' + id;
            $('.content_wrap').removeClass('modify');
            $('.content_text input').addClass('none');
            $('.content_text span').removeClass('none');
            $(target).find('.' + field).find('span').addClass('none');
            $(target).find('.' + field).find('input').removeClass('none');
            $(target).addClass('modify');
        },
        //選擇這本書
        selectThisBook: function (id, name) {
            let self = this;
            self.getBook(id);
            self.getBorrowing(id);
        },
        //切換其他書籍分類
        changeBookSort: function (id, name) {
            let self = this;
            self.book.book_infor = {};
            self.book.book_infor.bs_id = id;
            self.book.book_infor.bs_name = name;
            self.book.data_bookborrows = [];
        },
        ///
        ////////////////////////其他有用功能 end////////////////////////

        //////////////////// 推播框設定 ////////////////////
        ///
        //推撥提示框
        notification: function (string, type) {
            if (type == 'success') {
                var block = "<div class='remove_wrapper success'><i class='fa fa-check'></i><span>" + string + "</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function () {
                    $(this).remove();
                });
                setTimeout(function () {
                    $('.remove_wrapper').remove();
                }, 3000);
            } else if (type == 'failure') {
                var block = "<div class='remove_wrapper failure'><i class='fa fa-times'></i><span>" + string + "</span></div>";
                $('.notification_wrap').append(block);
                $('.remove_wrapper').hover(function () {
                    $(this).remove();
                });
                setTimeout(function () {
                    $('.remove_wrapper').remove();
                }, 3000);
            }
        },
        //彈出提示框
        prompt: function (string, type, boolean) {
            //string：要提示的字串，type：提示框的類型，boolean：是否要重整頁面
            let self = this;
            $('html').scrollLeft(0);
            $('html').scrollTop(0);
            $('.prompt_title').find('h2').text(string);
            if (type == 'question') {
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-question');
                $('.prompt_btn_group').find('.btn_cancel').show();
                $('.prompt_btn_group').find('.btn_submit').show();
                $('.prompt_btn_group').find('p').hide();
            } else if (type == 'success') {
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').removeClass('fa-times');
                $('.prompt_icon').find('i').addClass('fa-check');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.closePrompt();
                                // self.init(true);
                            } else {
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            } else if (type == 'failure') {
                $('.prompt_icon').find('i').removeClass('fa-check');
                $('.prompt_icon').find('i').removeClass('fa-question');
                $('.prompt_icon').find('i').addClass('fa-times');
                $('.prompt_btn_group').find('.btn_cancel').hide();
                $('.prompt_btn_group').find('.btn_submit').hide();
                $('.prompt_btn_group').find('p').show();
                var n = 3;
                $('.prompt_btn_group span').text(n);
                setTimeout(function () {
                    $('.prompt_btn_group span').text(n - 1);
                    setTimeout(function () {
                        $('.prompt_btn_group span').text(n - 2);
                        setTimeout(function () {
                            if (boolean) {
                                self.closePrompt();
                                // self.init(true);
                            } else {
                                self.closePrompt();
                            }
                        }, 1000);
                    }, 1000);
                }, 1000);
            }
            self.prompt_box_open = true;
            $('html').addClass('over_hidden');
        },
        closePrompt: function () {
            let self = this;
            self.prompt_box_open = false;
            $('html').removeClass('over_hidden');
        },
        ///
        //////////////////// 推播框設定 end ////////////////////

        ////////////////////////新增區塊////////////////////////
        ///
        //新增專案任務
        createProject: function () {
            let self = this;
            var json = {};
            if ($('input[name=pt_name]').val() != '') {
                json.pt_name = $('input[name=pt_name]').val();
            } else {
                self.notification('請填入主任務名稱', 'failure');
                return false;
            }
            json.ug_id = self.project.project_ug_id;
            if (self.project.sub_nav != 'all' && self.project.sub_nav != 'wait') {
                json.tm_id = self.project.sub_nav;
            } else if (self.project.sub_nav == 'wait') {
                json.is_show = 0;
            }
            axios.post('/project-create/1', json) //新增 - 專案主任務
            .then(function (response) {
                if (response.data.result) {
                    self.openSinglePage(self.user_status, 'pt', response.data.id, 1, self.project.project_ug_id);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增標籤
        createTag: function () {
            let self = this;
            var json = {};
            var tm_name = $('.create_tag_wrap input[name=tm_name]').val();
            var tm_url = self.image_url;
            if (tm_name == '') {
                self.notification('請填入標籤名稱', 'failure');
            } else if (tm_name.length > 4) {
                self.notification('標籤名稱字數不能超過4位', 'failure');
            } else if (tm_url == '') {
                self.notification('請傳入標籤圖示', 'failure');
            } else {
                json.tm_name = tm_name;
                json.tm_url = tm_url;
                json.ug_id = self.project.project_ug_id;
                json.ud_id = self.user_status.ud_id;
                axios.post('/project-create/5', json) //新增 - 標籤
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeTagWrap();
                        self.getUserTags();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //新增專案子任務
        createSubProject: function (pt_id) {
            let self = this;
            var json = {};
            json.pt_id = pt_id;
            if ($('.create_subproject input[name=pst_name]').val() != '') {
                json.pst_name = $('.create_subproject input[name=pst_name]').val();
            } else {
                self.notification('請填入子任務名稱', 'failure');
                return false;
            }
            axios.post('/project-create/2', json) //新增 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                    self.getSubProjectsSortCate();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增使用者最愛
        createFavorite: function (pt_id) {
            let self = this;
            var arraydata = {};
            arraydata.pt_id = pt_id;
            arraydata.ud_id = self.user_status.ud_id;
            axios.post('/user-create/2', arraydata) //新增 - 使用者最愛
            .then(function (response) {
                if (response.data.result) {
                    self.getProjects();
                    self.getSubProjects();
                    self.getUserFavorites();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增使用者到此標籤
        addUserToThisTag: function (ud_id) {
            let self = this;
            var json = {};
            json.ud_id = ud_id;
            json.tm_id = self.project.tag_data.tm_id;
            axios.post('/user-to-tag-create', json).then(function (response) {
                if (response.data.result) {
                    self.notification(response.data.string, 'success');
                    self.getUserInThisTag();
                    $('.tag_input input[name=ud_name]').val('');
                    self.project.tag_search_udname = '';
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增資產
        createProperty: function () {
            let self = this;
            var json = {};
            if (self.property.create_property_data.ud_id) {
                json.ud_id = self.property.create_property_data.ud_id;
            } else {
                self.notification('請選擇人員', 'failure');
                return false;
            }
            if ($('.new_asset input[name=pm_host]').val() != '') {
                json.pm_host = $('.new_asset input[name=pm_host]').val();
            }
            if ($('.new_asset input[name=pm_screenone]').val() != '') {
                json.pm_screenone = $('.new_asset input[name=pm_screenone]').val();
            }
            if ($('.new_asset input[name=pm_screentwo]').val() != '') {
                json.pm_screentwo = $('.new_asset input[name=pm_screentwo]').val();
            }
            if ($('.new_asset input[name=pm_telephone]').val() != '') {
                json.pm_telephone = $('.new_asset input[name=pm_telephone]').val();
            }
            if ($('.new_asset input[name=pm_canvas]').val() != '') {
                json.pm_canvas = $('.new_asset input[name=pm_canvas]').val();
            }
            if ($('.new_asset input[name=pm_other]').val() != '') {
                json.pm_other = $('.new_asset input[name=pm_other]').val();
            }
            if ($('.new_asset input[name=pm_adobe]').val() != '') {
                json.pm_adobe = $('.new_asset input[name=pm_adobe]').val();
            }
            axios.post('/property-create/6', json) //新增 - 資產管理
            .then(function (response) {
                if (response.data.result) {
                    self.closeAll();
                    self.getPropertys();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //新增借閱紀錄
        createBorrowing: function () {
            let self = this;
            var json = {};
            json.bi_id = self.book.book_infor.bi_id;
            if (self.book.create_book_data.ud_id) {
                json.ud_id = self.book.create_book_data.ud_id;
            } else {
                self.notification('請選擇借閱人', 'failure');
                return false;
            }
            if (self.book.create_book_data.bbr_borrowingdate) {
                json.bbr_borrowingdate = self.book.create_book_data.bbr_borrowingdate;
            } else {
                self.notification('請選擇借閱日期', 'failure');
                return false;
            }
            if (self.book.create_book_data.bbr_returndate) {
                json.bbr_returndate = self.book.create_book_data.bbr_returndate;
            }
            axios.post('/book-create/3', json) //新增 - 書籍借閱
            .then(function (response) {
                if (response.data.result) {
                    self.closeAll();
                    self.getBorrowing(self.book.book_infor.bi_id);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //設定借閱時間
        createBorrowingDate: function (obj) {
            let self = this;
            self.book.create_book_data.bbr_borrowingdate = obj.date;
        },
        //設定歸還時間
        createReturnDate: function (obj) {
            let self = this;
            self.book.create_book_data.bbr_returndate = obj.date;
        },
        //新增公告
        createAnn: function () {
            let self = this;
            var json = {};
            if ($('input[name=ai_title]').val() != '') {
                json.ai_title = $('input[name=ai_title]').val();
            } else {
                self.notification('請填入公告標題', 'failure');
                return false;
            }
            json.ug_id = self.announcement.sub_nav;
            if (self.announcement.sub_nav == 0) {
                json.ai_cate = 2;
            } else {
                json.ai_cate = 1;
            }
            axios.post('/announcement-create/1', json) //新增 - 公告資訊
            .then(function (response) {
                if (response.data.result) {
                    $('input[name=ai_title]').val('');
                    //關閉新增公告區塊
                    self.announcement.create_ann_open = false;
                    //開啟單一公告頁
                    self.openSinglePage(self.user_status, 'ai', response.data.id, 3);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        ///
        //////////////////// 新增區塊 end ////////////////////

        ////////////////////////修改區塊////////////////////////
        ///
        //修改標籤
        changeTagStyle: function () {
            let self = this;
            var json = {};
            var tm_name = $('.create_tag_wrap input[name=tm_name]').val();
            var tm_url = self.image_url;
            if (tm_name == '') {
                self.notification('請填入標籤名稱', 'failure');
            } else if (tm_name.length > 4) {
                self.notification('標籤名稱字數不能超過4位', 'failure');
            } else if (tm_url == '') {
                self.notification('請傳入標籤圖示', 'failure');
            } else {
                json.tm_id = self.project.tag_data.tm_id;
                json.tm_name = tm_name;
                json.tm_url = tm_url;
                json.ug_id = self.project.project_ug_id;
                axios.post('/project-modify/5', json) //修改 - 標籤
                .then(function (response) {
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                        self.closeTagWrap();
                        self.getUserTags();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //修改執行項目
        changeExecuteItem: function (pst_id, peic_id) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.peic_id = peic_id;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                    self.closeAllDropdownMenu();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //修改狀態
        changeStatus: function (pst_id, psc_id) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.psc_id = psc_id;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                    self.closeAllDropdownMenu();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //修改執行人
        changeUser: function (pst_id, ud_id) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = pst_id;
            arraydata.ud_id = ud_id;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                    self.closeAllDropdownMenu();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //修改需求日期
        changeRequireDate: function (obj) {
            let self = this;
            var arraydata = {};
            if (obj.pt_id) {
                arraydata.pt_id = obj.pt_id;
                arraydata.pt_requiredate = obj.date;
                axios.post('/project-modify/1', arraydata) //修改 - 專案主任務
                .then(function (response) {
                    if (response.data.result) {
                        self.getProjects();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (obj.pst_id) {
                arraydata.pst_id = obj.pst_id;
                arraydata.pst_requiredate = obj.date;
                axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
                .then(function (response) {
                    if (response.data.result) {
                        self.getSubProjects();
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //修改執行日期
        changeExecutiondate: function (obj) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = obj.pst_id;
            arraydata.pst_executiondate = obj.date;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //修改完成日期
        changeCompletiondate: function (obj) {
            let self = this;
            var arraydata = {};
            arraydata.pst_id = obj.pst_id;
            arraydata.pst_completiondate = obj.date;
            axios.post('/project-modify/2', arraydata) //修改 - 專案子任務
            .then(function (response) {
                if (response.data.result) {
                    self.getSubProjects();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //修改資產人員
        changePropertyUser: function (pm_id, ud_id) {
            let self = this;
            var json = {};
            json.pm_id = pm_id;
            json.ud_id = ud_id;
            axios.post('/property-modify/6', json) //修改 - 資產管理
            .then(function (response) {
                if (response.data.result) {
                    self.getPropertys();
                    self.closeAllDropdownMenu();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //修改某資產欄位資料
        changePropertyThisField: function (field, id) {
            let self = this;
            var json = {};
            var target = '.list' + id;
            if (field == 'pm_host') {
                json.pm_host = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_screenone') {
                json.pm_screenone = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_screentwo') {
                json.pm_screentwo = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_telephone') {
                json.pm_telephone = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_canvas') {
                json.pm_canvas = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_other') {
                json.pm_other = $(target).find('.' + field).find('input').val();
            } else if (field == 'pm_adobe') {
                json.pm_adobe = $(target).find('.' + field).find('input').val();
            }
            json.pm_id = id;
            axios.post('/property-modify/6', json) //修改 - 資產管理
            .then(function (response) {
                if (response.data.result) {
                    self.getPropertys();
                    self.closeAllDropdownMenu();
                    $('.content_text input').addClass('none');
                    $('.content_text span').removeClass('none');
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
                self.closeAllDropdownMenu();
            });
        },
        //停啟用使用者
        changeUserStatus: function ($ud_id, $ud_status) {
            let self = this;
            var json = {};
            json.ud_id = $ud_id;
            if ($ud_status == 1) {
                json.ud_status = 0;
            } else {
                json.ud_status = 1;
            }

            axios.post('/user-modify/1', json) //修改使用者資料
            .then(function (response) {
                if (response.data.result) {
                    self.notification(response.data.string, 'success');
                    self.getUsers();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //修改歸還日期
        changeReturnDate: function (obj) {
            let self = this;
            var json = {};
            json.bbr_id = obj.bbr_id;
            json.bbr_returndate = obj.date;
            axios.post('/book-modify/3', json) //修改 - 書籍借閱紀錄
            .then(function (response) {
                if (response.data.result) {
                    self.getBorrowing(self.book.book_infor.bi_id);
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        },
        //修改公告置頂與否
        changeAnnTopping: function (id, boolean) {
            let self = this;
            var json = {};
            if (boolean) {
                //改為置頂
                json.ai_topping = 1;
                json.ai_id = id;
            } else {
                //取消置頂
                json.ai_topping = 0;
                json.ai_id = id;
            }
            if (self.user_status.ud_admin || self.user_auth.ai_admin) {
                axios.post('/announcement-modify/1', json) //修改 - 公告資訊
                .then(function (response) {
                    if (response.data.result) {
                        self.getAnns(self.announcement.sub_nav);
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        ///
        ////////////////////////修改區塊 end////////////////////////

        ////////////////////////刪除區塊////////////////////////
        ///
        //刪除資料
        deleteData: function () {
            let self = this;
            self.show_submit_btn = false;
            setTimeout(function () {
                self.show_submit_btn = true;
            }, 1000);
            var json = {};
            if (self.url_show_block == 'book-list') {
                json.bbr_id = self.delete_id;
                axios.post('/book-delete/' + self.ann_type, json) //刪除 - 書籍
                .then(function (response) {
                    self.getBorrowing(self.book.book_infor.bi_id);
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                    self.closePrompt();
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (self.url_show_block == 'announcement-list') {
                json.ai_id = self.delete_id;
                axios.post('/announcement-delete/' + self.ann_type, json) //刪除 - 公告
                .then(function (response) {
                    self.getAnns(self.announcement.sub_nav);
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                    self.closePrompt();
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (self.url_show_block == 'account-list') {
                json.al_id = self.delete_id;
                axios.post('/auth-delete/' + self.ann_type, json) //刪除 - 權限等級
                .then(function (response) {
                    self.getAuths();
                    self.closePrompt();
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (self.url_show_block == 'property-list') {
                json.pm_id = self.delete_id;
                axios.post('/property-delete/' + self.ann_type, json) //刪除 - 公告
                .then(function (response) {
                    self.getPropertys();
                    if (response.data.result) {
                        self.notification(response.data.string, 'success');
                    } else {
                        self.notification(response.data.string, 'failure');
                    }
                    self.closePrompt();
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            } else if (!isNaN(self.url_show_block)) {
                json.tm_id = self.delete_id;
                axios.post('/project-delete/' + self.pro_type, json) //刪除 - 專案訊息
                .then(function (response) {
                    self.getUserTags();
                    if (response.data.result) {
                        self.closePrompt();
                        self.notification(response.data.string, 'success');
                    } else {
                        self.closePrompt();
                        self.notification(response.data.string, 'failure');
                    }
                }).catch(function (response) {
                    self.notification('系統出錯', 'failure');
                });
            }
        },
        //開啟刪除的提示詢問窗
        openDeletePromptBox: function (id, type) {
            let self = this;
            var string = '';
            if (!isNaN(self.url_show_block)) {
                //1.專案主任務 2.專案子任務 3.專案訊息 4.專案紀錄 5.標籤
                self.pro_type = type;
                self.delete_id = id;
                if (type == 1) {
                    string = '確定要刪除該公告？';
                } else if (type == 5) {
                    string = '確定要刪除該標籤？';
                }
            } else {
                //1.公告資訊 2.公告訊息 3.書籍借閱 4.書籍資訊 5.書籍分類 6.資產管理 7.權限等級
                self.ann_type = type;
                self.delete_id = id;
                if (type == 1) {
                    string = '確定要刪除該公告？';
                } else if (type == 3) {
                    string = '確定要刪除該書籍借閱資訊？';
                } else if (type == 4) {
                    string = '確定要刪除該書籍？';
                } else if (type == 5) {
                    string = '確定要刪除該書籍分類？';
                } else if (type == 6) {
                    string = '確定要刪除該資產？';
                } else if (type == 7) {
                    string = '確定要刪除該權限等級？';
                }
            }

            self.prompt(string, 'question', false);
        },
        //取消加入最愛
        deleteFavorite: function ($pt_id) {
            let self = this;
            var arraydata = {};
            arraydata.pt_id = $pt_id;
            arraydata.ud_id = self.user_status.ud_id;
            axios.post('/user-delete/2', arraydata) //刪除 - 使用者最愛
            .then(function (response) {
                if (response.data.result) {
                    self.getProjects();
                    self.getSubProjects();
                    self.getUserFavorites();
                } else {
                    self.notification(response.data.string, 'failure');
                }
            }).catch(function (response) {
                self.notification('系統出錯', 'failure');
            });
        }
        ///
        ////////////////////////刪除區塊 end////////////////////////


    },
    watch: {}
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "", ""]);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
exports.push([module.i, "\n\n", ""]);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(27)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(5),
  /* template */
  __webpack_require__(22),
  /* scopeId */
  "data-v-f53e4bea",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\components\\Hoverwrap.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Hoverwrap.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f53e4bea", Component.options)
  } else {
    hotAPI.reload("data-v-f53e4bea", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(26)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(6),
  /* template */
  __webpack_require__(21),
  /* scopeId */
  "data-v-7d4bba47",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\components\\Reminderwrap.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Reminderwrap.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d4bba47", Component.options)
  } else {
    hotAPI.reload("data-v-7d4bba47", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(25)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(20),
  /* scopeId */
  "data-v-2dac10a2",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\components\\Singlepage.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Singlepage.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2dac10a2", Component.options)
  } else {
    hotAPI.reload("data-v-2dac10a2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(24)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(19),
  /* scopeId */
  "data-v-0f46a4b9",
  /* cssModules */
  null
)
Component.options.__file = "C:\\xampp\\htdocs\\laravel\\projectManagement-2.0\\resources\\assets\\js\\pages\\Index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0f46a4b9", Component.options)
  } else {
    hotAPI.reload("data-v-0f46a4b9", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "dd_wrap",
    class: {
      'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
    },
    attrs: {
      "id": "datetimepicker"
    }
  }, [_c('div', {
    staticClass: "header dd_wrap"
  }, [_c('div', {
    staticClass: "selected_date dd_wrap"
  }, [(_vm.istime) ? _c('p', {
    staticClass: "dd_wrap"
  }, [_vm._v(_vm._s(_vm.new_date) + " " + _vm._s(_vm.new_time))]) : _c('p', {
    staticClass: "dd_wrap"
  }, [_vm._v(_vm._s(_vm.new_date))])]), _vm._v(" "), _c('div', {
    staticClass: "datetime_title dd_wrap"
  }, [_c('p', {
    staticClass: "dd_wrap"
  }, [_vm._v(_vm._s(_vm.now_page_year) + "年" + _vm._s(_vm.now_page_month + 1) + "月")]), _vm._v(" "), _c('div', {
    staticClass: "btn_group dd_wrap"
  }, [_c('i', {
    staticClass: "fas fa-arrow-left dd_wrap",
    on: {
      "click": function($event) {
        return _vm.changeMonth('pre')
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fas fa-circle dd_wrap",
    attrs: {
      "title": "回到當月"
    },
    on: {
      "click": function($event) {
        return _vm.changeMonth('today')
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "fas fa-arrow-right dd_wrap",
    on: {
      "click": function($event) {
        return _vm.changeMonth('next')
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "container dd_wrap"
  }, [_c('div', {
    staticClass: "week dd_wrap"
  }, _vm._l((_vm.week_en), function(week) {
    return _c('div', {
      staticClass: "item dd_wrap"
    }, [_vm._v(_vm._s(week))])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "daysForMonth dd_wrap"
  }, _vm._l((_vm.data_for_month), function(date) {
    return _c('div', {
      staticClass: "item dd_wrap",
      class: {
        'current': _vm.today.day == date.day && _vm.today.month == date.month && _vm.today.year == date.year
      },
      on: {
        "click": function($event) {
          return _vm.selectThisDay(date.year, date.month, date.day)
        }
      }
    }, [_vm._v(_vm._s(date.day))])
  }), 0), _vm._v(" "), (_vm.istime) ? _c('div', {
    staticClass: "time dd_wrap"
  }, [_c('div', {
    staticClass: "selected_time dd_wrap"
  }, [_c('i', {
    staticClass: "far fa-alarm-clock dd_wrap"
  }), _c('input', {
    staticClass: "hour dd_wrap",
    attrs: {
      "type": "number",
      "min": "0",
      "max": "23"
    },
    domProps: {
      "value": _vm.totime.hour
    },
    on: {
      "change": function($event) {
        return _vm.selectThisTime()
      }
    }
  }), _c('span', {
    staticClass: "dd_wrap"
  }, [_vm._v("：")]), _c('input', {
    staticClass: "minute dd_wrap",
    attrs: {
      "type": "number",
      "min": "0",
      "max": "59"
    },
    domProps: {
      "value": _vm.totime.minute
    },
    on: {
      "change": function($event) {
        return _vm.selectThisTime()
      }
    }
  })])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "footer dd_wrap"
  }, [_c('div', {
    staticClass: "btn_group dd_wrap"
  }, [_c('div', {
    staticClass: "btn_cancel dd_wrap",
    on: {
      "click": function($event) {
        return _vm.closeDateTimePicker()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit dd_wrap",
    on: {
      "click": function($event) {
        return _vm.submitDate()
      }
    }
  }, [_vm._v("確定")])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-077da1d8", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page_list",
    on: {
      "click": function($event) {
        return _vm.colseIfClickOutside($event)
      }
    }
  }, [_c('div', {
    attrs: {
      "id": "page-header"
    }
  }, [_c('div', {
    staticClass: "header-wrapper"
  }, [_c('a', {
    staticClass: "logo_wrap",
    attrs: {
      "href": "/index"
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "mainnav_wrap"
  }, [(_vm.user_status && _vm.user_status.ud_admin) ? _c('ul', {
    staticClass: "mainnav_content"
  }, [_c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'index' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('index')
      }
    }
  }, [_vm._v("個人主頁")])]), _vm._v(" "), _vm._l((_vm.user_group), function(group) {
    return _c('li', {
      staticClass: "nav_item",
      class: _vm.url_show_block == group.ug_id ? 'current' : false
    }, [_c('a', {
      staticClass: "nav_a",
      attrs: {
        "href": "javascript:void(0)"
      },
      on: {
        "click": function($event) {
          _vm.changePage(group.ug_id), _vm.project.project_ug_id = group.ug_id
        }
      }
    }, [_vm._v(_vm._s(group.ug_name_forshort))])])
  }), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'announcement-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('announcement-list')
      }
    }
  }, [_vm._v("公告資訊")])]), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'property-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('property-list')
      }
    }
  }, [_vm._v("資產管理")])]), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'book-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('book-list')
      }
    }
  }, [_vm._v("書籍借閱")])])], 2) : _c('ul', {
    staticClass: "mainnav_content"
  }, [_c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'index' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('index')
      }
    }
  }, [_vm._v("個人主頁")])]), _vm._v(" "), _vm._l((_vm.user_group), function(group) {
    return (_vm.user_status.ug_id == group.ug_id) ? _c('li', {
      staticClass: "nav_item nav_hover",
      class: _vm.url_show_block == group.ug_id ? 'current' : false
    }, [_c('a', {
      staticClass: "nav_a",
      attrs: {
        "href": "javascript:void(0)"
      },
      on: {
        "click": function($event) {
          _vm.changePage(group.ug_id), _vm.project.project_ug_id = group.ug_id
        }
      }
    }, [_vm._v(_vm._s(group.ug_name_forshort))])]) : _vm._e()
  }), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'announcement-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('announcement-list')
      }
    }
  }, [_vm._v("公告資訊")])]), _vm._v(" "), _c('li', {
    staticClass: "nav_item",
    class: _vm.url_show_block == 'book-list' ? 'current' : false
  }, [_c('a', {
    staticClass: "nav_a",
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('book-list')
      }
    }
  }, [_vm._v("書籍借閱")])])], 2)]), _vm._v(" "), _c('div', {
    staticClass: "user_wrap"
  }, [_c('ul', {}, [(_vm.url_show_block != 'index') ? _c('li', {
    class: {
      'search_open': _vm.search_show
    }
  }, [(!_vm.search_show) ? _c('i', {
    staticClass: "fas fa-search",
    on: {
      "click": function($event) {
        _vm.search_show = true
      }
    }
  }) : _c('i', {
    staticClass: "fas fa-times btn_close",
    on: {
      "click": function($event) {
        _vm.search_show = false, _vm.clearSearchCondition()
      }
    }
  }), _vm._v(" "), (_vm.search_show && _vm.url_show_block == 'book-list') ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_data.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.book_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.search_show && _vm.url_show_block == 'announcement-list') ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_data.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.ann_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.search_show && _vm.url_show_block == 'account-list' && _vm.account.sub_nav == 'account_management') ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_users.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.user_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : (_vm.search_show && _vm.url_show_block == 'account-list' && _vm.account.sub_nav == 'authority_level') ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_auths.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.auth_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : _vm._e(), _vm._v(" "), (_vm.search_show && !isNaN(_vm.url_show_block)) ? _c('input', {
    staticClass: "search_input",
    class: {
      'notFound': _vm.new_projects.length == 0
    },
    attrs: {
      "type": "text",
      "placeholder": "輸入關鍵字查詢",
      "name": "search_content"
    },
    domProps: {
      "value": _vm.search_condition.pro_content
    },
    on: {
      "input": function($event) {
        return _vm.search()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }) : _vm._e()]) : _vm._e(), _vm._v(" "), _vm._m(0), _vm._v(" "), (_vm.user_status.ud_admin) ? _c('a', {
    attrs: {
      "href": "javascript:void(0)"
    },
    on: {
      "click": function($event) {
        return _vm.changePage('account-list')
      }
    }
  }, [_vm._m(1)]) : _vm._e(), _vm._v(" "), _c('li', {
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'ud', _vm.user_status.ud_id, 4)
      }
    }
  }, [_c('i', {
    staticClass: "far fa-user-circle"
  })])])])])]), _vm._v(" "), (_vm.url_show_block == 'index') ? _c('div', {
    staticClass: "index",
    attrs: {
      "id": "page-container"
    }
  }, [(!_vm.index.read_more) ? _c('div', {
    staticClass: "container-wrapper index-week"
  }, [_c('div', {
    staticClass: "title-wrapper"
  }, [_c('p', {
    staticClass: "title"
  }, [_vm._v("您好，" + _vm._s(_vm.user_status.ud_name))]), _vm._v(" "), _c('p', {
    staticClass: "now-datetime"
  }, [_c('span', {
    staticClass: "date"
  }, [_vm._v(_vm._s(_vm.index.date))]), _c('span', {
    staticClass: "time"
  }, [_vm._v(_vm._s(_vm.index.time))])])]), _vm._v(" "), _c('div', {
    staticClass: "weekly-calendar-wrapper"
  }, [_c('div', {
    staticClass: "title"
  }, [_c('h2', [_vm._v("我的日曆")]), _vm._v(" "), _c('p', [_vm._v("在這裡查看本週安排的活動")]), _vm._v(" "), _c('div', {
    staticClass: "read_more cursor",
    on: {
      "click": function($event) {
        return _vm.openCalendar()
      }
    }
  }, [_vm._v("查看更多")])]), _vm._v(" "), _c('div', {
    staticClass: "one_week"
  }, [_c('div', {
    staticClass: "week-header"
  }, _vm._l((_vm.index.one_week), function(ww) {
    return _c('div', {
      staticClass: "item"
    }, [_c('span', {
      staticClass: "month"
    }, [_vm._v(_vm._s(ww.month))]), _c('span', {
      staticClass: "day"
    }, [_vm._v(_vm._s(ww.day))]), _vm._v(" "), _c('span', {
      staticClass: "week"
    }, [_vm._v(_vm._s(ww.week))])])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "week-container"
  }, _vm._l((_vm.data_for_week), function(ww) {
    return _c('div', {
      staticClass: "item"
    }, _vm._l((ww), function(w) {
      return _c('div', {
        staticClass: "pro-item",
        on: {
          "click": function($event) {
            return _vm.openSinglePage(_vm.user_status, 'pst', w.pst_id, 2, w.ug_id)
          }
        }
      }, [_c('span', {
        staticClass: "pt_name",
        on: {
          "mouseover": function($event) {
            return _vm.openHover(w.pt_name, w.pst_name, w.pst_executiondate, w.ud_name, $event)
          },
          "mouseleave": function($event) {
            return _vm.closeHover()
          }
        }
      }, [_vm._v(_vm._s(w.pst_name))])])
    }), 0)
  }), 0)])]), _vm._v(" "), _c('div', {
    staticClass: "project-wrapper"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "project-list"
  }, [_vm._m(3), _vm._v(" "), _vm._l((_vm.index.sub_projects_all), function(ww) {
    return _c('div', {
      staticClass: "project-item cursor",
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'pst', ww.pst_id, 2, ww.ug_id)
        }
      }
    }, [_c('div', {
      staticClass: "table-item pt_name"
    }, [_vm._v(_vm._s(ww.pst_name))]), _vm._v(" "), (ww.pmc_name) ? _c('div', {
      staticClass: "table-item pmc_name"
    }, [_vm._v(_vm._s(ww.pmc_name))]) : _c('div', {
      staticClass: "table-item pmc_name"
    }, [_vm._v("未設定")]), _vm._v(" "), (ww.prsc_name) ? _c('div', {
      staticClass: "table-item prsc_name"
    }, [_vm._v(_vm._s(ww.prsc_name))]) : _c('div', {
      staticClass: "table-item prsc_name"
    }, [_vm._v("未設定")]), _vm._v(" "), (ww.peic_name) ? _c('div', {
      staticClass: "table-item peic_name"
    }, [_vm._v(_vm._s(ww.peic_name))]) : _c('div', {
      staticClass: "table-item peic_name"
    }, [_vm._v("未設定")]), _vm._v(" "), _c('div', {
      staticClass: "table-item pst_completiondate"
    }, [_vm._v(_vm._s(ww.pst_completiondate))]), _vm._v(" "), _c('div', {
      staticClass: "table-item psc_name"
    }, [(ww.psc_name) ? _c('p', {
      class: {
        'color1': ww.psc_id == 1, 'color2': ww.psc_id == 2, 'color3': ww.psc_id == 3, 'color4': ww.psc_id == 4 || ww.psc_id == 5, 'color5': ww.psc_id == 6 || ww.psc_id == 7 || ww.psc_id == 8, 'color6': ww.psc_id == 9
      }
    }, [_vm._v(_vm._s(ww.psc_name))]) : _c('p', {
      staticClass: "color1"
    }, [_vm._v("-")])])])
  })], 2)])]) : _c('div', {
    staticClass: "container-wrapper index-month"
  }, [_c('div', {
    staticClass: "title-wrapper"
  }, [_c('p', {
    staticClass: "title cursor",
    on: {
      "click": function($event) {
        _vm.index.read_more = false
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-arrow-left"
  }), _c('span', {
    staticClass: "year-and-month"
  }, [_vm._v(_vm._s(_vm.index.now_page_year) + "/" + _vm._s(_vm.index.now_page_month + 1))])]), _vm._v(" "), _c('div', {
    staticClass: "change_month"
  }, [_c('div', {
    staticClass: "pre_one cursor",
    on: {
      "click": function($event) {
        return _vm.changeMonth('pre')
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-chevron-left"
  })]), _vm._v(" "), _c('div', {
    staticClass: "today cursor",
    on: {
      "click": function($event) {
        return _vm.changeMonth('today')
      }
    }
  }, [_vm._v("今日")]), _vm._v(" "), _c('div', {
    staticClass: "next_one cursor",
    on: {
      "click": function($event) {
        return _vm.changeMonth('next')
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-chevron-right"
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "monthly-calendar-wrapper"
  }, [_c('div', {
    staticClass: "one_month"
  }, [_c('div', {
    staticClass: "month-header"
  }, _vm._l((_vm.index.week_cn), function(ww) {
    return _c('div', {
      staticClass: "item"
    }, [_c('span', {
      staticClass: "week"
    }, [_vm._v(_vm._s(ww))])])
  }), 0), _vm._v(" "), _c('div', {
    staticClass: "month-container"
  }, _vm._l((_vm.data_for_month), function(ww) {
    return _c('div', {
      staticClass: "item",
      class: {
        'weekend': ww.week == 0 || ww.week == 6, 'weekday': ww.week != 0 && ww.week != 6
      }
    }, [_c('span', {
      staticClass: "day",
      class: {
        'today': ww.day == _vm.index.today.day && ww.month == _vm.index.today.month && ww.year == _vm.index.today.year
      }
    }, [_vm._v(_vm._s(ww.day))]), _vm._v(" "), _c('div', {
      staticClass: "pro-item"
    }, _vm._l((ww.sub_projects_month), function(sub) {
      return _c('div', {
        staticClass: "pst_name",
        on: {
          "click": function($event) {
            return _vm.openSinglePage(_vm.user_status, 'pst', sub.pst_id, 2, sub.ug_id)
          },
          "mouseover": function($event) {
            return _vm.openHover(sub.pt_name, sub.pst_name, sub.pst_executiondate, sub.ud_name, $event)
          },
          "mouseleave": function($event) {
            return _vm.closeHover()
          }
        }
      }, [_c('p', [_vm._v(_vm._s(sub.pst_name))])])
    }), 0)])
  }), 0)])])])]) : _vm._e(), _vm._v(" "), (!isNaN(_vm.url_show_block)) ? _c('div', {
    staticClass: "project",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "left"
  }, [_c('ul', {
    staticClass: "tags_wrap"
  }, [(_vm.project.sub_nav == 'all') ? _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'all'
    },
    attrs: {
      "draggable": "false"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'all', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      },
      "drop": function($event) {
        return _vm.changeProjectItem('all')
      },
      "dragover": function($event) {
        return _vm.allowDrop($event)
      }
    }
  }, [_vm._m(4)]) : _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'all'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/desktop-solid_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/desktop-solid.png')",
      "draggable": "false"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'all', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      },
      "drop": function($event) {
        return _vm.changeProjectItem('all')
      },
      "dragover": function($event) {
        return _vm.allowDrop($event)
      }
    }
  }, [_vm._m(5)]), _vm._v(" "), ((_vm.user_status.ud_admin || _vm.user_auth.pt_admin) && _vm.project.sub_nav == 'wait') ? _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'wait'
    },
    attrs: {
      "draggable": "false"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'wait', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      },
      "drop": function($event) {
        return _vm.changeProjectItem('wait')
      },
      "dragover": function($event) {
        return _vm.allowDrop($event)
      }
    }
  }, [_vm._m(6)]) : ((_vm.user_status.ud_admin || _vm.user_auth.pt_admin) && _vm.project.sub_nav != 'wait') ? _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'wait'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/clipboard-regular_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/clipboard-regular.png')",
      "draggable": "false"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'wait', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      },
      "drop": function($event) {
        return _vm.changeProjectItem('wait')
      },
      "dragover": function($event) {
        return _vm.allowDrop($event)
      }
    }
  }, [_vm._m(7)]) : _vm._e(), _vm._v(" "), (_vm.project.sub_nav == 'finish') ? _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'finish'
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'finish', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      }
    }
  }, [_vm._m(8)]) : _c('li', {
    class: {
      'current': _vm.project.sub_nav == 'finish'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/clipboard-check-solid_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/clipboard-check-solid.png')"
    },
    on: {
      "click": function($event) {
        _vm.project.sub_nav = 'finish', _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      }
    }
  }, [_vm._m(9)]), _vm._v(" "), _vm._l((_vm.project.user_tags), function(tag) {
    return (tag.ug_id == _vm.project.project_ug_id) ? _c('li', {
      directives: [{
        name: "rightMenu",
        rawName: "v-rightMenu",
        value: (_vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.project.menudata : false),
        expression: "user_status.ud_admin || user_auth.pt_admin ?project.menudata : false"
      }],
      class: {
        'current': _vm.project.sub_nav == tag.tm_id
      },
      attrs: {
        "draggable": "false"
      },
      on: {
        "click": function($event) {
          _vm.project.sub_nav = tag.tm_id, _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
        },
        "drop": function($event) {
          return _vm.drop(tag.tm_id)
        },
        "dragover": function($event) {
          return _vm.allowDrop($event)
        },
        "mouseup": function($event) {
          if (!$event.type.indexOf('key') && _vm._k($event.keyCode, "right", 39, $event.key, ["Right", "ArrowRight"])) { return null; }
          if ('button' in $event && $event.button !== 2) { return null; }
          return _vm.updateTagData(tag.tm_id, tag.tm_url, tag.tm_name)
        }
      }
    }, [_c('div', {
      staticClass: "tag_item"
    }, [_c('img', {
      attrs: {
        "src": tag.tm_url,
        "alt": "",
        "draggable": "false"
      }
    }), _vm._v(" "), _c('p', {
      attrs: {
        "draggable": "false"
      }
    }, [_vm._v(_vm._s(tag.tm_name))])])]) : _vm._e()
  }), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.pt_admin) ? _c('li', {
    staticClass: "add_tag",
    on: {
      "click": function($event) {
        _vm.project.create_tag_open = true, _vm.closeAllDropdownMenu(), _vm.closeProjectInput(), _vm.project.tag_type = 'create', _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      }
    }
  }, [_vm._m(10)]) : _vm._e()], 2)]), _vm._v(" "), _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [(_vm.project.sub_nav == 'all') ? _c('div', {
    staticClass: "project_status"
  }, [_c('div', {
    staticClass: "project_title dropdown_item",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('project', 'show', 2, $event)
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.project_status))]), (_vm.checkToOpenDropDown('project', 'show', 2)) ? _c('i', {
    staticClass: "fas fa-chevron-up dropdown_item"
  }) : _c('i', {
    staticClass: "fas fa-chevron-down dropdown_item"
  })]), _vm._v(" "), (_vm.checkToOpenDropDown('project', 'show', 2)) ? _c('ul', {
    staticClass: "project_content dd_wrap"
  }, [_c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '全部任務'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '全部任務', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("全部任務")]), _vm._v(" "), _c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '最愛'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '最愛', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("最愛")]), _vm._v(" "), _c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '待排程'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '待排程', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("待排程")]), _vm._v(" "), _c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '待確認'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '待確認', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("待確認")]), _vm._v(" "), _c('li', {
    staticClass: "dd_wrap",
    class: {
      'current': _vm.project.project_status == '進行中'
    },
    on: {
      "click": function($event) {
        _vm.project.project_status = '進行中', _vm.closeDateTimePicker(true)
      }
    }
  }, [_vm._v("進行中")])]) : _vm._e()]) : _vm._e(), _vm._v(" "), ((_vm.user_status.ud_admin || _vm.user_auth.pt_admin) && _vm.project.sub_nav != 'finish') ? _c('div', {
    staticClass: "btn_create",
    on: {
      "click": function($event) {
        _vm.project.create_project_status ? _vm.project.create_project_status = false : _vm.project.create_project_status = true
      }
    }
  }, [_vm._v("新增任務")]) : _vm._e()]), _vm._v(" "), (_vm.project.create_project_status) ? _c('div', {
    staticClass: "create_project"
  }, [_c('input', {
    attrs: {
      "type": "text",
      "name": "pt_name",
      "placeholder": "輸入新任務名稱"
    }
  }), _c('i', {
    staticClass: "far fa-times-circle close",
    on: {
      "click": function($event) {
        _vm.project.create_project_status = false
      }
    }
  }), _c('i', {
    staticClass: "far fa-check-circle check",
    on: {
      "click": function($event) {
        _vm.createProject(), _vm.project.create_project_status = false
      }
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell ellipsis"
  }, [_c('i', {
    staticClass: "fas fa-list-ul dropdown_item",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('list', 'show', 1, $event)
      }
    }
  }), _vm._v(" "), (_vm.checkToOpenDropDown('list', 'show', 1)) ? _c('ul', {
    staticClass: "title_list dd_wrap"
  }, [_c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pmc_name),
      expression: "project.list_field_show_or_not.all.pmc_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pmc_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pmc_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pmc_name) ? _vm._i(_vm.project.list_field_show_or_not.all.pmc_name, null) > -1 : (_vm.project.list_field_show_or_not.all.pmc_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pmc_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pmc_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pmc_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pmc_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pmc_name"
    }
  }, [_vm._v("里程碑")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.prsc_name),
      expression: "project.list_field_show_or_not.all.prsc_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "prsc_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.prsc_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.prsc_name) ? _vm._i(_vm.project.list_field_show_or_not.all.prsc_name, null) > -1 : (_vm.project.list_field_show_or_not.all.prsc_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.prsc_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "prsc_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "prsc_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "prsc_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "prsc_name"
    }
  }, [_vm._v("需求類別")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.peic_name),
      expression: "project.list_field_show_or_not.all.peic_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "peic_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.peic_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.peic_name) ? _vm._i(_vm.project.list_field_show_or_not.all.peic_name, null) > -1 : (_vm.project.list_field_show_or_not.all.peic_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.peic_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "peic_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "peic_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "peic_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "peic_name"
    }
  }, [_vm._v("執行項目")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pst_requiredate),
      expression: "project.list_field_show_or_not.all.pst_requiredate"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pst_requiredate"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pst_requiredate,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pst_requiredate) ? _vm._i(_vm.project.list_field_show_or_not.all.pst_requiredate, null) > -1 : (_vm.project.list_field_show_or_not.all.pst_requiredate)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pst_requiredate,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_requiredate", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_requiredate", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pst_requiredate", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pst_requiredate"
    }
  }, [_vm._v("需求/確認日期")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pst_executiondate),
      expression: "project.list_field_show_or_not.all.pst_executiondate"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pst_executiondate"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pst_executiondate,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pst_executiondate) ? _vm._i(_vm.project.list_field_show_or_not.all.pst_executiondate, null) > -1 : (_vm.project.list_field_show_or_not.all.pst_executiondate)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pst_executiondate,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_executiondate", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_executiondate", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pst_executiondate", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pst_executiondate"
    }
  }, [_vm._v("執行日期")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pst_completiondate),
      expression: "project.list_field_show_or_not.all.pst_completiondate"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pst_completiondate"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pst_completiondate,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pst_completiondate) ? _vm._i(_vm.project.list_field_show_or_not.all.pst_completiondate, null) > -1 : (_vm.project.list_field_show_or_not.all.pst_completiondate)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pst_completiondate,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_completiondate", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_completiondate", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pst_completiondate", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pst_completiondate"
    }
  }, [_vm._v("完成日期")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.ud_name),
      expression: "project.list_field_show_or_not.all.ud_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "ud_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.ud_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.ud_name) ? _vm._i(_vm.project.list_field_show_or_not.all.ud_name, null) > -1 : (_vm.project.list_field_show_or_not.all.ud_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.ud_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "ud_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "ud_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "ud_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "ud_name"
    }
  }, [_vm._v("執行者")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.psc_name),
      expression: "project.list_field_show_or_not.all.psc_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "psc_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.psc_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.psc_name) ? _vm._i(_vm.project.list_field_show_or_not.all.psc_name, null) > -1 : (_vm.project.list_field_show_or_not.all.psc_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.psc_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "psc_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "psc_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "psc_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "psc_name"
    }
  }, [_vm._v("狀態")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.ppc_name),
      expression: "project.list_field_show_or_not.all.ppc_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "ppc_name"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.ppc_name,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.ppc_name) ? _vm._i(_vm.project.list_field_show_or_not.all.ppc_name, null) > -1 : (_vm.project.list_field_show_or_not.all.ppc_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.ppc_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "ppc_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "ppc_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "ppc_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "ppc_name"
    }
  }, [_vm._v("優先權")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pst_spendtime),
      expression: "project.list_field_show_or_not.all.pst_spendtime"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pst_spendtime"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pst_spendtime,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pst_spendtime) ? _vm._i(_vm.project.list_field_show_or_not.all.pst_spendtime, null) > -1 : (_vm.project.list_field_show_or_not.all.pst_spendtime)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pst_spendtime,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_spendtime", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pst_spendtime", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pst_spendtime", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pst_spendtime"
    }
  }, [_vm._v("時間")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.list_field_show_or_not.all.pt_backup),
      expression: "project.list_field_show_or_not.all.pt_backup"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pt_backup"
    },
    domProps: {
      "checked": _vm.project.list_field_show_or_not.all.pt_backup,
      "checked": Array.isArray(_vm.project.list_field_show_or_not.all.pt_backup) ? _vm._i(_vm.project.list_field_show_or_not.all.pt_backup, null) > -1 : (_vm.project.list_field_show_or_not.all.pt_backup)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.project.list_field_show_or_not.all.pt_backup,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pt_backup", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.project.list_field_show_or_not.all, "pt_backup", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.project.list_field_show_or_not.all, "pt_backup", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pt_backup"
    }
  }, [_vm._v("備份")])])])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell star"
  }), _vm._v(" "), _c('div', {
    staticClass: "head_text cell pt_name"
  }, [_vm._v("任務\n                            "), (!_vm.project.subprojects_show) ? _c('i', {
    staticClass: "fas fa-chevron-circle-down cursor",
    on: {
      "click": function($event) {
        _vm.showAllSubprojectsOrNot(true), _vm.project.subprojects_show = true
      }
    }
  }) : _c('i', {
    staticClass: "fas fa-chevron-circle-up cursor",
    on: {
      "click": function($event) {
        _vm.showAllSubprojectsOrNot(false), _vm.project.subprojects_show = false
      }
    }
  })]), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pmc_name) ? _c('div', {
    staticClass: "head_text cell pmc_name"
  }, [_vm._v("里程碑")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.prsc_name) ? _c('div', {
    staticClass: "head_text cell prsc_name"
  }, [_vm._v("需求類別")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.peic_name) ? _c('div', {
    staticClass: "head_text cell peic_name"
  }, [_vm._v("執行項目")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pst_requiredate) ? _c('div', {
    staticClass: "head_text cell pst_requiredate"
  }, [_vm._v("需求/確認日期")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pst_executiondate) ? _c('div', {
    staticClass: "head_text cell pst_executiondate"
  }, [_vm._v("執行日期")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pst_completiondate) ? _c('div', {
    staticClass: "head_text cell pst_completiondate"
  }, [_vm._v("完成日期")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.ud_name) ? _c('div', {
    staticClass: "head_text cell ud_name"
  }, [_vm._v("執行者")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.psc_name) ? _c('div', {
    staticClass: "head_text cell psc_name"
  }, [_vm._v("狀態")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.ppc_name) ? _c('div', {
    staticClass: "head_text cell ppc_name"
  }, [_vm._v("優先權")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pst_spendtime) ? _c('div', {
    staticClass: "head_text cell pst_spendtime"
  }, [_vm._v("時間")]) : _vm._e(), _vm._v(" "), (_vm.project.list_field_show_or_not.all.pt_backup) ? _c('div', {
    staticClass: "head_text cell pt_backup"
  }, [_vm._v("備份")]) : _vm._e()]), _vm._v(" "), _vm._l((_vm.new_projects), function(pro) {
    return _c('div', {
      staticClass: "content_wrap row_group",
      class: 'list' + pro.pt_id
    }, [_c('div', {
      staticClass: "main_project row",
      on: {
        "click": function($event) {
          return _vm.showSubProject($event, pro.pt_id)
        }
      }
    }, [(_vm.user_status.ud_admin || _vm.user_auth.pt_admin) ? _c('div', {
      staticClass: "content_text cell ellipsis cursor",
      attrs: {
        "draggable": "true"
      },
      on: {
        "dragstart": function($event) {
          return _vm.drag("pt_id", pro.pt_id)
        },
        "dragend": function($event) {
          return _vm.dragend()
        }
      }
    }, [_c('i', {
      staticClass: "fas fa-ellipsis-v"
    })]) : _c('div', {
      staticClass: "content_text cell ellipsis"
    }), _vm._v(" "), _c('div', {
      staticClass: "content_text cell star"
    }, [(_vm.showFavoriteFirst(pro.pt_id)) ? _c('i', {
      staticClass: "fas fa-star",
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.deleteFavorite(pro.pt_id) : false
        }
      }
    }) : _c('i', {
      staticClass: "far fa-star",
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.createFavorite(pro.pt_id) : false
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pt_name"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.pro_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.pro_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      staticClass: "overover cursor",
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'pt', pro.pt_id, 1, pro.ug_id)
        }
      }
    }, [_vm._v(_vm._s(pro.pt_name))])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pmc_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pmc_name == true
      }
    }, [(pro.pmc_name) ? _c('span', [_vm._v(_vm._s(pro.pmc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell prsc_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.prsc_name == true
      }
    }, [(pro.prsc_name) ? _c('span', [_vm._v(_vm._s(pro.prsc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell peic_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.peic_name == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pst_requiredate",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pst_requiredate == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('pt_requiredate', 'pt_id', pro.pt_id, $event) : false
        }
      }
    }, [(pro.pt_requiredate) ? _c('span', {
      staticClass: "dropdown_item"
    }, [_vm._v(_vm._s(pro.pt_requiredate))]) : _c('span', {
      staticClass: "dropdown_item"
    }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('pt_requiredate', 'pt_id', pro.pt_id)) ? _c('datetimepicker', {
      attrs: {
        "id": pro.pt_id,
        "type": "pt_id",
        "date": pro.pt_requiredate,
        "position": _vm.dropdown.position
      },
      on: {
        "get-close": _vm.closeDateTimePicker,
        "get-newdate": _vm.changeRequireDate
      }
    }) : _vm._e()], 1), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pst_executiondate",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pst_executiondate == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pst_completiondate",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pst_completiondate == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.ud_name == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell psc_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.psc_name == true
      }
    }, [_c('p', {
      staticClass: "color1"
    }, [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ppc_name",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.ppc_name == true
      }
    }, [(pro.ppc_name) ? _c('p', {
      class: {
        'red': pro.ppc_id == 3
      }
    }, [_vm._v(_vm._s(pro.ppc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pst_spendtime",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pst_spendtime == true
      }
    }, [_c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pt_backup",
      class: {
        'none': !_vm.project.list_field_show_or_not.all.pt_backup == true
      }
    }, [(pro.pt_backup == 0) ? _c('i', {
      staticClass: "far fa-square icon_backup"
    }) : (pro.pt_backup == 1) ? _c('i', {
      staticClass: "fas fa-check-square icon_backup"
    }) : _vm._e()])]), _vm._v(" "), _vm._l((pro.sub_projects), function(sub) {
      return _c('div', {
        staticClass: "sub_project row sub_item",
        class: {
          'changeColor': _vm.project.drag_pt_id == pro.pt_id && _vm.project.drag_over_pst_id == sub.pst_id, 'dropTarget': _vm.project.drag_pt_id == pro.pt_id && _vm.project.drag_pst_id == sub.pst_id
        },
        attrs: {
          "draggable": "true"
        },
        on: {
          "dragstart": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.dragToChangeProjectSort("start", pro.pt_id, sub.pst_id) : false
          },
          "dragend": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.dragToChangeProjectSort("end", pro.pt_id, sub.pst_id) : false
          },
          "drop": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.dragToChangeProjectSort("drop", pro.pt_id, sub.pst_id) : false
          },
          "dragover": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.allowDrop($event) : false
          },
          "dragenter": function($event) {
            return _vm.comingsoon(sub.pst_id)
          }
        }
      }, [(_vm.user_status.ud_admin || _vm.user_auth.pt_admin) ? _c('div', {
        staticClass: "content_text cell ellipsis cursor"
      }, [_c('i', {
        staticClass: "fas fa-sort"
      })]) : _c('div', {
        staticClass: "content_text cell ellipsis"
      }), _vm._v(" "), _c('div', {
        staticClass: "content_text cell star"
      }), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pt_name"
      }, [_c('span', {
        directives: [{
          name: "highlight",
          rawName: "v-highlight",
          value: ({
            keyword: _vm.search_condition.pro_content,
            overWriteStyle: {
              color: '#EC4683'
            },
            sensitive: false
          }),
          expression: "{keyword: search_condition.pro_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
        }],
        staticClass: "overover",
        class: {
          'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin || _vm.user_status.ud_id == sub.ud_id
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin || _vm.user_status.ud_id == sub.ud_id ? _vm.openSinglePage(_vm.user_status, 'pst', sub.pst_id, 1, pro.ug_id) : false
          }
        }
      }, [_vm._v(_vm._s(sub.pst_name))])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pmc_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pmc_name == true
        }
      }, [(pro.pmc_name) ? _c('span', [_vm._v(_vm._s(pro.pmc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell prsc_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.prsc_name == true
        }
      }, [(pro.prsc_name) ? _c('span', [_vm._v(_vm._s(pro.prsc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell peic_name dropdown_item",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.peic_name == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('peic_name', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.peic_name) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.peic_name))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('peic_name', 'pst_id', sub.pst_id)) ? _c('div', {
        staticClass: "drop_down_wrap dd_wrap",
        class: {
          'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
        }
      }, [_c('ul', {
        staticClass: "infor_ul dd_wrap"
      }, _vm._l((_vm.project.executeitem_cate), function(item) {
        return _c('li', {
          staticClass: "infor_li dd_wrap",
          class: {
            'current': sub.peic_id == item.peic_id
          },
          on: {
            "click": function($event) {
              return _vm.changeExecuteItem(sub.pst_id, item.peic_id)
            }
          }
        }, [_vm._v(_vm._s(item.peic_name))])
      }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pst_requiredate",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pst_requiredate == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('pst_requiredate', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.pst_requiredate) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.pst_requiredate))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('pst_requiredate', 'pst_id', sub.pst_id)) ? _c('datetimepicker', {
        attrs: {
          "id": sub.pst_id,
          "type": "pst_id",
          "date": sub.pst_requiredate,
          "position": _vm.dropdown.position
        },
        on: {
          "get-close": _vm.closeDateTimePicker,
          "get-newdate": _vm.changeRequireDate
        }
      }) : _vm._e()], 1), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pst_executiondate",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pst_executiondate == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('pst_executiondate', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.pst_executiondate) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.pst_executiondate))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('pst_executiondate', 'pst_id', sub.pst_id)) ? _c('datetimepicker', {
        attrs: {
          "id": sub.pst_id,
          "type": "pst_id",
          "date": sub.pst_executiondate,
          "position": _vm.dropdown.position
        },
        on: {
          "get-close": _vm.closeDateTimePicker,
          "get-newdate": _vm.changeExecutiondate
        }
      }) : _vm._e()], 1), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pst_completiondate",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pst_completiondate == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('pst_completiondate', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.pst_completiondate) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.pst_completiondate))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('pst_completiondate', 'pst_id', sub.pst_id)) ? _c('datetimepicker', {
        attrs: {
          "id": sub.pst_id,
          "type": "pst_id",
          "date": sub.pst_completiondate,
          "position": _vm.dropdown.position
        },
        on: {
          "get-close": _vm.closeDateTimePicker,
          "get-newdate": _vm.changeCompletiondate
        }
      }) : _vm._e()], 1), _vm._v(" "), _c('div', {
        staticClass: "content_text cell ud_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.ud_name == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('ud_name', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.ud_name) ? _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v(_vm._s(sub.ud_name))]) : _c('span', {
        staticClass: "dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('ud_name', 'pst_id', sub.pst_id)) ? _c('div', {
        staticClass: "drop_down_wrap user dd_wrap",
        class: {
          'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
        }
      }, [_c('ul', {
        staticClass: "infor_ul dd_wrap"
      }, _vm._l((_vm.usercate_for_group), function(user) {
        return _c('li', {
          staticClass: "infor_li dd_wrap",
          class: {
            'current': sub.ud_id == user.ud_id
          },
          on: {
            "click": function($event) {
              return _vm.changeUser(sub.pst_id, user.ud_id)
            }
          }
        }, [(user.ud_icon) ? _c('img', {
          staticClass: "dd_wrap",
          attrs: {
            "src": user.ud_icon,
            "alt": ""
          }
        }) : _c('img', {
          staticClass: "dd_wrap",
          attrs: {
            "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
            "alt": ""
          }
        }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
      }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell psc_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.psc_name == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pt_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pt_admin
        },
        on: {
          "click": function($event) {
            _vm.user_status.ud_admin || _vm.user_auth.pt_admin ? _vm.openDropdownMenu('psc_name', 'pst_id', sub.pst_id, $event) : false
          }
        }
      }, [(sub.psc_name) ? _c('p', {
        staticClass: "dropdown_item",
        class: {
          'color1': sub.psc_id == 1, 'color2': sub.psc_id == 2, 'color3': sub.psc_id == 3, 'color4': sub.psc_id == 4 || sub.psc_id == 5, 'color5': sub.psc_id == 6 || sub.psc_id == 7 || sub.psc_id == 8, 'color6': sub.psc_id == 9
        }
      }, [_vm._v(_vm._s(sub.psc_name))]) : _c('p', {
        staticClass: "color1 dropdown_item"
      }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('psc_name', 'pst_id', sub.pst_id)) ? _c('div', {
        staticClass: "drop_down_wrap status dd_wrap",
        class: {
          'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
        }
      }, [_c('ul', {
        staticClass: "infor_ul dd_wrap"
      }, _vm._l((_vm.project.status_cate), function(status) {
        return _c('li', {
          staticClass: "infor_li dd_wrap",
          class: {
            'current': sub.psc_id == status.psc_id
          },
          on: {
            "click": function($event) {
              return _vm.changeStatus(sub.pst_id, status.psc_id)
            }
          }
        }, [_c('span', {
          staticClass: "dd_wrap",
          class: {
            'color1': status.psc_id == 1, 'color2': status.psc_id == 2, 'color3': status.psc_id == 3, 'color4': status.psc_id == 4 || status.psc_id == 5, 'color5': status.psc_id == 6 || status.psc_id == 7 || status.psc_id == 8, 'color6': status.psc_id == 9
          }
        }), _vm._v(_vm._s(status.psc_name))])
      }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell ppc_name",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.ppc_name == true
        }
      }, [(sub.ppc_name) ? _c('p', {
        class: {
          'red': sub.ppc_id == 3
        }
      }, [_vm._v(_vm._s(sub.ppc_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pst_spendtime",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pst_spendtime == true
        }
      }, [(sub.pst_spendtime) ? _c('span', [_vm._v(_vm._s(sub.pst_spendtime) + "h")]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
        staticClass: "content_text cell pt_backup",
        class: {
          'none': !_vm.project.list_field_show_or_not.all.pt_backup == true
        }
      })])
    }), _vm._v(" "), _c('div', {
      staticClass: "row add_sub_project"
    }, [_c('div', {
      staticClass: "cell"
    }), _vm._v(" "), _c('div', {
      staticClass: "cell margin_a_little"
    }), _vm._v(" "), ((_vm.user_status.ud_admin || _vm.user_auth.pt_admin)) ? _c('div', {
      staticClass: "cell add_sub_item sub_item"
    }, [(!_vm.project.create_subproject_status || _vm.project.open_project_id != pro.pt_id) ? _c('span', {
      on: {
        "click": function($event) {
          _vm.project.create_subproject_status = true, _vm.project.open_project_id = pro.pt_id
        }
      }
    }, [_vm._v("添加子任務")]) : _vm._e(), _vm._v(" "), (_vm.project.create_subproject_status && _vm.project.open_project_id == pro.pt_id) ? _c('div', {
      staticClass: "create_subproject"
    }, [_c('input', {
      attrs: {
        "type": "text",
        "name": "pst_name",
        "placeholder": "輸入新子任務名稱"
      }
    }), _c('i', {
      staticClass: "far fa-times-circle close",
      on: {
        "click": function($event) {
          _vm.project.create_subproject_status = false
        }
      }
    }), _c('i', {
      staticClass: "far fa-check-circle check",
      on: {
        "click": function($event) {
          _vm.project.create_subproject_status = false, _vm.createSubProject(pro.pt_id)
        }
      }
    })]) : _vm._e()]) : _vm._e()])], 2)
  })], 2), _vm._v(" "), (_vm.new_projects.length == 0 && _vm.search_condition.pro_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無任務")]) : (_vm.new_projects.length == 0 && _vm.search_condition.pro_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無任務")]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.url_show_block == 'announcement-list') ? _c('div', {
    staticClass: "announcement",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "left"
  }, [_c('ul', {
    staticClass: "tags_wrap"
  }, [_c('li', {
    class: {
      'current': _vm.announcement.sub_nav == 0
    },
    on: {
      "click": function($event) {
        _vm.announcement.sub_nav = 0, _vm.closeAll()
      },
      "mouseover": function($event) {
        _vm.announcement.tabHover = 0
      },
      "mouseleave": function($event) {
        _vm.announcement.tabHover = -1
      }
    }
  }, [_c('div', {
    staticClass: "tag_item"
  }, [(_vm.announcement.sub_nav == 0 || _vm.announcement.tabHover == 0) ? _c('img', {
    attrs: {
      "src": "/image/coffee-solid_hover.png"
    }
  }) : _c('img', {
    attrs: {
      "src": "/image/coffee-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("部級公告")])])]), _vm._v(" "), _vm._l((_vm.user_group), function(group) {
    return _c('li', {
      class: {
        'current': _vm.announcement.sub_nav == group.ug_id
      },
      on: {
        "click": function($event) {
          _vm.announcement.sub_nav = group.ug_id, _vm.closeAll()
        },
        "mouseover": function($event) {
          _vm.announcement.tabHover = group.ug_id
        },
        "mouseleave": function($event) {
          _vm.announcement.tabHover = -1
        }
      }
    }, [_c('div', {
      staticClass: "tag_item"
    }, [(_vm.announcement.sub_nav == group.ug_id || _vm.announcement.tabHover == group.ug_id) ? _c('img', {
      attrs: {
        "src": "/image/coffee-solid_hover.png"
      }
    }) : _c('img', {
      attrs: {
        "src": "/image/coffee-solid.png"
      }
    }), _vm._v(" "), _c('p', [_vm._v(_vm._s(group.ug_name_forshort) + " 公告")])])])
  })], 2)]), _vm._v(" "), _c('div', {
    staticClass: "right ann"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [(_vm.user_status.ud_admin || _vm.user_auth.ai_admin) ? _c('div', {
    staticClass: "btn_create dd_wrap",
    on: {
      "click": function($event) {
        _vm.announcement.create_ann_open ? _vm.announcement.create_ann_open = false : _vm.announcement.create_ann_open = true
      }
    }
  }, [_vm._v("新增公告")]) : _vm._e()]), _vm._v(" "), (_vm.announcement.create_ann_open) ? _c('div', {
    staticClass: "create_project dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "ai_title",
      "placeholder": "輸入新公告標題"
    }
  }), _c('i', {
    staticClass: "far fa-times-circle close dd_wrap",
    on: {
      "click": function($event) {
        _vm.announcement.create_ann_open = false
      }
    }
  }), _c('i', {
    staticClass: "far fa-check-circle check dd_wrap",
    on: {
      "click": function($event) {
        return _vm.createAnn()
      }
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.new_data.length > 0) ? _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell star"
  }), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ai_title"
  }), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ai_expirydate"
  }, [_vm._v("到期日")]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ai_reminderdate"
  }, [_vm._v("提醒")]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.ai_admin) ? _c('div', {
    staticClass: "head_text cell btn_delete"
  }) : _vm._e()]), _vm._v(" "), _vm._l((_vm.new_data), function(ann) {
    return _c('div', {
      staticClass: "content_wrap row_group"
    }, [_c('div', {
      staticClass: "main_project row"
    }, [_c('div', {
      staticClass: "content_text cell star"
    }, [(ann.ai_topping == 1) ? _c('i', {
      staticClass: "fas fa-star",
      class: {
        'cursor': _vm.user_status.ud_admin || _vm.user_auth.ai_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.ai_admin ? _vm.changeAnnTopping(ann.ai_id, false) : false
        }
      }
    }) : _c('i', {
      staticClass: "far fa-star",
      class: {
        'cursor': _vm.user_status.ud_admin || _vm.user_auth.ai_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.ai_admin ? _vm.changeAnnTopping(ann.ai_id, true) : false
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ai_title"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.ann_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.ann_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'ai', ann.ai_id, 3)
        }
      }
    }, [_vm._v(_vm._s(ann.ai_title))])]), _vm._v(" "), (ann.ai_expirydate) ? _c('div', {
      staticClass: "content_text cell ai_expirydate"
    }, [_vm._v(_vm._s(ann.ai_expirydate))]) : _c('div', {
      staticClass: "content_text cell ai_expirydate"
    }, [_vm._v("-")]), _vm._v(" "), (ann.url_reminderdate) ? _c('div', {
      staticClass: "content_text cell ai_reminderdate"
    }, [_vm._v(_vm._s(_vm.removeSecond(ann.url_reminderdate)))]) : _c('div', {
      staticClass: "content_text cell ai_reminderdate"
    }, [_vm._v("-")]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.ai_admin) ? _c('div', {
      staticClass: "content_text cell btn_delete"
    }, [_c('i', {
      staticClass: "far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeletePromptBox(ann.ai_id, 1)
        }
      }
    })]) : _vm._e()])])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.new_data.length == 0 && _vm.search_condition.ann_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無公告")]) : (_vm.new_data.length == 0 && _vm.search_condition.ann_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無公告")]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.url_show_block == 'property-list') ? _c('div', {
    staticClass: "property",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "right asset"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [_c('div', {
    staticClass: "account_title"
  }, [_vm._v("資產管理")]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.pm_admin) ? _c('div', {
    staticClass: "btn_create dd_wrap",
    on: {
      "click": function($event) {
        _vm.property.create_property_open ? _vm.closeAll() : _vm.property.create_property_open = true
      }
    }
  }, [_vm._v("新增資產")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell ellipsis"
  }, [_c('i', {
    staticClass: "fas fa-list-ul dropdown_item cursor",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('list', 'show', 1, $event)
      }
    }
  }), _vm._v(" "), (_vm.checkToOpenDropDown('list', 'show', 1)) ? _c('ul', {
    staticClass: "title_list dd_wrap"
  }, [_c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.ud_name),
      expression: "property.property_field_show_or_not.ud_name"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "ud_name"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.ud_name,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.ud_name) ? _vm._i(_vm.property.property_field_show_or_not.ud_name, null) > -1 : (_vm.property.property_field_show_or_not.ud_name)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.ud_name,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "ud_name", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "ud_name", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "ud_name", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "ud_name"
    }
  }, [_vm._v("人員")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_host),
      expression: "property.property_field_show_or_not.pm_host"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_host"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_host,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_host) ? _vm._i(_vm.property.property_field_show_or_not.pm_host, null) > -1 : (_vm.property.property_field_show_or_not.pm_host)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_host,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_host", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_host", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_host", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_host"
    }
  }, [_vm._v("主機")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_screenone),
      expression: "property.property_field_show_or_not.pm_screenone"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_screenone"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_screenone,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_screenone) ? _vm._i(_vm.property.property_field_show_or_not.pm_screenone, null) > -1 : (_vm.property.property_field_show_or_not.pm_screenone)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_screenone,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_screenone", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_screenone", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_screenone", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_screenone"
    }
  }, [_vm._v("螢幕1")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_screentwo),
      expression: "property.property_field_show_or_not.pm_screentwo"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_screentwo"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_screentwo,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_screentwo) ? _vm._i(_vm.property.property_field_show_or_not.pm_screentwo, null) > -1 : (_vm.property.property_field_show_or_not.pm_screentwo)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_screentwo,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_screentwo", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_screentwo", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_screentwo", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_screentwo"
    }
  }, [_vm._v("螢幕2")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_telephone),
      expression: "property.property_field_show_or_not.pm_telephone"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_telephone"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_telephone,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_telephone) ? _vm._i(_vm.property.property_field_show_or_not.pm_telephone, null) > -1 : (_vm.property.property_field_show_or_not.pm_telephone)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_telephone,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_telephone", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_telephone", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_telephone", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_telephone"
    }
  }, [_vm._v("話機")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_canvas),
      expression: "property.property_field_show_or_not.pm_canvas"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_canvas"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_canvas,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_canvas) ? _vm._i(_vm.property.property_field_show_or_not.pm_canvas, null) > -1 : (_vm.property.property_field_show_or_not.pm_canvas)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_canvas,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_canvas", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_canvas", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_canvas", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_canvas"
    }
  }, [_vm._v("繪圖板")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_other),
      expression: "property.property_field_show_or_not.pm_other"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_other"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_other,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_other) ? _vm._i(_vm.property.property_field_show_or_not.pm_other, null) > -1 : (_vm.property.property_field_show_or_not.pm_other)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_other,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_other", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_other", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_other", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_other"
    }
  }, [_vm._v("其他")])])]), _vm._v(" "), _c('li', {
    staticClass: "title_item dd_wrap"
  }, [_c('div', {
    staticClass: "list-item dd_wrap"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.property.property_field_show_or_not.pm_adobe),
      expression: "property.property_field_show_or_not.pm_adobe"
    }],
    staticClass: "dd_wrap",
    attrs: {
      "type": "checkbox",
      "id": "pm_adobe"
    },
    domProps: {
      "checked": _vm.property.property_field_show_or_not.pm_adobe,
      "checked": Array.isArray(_vm.property.property_field_show_or_not.pm_adobe) ? _vm._i(_vm.property.property_field_show_or_not.pm_adobe, null) > -1 : (_vm.property.property_field_show_or_not.pm_adobe)
    },
    on: {
      "change": function($event) {
        var $$a = _vm.property.property_field_show_or_not.pm_adobe,
          $$el = $event.target,
          $$c = $$el.checked ? (true) : (false);
        if (Array.isArray($$a)) {
          var $$v = null,
            $$i = _vm._i($$a, $$v);
          if ($$el.checked) {
            $$i < 0 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_adobe", $$a.concat([$$v])))
          } else {
            $$i > -1 && (_vm.$set(_vm.property.property_field_show_or_not, "pm_adobe", $$a.slice(0, $$i).concat($$a.slice($$i + 1))))
          }
        } else {
          _vm.$set(_vm.property.property_field_show_or_not, "pm_adobe", $$c)
        }
      }
    }
  }), _vm._v(" "), _c('label', {
    staticClass: "dd_wrap",
    attrs: {
      "for": "pm_adobe"
    }
  }, [_vm._v("adobe")])])])]) : _vm._e()]), _vm._v(" "), (_vm.property.property_field_show_or_not.ud_name) ? _c('div', {
    staticClass: "head_text cell ud_name"
  }, [_vm._v("人員\n                        ")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_host) ? _c('div', {
    staticClass: "head_text cell pm_host"
  }, [_vm._v("主機")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_screenone) ? _c('div', {
    staticClass: "head_text cell pm_screenone"
  }, [_vm._v("螢幕1")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_screentwo) ? _c('div', {
    staticClass: "head_text cell pm_screentwo"
  }, [_vm._v("螢幕2")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_telephone) ? _c('div', {
    staticClass: "head_text cell pm_telephone"
  }, [_vm._v("話機")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_canvas) ? _c('div', {
    staticClass: "head_text cell pm_canvas"
  }, [_vm._v("繪圖板")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_other) ? _c('div', {
    staticClass: "head_text cell pm_other"
  }, [_vm._v("其他")]) : _vm._e(), _vm._v(" "), (_vm.property.property_field_show_or_not.pm_adobe) ? _c('div', {
    staticClass: "head_text cell pm_adobe"
  }, [_vm._v("adobe")]) : _vm._e(), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.pm_admin) ? _c('div', {
    staticClass: "head_text cell btn_delete"
  }) : _vm._e()]), _vm._v(" "), (_vm.property.create_property_open) ? _c('div', {
    staticClass: "content_wrap row_group dd_wrap new_asset"
  }, [_c('div', {
    staticClass: "sub_project row dd_wrap"
  }, [_c('div', {
    staticClass: "content_text cell ellipsis dd_wrap"
  }), _vm._v(" "), _c('div', {
    staticClass: "content_text cell ud_name dropdown_item cursor",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('ud_name', 'pm_id', 'create', $event)
      }
    }
  }, [(_vm.property.create_property_data.ud_name) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.property.create_property_data.ud_name))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpenDropDown('ud_name', 'pm_id', 'create')) ? _c('div', {
    staticClass: "drop_down_wrap user dd_wrap",
    class: {
      'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
    }
  }, [_c('ul', {
    staticClass: "infor_ul dd_wrap"
  }, _vm._l((_vm.user_cate), function(user) {
    return _c('li', {
      staticClass: "infor_li dd_wrap",
      class: {
        'current': _vm.property.create_property_data.ud_id == user.ud_id
      },
      on: {
        "click": function($event) {
          _vm.property.create_property_data.ud_name = user.ud_name, _vm.property.create_property_data.ud_id = user.ud_id, _vm.closeAllDropdownMenu()
        }
      }
    }, [(user.ud_icon) ? _c('img', {
      staticClass: "dd_wrap",
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "dd_wrap",
      attrs: {
        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
        "alt": ""
      }
    }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
  }), 0)]) : _vm._e()]), _vm._v(" "), _vm._m(11), _vm._v(" "), _vm._m(12), _vm._v(" "), _vm._m(13), _vm._v(" "), _vm._m(14), _vm._v(" "), _vm._m(15), _vm._v(" "), _vm._m(16), _vm._v(" "), _vm._m(17), _vm._v(" "), _c('div', {
    staticClass: "content_text cell btn_create dd_wrap"
  }, [_c('i', {
    staticClass: "far fa-times-circle close dd_wrap",
    on: {
      "click": function($event) {
        return _vm.closeAll()
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "far fa-check-circle check dd_wrap",
    on: {
      "click": function($event) {
        return _vm.createProperty()
      }
    }
  })])])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.new_data), function(pro) {
    return _c('div', {
      staticClass: "content_wrap row_group",
      class: 'list' + pro.pm_id
    }, [_c('div', {
      staticClass: "sub_project row"
    }, [_c('div', {
      staticClass: "content_text cell ellipsis"
    }), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_name dropdown_item",
      class: {
        'none': !_vm.property.property_field_show_or_not.ud_name == true, 'cursor': _vm.user_status.ud_admin || _vm.user_auth.pm_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.pm_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.openDropdownMenu('ud_name', 'pm_id', pro.pm_id, $event) : false
        }
      }
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.property_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.property_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      staticClass: "overover dropdown_item",
      class: {
        'cursor': _vm.user_status.ud_admin || _vm.user_auth.pm_admin
      }
    }, [_vm._v(_vm._s(pro.ud_name))]), _vm._v(" "), (_vm.checkToOpenDropDown('ud_name', 'pm_id', pro.pm_id)) ? _c('div', {
      staticClass: "drop_down_wrap user dd_wrap",
      class: {
        'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
      }
    }, [_c('ul', {
      staticClass: "infor_ul dd_wrap"
    }, _vm._l((_vm.user_cate), function(user) {
      return _c('li', {
        staticClass: "infor_li dd_wrap",
        class: {
          'current': pro.ud_id == user.ud_id
        },
        on: {
          "click": function($event) {
            return _vm.changePropertyUser(pro.pm_id, user.ud_id)
          }
        }
      }, [(user.ud_icon) ? _c('img', {
        staticClass: "dd_wrap",
        attrs: {
          "src": user.ud_icon,
          "alt": ""
        }
      }) : _c('img', {
        staticClass: "dd_wrap",
        attrs: {
          "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
          "alt": ""
        }
      }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
    }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_host dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_host == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_host', pro.pm_id) : false
        }
      }
    }, [(pro.pm_host) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_host))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_host"
      },
      domProps: {
        "value": pro.pm_host
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_host', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_screenone dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_screenone == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_screenone', pro.pm_id) : false
        }
      }
    }, [(pro.pm_screenone) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_screenone))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_screenone"
      },
      domProps: {
        "value": pro.pm_screenone
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_screenone', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_screentwo dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_screentwo == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_screentwo', pro.pm_id) : false
        }
      }
    }, [(pro.pm_screentwo) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_screentwo))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_screentwo"
      },
      domProps: {
        "value": pro.pm_screentwo
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_screentwo', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_telephone dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_telephone == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_telephone', pro.pm_id) : false
        }
      }
    }, [(pro.pm_telephone) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_telephone))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_telephone"
      },
      domProps: {
        "value": pro.pm_telephone
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_telephone', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_canvas dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_canvas == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_canvas', pro.pm_id) : false
        }
      }
    }, [(pro.pm_canvas) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_canvas))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_canvas"
      },
      domProps: {
        "value": pro.pm_canvas
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_canvas', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_other dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_other == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_other', pro.pm_id) : false
        }
      }
    }, [(pro.pm_other) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_other))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_other"
      },
      domProps: {
        "value": pro.pm_other
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_other', pro.pm_id)
        }
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell pm_adobe dd_wrap",
      class: {
        'none': !_vm.property.property_field_show_or_not.pm_adobe == true
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.pm_admin ? _vm.showThisFieldInput('pm_adobe', pro.pm_id) : false
        }
      }
    }, [(pro.pm_adobe) ? _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v(_vm._s(pro.pm_adobe))]) : _c('span', {
      staticClass: "dd_wrap"
    }, [_vm._v("-")]), _vm._v(" "), _c('input', {
      staticClass: "none dd_wrap",
      attrs: {
        "type": "text",
        "name": "pm_adobe"
      },
      domProps: {
        "value": pro.pm_adobe
      },
      on: {
        "change": function($event) {
          return _vm.changePropertyThisField('pm_adobe', pro.pm_id)
        }
      }
    })]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.pm_admin) ? _c('div', {
      staticClass: "content_text cell btn_delete"
    }, [_c('i', {
      staticClass: "far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeletePromptBox(pro.pm_id, 6)
        }
      }
    })]) : _vm._e()])])
  })], 2), _vm._v(" "), (_vm.new_data.length == 0 && _vm.search_condition.property_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無資產")]) : (_vm.new_data.length == 0 && _vm.search_condition.property_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無資產")]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.url_show_block == 'book-list') ? _c('div', {
    staticClass: "book",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "right book"
  }, [_c('div', {
    staticClass: "book_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [_c('div', {
    staticClass: "header_top"
  }, [_c('div', {
    staticClass: "book_sort cursor dropdown_item",
    on: {
      "click": function($event) {
        _vm.book.book_infor ? _vm.openDropdownMenu('bs_name', 'bs_id', _vm.book.book_infor.bs_id, $event) : false
      }
    }
  }, [(_vm.book.book_infor && _vm.book.book_infor.bs_name) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.book_infor.bs_name))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請先新增書籍")]), _vm._v(" "), (_vm.book.book_infor && _vm.checkToOpenDropDown('bs_name', 'bs_id', _vm.book.book_infor.bs_id)) ? _c('i', {
    staticClass: "fas fa-chevron-up dropdown_item"
  }) : _c('i', {
    staticClass: "fas fa-chevron-down dropdown_item"
  }), _vm._v(" "), (_vm.book.book_infor && _vm.checkToOpenDropDown('bs_name', 'bs_id', _vm.book.book_infor.bs_id)) ? _c('div', {
    staticClass: "drop_down_wrap dd_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul dd_wrap"
  }, [(_vm.book.data_booksorts.length < 1) ? _c('li', {
    staticClass: "infor_li dd_wrap"
  }, [_vm._v("請先新增書籍")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.book.data_booksorts), function(sort) {
    return _c('li', {
      staticClass: "infor_li dd_wrap",
      class: {
        'current': _vm.book.book_infor.bs_id == sort.bs_id
      },
      on: {
        "click": function($event) {
          return _vm.changeBookSort(sort.bs_id, sort.bs_name)
        }
      }
    }, [_vm._v(_vm._s(sort.bs_name))])
  })], 2)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "book_name cursor dropdown_item",
    on: {
      "click": function($event) {
        _vm.book.book_infor ? _vm.openDropdownMenu('bi_name', 'bi_id', _vm.book.book_infor.bi_id, $event) : false
      }
    }
  }, [(_vm.book.book_infor && _vm.book.book_infor.bi_name) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.book_infor.bi_name))]) : (_vm.books.length < 1) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請先新增書籍")]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.book.book_infor && _vm.checkToOpenDropDown('bi_name', 'bi_id', _vm.book.book_infor.bi_id)) ? _c('i', {
    staticClass: "fas fa-chevron-up dropdown_item"
  }) : _c('i', {
    staticClass: "fas fa-chevron-down dropdown_item"
  }), _vm._v(" "), (_vm.book.book_infor && _vm.checkToOpenDropDown('bi_name', 'bi_id', _vm.book.book_infor.bi_id)) ? _c('div', {
    staticClass: "drop_down_wrap dd_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul dd_wrap"
  }, [(_vm.books.length < 1) ? _c('li', {
    staticClass: "infor_li dd_wrap"
  }, [_vm._v("此分類無書籍")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.books), function(infor) {
    return _c('li', {
      staticClass: "infor_li dd_wrap",
      class: {
        'current': _vm.book.book_infor && _vm.book.book_infor.bi_id == infor.bi_id
      },
      on: {
        "click": function($event) {
          return _vm.selectThisBook(infor.bi_id, infor.bi_name)
        }
      }
    }, [_vm._v(_vm._s(infor.bi_name))])
  })], 2)]) : _vm._e()]), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.bi_admin) ? _c('div', {
    staticClass: "btn_create dd_wrap",
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'bi', null, 6)
      }
    }
  }, [_vm._v("新增書籍")]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && (_vm.user_status.ud_admin || _vm.user_auth.bi_admin) && _vm.book.book_infor.bi_id) ? _c('div', {
    staticClass: "btn_modify dd_wrap",
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'bi', _vm.book.book_infor.bi_id, 6)
      }
    }
  }, [_vm._v("修改書籍")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "header_bottom"
  }, [_c('div', {
    staticClass: "image_wrap"
  }, [(_vm.book.book_infor && _vm.book.book_infor.bi_fileurl) ? _c('img', {
    attrs: {
      "src": _vm.book.book_infor.bi_fileurl,
      "alt": "書籍圖片"
    }
  }) : _c('img', {
    attrs: {
      "src": "image/book.png",
      "alt": "書籍圖片"
    }
  })]), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.bi_name) ? _c('p', {
    staticClass: "title"
  }, [_vm._v(_vm._s(_vm.book.book_infor.bi_name))]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.bi_purchasedate) ? _c('p', {
    staticClass: "date"
  }, [_vm._v("進貨日期： " + _vm._s(_vm.book.book_infor.bi_purchasedate))]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.ud_name) ? _c('p', {
    staticClass: "user"
  }, [_vm._v("資產： " + _vm._s(_vm.book.book_infor.ud_name))]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.bsc_name) ? _c('p', {
    staticClass: "status"
  }, [_vm._v("狀態： " + _vm._s(_vm.book.book_infor.bsc_name))]) : _vm._e(), _vm._v(" "), (_vm.book.book_infor && _vm.book.book_infor.bi_message) ? _c('textarea', {
    attrs: {
      "name": "",
      "id": "",
      "cols": "30",
      "rows": "10",
      "disabled": ""
    },
    domProps: {
      "value": _vm.book.book_infor.bi_message
    }
  }) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "container_top row"
  }, [_c('div', {
    staticClass: "top_item cell"
  }, [_vm._v("借閱人")]), _vm._v(" "), _c('div', {
    staticClass: "top_item cell"
  }, [_vm._v("借閱日期")]), _vm._v(" "), _c('div', {
    staticClass: "top_item cell"
  }, [_vm._v("歸還日期")]), _vm._v(" "), _c('div', {
    staticClass: "top_item cell btn_delete"
  }, [(_vm.book.book_infor && (_vm.user_status.ud_admin || _vm.user_auth.bi_admin) && _vm.book.book_infor.bi_id) ? _c('div', {
    staticClass: "btn_create dd_wrap",
    on: {
      "click": function($event) {
        _vm.book.create_book_open ? _vm.closeAll() : _vm.book.create_book_open = true
      }
    }
  }, [_vm._v("新增借閱")]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "margin_top"
  }), _vm._v(" "), _c('div', {
    staticClass: "container_bottom row_group"
  }, [(_vm.book.create_book_open) ? _c('div', {
    staticClass: "bottom_item row new_book"
  }, [_c('div', {
    staticClass: "content_text cell ud_name dropdown_item cursor",
    on: {
      "click": function($event) {
        return _vm.openDropdownMenu('ud_name', 'bbr_id', 'create', $event)
      }
    }
  }, [(_vm.book.create_book_data.ud_name) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.create_book_data.ud_name))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpenDropDown('ud_name', 'bbr_id', 'create')) ? _c('div', {
    staticClass: "drop_down_wrap user dd_wrap",
    class: {
      'top': _vm.top_or_bottom, 'bottom': !_vm.top_or_bottom
    }
  }, [_c('ul', {
    staticClass: "infor_ul dd_wrap"
  }, _vm._l((_vm.user_cate), function(user) {
    return _c('li', {
      staticClass: "infor_li dd_wrap",
      class: {
        'current': _vm.book.create_book_data.ud_id == user.ud_id
      },
      on: {
        "click": function($event) {
          _vm.book.create_book_data.ud_name = user.ud_name, _vm.book.create_book_data.ud_id = user.ud_id, _vm.closeAllDropdownMenu()
        }
      }
    }, [(user.ud_icon) ? _c('img', {
      staticClass: "dd_wrap",
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    }) : _c('img', {
      staticClass: "dd_wrap",
      attrs: {
        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
        "alt": ""
      }
    }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
  }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "content_text cell",
    class: {
      'cursor': _vm.user_status.ud_admin || _vm.user_auth.bi_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.bi_admin
    },
    on: {
      "click": function($event) {
        _vm.user_status.ud_admin || _vm.user_auth.bi_admin ? _vm.openDropdownMenu('bbr_borrowingdate', 'bbr_id', 'create', $event) : false
      }
    }
  }, [(_vm.book.create_book_data.bbr_borrowingdate) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.create_book_data.bbr_borrowingdate))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('bbr_borrowingdate', 'bbr_id', 'create')) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.book.create_book_data.bbr_id,
      "type": "bbr_id",
      "date": _vm.book.create_book_data.bbr_borrowingdate,
      "position": _vm.dropdown.position
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.createBorrowingDate
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "content_text cell",
    class: {
      'cursor': _vm.user_status.ud_admin || _vm.user_auth.bi_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.bi_admin
    },
    on: {
      "click": function($event) {
        _vm.user_status.ud_admin || _vm.user_auth.bi_admin ? _vm.openDropdownMenu('bbr_returndate', 'bbr_id', 'create', $event) : false
      }
    }
  }, [(_vm.book.create_book_data.bbr_returndate) ? _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v(_vm._s(_vm.book.create_book_data.bbr_returndate))]) : _c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('bbr_returndate', 'bbr_id', 'create')) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.book.create_book_data.bbr_id,
      "type": "bbr_id",
      "date": _vm.book.create_book_data.bbr_returndate,
      "position": _vm.dropdown.position
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.createReturnDate
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "content_text cell create_wrap dd_wrap"
  }, [_c('i', {
    staticClass: "far fa-times-circle close dd_wrap",
    on: {
      "click": function($event) {
        return _vm.closeAll()
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "far fa-check-circle check dd_wrap",
    on: {
      "click": function($event) {
        return _vm.createBorrowing()
      }
    }
  })])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.new_data), function(bo) {
    return _c('div', {
      staticClass: "bottom_item row"
    }, [_c('div', {
      staticClass: "content_text cell"
    }, [(bo.ud_name) ? _c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.book_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.book_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }]
    }, [_vm._v(_vm._s(bo.ud_name))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell"
    }, [(bo.bbr_borrowingdate) ? _c('span', [_vm._v(_vm._s(bo.bbr_borrowingdate))]) : _c('span', [_vm._v("-")])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell",
      class: {
        'cursor': _vm.user_status.ud_admin || _vm.user_auth.bi_admin, 'dropdown_item': _vm.user_status.ud_admin || _vm.user_auth.bi_admin
      },
      on: {
        "click": function($event) {
          _vm.user_status.ud_admin || _vm.user_auth.bi_admin ? _vm.openDropdownMenu('bbr_returndate', 'bbr_id', bo.bbr_id, $event) : false
        }
      }
    }, [(bo.bbr_returndate) ? _c('span', {
      staticClass: "dropdown_item"
    }, [_vm._v(_vm._s(bo.bbr_returndate))]) : _c('span', {
      staticClass: "dropdown_item"
    }, [_vm._v("-")]), _vm._v(" "), (_vm.checkToOpenDropDown('bbr_returndate', 'bbr_id', bo.bbr_id)) ? _c('datetimepicker', {
      attrs: {
        "id": bo.bbr_id,
        "type": "bbr_id",
        "date": bo.bbr_returndate,
        "position": _vm.dropdown.position
      },
      on: {
        "get-close": _vm.closeDateTimePicker,
        "get-newdate": _vm.changeReturnDate
      }
    }) : _vm._e()], 1), _vm._v(" "), (_vm.user_status.ud_admin || _vm.user_auth.bi_admin) ? _c('div', {
      staticClass: "content_text cell btn_delete"
    }, [_c('i', {
      staticClass: "far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeletePromptBox(bo.bbr_id, 3)
        }
      }
    })]) : _vm._e()])
  })], 2)]), _vm._v(" "), (_vm.new_data.length < 1) ? _c('div', {
    staticClass: "not_found"
  }, [_c('img', {
    attrs: {
      "src": "/image/nobody.png",
      "alt": ""
    }
  })]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.url_show_block == 'account-list') ? _c('div', {
    staticClass: "account",
    attrs: {
      "id": "page-container"
    }
  }, [_c('div', {
    staticClass: "left"
  }, [_c('ul', {
    staticClass: "tags_wrap"
  }, [(_vm.account.sub_nav == 'account_management') ? _c('li', {
    class: {
      'current': _vm.account.sub_nav == 'account_management'
    },
    on: {
      "click": function($event) {
        _vm.account.sub_nav = 'account_management'
      }
    }
  }, [_vm._m(18)]) : _c('li', {
    class: {
      'current': _vm.account.sub_nav == 'account_management'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/users-solid_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/users-solid.png')"
    },
    on: {
      "click": function($event) {
        _vm.account.sub_nav = 'account_management'
      }
    }
  }, [_vm._m(19)]), _vm._v(" "), (_vm.account.sub_nav == 'authority_level') ? _c('li', {
    class: {
      'current': _vm.account.sub_nav == 'authority_level'
    },
    on: {
      "click": function($event) {
        _vm.account.sub_nav = 'authority_level'
      }
    }
  }, [_vm._m(20)]) : _c('li', {
    class: {
      'current': _vm.account.sub_nav == 'authority_level'
    },
    attrs: {
      "onmouseover": "$(this).find('img').attr('src','/image/door-open-solid_hover.png')",
      "onmouseout": "$(this).find('img').attr('src','/image/door-open-solid.png')"
    },
    on: {
      "click": function($event) {
        _vm.account.sub_nav = 'authority_level'
      }
    }
  }, [_vm._m(21)])])]), _vm._v(" "), (_vm.account.sub_nav == 'account_management') ? _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [_c('div', {
    staticClass: "btn_create",
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'ud', null, 4)
      }
    }
  }, [_vm._v("新增帳號")])]), _vm._v(" "), (_vm.new_users.length > 0) ? _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell ud_code cursor",
    on: {
      "click": function($event) {
        return _vm.changeUserSort('ud_code')
      }
    }
  }, [_vm._v("\n                            員工代號\n                            "), (_vm.account.user_order == 'ud_code' && _vm.account.user_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.user_order == 'ud_code' && _vm.account.user_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ud_account cursor",
    on: {
      "click": function($event) {
        return _vm.changeUserSort('ud_account')
      }
    }
  }, [_vm._v("\n                            帳號\n                            "), (_vm.account.user_order == 'ud_account' && _vm.account.user_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.user_order == 'ud_account' && _vm.account.user_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ud_name cursor",
    on: {
      "click": function($event) {
        return _vm.changeUserSort('ud_name')
      }
    }
  }, [_vm._v("\n                            暱稱\n                            "), (_vm.account.user_order == 'ud_name' && _vm.account.user_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.user_order == 'ud_name' && _vm.account.user_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ug_name cursor",
    on: {
      "click": function($event) {
        return _vm.changeUserSort('ug_name')
      }
    }
  }, [_vm._v("\n                            組別\n                            "), (_vm.account.user_order == 'ug_name' && _vm.account.user_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.user_order == 'ug_name' && _vm.account.user_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell al_id"
  }, [_vm._v("權限等級")]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ud_status"
  }, [_vm._v("啟/停用")])]), _vm._v(" "), _vm._l((_vm.new_users), function(user) {
    return _c('div', {
      staticClass: "content_wrap row_group"
    }, [_c('div', {
      staticClass: "main_project row"
    }, [_c('div', {
      staticClass: "content_text cell ud_code"
    }, [_vm._v(_vm._s(user.ud_code))]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_account"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.user_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.user_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      staticClass: "cursor",
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'ud', user.ud_id, 4)
        }
      }
    }, [_vm._v(_vm._s(user.ud_account))])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_name"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.user_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.user_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }]
    }, [_vm._v(_vm._s(user.ud_name))])]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ug_name"
    }, [_vm._v(_vm._s(user.ug_name))]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell al_id"
    }, [_vm._v(_vm._s(user.al_name))]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell ud_status"
    }, [(user.ud_status == 1) ? _c('span', {
      staticClass: "btn green cursor",
      on: {
        "click": function($event) {
          return _vm.changeUserStatus(user.ud_id, user.ud_status)
        }
      }
    }, [_vm._v("啟用中")]) : (user.ud_status == 0) ? _c('span', {
      staticClass: "btn red cursor",
      on: {
        "click": function($event) {
          return _vm.changeUserStatus(user.ud_id, user.ud_status)
        }
      }
    }, [_vm._v("停用中")]) : _vm._e()])])])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.new_users.length == 0 && _vm.search_condition.user_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無使用者")]) : (_vm.new_users.length == 0 && _vm.search_condition.user_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無使用者")]) : _vm._e()])]) : _vm._e(), _vm._v(" "), (_vm.account.sub_nav == 'authority_level') ? _c('div', {
    staticClass: "right"
  }, [_c('div', {
    staticClass: "right_wrap"
  }, [_c('div', {
    staticClass: "header_wrap"
  }, [_c('div', {
    staticClass: "btn_create",
    on: {
      "click": function($event) {
        return _vm.openSinglePage(_vm.user_status, 'al', null, 5)
      }
    }
  }, [_vm._v("新增權限等級")])]), _vm._v(" "), (_vm.new_auths.length > 0) ? _c('div', {
    staticClass: "container_wrap table"
  }, [_c('div', {
    staticClass: "head_wrap row"
  }, [_c('div', {
    staticClass: "head_text cell al_name cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('al_name')
      }
    }
  }, [_vm._v("\n                            層級名稱"), (_vm.account.auth_order == 'al_name' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'al_name' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell pt_admin cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('pt_admin')
      }
    }
  }, [_vm._v("\n                            專案"), (_vm.account.auth_order == 'pt_admin' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'pt_admin' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell ai_admin cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('ai_admin')
      }
    }
  }, [_vm._v("\n                            公告"), (_vm.account.auth_order == 'ai_admin' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'ai_admin' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell pm_admin cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('pm_admin')
      }
    }
  }, [_vm._v("\n                            資產"), (_vm.account.auth_order == 'pm_admin' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'pm_admin' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell bi_admin cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('bi_admin')
      }
    }
  }, [_vm._v("\n                            書籍"), (_vm.account.auth_order == 'bi_admin' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'bi_admin' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell al_remark cursor",
    on: {
      "click": function($event) {
        return _vm.changeAuthSort('al_remark')
      }
    }
  }, [_vm._v("\n                            備註"), (_vm.account.auth_order == 'al_remark' && _vm.account.auth_sort == 'DESC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down"
  }) : (_vm.account.auth_order == 'al_remark' && _vm.account.auth_sort == 'ASC') ? _c('i', {
    staticClass: "fas fa-sort-amount-down-alt"
  }) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "head_text cell delete"
  }, [_vm._v("功能")])]), _vm._v(" "), _vm._l((_vm.new_auths), function(auth) {
    return _c('div', {
      staticClass: "content_wrap row_group"
    }, [_c('div', {
      staticClass: "main_project row"
    }, [_c('div', {
      staticClass: "content_text cell al_name cursor"
    }, [_c('span', {
      directives: [{
        name: "highlight",
        rawName: "v-highlight",
        value: ({
          keyword: _vm.search_condition.auth_content,
          overWriteStyle: {
            color: '#EC4683'
          },
          sensitive: false
        }),
        expression: "{keyword: search_condition.auth_content,overWriteStyle:{color: '#EC4683'},sensitive:false}"
      }],
      on: {
        "click": function($event) {
          return _vm.openSinglePage(_vm.user_status, 'al', auth.al_id, 5)
        }
      }
    }, [_vm._v(_vm._s(auth.al_name))])]), _vm._v(" "), (auth.pt_admin) ? _c('div', {
      staticClass: "content_text cell pt_admin"
    }, [_vm._v("可編輯")]) : _c('div', {
      staticClass: "content_text cell pt_admin"
    }, [_vm._v("僅查看")]), _vm._v(" "), (auth.ai_admin) ? _c('div', {
      staticClass: "content_text cell ai_admin"
    }, [_vm._v("可編輯")]) : _c('div', {
      staticClass: "content_text cell ai_admin"
    }, [_vm._v("僅查看")]), _vm._v(" "), (auth.pm_admin) ? _c('div', {
      staticClass: "content_text cell pm_admin"
    }, [_vm._v("可編輯")]) : _c('div', {
      staticClass: "content_text cell pm_admin"
    }, [_vm._v("僅查看")]), _vm._v(" "), (auth.bi_admin) ? _c('div', {
      staticClass: "content_text cell bi_admin"
    }, [_vm._v("可編輯")]) : _c('div', {
      staticClass: "content_text cell bi_admin"
    }, [_vm._v("僅查看")]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell al_remark"
    }, [_vm._v(_vm._s(auth.al_remark ? auth.al_remark : ''))]), _vm._v(" "), _c('div', {
      staticClass: "content_text cell btn_delete"
    }, [_c('i', {
      staticClass: "far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeletePromptBox(auth.al_id, 7)
        }
      }
    })])])])
  })], 2) : _vm._e(), _vm._v(" "), (_vm.new_auths.length == 0 && _vm.search_condition.auth_content != '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("查無權限等級")]) : (_vm.new_auths.length == 0 && _vm.search_condition.auth_content == '') ? _c('div', {
    staticClass: "found_nothing_wrap"
  }, [_vm._v("暫無權限等級")]) : _vm._e()])]) : _vm._e()]) : _vm._e(), _vm._v(" "), (_vm.checkToOpenHover()) ? _c('hoverwrap', {
    attrs: {
      "title": _vm.hoverwrap.title,
      "subtitle": _vm.hoverwrap.subtitle,
      "date": _vm.hoverwrap.date,
      "user": _vm.hoverwrap.user,
      "position": _vm.hoverwrap.position
    }
  }) : _vm._e(), _vm._v(" "), (_vm.project.create_tag_open) ? _c('div', {
    staticClass: "create_tag_wrap"
  }, [_c('div', {
    staticClass: "tag_box"
  }, [_c('div', {
    staticClass: "tag_content"
  }, [_c('div', {
    staticClass: "tag_title"
  }, [(_vm.project.tag_type == 'create') ? _c('h2', [_vm._v("新增標籤")]) : (_vm.project.tag_type == 'modify') ? _c('h2', [_vm._v("修改標籤")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "tag_name"
  }, [_c('label', {
    attrs: {
      "for": "tm_name"
    }
  }, [_vm._v("標籤名稱")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.project.tag_data.tm_name),
      expression: "project.tag_data.tm_name"
    }],
    attrs: {
      "type": "text",
      "name": "tm_name"
    },
    domProps: {
      "value": (_vm.project.tag_data.tm_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.project.tag_data, "tm_name", $event.target.value)
      }
    }
  })]), _vm._v(" "), _c('el-upload', {
    attrs: {
      "action": "",
      "on-change": _vm.getFile,
      "auto-upload": false,
      "show-file-list": false
    }
  }, [(_vm.image_url) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.image_url
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })])], 1), _vm._v(" "), _c('div', {
    staticClass: "tag_btn_group"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closeTagWrap()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.project.tag_type == 'create') ? _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.createTag()
      }
    }
  }, [_vm._v("確認")]) : (_vm.project.tag_type == 'modify') ? _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.changeTagStyle()
      }
    }
  }, [_vm._v("確認")]) : _vm._e()])])]) : _vm._e(), _vm._v(" "), (_vm.project.add_user_tag_open) ? _c('div', {
    staticClass: "add_user_tag_wrap",
    on: {
      "click": function($event) {
        return _vm.colseUserTagWrap($event)
      }
    }
  }, [_c('div', {
    staticClass: "user_tag_box user_tag_item"
  }, [_c('div', {
    staticClass: "user_tag_header user_tag_item"
  }, [_vm._m(22), _vm._v(" "), _c('div', {
    staticClass: "tag_input user_tag_item"
  }, [_vm._m(23), _vm._v(" "), _c('input', {
    staticClass: "user_tag_item",
    attrs: {
      "type": "text",
      "name": "ud_name",
      "placeholder": "輸入使用者名稱"
    },
    on: {
      "input": function($event) {
        return _vm.searchUser()
      },
      "compositionstart": function($event) {
        return _vm.listen_input_start()
      },
      "compositionend": function($event) {
        return _vm.listen_input_end()
      }
    }
  }), _vm._v(" "), (_vm.search_user_data.length) ? _c('ul', {
    staticClass: "search_result user_tag_item"
  }, _vm._l((_vm.search_user_data), function(user) {
    return _c('li', {
      staticClass: "user_tag_item",
      on: {
        "click": function($event) {
          return _vm.addUserToThisTag(user.ud_id)
        }
      }
    }, [_c('div', {
      staticClass: "user_icon user_tag_item"
    }, [_c('img', {
      staticClass: "user_tag_item",
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "user_name user_tag_item"
    }, [_vm._v(_vm._s(user.ud_name))])])
  }), 0) : _vm._e()])]), _vm._v(" "), (_vm.project.tag_user_data.length) ? _c('div', {
    staticClass: "user_tag_container user_tag_item"
  }, _vm._l((_vm.project.tag_user_data), function(user) {
    return _c('div', {
      staticClass: "user_data user_tag_item"
    }, [_c('div', {
      staticClass: "user_icon user_tag_item"
    }, [_c('img', {
      staticClass: "user_tag_item",
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "user_name user_tag_item"
    }, [_vm._v(_vm._s(user.ud_name))]), _vm._v(" "), (user.trm_owner) ? _c('div', {
      staticClass: "owner user_tag_item"
    }, [_vm._v("擁有者")]) : _vm._e(), _vm._v(" "), (!user.trm_owner && _vm.user_status.ud_admin && _vm.user_status.ud_id == _vm.project.tag_owner_id) ? _c('div', {
      staticClass: "remove_user user_tag_item",
      on: {
        "click": function($event) {
          return _vm.deleteUserFromThisTag(user.trm_id)
        }
      }
    }, [_vm._v("踢除")]) : _vm._e()])
  }), 0) : _vm._e(), _vm._v(" "), _vm._m(24)])]) : _vm._e(), _vm._v(" "), (_vm.checkToOpenSingle()) ? _c('singlepage', {
    attrs: {
      "userdata": _vm.single.userdata,
      "type": _vm.single.type,
      "id": _vm.single.id,
      "cate": _vm.single.cate,
      "group": _vm.single.group
    },
    on: {
      "get-close": _vm.closeSinglePage
    }
  }) : _vm._e(), _vm._v(" "), _c('reminderwrap', {
    attrs: {
      "id": _vm.user_status.ud_id,
      "admin": _vm.user_status.ud_admin ? true : false
    }
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.prompt_box_open),
      expression: "prompt_box_open"
    }],
    staticClass: "prompt_wrap"
  }, [_c('div', {
    staticClass: "prompt_box"
  }, [_vm._m(25), _vm._v(" "), _c('div', {
    staticClass: "prompt_btn_group"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closePrompt()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.show_submit_btn) ? _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.deleteData()
      }
    }
  }, [_vm._v("確認")]) : _c('div', {
    staticClass: "btn_submit"
  }, [_vm._v("確認")]), _vm._v(" "), _vm._m(26)])])]), _vm._v(" "), (_vm.loading) ? _c('div', {
    staticClass: "loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "notification_wrap"
  })], 1)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('i', {
    staticClass: "far fa-bell"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('li', [_c('i', {
    staticClass: "fas fa-cog"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "title"
  }, [_c('h2', [_vm._v("我的任務列表")]), _vm._v(" "), _c('p', [_vm._v("關注您的所有專案列表")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "list-title project-item"
  }, [_c('div', {
    staticClass: "table-item pt_name"
  }, [_vm._v("任務")]), _vm._v(" "), _c('div', {
    staticClass: "table-item pmc_name"
  }, [_vm._v("里程碑")]), _vm._v(" "), _c('div', {
    staticClass: "table-item prsc_name"
  }, [_vm._v("需求類別")]), _vm._v(" "), _c('div', {
    staticClass: "table-item peic_name"
  }, [_vm._v("執行項目")]), _vm._v(" "), _c('div', {
    staticClass: "table-item pst_completiondate"
  }, [_vm._v("完成日期")]), _vm._v(" "), _c('div', {
    staticClass: "table-item psc_name"
  }, [_vm._v("狀態")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/desktop-solid_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("全部任務")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/desktop-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("全部任務")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/clipboard-regular_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("待排程")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/clipboard-regular.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("待排程")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/clipboard-check-solid_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("完成任務")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/clipboard-check-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("完成任務")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('i', {
    staticClass: "fas fa-folder-plus"
  }), _vm._v(" "), _c('p', [_vm._v("自訂標籤")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_host dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_host",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_screenone dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_screenone",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_screentwo dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_screentwo",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_telephone dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_telephone",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_canvas dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_canvas",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_other dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_other",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "content_text cell pm_adobe dd_wrap"
  }, [_c('input', {
    staticClass: "dd_wrap",
    attrs: {
      "type": "text",
      "name": "pm_adobe",
      "placeholder": "待填入"
    }
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/users-solid_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("帳號管理")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/users-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("帳號管理")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/door-open-solid_hover.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("權限管理")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_item"
  }, [_c('img', {
    attrs: {
      "src": "/image/door-open-solid.png"
    }
  }), _vm._v(" "), _c('p', [_vm._v("權限管理")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "tag_title user_tag_item"
  }, [_c('h2', {
    staticClass: "user_tag_item"
  }, [_vm._v("編輯人員")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('label', {
    staticClass: "user_tag_item",
    attrs: {
      "for": "ud_name"
    }
  }, [_c('i', {
    staticClass: "far fa-user-plus user_tag_item"
  })])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user_tag_footer user_tag_item"
  }, [_c('div', {
    staticClass: "btn_submit"
  }, [_vm._v("完成")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "prompt_content"
  }, [_c('div', {
    staticClass: "prompt_icon"
  }, [_c('i', {
    staticClass: "fas"
  })]), _vm._v(" "), _c('div', {
    staticClass: "prompt_title"
  }, [_c('h2')])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('span'), _vm._v("s 後自動關閉")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0f46a4b9", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "singlepage"
    },
    on: {
      "click": function($event) {
        _vm.colseIfClickOutside($event), _vm.colseInput($event)
      }
    }
  }, [_c('div', {
    staticClass: "overlay",
    class: _vm.type,
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }), _vm._v(" "), (_vm.type == 'pst' || _vm.type == 'pt') ? _c('div', {
    staticClass: "sp_block pro"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_nav"
  }, [_c('ul', {
    staticClass: "nav_wrap"
  }, [_c('li', {
    class: {
      'current': _vm.project_cate == 1 && _vm.single_title.pt_id == _vm.project_id
    },
    on: {
      "click": function($event) {
        _vm.getProject(_vm.single_title.pt_id), _vm.clickImgToOpenNewTab()
      }
    }
  }, [(!_vm.project.pt_backup) ? _c('i', {
    staticClass: "far fa-square icon_backup"
  }) : _c('i', {
    staticClass: "fas fa-check-square icon_backup"
  }), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.single_title.pt_name))]), _vm._v(" "), (_vm.isadmin) ? _c('i', {
    staticClass: "cursor far fa-trash-alt",
    on: {
      "click": function($event) {
        return _vm.openDeleteProjectPromptBox(_vm.single_title.pt_id, 1)
      }
    }
  }) : _vm._e()]), _vm._v(" "), _vm._l((_vm.single_title_sub), function(title) {
    return (_vm.single_title_sub.length > 0 && _vm.isadmin) ? _c('li', {
      staticClass: "sub_item",
      class: {
        'border_color1': title.psc_id == 1, 'border_color2': title.psc_id == 2, 'border_color3': title.psc_id == 3, 'border_color4': title.psc_id == 4 || title.psc_id == 5, 'border_color5': title.psc_id == 6 || title.psc_id == 7 || title.psc_id == 8, 'border_color6': title.psc_id == 9, 'current': _vm.project_cate == 2 && title.pst_id == _vm.project_id
      },
      attrs: {
        "draggable": "true"
      },
      on: {
        "click": function($event) {
          _vm.getReminderDate(title.pst_id), _vm.getSubProject(title.pst_id), _vm.clickImgToOpenNewTab(), _vm.closeAllDropdownMenu()
        },
        "dragstart": function($event) {
          return _vm.dragToChangeProjectSort("start", title.pt_id, title.pst_id)
        },
        "dragend": function($event) {
          return _vm.dragToChangeProjectSort("end", title.pt_id, title.pst_id)
        },
        "drop": function($event) {
          return _vm.dragToChangeProjectSort("drop", title.pt_id, title.pst_id)
        },
        "dragover": function($event) {
          return _vm.allowDrop($event)
        }
      }
    }, [_c('p', [_vm._v(_vm._s(title.pst_name))]), _vm._v(" "), _c('i', {
      staticClass: "cursor far fa-trash-alt",
      on: {
        "click": function($event) {
          return _vm.openDeleteProjectPromptBox(title.pst_id, 2)
        }
      }
    })]) : _vm._e()
  }), _vm._v(" "), _vm._l((_vm.single_title_sub), function(title) {
    return (_vm.single_title_sub.length > 0 && !_vm.isadmin) ? _c('li', {
      staticClass: "sub_item",
      class: {
        'border_color1': title.psc_id == 1, 'border_color2': title.psc_id == 2, 'border_color3': title.psc_id == 3, 'border_color4': title.psc_id == 4 || title.psc_id == 5, 'border_color5': title.psc_id == 6 || title.psc_id == 7 || title.psc_id == 8, 'border_color6': title.psc_id == 9, 'current': _vm.project_cate == 2 && title.pst_id == _vm.project_id
      },
      on: {
        "click": function($event) {
          _vm.getReminderDate(title.pst_id), _vm.getSubProject(title.pst_id), _vm.clickImgToOpenNewTab(), _vm.closeAllDropdownMenu()
        }
      }
    }, [_c('p', [_vm._v(_vm._s(title.pst_name))])]) : _vm._e()
  })], 2), _vm._v(" "), (_vm.sub_project_input_open && _vm.isadmin) ? _c('div', {
    staticClass: "create_subproject_input"
  }, [_c('textarea', {
    attrs: {
      "name": "pst_name",
      "placeholder": "添加子任務"
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "far fa-times-circle close",
    on: {
      "click": function($event) {
        _vm.sub_project_input_open = false
      }
    }
  }), _c('i', {
    staticClass: "far fa-check-circle check",
    on: {
      "click": function($event) {
        return _vm.createSubProject(_vm.single_title.pt_id)
      }
    }
  })]) : (!_vm.sub_project_input_open && _vm.isadmin) ? _c('div', {
    staticClass: "create_subproject",
    on: {
      "click": function($event) {
        _vm.sub_project_input_open = true
      }
    }
  }, [_vm._v("\n                添加子任務\n            ")]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [_c('div', {
    staticClass: "project_name"
  }, [(_vm.project_cate == 1 && _vm.isadmin) ? _c('p', {
    on: {
      "click": function($event) {
        return _vm.showInput()
      }
    }
  }, [_c('input', {
    staticClass: "none pro_input",
    attrs: {
      "type": "text",
      "name": "pt_name"
    },
    domProps: {
      "value": _vm.project.pt_name
    },
    on: {
      "change": function($event) {
        return _vm.changeProjectName()
      }
    }
  }), _c('span', {
    staticClass: "pro_input"
  }, [_vm._v(_vm._s(_vm.project.pt_name))])]) : (_vm.project_cate == 2 && _vm.isadmin) ? _c('p', {
    on: {
      "click": function($event) {
        return _vm.showInput()
      }
    }
  }, [_c('input', {
    staticClass: "none pro_input",
    attrs: {
      "type": "text",
      "name": "pst_name"
    },
    domProps: {
      "value": _vm.project.pst_name
    },
    on: {
      "change": function($event) {
        return _vm.changeProjectName()
      }
    }
  }), _c('span', {
    staticClass: "pro_input"
  }, [_vm._v(_vm._s(_vm.project.pst_name))])]) : (_vm.project_cate == 1 && !_vm.isadmin) ? _c('p', [_vm._v(_vm._s(_vm.project.pt_name))]) : (_vm.project_cate == 2 && !_vm.isadmin) ? _c('p', [_vm._v(_vm._s(_vm.project.pst_name))]) : _vm._e(), _vm._v(" "), _c('i', {
    staticClass: "fas fa-times close",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "project_creater"
  }, [_c('p', [_vm._v(_vm._s(_vm.project.create_user) + " 在 " + _vm._s(_vm.project.create_date) + " 建立")])]), _vm._v(" "), _c('div', {
    staticClass: "content_nav"
  }, [_c('ul', {
    staticClass: "nav_wrap"
  }, [_c('li', {
    class: {
      'current': _vm.project_nav_open == 'information'
    },
    on: {
      "click": function($event) {
        _vm.project_nav_open = 'information', _vm.resetSinglePage(), _vm.clickImgToOpenNewTab(), _vm.closeAllDropdownMenu()
      }
    }
  }, [_vm._v("任務訊息")]), _vm._v(" "), _c('li', {
    class: {
      'current': _vm.project_nav_open == 'record'
    },
    on: {
      "click": function($event) {
        _vm.project_nav_open = 'record', _vm.resetSinglePage(), _vm.clickImgToOpenNewTab(), _vm.closeAllDropdownMenu()
      }
    }
  }, [_vm._v("紀錄")]), _vm._v(" "), (_vm.project_cate == 1) ? _c('li', {
    class: {
      'current': _vm.project_nav_open == 'backup'
    },
    on: {
      "click": function($event) {
        _vm.project_nav_open = 'backup', _vm.resetSinglePage(), _vm.closeAllDropdownMenu()
      }
    }
  }, [_vm._v("備份")]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [(_vm.project_nav_open == 'information') ? _c('div', {
    staticClass: "information_wrap"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [(_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("里程碑")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]) : _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pmc_name', 'pt_id', _vm.project.pt_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("里程碑")]), _vm._v(" "), (_vm.project.pmc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pmc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定里程碑")]), _vm._v(" "), (_vm.checkToOpen('pmc_name', 'pt_id', _vm.project.pt_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.milestone_cate), function(mile) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.pmc_name == mile.pmc_name
      },
      on: {
        "click": function($event) {
          return _vm.changeMilestone(mile.pmc_id)
        }
      }
    }, [_vm._v(_vm._s(mile.pmc_name))])
  }), 0)]) : _vm._e()]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("需求類別")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]) : _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('prsc_name', 'pt_id', _vm.project.pt_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("需求類別")]), _vm._v(" "), (_vm.project.prsc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.prsc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定類別")]), _vm._v(" "), (_vm.checkToOpen('prsc_name', 'pt_id', _vm.project.pt_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: " infor_ul"
  }, _vm._l((_vm.requiresort_cate), function(require) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.prsc_name == require.prsc_name
      },
      on: {
        "click": function($event) {
          return _vm.changeRequireSort(require.prsc_id)
        }
      }
    }, [_vm._v(_vm._s(require.prsc_name))])
  }), 0)]) : _vm._e()]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('peic_name', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("執行項目")]), _vm._v(" "), (_vm.project.peic_name) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.peic_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定項目")]), _vm._v(" "), (_vm.checkToOpen('peic_name', 'pst_id', _vm.project.pst_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.executeitem_cate), function(item) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.peic_id == item.peic_id
      },
      on: {
        "click": function($event) {
          return _vm.changeExecuteItem(_vm.project_id, item.peic_id)
        }
      }
    }, [_vm._v(_vm._s(item.peic_name))])
  }), 0)]) : _vm._e()]) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("執行項目")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [(_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pst_requiredate', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("確認日期")]), _vm._v(" "), (!_vm.project.pst_requiredate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pst_requiredate))]), _vm._v(" "), (_vm.checkToOpen('pst_requiredate', 'pst_id', _vm.project.pst_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project.pst_id,
      "type": "pst_id",
      "date": _vm.project.pst_requiredate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeRequireDate
    }
  }) : _vm._e()], 1) : _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pt_requiredate', 'pt_id', _vm.project.pt_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("需求日期")]), _vm._v(" "), (!_vm.project.pt_requiredate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pt_requiredate))]), _vm._v(" "), (_vm.checkToOpen('pt_requiredate', 'pt_id', _vm.project.pt_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project.pt_id,
      "type": "pt_id",
      "date": _vm.project.pt_requiredate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeRequireDate
    }
  }) : _vm._e()], 1), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pst_executiondate', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("執行日期")]), _vm._v(" "), (!_vm.project.pst_executiondate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pst_executiondate))]), _vm._v(" "), (_vm.checkToOpen('pst_executiondate', 'pst_id', _vm.project.pst_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project.pst_id,
      "type": "pst_id",
      "date": _vm.project.pst_executiondate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeExecutiondate
    }
  }) : _vm._e()], 1) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("執行日期")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('pst_completiondate', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("完成日期")]), _vm._v(" "), (!_vm.project.pst_completiondate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.pst_completiondate))]), _vm._v(" "), (_vm.checkToOpen('pst_completiondate', 'pst_id', _vm.project.pst_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project.pst_id,
      "type": "pst_id",
      "date": _vm.project.pst_completiondate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeCompletiondate
    }
  }) : _vm._e()], 1) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("完成日期")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [(_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell infor_cell2 dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ud_name', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("執行人")]), _vm._v(" "), (_vm.project.ud_name) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.ud_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定執行人")]), _vm._v(" "), (_vm.checkToOpen('ud_name', 'pst_id', _vm.project.pst_id)) ? _c('div', {
    staticClass: "drop_down_wrap user"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, [_vm._l((_vm.user_cate), function(user) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.ud_id == user.ud_id
      },
      on: {
        "click": function($event) {
          return _vm.changeUser(_vm.project_id, user.ud_id)
        }
      }
    }, [(user.ud_icon) ? _c('img', {
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    }) : _c('img', {
      attrs: {
        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
        "alt": ""
      }
    }), _vm._v("\n                                            " + _vm._s(user.ud_name) + "\n                                        ")])
  }), _vm._v(" "), (_vm.user_cate.length == 0) ? _c('li', {
    staticClass: "infor_li"
  }, [_vm._v("暫無執行人")]) : _vm._e()], 2)]) : _vm._e()]) : _c('div', {
    staticClass: "infor_cell infor_cell2"
  }, [_c('span', [_vm._v("執行人")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('psc_name', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("狀態")]), _vm._v(" "), (_vm.project.psc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.psc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定狀態")]), _vm._v(" "), (_vm.checkToOpen('psc_name', 'pst_id', _vm.project.pst_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.status_cate), function(status) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.psc_id == status.psc_id
      },
      on: {
        "click": function($event) {
          return _vm.changeStatus(_vm.project_id, status.psc_id)
        }
      }
    }, [_vm._v(_vm._s(status.psc_name))])
  }), 0)]) : _vm._e()]) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("狀態")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell dropdown_item border_none",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ppc_name', 'pst_id', _vm.project.pst_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("優先權")]), _vm._v(" "), (_vm.project.ppc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.ppc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定優先權")]), _vm._v(" "), (_vm.checkToOpen('ppc_name', 'pst_id', _vm.project.pst_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.priority_cate), function(pri) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.ppc_name == pri.ppc_name
      },
      on: {
        "click": function($event) {
          return _vm.changePriority(pri.ppc_id)
        }
      }
    }, [_vm._v(_vm._s(pri.ppc_name))])
  }), 0)]) : _vm._e()]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell dropdown_item border_both",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('url_reminderdate', 'url_id', _vm.user_reminderdate.url_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("提醒")]), _vm._v(" "), (_vm.user_reminderdate.url_reminderdate) ? _c('span', {
    staticClass: "content  dropdown_item"
  }, [_vm._v(_vm._s(_vm.removeSecond(_vm.user_reminderdate.url_reminderdate)))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]), _vm._v(" "), (_vm.checkToOpen('url_reminderdate', 'url_id', _vm.user_reminderdate.url_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.user_reminderdate.url_id,
      "type": "url_id",
      "date": _vm.user_reminderdate.url_reminderdate,
      "time": "true"
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeReminderdate
    }
  }) : _vm._e()], 1) : _c('div', {
    staticClass: "infor_cell border_both"
  }, [_c('span', [_vm._v("提醒")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])]), _vm._v(" "), (_vm.project_cate == 2) ? _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("執行時間")]), _vm._v(" "), _c('input', {
    staticClass: "single_input",
    attrs: {
      "type": "text",
      "name": "pst_spendtime",
      "placeholder": "00.00"
    },
    domProps: {
      "value": _vm.project.pst_spendtime
    },
    on: {
      "change": function($event) {
        _vm.isadmin ? _vm.changeSpendTime(_vm.project.pst_id) : false
      }
    }
  })]) : _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("執行時間")]), _vm._v(" "), _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無須設定")])])]), _vm._v(" "), (_vm.project_cate == 1) ? _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('tm_name', 'pt_id', _vm.project.pt_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("標籤")]), _vm._v(" "), (_vm.project.tm_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project.tm_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定標籤")]), _vm._v(" "), (_vm.checkToOpen('tm_name', 'pt_id', _vm.project.pt_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, [_vm._l((_vm.user_tags), function(tag) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.project.tm_name == tag.tm_name
      },
      on: {
        "click": function($event) {
          return _vm.changeTag(tag.tm_id)
        }
      }
    }, [_vm._v(_vm._s(tag.tm_name))])
  }), _vm._v(" "), (_vm.user_tags.length < 1) ? _c('li', {
    staticClass: "infor_li"
  }, [_vm._v("暫無標籤")]) : _vm._e()], 2)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  })]) : _vm._e()]), _vm._v(" "), (!_vm.create_infor_editor_open) ? _c('div', {
    staticClass: "add_new_information",
    on: {
      "click": function($event) {
        _vm.create_infor_editor_open = true, _vm.closeInforEditor(), _vm.fileList = []
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('span', {
    staticClass: "infor_content"
  }, [_vm._v("新增訊息")])]) : _vm._e(), _vm._v(" "), (_vm.create_infor_editor_open) ? _c('div', {
    staticClass: "create_new_information"
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('input', {
    staticClass: "pi_title",
    attrs: {
      "type": "text",
      "name": "pi_title",
      "value": ""
    }
  }), _vm._v(" "), (_vm.create_infor_editor_open) ? _c('vue-html5-editor', {
    attrs: {
      "content": _vm.editor_content,
      "height": 500
    }
  }) : _vm._e(), _vm._v(" "), _c('div', [_c('el-upload', {
    ref: "upload",
    staticClass: "upload-demo",
    attrs: {
      "action": "/uploadfile",
      "multiple": "",
      "name": "newPro",
      "on-preview": _vm.handlePreview,
      "on-remove": _vm.handleRemove,
      "on-change": _vm.handleChange,
      "on-success": _vm.handleSuccess,
      "on-error": _vm.handleError,
      "file-list": _vm.fileList,
      "headers": {
        'X-CSRF-TOKEN': _vm.csrfToken
      },
      "auto-upload": false
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "text"
    }
  }, [_vm._v("上傳檔案")])], 1)], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.create_infor_editor_open) ? _c('div', {
    staticClass: "create_new_information_btn"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        _vm.create_infor_editor_open = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.createInformation()
      }
    }
  }, [_vm._v("確認")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "infor_lists"
  }, _vm._l((_vm.project_infors), function(item) {
    return _c('div', {
      staticClass: "infor_item",
      class: 'infor' + item.pi_id
    }, [_c('div', {
      staticClass: "infor_title"
    }, [_c('div', {
      staticClass: "cursor title_content",
      on: {
        "click": function($event) {
          _vm.project_infor_id != item.pi_id || !_vm.editing ? _vm.openThisInforItem(item.pi_id) : false, _vm.project_infor_id != item.pi_id || !_vm.editing ? _vm.create_infor_editor_open = false : false
        }
      }
    }, [_c('i', {
      staticClass: "fas fa-chevron-circle-down infor_icon"
    }), _vm._v(" "), (_vm.project_infor_id == item.pi_id && _vm.editing) ? _c('input', {
      staticClass: "pi_title",
      attrs: {
        "type": "text",
        "name": "pi_title"
      },
      domProps: {
        "value": item.pi_title
      }
    }) : _c('span', [_vm._v(_vm._s(item.pi_title))])]), _vm._v(" "), _c('div', {
      staticClass: "function_wrap"
    }, [_c('i', {
      staticClass: "cursor far fa-edit",
      on: {
        "click": function($event) {
          _vm.openThisInforEditor(item.pi_id, item.pi_fileurl), _vm.create_infor_editor_open = false
        }
      }
    }), _vm._v(" "), _c('i', {
      staticClass: "cursor far fa-trash-alt",
      on: {
        "click": function($event) {
          _vm.create_infor_editor_open = false, _vm.openDeleteProjectPromptBox(item.pi_id, 3)
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "infor_content"
    }, [_c('div', {
      staticClass: "message",
      domProps: {
        "innerHTML": _vm._s(item.pi_message)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "upload-demo"
    }, [_c('ul', {
      staticClass: "el-upload-list el-upload-list--text"
    }, _vm._l((JSON.parse(item.pi_fileurl)), function(file) {
      return _c('li', {
        staticClass: "el-upload-list__item is-ready",
        on: {
          "click": function($event) {
            return _vm.downloadProFile(item.pi_id, file.name)
          }
        }
      }, [_c('a', {
        staticClass: "el-upload-list__item-name"
      }, [_c('i', {
        staticClass: "el-icon-document"
      }), _vm._v(_vm._s(file.name))])])
    }), 0)]), _vm._v(" "), _c('div', {
      staticClass: "creator"
    }, [_c('div', [_c('span', {
      staticClass: "user"
    }, [_vm._v(_vm._s(item.create_user))]), _c('span', {
      staticClass: "date"
    }, [_vm._v(_vm._s(item.create_date))])])])]), _vm._v(" "), (_vm.project_infor_id == item.pi_id && _vm.editing) ? _c('vue-html5-editor', {
      attrs: {
        "content": item.pi_message,
        "height": 500
      }
    }) : _vm._e(), _vm._v(" "), (_vm.project_infor_id == item.pi_id && _vm.editing) ? _c('div', [_c('el-upload', {
      staticClass: "upload-demo",
      attrs: {
        "action": "/uploadfile",
        "multiple": "",
        "name": "upPro",
        "on-preview": _vm.handlePreview,
        "on-remove": _vm.handleRemove,
        "on-change": _vm.handleChange,
        "on-success": _vm.handleSuccess,
        "on-error": _vm.handleError,
        "file-list": _vm.fileList,
        "headers": {
          'X-CSRF-TOKEN': _vm.csrfToken
        },
        "auto-upload": false
      }
    }, [_c('el-button', {
      attrs: {
        "size": "small",
        "type": "text"
      }
    }, [_vm._v("上傳檔案")])], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.project_infor_id == item.pi_id && _vm.editing) ? _c('div', {
      staticClass: "modify_information_btn"
    }, [_c('div', {
      staticClass: "btn_cancel",
      on: {
        "click": function($event) {
          return _vm.openThisInforItem(item.pi_id)
        }
      }
    }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
      staticClass: "btn_submit",
      on: {
        "click": function($event) {
          return _vm.changeInformation(item.pi_id)
        }
      }
    }, [_vm._v("確認")])]) : _vm._e()], 1)
  }), 0)]) : (_vm.project_nav_open == 'record') ? _c('div', {
    staticClass: "record_wrap"
  }, [(!_vm.create_record_editor_open) ? _c('div', {
    staticClass: "add_new_record",
    on: {
      "click": function($event) {
        _vm.create_record_editor_open = true, _vm.project_infor_id = ''
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('span', {
    staticClass: "record_content"
  }, [_vm._v("新增紀錄")])]) : _vm._e(), _vm._v(" "), (_vm.create_record_editor_open) ? _c('div', {
    staticClass: "create_new_record"
  }, [(_vm.create_record_editor_open) ? _c('vue-html5-editor', {
    attrs: {
      "content": _vm.editor_content,
      "height": 500
    }
  }) : _vm._e()], 1) : _vm._e(), _vm._v(" "), (_vm.create_record_editor_open) ? _c('div', {
    staticClass: "create_new_record_btn"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        _vm.create_record_editor_open = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.createRecord()
      }
    }
  }, [_vm._v("確認")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "record_lists"
  }, _vm._l((_vm.project_records), function(item) {
    return _c('div', {
      staticClass: "record_item",
      class: 'item' + item.pr_id
    }, [_c('div', {
      staticClass: "record_content close"
    }, [_c('div', {
      staticClass: "creator"
    }, [_c('div', {
      staticClass: "creator_wrap"
    }, [_c('span', {
      staticClass: "user"
    }, [_vm._v(_vm._s(item.create_user))]), _c('span', {
      staticClass: "date"
    }, [_vm._v(_vm._s(item.create_date))])]), _vm._v(" "), _c('div', {
      staticClass: "function_wrap"
    }, [_c('i', {
      staticClass: "cursor far fa-trash-alt",
      on: {
        "click": function($event) {
          _vm.create_record_editor_open = false, _vm.openDeleteProjectPromptBox(item.pr_id, 4)
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "message",
      domProps: {
        "innerHTML": _vm._s(item.pr_message)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "view_more",
      on: {
        "click": function($event) {
          return _vm.viewMore(item.pr_id)
        }
      }
    })])])
  }), 0)]) : (_vm.project_nav_open == 'backup') ? _c('div', {
    staticClass: "backup_wrap"
  }, [_c('div', {
    staticClass: "backup_table"
  }, [_c('div', {
    staticClass: "backup_row"
  }, [_c('div', {
    staticClass: "backup_cell"
  }, [_c('span', [_vm._v("備份")]), _vm._v(" "), (_vm.project.pt_backup == 1) ? _c('span', {
    staticClass: "content"
  }, [_c('i', {
    staticClass: "fas fa-check-square icon_backup"
  })]) : (_vm.project.pt_backup == 0) ? _c('span', {
    staticClass: "content"
  }, [_c('i', {
    staticClass: "far fa-square icon_backup"
  })]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "backup_cell"
  }, [_c('span', [_vm._v("日期")]), _vm._v(" "), (_vm.project.pt_backup == 1) ? _c('span', {
    staticClass: "content"
  }, [_vm._v(_vm._s(_vm.project.pt_backupdate))]) : (_vm.project.pt_backup == 0) ? _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("尚未備份")]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "backup_row"
  }, [_c('div', {
    staticClass: "backup_cell backup_cell2"
  }, [_c('span', [_vm._v("備份路徑")]), _vm._v(" "), _c('input', {
    attrs: {
      "type": "text",
      "name": "pt_backupurl",
      "placeholder": "填入備份路徑"
    },
    domProps: {
      "value": _vm.project.pt_backupurl
    },
    on: {
      "change": function($event) {
        return _vm.changeBackupDate(_vm.project.pt_id)
      }
    }
  })])])])]) : _vm._e()])])]) : (_vm.type == 'ai') ? _c('div', {
    staticClass: "sp_block ann"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [(_vm.project_ann.ai_topping == 1) ? _c('i', {
    staticClass: "fas fa-star btn_favor",
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.changeAnnTopping(_vm.project_ann.ai_id, false) : false
      }
    }
  }) : _c('i', {
    staticClass: "far fa-star btn_favor",
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.changeAnnTopping(_vm.project_ann.ai_id, true) : false
      }
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "project_name"
  }, [(_vm.isadmin) ? _c('p', {
    on: {
      "click": function($event) {
        return _vm.showInput()
      }
    }
  }, [_c('input', {
    staticClass: "ann_input none",
    attrs: {
      "type": "text",
      "name": "ai_title"
    },
    domProps: {
      "value": _vm.project_ann.ai_title
    },
    on: {
      "change": function($event) {
        return _vm.changeAnnTitle()
      }
    }
  }), _c('span', {
    staticClass: "ann_input"
  }, [_vm._v(_vm._s(_vm.project_ann.ai_title))])]) : _c('p', [_vm._v(_vm._s(_vm.project_ann.ai_title))]), _vm._v(" "), _c('i', {
    staticClass: "fas fa-times close",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "project_creater"
  }, [_c('p', [_vm._v(_vm._s(_vm.project_ann.create_user) + " 在 " + _vm._s(_vm.project_ann.create_date) + " 建立")])])]), _vm._v(" "), _c('div', {
    staticClass: "content"
  }, [_c('div', {
    staticClass: "information_wrap"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ai_expirydate', 'ai_id', _vm.project_ann.ai_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("到期日")]), _vm._v(" "), (!_vm.project_ann.ai_expirydate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.project_ann.ai_expirydate))]), _vm._v(" "), (_vm.checkToOpen('ai_expirydate', 'ai_id', _vm.project_ann.ai_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.project_ann.ai_id,
      "type": "ai_id",
      "date": _vm.project_ann.ai_expirydate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeAnnExecutiondate
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('url_reminderdate', 'url_id', _vm.user_reminderdate.url_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("提醒")]), _vm._v(" "), (_vm.user_reminderdate.url_reminderdate) ? _c('span', {
    staticClass: "content  dropdown_item"
  }, [_vm._v(_vm._s(_vm.removeSecond(_vm.user_reminderdate.url_reminderdate)))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]), _vm._v(" "), (_vm.checkToOpen('url_reminderdate', 'url_id', _vm.user_reminderdate.url_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.user_reminderdate.url_id,
      "type": "url_id",
      "date": _vm.user_reminderdate.url_reminderdate,
      "time": "true"
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changeReminderdate
    }
  }) : _vm._e()], 1)])]), _vm._v(" "), (!_vm.create_message_editor_open) ? _c('div', {
    staticClass: "add_new_information",
    on: {
      "click": function($event) {
        _vm.create_message_editor_open = true, _vm.closeMessageEditor(), _vm.fileList = []
      }
    }
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('span', {
    staticClass: "infor_content"
  }, [_vm._v("新增訊息")])]) : _vm._e(), _vm._v(" "), (_vm.create_message_editor_open) ? _c('div', {
    staticClass: "create_new_information"
  }, [_c('i', {
    staticClass: "fas fa-plus"
  }), _c('input', {
    staticClass: "am_title",
    attrs: {
      "type": "text",
      "name": "am_title",
      "value": ""
    }
  }), _vm._v(" "), (_vm.create_message_editor_open) ? _c('vue-html5-editor', {
    attrs: {
      "content": _vm.editor_content,
      "height": 500
    }
  }) : _vm._e(), _vm._v(" "), _c('div', [_c('el-upload', {
    ref: "upload",
    staticClass: "upload-demo",
    attrs: {
      "action": "/uploadfile",
      "multiple": "",
      "name": "newAnn",
      "on-preview": _vm.handlePreview,
      "on-remove": _vm.handleRemove,
      "on-change": _vm.handleChange,
      "on-success": _vm.handleSuccess,
      "on-error": _vm.handleError,
      "file-list": _vm.fileList,
      "headers": {
        'X-CSRF-TOKEN': _vm.csrfToken
      },
      "auto-upload": false
    }
  }, [_c('el-button', {
    attrs: {
      "size": "small",
      "type": "text"
    }
  }, [_vm._v("上傳檔案")])], 1)], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.create_message_editor_open) ? _c('div', {
    staticClass: "create_new_information_btn"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        _vm.create_message_editor_open = false
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.createMessage()
      }
    }
  }, [_vm._v("確認")])]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "infor_lists"
  }, _vm._l((_vm.project_ann_messages), function(item) {
    return _c('div', {
      staticClass: "infor_item",
      class: 'item' + item.am_id
    }, [_c('div', {
      staticClass: "infor_title"
    }, [_c('div', {
      staticClass: "cursor title_content",
      on: {
        "click": function($event) {
          _vm.ann_message_id != item.am_id || !_vm.editing ? _vm.openThisMessageItem(item.am_id) : false, _vm.ann_message_id != item.am_id || !_vm.editing ? _vm.create_message_editor_open = false : false
        }
      }
    }, [_c('i', {
      staticClass: "fas fa-chevron-circle-down infor_icon"
    }), _vm._v(" "), (_vm.ann_message_id == item.am_id && _vm.editing) ? _c('input', {
      staticClass: "am_title",
      attrs: {
        "type": "text",
        "name": "am_title"
      },
      domProps: {
        "value": item.am_title
      }
    }) : _c('span', [_vm._v(_vm._s(item.am_title))])]), _vm._v(" "), _c('div', {
      staticClass: "function_wrap"
    }, [_c('i', {
      staticClass: "cursor far fa-edit",
      on: {
        "click": function($event) {
          _vm.openThisMessageEditor(item.am_id, item.am_fileurl), _vm.create_message_editor_open = false
        }
      }
    }), _vm._v(" "), _c('i', {
      staticClass: "cursor far fa-trash-alt",
      on: {
        "click": function($event) {
          _vm.create_message_editor_open = false, _vm.openDeleteAnnPromptBox(item.am_id, 2)
        }
      }
    })])]), _vm._v(" "), _c('div', {
      staticClass: "infor_content"
    }, [_c('div', {
      staticClass: "message",
      domProps: {
        "innerHTML": _vm._s(item.am_message)
      }
    }), _vm._v(" "), _c('div', {
      staticClass: "upload-demo"
    }, [_c('ul', {
      staticClass: "el-upload-list el-upload-list--text"
    }, _vm._l((JSON.parse(item.am_fileurl)), function(file) {
      return _c('li', {
        staticClass: "el-upload-list__item is-ready",
        on: {
          "click": function($event) {
            return _vm.downloadAnnFile(item.am_id, file.name)
          }
        }
      }, [_c('a', {
        staticClass: "el-upload-list__item-name"
      }, [_c('i', {
        staticClass: "el-icon-document"
      }), _vm._v(_vm._s(file.name))])])
    }), 0)]), _vm._v(" "), _c('div', {
      staticClass: "creator"
    }, [_c('div', [_c('span', {
      staticClass: "user"
    }, [_vm._v(_vm._s(item.create_user))]), _c('span', {
      staticClass: "date"
    }, [_vm._v(_vm._s(item.create_date))])])])]), _vm._v(" "), (_vm.ann_message_id == item.am_id && _vm.editing) ? _c('vue-html5-editor', {
      attrs: {
        "content": item.am_message,
        "height": 500
      }
    }) : _vm._e(), _vm._v(" "), (_vm.ann_message_id == item.am_id && _vm.editing) ? _c('div', [_c('el-upload', {
      ref: "upload",
      refInFor: true,
      staticClass: "upload-demo",
      attrs: {
        "action": "/uploadfile",
        "multiple": "",
        "name": "upAnn",
        "on-preview": _vm.handlePreview,
        "on-remove": _vm.handleRemove,
        "on-change": _vm.handleChange,
        "on-success": _vm.handleSuccess,
        "on-error": _vm.handleError,
        "file-list": _vm.fileList,
        "headers": {
          'X-CSRF-TOKEN': _vm.csrfToken
        },
        "auto-upload": false
      }
    }, [_c('el-button', {
      attrs: {
        "size": "small",
        "type": "text"
      }
    }, [_vm._v("上傳檔案")])], 1)], 1) : _vm._e(), _vm._v(" "), (_vm.ann_message_id == item.am_id && _vm.editing) ? _c('div', {
      staticClass: "modify_information_btn"
    }, [_c('div', {
      staticClass: "btn_cancel",
      on: {
        "click": function($event) {
          return _vm.openThisMessageItem(item.am_id)
        }
      }
    }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
      staticClass: "btn_submit",
      on: {
        "click": function($event) {
          return _vm.changeMessage(item.am_id)
        }
      }
    }, [_vm._v("確認")])]) : _vm._e()], 1)
  }), 0)])])])]) : (_vm.type == 'ud') ? _c('div', {
    staticClass: "sp_block ud"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [_c('div', {
    staticClass: "project_name"
  }, [(_vm.isadmin) ? _c('el-upload', {
    staticClass: "user_image_wrap",
    attrs: {
      "action": "",
      "on-change": _vm.getFile,
      "auto-upload": false,
      "show-file-list": false
    }
  }, [(_vm.imageurl) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.imageurl
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })]) : _c('div', {
    staticClass: "user_icon_wrap"
  }, [_c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.imageurl
    }
  })]), _vm._v(" "), (_vm.user_id) ? _c('p', [_vm._v("修改帳號")]) : _c('p', [_vm._v("新增帳號")]), _vm._v(" "), (_vm.user_id) ? _c('p', {
    staticClass: "creater"
  }, [_vm._v(_vm._s(_vm.user_data.create_user) + " 在 " + _vm._s(_vm.user_data.create_date) + " 建立")]) : _vm._e()], 1)]), _vm._v(" "), _c('div', {
    staticClass: "content overflow",
    class: {
      'create': !_vm.user_id, 'modify': _vm.user_id
    }
  }, [_c('div', {
    staticClass: "account_infor_wrap"
  }, [_vm._m(0), _vm._v(" "), _c('div', {
    staticClass: "account_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("帳號")]), _vm._v(" "), (!_vm.user_id) ? _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_account),
      expression: "user_data.ud_account"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_account)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_account", $event.target.value)
      }
    }
  })]) : _c('span', {
    staticClass: "content"
  }, [_vm._v(_vm._s(_vm.user_data.ud_account))])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("啟/停用")]), _vm._v(" "), (_vm.user_data.ud_status == 1) ? _c('span', {
    staticClass: "btn green",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.changeUserStatus(_vm.user_data.ud_id, _vm.user_data.ud_status) : false
      }
    }
  }, [_vm._v("啟用中")]) : (_vm.user_data.ud_status == 0) ? _c('span', {
    staticClass: "btn red",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.changeUserStatus(_vm.user_data.ud_id, _vm.user_data.ud_status) : false
      }
    }
  }, [_vm._v("停用中")]) : _vm._e(), _vm._v(" "), (!_vm.user_id) ? _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("新增無效用")]) : _vm._e()])])])])]), _vm._v(" "), _c('div', {
    staticClass: "password_infor_wrap"
  }, [_vm._m(1), _vm._v(" "), _c('div', {
    staticClass: "password_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("密碼")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_password),
      expression: "user_data.ud_password"
    }],
    attrs: {
      "type": "password",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_password)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_password", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("確認密碼")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_password_confirm),
      expression: "user_data.ud_password_confirm"
    }],
    attrs: {
      "type": "password",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_password_confirm)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_password_confirm", $event.target.value)
      }
    }
  })])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "user_infor_wrap"
  }, [_vm._m(2), _vm._v(" "), _c('div', {
    staticClass: "user_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("使用者名稱")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_name),
      expression: "user_data.ud_name"
    }],
    attrs: {
      "type": "text",
      "placeholder": "請輸入使用者名稱"
    },
    domProps: {
      "value": (_vm.user_data.ud_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_name", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("年資")]), _vm._v(" "), (_vm.user_data.ud_code) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("滿" + _vm._s(_vm.showSeniority(_vm.user_data.ud_code)) + "年")]) : _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無法計算")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("員工代號")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_code),
      expression: "user_data.ud_code"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_code)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_code", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("信箱")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_mail),
      expression: "user_data.ud_mail"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_mail)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_mail", $event.target.value)
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("市話")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_tel),
      expression: "user_data.ud_tel"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_tel)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_tel", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("手機")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_mobile),
      expression: "user_data.ud_mobile"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_mobile)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_mobile", $event.target.value)
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("緊急聯絡人")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_emercontactname),
      expression: "user_data.ud_emercontactname"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_emercontactname)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_emercontactname", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("聯絡人電話")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.user_data.ud_emercontactphone),
      expression: "user_data.ud_emercontactphone"
    }],
    attrs: {
      "type": "text",
      "placeholder": "待填入"
    },
    domProps: {
      "value": (_vm.user_data.ud_emercontactphone)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.user_data, "ud_emercontactphone", $event.target.value)
      }
    }
  })])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell",
    class: {
      'cursor': _vm.isadmin, 'dropdown_item': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ut_name', 'ut_id', _vm.user_data.ut_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("部門")]), _vm._v(" "), (_vm.user_data.ut_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.user_data.ut_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('ut_name', 'ut_id', _vm.user_data.ut_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.type_cate), function(type) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.user_data.ut_id == type.ut_id
      },
      on: {
        "click": function($event) {
          _vm.user_data.ut_id = type.ut_id, _vm.user_data.ut_name = type.ut_name
        }
      }
    }, [_vm._v(_vm._s(type.ut_name))])
  }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell",
    class: {
      'cursor': _vm.isadmin, 'dropdown_item': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ug_name', 'ug_id', _vm.user_data.ug_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("群組")]), _vm._v(" "), (_vm.user_data.ug_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.user_data.ug_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('ug_name', 'ug_id', _vm.user_data.ug_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.group_cate), function(group) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.user_data.ug_id == group.ug_id
      },
      on: {
        "click": function($event) {
          _vm.user_data.ug_id = group.ug_id, _vm.user_data.ug_name = group.ug_name
        }
      }
    }, [_vm._v(_vm._s(group.ug_name))])
  }), 0)]) : _vm._e()])])])])]), _vm._v(" "), _c('div', {
    staticClass: "auth_infor_wrap"
  }, [_vm._m(3), _vm._v(" "), _c('div', {
    staticClass: "auth_infor_container"
  }, [_c('div', {
    staticClass: "auth_level",
    class: {
      'cursor': _vm.isadmin, 'dropdown_item': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('al_name', 'al_id', _vm.user_data.al_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("權限等級")]), _vm._v(" "), (_vm.user_data.al_name) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.user_data.al_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('al_name', 'al_id', _vm.user_data.al_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, [(_vm.auths.length < 1) ? _c('li', {
    staticClass: "infor_li"
  }, [_vm._v("請新增權限等級")]) : _vm._e(), _vm._v(" "), _vm._l((_vm.auths), function(auth) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.user_data.al_id == auth.al_id
      },
      on: {
        "click": function($event) {
          return _vm.selectAuth(auth)
        }
      }
    }, [_vm._v(_vm._s(auth.al_name))])
  })], 2)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "auth_remark"
  }, [_c('span', [_vm._v("備註")]), _vm._v(" "), (_vm.user_data.al_remark) ? _c('span', {
    staticClass: "content"
  }, [_vm._v(_vm._s(_vm.user_data.al_remark))]) : _c('span', {
    staticClass: "content unfilled"
  }, [_vm._v("無")])]), _vm._v(" "), (_vm.user_data.al_id) ? _c('div', {
    staticClass: "auth_detail"
  }, [_c('div', {
    staticClass: "auth_item"
  }, [_c('span', [_vm._v("專案權限")]), _vm._v(" "), (_vm.user_data.pt_admin) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("可編輯")]) : _c('span', {
    staticClass: "content"
  }, [_vm._v("僅查看")])]), _vm._v(" "), _c('div', {
    staticClass: "auth_item"
  }, [_c('span', [_vm._v("公告權限")]), _vm._v(" "), (_vm.user_data.ai_admin) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("可編輯")]) : _c('span', {
    staticClass: "content"
  }, [_vm._v("僅查看")])]), _vm._v(" "), _c('div', {
    staticClass: "auth_item"
  }, [_c('span', [_vm._v("資產權限")]), _vm._v(" "), (_vm.user_data.pm_admin) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("可編輯")]) : _c('span', {
    staticClass: "content"
  }, [_vm._v("僅查看")])]), _vm._v(" "), _c('div', {
    staticClass: "auth_item"
  }, [_c('span', [_vm._v("書籍權限")]), _vm._v(" "), (_vm.user_data.bi_admin) ? _c('span', {
    staticClass: "content"
  }, [_vm._v("可編輯")]) : _c('span', {
    staticClass: "content"
  }, [_vm._v("僅查看")])])]) : _vm._e()])])]), _vm._v(" "), _c('div', {
    staticClass: "content_footer"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.changeUserData()
      }
    }
  }, [_vm._v("確認")])])])]) : (_vm.type == 'al') ? _c('div', {
    staticClass: "sp_block al"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [_c('div', {
    staticClass: "project_name"
  }, [(_vm.auth_id) ? _c('p', [_vm._v("修改權限等級")]) : _c('p', [_vm._v("新增權限等級")])]), _vm._v(" "), (_vm.auth_level.create_user) ? _c('div', {
    staticClass: "project_creater"
  }, [_c('p', [_vm._v(_vm._s(_vm.auth_level.create_user) + " 在 " + _vm._s(_vm.auth_level.create_date) + " 建立")])]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "content overflow",
    class: {
      'create': !_vm.auth_id, 'modify': _vm.auth_id
    }
  }, [_c('div', {
    staticClass: "auth_infor_wrap"
  }, [_vm._m(4), _vm._v(" "), _c('div', {
    staticClass: "auth_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("權限名稱")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.al_name),
      expression: "auth_level.al_name"
    }],
    attrs: {
      "type": "text",
      "name": "al_name",
      "placeholder": "請輸入權限名稱"
    },
    domProps: {
      "value": (_vm.auth_level.al_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.auth_level, "al_name", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  })]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell x2"
  }, [_c('span', {}, [_vm._v("備註")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.al_remark),
      expression: "auth_level.al_remark"
    }],
    attrs: {
      "type": "text",
      "name": "al_remark",
      "placeholder": "填入備註"
    },
    domProps: {
      "value": (_vm.auth_level.al_remark)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.auth_level, "al_remark", $event.target.value)
      }
    }
  })])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "auth_level_wrap"
  }, [_vm._m(5), _vm._v(" "), _c('div', {
    staticClass: "auth_level_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("專案權限")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.pt_admin),
      expression: "auth_level.pt_admin"
    }],
    attrs: {
      "id": "pt1",
      "type": "radio",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.pt_admin, "1")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "pt_admin", "1")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "pt1"
    }
  }, [_vm._v("可編輯")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.pt_admin),
      expression: "auth_level.pt_admin"
    }],
    attrs: {
      "id": "pt2",
      "type": "radio",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.pt_admin, "0")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "pt_admin", "0")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "pt2"
    }
  }, [_vm._v("僅查看")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("公告權限")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.ai_admin),
      expression: "auth_level.ai_admin"
    }],
    attrs: {
      "id": "ai1",
      "type": "radio",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.ai_admin, "1")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "ai_admin", "1")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "ai1"
    }
  }, [_vm._v("可編輯")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.ai_admin),
      expression: "auth_level.ai_admin"
    }],
    attrs: {
      "id": "ai2",
      "type": "radio",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.ai_admin, "0")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "ai_admin", "0")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "ai2"
    }
  }, [_vm._v("僅查看")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("資產權限")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.pm_admin),
      expression: "auth_level.pm_admin"
    }],
    attrs: {
      "id": "pm1",
      "type": "radio",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.pm_admin, "1")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "pm_admin", "1")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "pm1"
    }
  }, [_vm._v("可編輯")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.pm_admin),
      expression: "auth_level.pm_admin"
    }],
    attrs: {
      "id": "pm2",
      "type": "radio",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.pm_admin, "0")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "pm_admin", "0")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "pm2"
    }
  }, [_vm._v("僅查看")])])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell"
  }, [_c('span', [_vm._v("書籍權限")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.bi_admin),
      expression: "auth_level.bi_admin"
    }],
    attrs: {
      "id": "bi1",
      "type": "radio",
      "value": "1"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.bi_admin, "1")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "bi_admin", "1")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "bi1"
    }
  }, [_vm._v("可編輯")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.auth_level.bi_admin),
      expression: "auth_level.bi_admin"
    }],
    attrs: {
      "id": "bi0",
      "type": "radio",
      "value": "0"
    },
    domProps: {
      "checked": _vm._q(_vm.auth_level.bi_admin, "0")
    },
    on: {
      "change": function($event) {
        return _vm.$set(_vm.auth_level, "bi_admin", "0")
      }
    }
  }), _c('label', {
    attrs: {
      "for": "bi0"
    }
  }, [_vm._v("僅查看")])])])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "content_footer"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.changeAuthorityLevel()
      }
    }
  }, [_vm._v("確認")])])])]) : (_vm.type == 'bi') ? _c('div', {
    staticClass: "sp_block bi"
  }, [(_vm.sub_loading) ? _c('div', {
    staticClass: "sub_loading_block"
  }, [_c('img', {
    attrs: {
      "src": "/image/loading.svg",
      "alt": ""
    }
  })]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sp_content"
  }, [_c('div', {
    staticClass: "content_title"
  }, [_c('div', {
    staticClass: "project_name"
  }, [_c('el-upload', {
    staticClass: "book_image_wrap",
    attrs: {
      "action": "",
      "on-change": _vm.getFile,
      "auto-upload": false,
      "show-file-list": false
    }
  }, [(_vm.imageurl) ? _c('img', {
    staticClass: "avatar",
    attrs: {
      "src": _vm.imageurl
    }
  }) : _c('i', {
    staticClass: "el-icon-plus avatar-uploader-icon"
  })]), _vm._v(" "), (_vm.book_data.bi_name) ? _c('p', [_vm._v(_vm._s(_vm.book_data.bi_name))]) : _c('p', [_vm._v("設定書籍名稱")]), _vm._v(" "), (_vm.book_id) ? _c('p', {
    staticClass: "creater"
  }, [_vm._v(_vm._s(_vm.book_data.create_user) + " 在 " + _vm._s(_vm.book_data.create_date) + " 建立")]) : _vm._e(), _vm._v(" "), _c('i', {
    staticClass: "fas fa-times close",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }), _vm._v(" "), _c('i', {
    staticClass: "cursor far fa-trash-alt delete",
    on: {
      "click": function($event) {
        return _vm.openDeleteAnnPromptBox(_vm.book_data.bi_id, 4)
      }
    }
  })], 1)]), _vm._v(" "), _c('div', {
    staticClass: "content overflow",
    class: {
      'create': !_vm.book_id, 'modify': _vm.book_id
    }
  }, [_c('div', {
    staticClass: "book_infor_wrap"
  }, [_c('div', {
    staticClass: "book_infor_container"
  }, [_c('div', {
    staticClass: "infor_table"
  }, [_c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell"
  }, [_c('span', {}, [_vm._v("書籍名稱")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.book_data.bi_name),
      expression: "book_data.bi_name"
    }],
    attrs: {
      "type": "text",
      "placeholder": "設定書籍名稱"
    },
    domProps: {
      "value": (_vm.book_data.bi_name)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.book_data, "bi_name", $event.target.value)
      }
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell dropdown_item",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('bs_id', 'bi_id', _vm.book_data.bs_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("分類")]), _vm._v(" "), (_vm.book_data.bs_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.book_data.bs_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('bs_id', 'bi_id', _vm.book_data.bs_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.book_sort), function(sort) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.book_data.bs_id == sort.bs_id
      },
      on: {
        "click": function($event) {
          _vm.book_data.bs_id = sort.bs_id, _vm.book_data.bs_name = sort.bs_name
        }
      }
    }, [_vm._v(_vm._s(sort.bs_name))])
  }), 0)]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell dropdown_item x3",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('bi_purchasedate', 'bi_id', _vm.book_data.bi_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("進貨日期")]), _vm._v(" "), (!_vm.book_data.bi_purchasedate) ? _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定日期")]) : _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.book_data.bi_purchasedate))]), _vm._v(" "), (_vm.checkToOpen('bi_purchasedate', 'bi_id', _vm.book_data.bi_id)) ? _c('datetimepicker', {
    attrs: {
      "id": _vm.book_data.bi_id,
      "type": "bi_id",
      "date": _vm.book_data.bi_purchasedate
    },
    on: {
      "get-close": _vm.closeDateTimePicker,
      "get-newdate": _vm.changePurchaseDate
    }
  }) : _vm._e()], 1), _vm._v(" "), _c('div', {
    staticClass: "infor_cell dropdown_item x3",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('ud_name', 'bi_id', _vm.book_data.bi_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("資產")]), _vm._v(" "), (_vm.book_data.ud_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.book_data.ud_name))]) : (_vm.book_data.ud_id == 0) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v("公司")]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("設定資產")]), _vm._v(" "), (_vm.checkToOpen('ud_name', 'bi_id', _vm.book_data.bi_id)) ? _c('div', {
    staticClass: "drop_down_wrap user"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.user_cate), function(user) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.book_data.ud_id == user.ud_id
      },
      on: {
        "click": function($event) {
          return _vm.changeBookUser(user.ud_id, user.ud_name)
        }
      }
    }, [(user.ud_icon) ? _c('img', {
      attrs: {
        "src": user.ud_icon,
        "alt": ""
      }
    }) : _c('img', {
      attrs: {
        "src": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAATlBMVEVHcEzd3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d3d27u7vMzMzDw8O/v7/U1NTX19e9vb3Q0NDS0tLb29vZ2dnIyMjGxsbKysrOzs7BwcHScvTpAAAACnRSTlMAsND/QMAgkHDgm7aKLgAAAjhJREFUeNrt3GlzwiAQBuAonpwGyPX//2hrYmyM8YCYXZzu+02mUx8QAtsOZlmX3WF1ZIA5rg67bJjNliFku/kT7BlS9r1gzdCyRh6D6zhsGGrO82GLS9j+rkaGnF12wCYcshU2YZUdsQnHjKGHCEQgAhGIQAQiEIEIRCACEYiAQTDaWm3wCL5QvI0qPArBFXyQwsETzInf5GSgCWNBvCGW4HuBklL1Bg9KkJcZ0PbcXGaFhCTkXbd1/1p3g5IDEtT4w++mhoIjmLbP9bCpbpsMGEFMdLkdGAFGKM9vV922Vee2EozQrgd722Zj18QMgr5t0/gEjFEQE1NU/qcVYe6fhTnwcyGBp+Olz+pqMAp8j+iGgZ9Ee1ZyotulGtDN+npiacqymXdmiT415fwuOYMlMDs+O1r4E7SXQ4GMPsbPqiN02QNKjVdN6VqIWs/6Fd9bUzor5CjCOkCCL/hk4irLCIKr+MNUDoJgGv4kjVmecF9Lzq0sQwmuLyBLYfUgVvTPCOUWJsjHE89HVpaBhPzphpRHbVeBhO5jeLghWR5xdsoiBkG8ONcGDkMYoXzZSRVe1oURXvexG6flCG3Nxp8uOscnCq0PEuo31py8+8vDRwlioqYfpwouqsIJYv7PEIEInyIo+TQKgPBOiLAswav3BMovRjhXMG8ksKah/1MSgQhEIAIRiEAEIhCBCEQgwrcSErjGl8BlxgSudCZwsTWB670pXHJO4Kp3ChfeU7j2n8KXH+B+BcQPVOvnTb6pMSwAAAAASUVORK5CYII=",
        "alt": ""
      }
    }), _vm._v("\n                                                " + _vm._s(user.ud_name) + "\n                                            ")])
  }), 0)]) : _vm._e()]), _vm._v(" "), _c('div', {
    staticClass: "infor_cell dropdown_item x3",
    class: {
      'cursor': _vm.isadmin
    },
    on: {
      "click": function($event) {
        _vm.isadmin ? _vm.openDropdownMenu('bsc_id', 'bi_id', _vm.book_data.bsc_id, $event) : false
      }
    }
  }, [_c('span', {
    staticClass: "dropdown_item"
  }, [_vm._v("狀態")]), _vm._v(" "), (_vm.book_data.bsc_id) ? _c('span', {
    staticClass: "content dropdown_item"
  }, [_vm._v(_vm._s(_vm.book_data.bsc_name))]) : _c('span', {
    staticClass: "content unfilled dropdown_item"
  }, [_vm._v("請選擇")]), _vm._v(" "), (_vm.checkToOpen('bsc_id', 'bi_id', _vm.book_data.bsc_id)) ? _c('div', {
    staticClass: "drop_down_wrap"
  }, [_c('ul', {
    staticClass: "infor_ul"
  }, _vm._l((_vm.book_status), function(status) {
    return _c('li', {
      staticClass: "infor_li",
      class: {
        'current': _vm.book_data.bsc_id == status.bsc_id
      },
      on: {
        "click": function($event) {
          _vm.book_data.bsc_id = status.bsc_id, _vm.book_data.bsc_name = status.bsc_name
        }
      }
    }, [_vm._v(_vm._s(status.bsc_name))])
  }), 0)]) : _vm._e()])]), _vm._v(" "), _c('div', {
    staticClass: "infor_row"
  }, [_c('div', {
    staticClass: "infor_cell x1"
  }, [_c('span', {}, [_vm._v("書籍內容")]), _vm._v(" "), _c('span', {
    staticClass: "content"
  }, [_c('textarea', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.book_data.bi_message),
      expression: "book_data.bi_message"
    }],
    attrs: {
      "name": "bi_message",
      "cols": "30",
      "rows": "10"
    },
    domProps: {
      "value": (_vm.book_data.bi_message)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.$set(_vm.book_data, "bi_message", $event.target.value)
      }
    }
  })])])])])])])]), _vm._v(" "), _c('div', {
    staticClass: "content_footer"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closeNowPage()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.changeBook()
      }
    }
  }, [_vm._v("確認")])])])]) : _vm._e(), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.prompt_box_open),
      expression: "prompt_box_open"
    }],
    staticClass: "prompt_wrap"
  }, [_c('div', {
    staticClass: "prompt_box"
  }, [_vm._m(6), _vm._v(" "), _c('div', {
    staticClass: "prompt_btn_group"
  }, [_c('div', {
    staticClass: "btn_cancel",
    on: {
      "click": function($event) {
        return _vm.closePrompt()
      }
    }
  }, [_vm._v("取消")]), _vm._v(" "), (_vm.show_submit_btn) ? _c('div', {
    staticClass: "btn_submit",
    on: {
      "click": function($event) {
        return _vm.deleteProject()
      }
    }
  }, [_vm._v("確認")]) : _c('div', {
    staticClass: "btn_submit"
  }, [_vm._v("確認")]), _vm._v(" "), _vm._m(7)])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "account_infor_header"
  }, [_c('p', [_vm._v("員工帳號")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "password_infor_header"
  }, [_c('p', [_vm._v("員工密碼")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user_infor_header"
  }, [_c('p', [_vm._v("員工資訊")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "auth_infor_header"
  }, [_c('p', [_vm._v("權限資訊")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "auth_infor_header"
  }, [_c('p', [_vm._v("權限資訊")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "auth_level_header"
  }, [_c('p', [_vm._v("權限等級")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "prompt_content"
  }, [_c('div', {
    staticClass: "prompt_icon"
  }, [_c('i', {
    staticClass: "fas"
  })]), _vm._v(" "), _c('div', {
    staticClass: "prompt_title"
  }, [_c('h2')])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('p', [_c('span'), _vm._v("s 後自動關閉")])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2dac10a2", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "reminderwrap"
    }
  })
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-7d4bba47", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    style: (_vm.stylelist),
    attrs: {
      "id": "hoverwrap"
    }
  }, [_c('div', {
    staticClass: "title"
  }, [_c('span', [_vm._v(_vm._s(_vm.title))])]), _vm._v(" "), _c('div', {
    staticClass: "subtitle"
  }, [_c('i', {
    staticClass: "fas fa-long-arrow-alt-right",
    attrs: {
      "title": "子專案標題"
    }
  }), _c('span', [_vm._v(_vm._s(_vm.subtitle))])]), _vm._v(" "), _c('div', {
    staticClass: "user"
  }, [_c('i', {
    staticClass: "fas fa-running"
  }), _c('span', [_vm._v("執行人：")]), _c('span', [_vm._v(_vm._s(_vm.user))])]), _vm._v(" "), _c('div', {
    staticClass: "date"
  }, [_c('i', {
    staticClass: "fas fa-calendar-day"
  }), _c('span', [_vm._v("執行日期：")]), _c('span', [_vm._v(_vm._s(_vm.date))])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-f53e4bea", module.exports)
  }
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(9);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3eac1cd6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-077da1d8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Datetimepicker.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-077da1d8\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Datetimepicker.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(10);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("837a958e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0f46a4b9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-0f46a4b9\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(11);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("44be28d4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2dac10a2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Singlepage.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-2dac10a2\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Singlepage.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(12);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3b0a3368", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7d4bba47\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Reminderwrap.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-7d4bba47\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Reminderwrap.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(13);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("75378808", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f53e4bea\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Hoverwrap.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-f53e4bea\",\"scoped\":true,\"hasInlineConfig\":true}!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Hoverwrap.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 28 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Index__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_Index___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__pages_Index__);
// 匯入 Index.vue 檔，不需加副檔名


/* harmony default export */ __webpack_exports__["default"] = ({});

/***/ }),
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(40);


/***/ })
/******/ ]);