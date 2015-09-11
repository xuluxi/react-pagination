/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var React = __webpack_require__(1);
	var Pagination = __webpack_require__(2);

	__webpack_require__(3);


	window.onload = function() {

	    var demo1 = document.getElementById('demo1');
	    var demo2 = document.getElementById('demo2');
	    var p1 = document.getElementById('page-content1');
	    var p2 = document.getElementById('page-content2');

	    function changePage1(page) {
	        p1.innerText = 'page'+page;
	    };

	    function changePage2(page) {
	        p2.innerText = 'page'+page;
	    };

	    React.render(React.createElement(Pagination, {
	      totalPage:  100, 
	      selectPage:  changePage1 }
	      ), demo1);

	    React.render(React.createElement(Pagination, {
	      totalPage:  6, 
	      selectPage:  changePage2 }
	      ), demo2);
	};


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*
	* 分页模块
	*/
	'use strict'
	var React = __webpack_require__(1);

	var Pagination = React.createClass({displayName: "Pagination",
	    propTypes : {
	        totalPage : React.PropTypes.number.isRequired,
	        selectPage : React.PropTypes.func.isRequired
	    },
	    getInitialState : function() {
	        return {
	            current : 1
	        }
	    },
	    _renderPaginate : function(current) {
	        var totalPage = this.props.totalPage;
	        var pageArr = [];
	        var pageCont = [];
	        if (totalPage <= 7) {
	            for (var p=1;p<=totalPage;p++) {
	                pageArr.push({
	                    page : p,
	                    currentPage : (p === current)
	                });
	            };
	        } else {
	            if (current < 4) {
	                for (var p=1;p<=6;p++) {
	                    pageArr.push({
	                        page : p,
	                        currentPage : (p === current)
	                    });
	                };
	                pageArr.push({
	                    page : '...',
	                    dot : true,
	                    currentPage : false
	                });
	                pageArr.push({
	                    page : totalPage,
	                    currentPage : false
	                });
	            } else {
	                if ((current - 3) <= 1) {
	                    for (var i=1;i<=current;i++) {
	                        pageArr.push({
	                            page : i,
	                            currentPage : (i === current)
	                        });
	                    };
	                } else {
	                    pageArr.push({
	                        page : 1,
	                        currentPage : false
	                    });
	                    pageArr.push({
	                        page : '...',
	                        dot : true,
	                        currentPage : false
	                    });
	                    if ((totalPage - current) >= 3) {
	                        for (var j=(current-2); j <= current;j++) {
	                            pageArr.push({
	                                page : j,
	                                currentPage : (j === current)
	                            });
	                        }
	                    } else {
	                        for (var j=(current-(5-(totalPage-current))); j <= current;j++) {
	                            pageArr.push({
	                                page : j,
	                                currentPage : (j === current)
	                            });
	                        }
	                    }
	                };
	                if ((current + 3) >= totalPage) {
	                    for (var m = (current+1);m <= totalPage;m++) {
	                        pageArr.push({
	                            page : m,
	                            currentPage : false
	                        });
	                    };
	                } else {
	                    for (var n = (current+1);n <= (current+2);n++) {
	                        pageArr.push({
	                            page : n,
	                            currentPage : false
	                        });
	                    };
	                    pageArr.push({
	                        page : '...',
	                        dot : true,
	                        currentPage : false
	                    });
	                    pageArr.push({
	                        page : totalPage,
	                        currentPage : false
	                    });
	                };
	            }
	        }
	        pageCont = pageArr.map(function(item,index) {
	            var pageClass = item.dot ? 'paginate-dot' : '';
	            pageClass += item.currentPage ? ' paginate-current' : '';
	            return React.createElement("li", {className:  pageClass, key:  index },  item.page);
	        });
	        return pageCont;
	    },
	    _handlePageClick : function(e) {
	        var target = e.target;
	        if (target.tagName !== 'LI' || /paginate-current/.test(target.className) || /paginate-dot/.test(target.className)) return;
	        var page = parseInt(target.innerHTML);
	        this.setState({
	            current : page
	        });
	        this.props.selectPage(page);
	    },
	    _handlePrevClick : function() {
	        var current = parseInt(this.state.current);
	        if (current === 1) return; 
	        this.setState({
	            current : (current - 1)
	        });
	        this.props.selectPage(current - 1);
	    },
	    _handleNextClick : function() {
	        var current = parseInt(this.state.current);
	        if (current === this.props.totalPage) return; 
	        this.setState({
	            current : (current + 1)
	        });
	        this.props.selectPage(current + 1);
	    },
	    render : function() {
	        var paginate = this._renderPaginate(this.state.current);
	        var prevClass = (this.state.current === 1) ? 'prev-page unavailable' : 'prev-page';
	        var nextClass = (this.state.current === this.props.totalPage) ? 'next-page unavailable' : 'next-page';
	        return (
	            React.createElement("div", {id: "pagination"}, 
	                React.createElement("span", {className:  nextClass, onClick:  this._handleNextClick}, "next", React.createElement("i", null)), 
	                React.createElement("ul", {onClick:  this._handlePageClick},  paginate ), 
	                React.createElement("span", {className:  prevClass, onClick:  this._handlePrevClick}, React.createElement("i", null), "prev")
	            )
	        )
	    }
	});
	module.exports = Pagination;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(4);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(6)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js!./pagination.css", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js!./pagination.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(5)();
	// imports


	// module
	exports.push([module.id, "// 分页组件样式\n#pagination {\n    background-color:#fbfbfb;\n    height:54px;\n    padding-top:15px;\n}\n#pagination ul {\n    list-style:none;\n    display:inline-block;\n    float:right;\n    padding:0;\n    margin:0;\n}\n#pagination ul li{\n    display:inline-block;\n    width:32px;\n    height:32px;\n    line-height:32px;\n    text-align:center;\n    border:1px solid #ddd;\n    border-radius:2px;\n    color:#00a2ea;\n    margin-right:4px;\n    cursor:pointer;\n}\n#pagination .paginate-current {\n    background-color:#00a2ea;\n    color:#fff;\n}\n#pagination .paginate-dot {\n    border:none;\n    cursor:default;\n}\n#pagination .next-page,#pagination .prev-page {\n    display:inline-block;\n    float:right;\n    width:64px;\n    height:32px;\n    line-height:32px;\n    text-align:center;\n    border:1px solid #ddd;\n    cursor:pointer;\n    color:#00a2ea;\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n}\n#pagination .next-page i,#pagination .prev-page i{\n    display:inline-block;\n    border:5px solid transparent;\n}\n#pagination .next-page i{\n    border-left:5px solid #00a2ea;\n    margin-left:4px;\n}\n#pagination .prev-page {\n    margin-right:4px;\n}\n#pagination .prev-page i{\n    border-right:5px solid #00a2ea;\n    margin-right:4px;\n}\n#pagination .unavailable {\n    cursor:default;\n    color:#ddd;\n}\n#pagination .unavailable.next-page i{\n    border-left:5px solid #ddd;\n}\n#pagination .unavailable.prev-page i{\n    border-right:5px solid #ddd;\n}\n", ""]);

	// exports


/***/ },
/* 5 */
/***/ function(module, exports) {

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}

	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);