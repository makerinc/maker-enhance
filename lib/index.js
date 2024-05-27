"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function isBrowser() {
  return typeof window !== "undefined";
}
var MakerEnhance = exports["default"] = /*#__PURE__*/function (_React$Component) {
  function MakerEnhance(props) {
    var _this;
    _classCallCheck(this, MakerEnhance);
    _this = _callSuper(this, MakerEnhance, [props]);
    _this.state = {
      url: isBrowser() && window.location.href
    };
    return _this;
  }
  _inherits(MakerEnhance, _React$Component);
  return _createClass(MakerEnhance, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.addScript();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var urlUpdated = false;
      if (isBrowser() && window.location.href !== this.state.url) {
        this.updateUrl();
        urlUpdated = true;
      }
      if (this.props.index !== prevProps.index || urlUpdated) {
        this.run();
      }
    }
  }, {
    key: "updateUrl",
    value: function updateUrl() {
      this.setState({
        url: isBrowser() && window.location.href
      });
    }
  }, {
    key: "addScript",
    value: function addScript() {
      if (!isBrowser() || !this.props.user || window.MakerEmbeds) {
        return this.run();
      }
      var script = document.createElement("script");
      script.id = "maker-enhance-script";
      script.src = this.script;
      script.async = true;
      document.head.appendChild(script);
    }
  }, {
    key: "script",
    get: function get() {
      return "https://app.maker.co/enhance/".concat(this.props.user, ".js");
    }
  }, {
    key: "run",
    value: function run() {
      if (!isBrowser() || typeof (window.MakerEmbeds || {}).run !== "function") {
        return;
      }
      window.MakerEmbeds.run();
    }
  }, {
    key: "render",
    value: function render() {
      var index = this.props.index || 0;
      var html = "\n      <script src=\"".concat(this.script, "\" id=\"maker-enhance-script\" async=\"true\"></script>\n      <div\n        id=\"js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-").concat(index, "\"\n        class=\"js-maker-enhance-static-mount\"\n        style=\"height:auto;width:100%\"\n        ").concat(this.props.loadingHeight ? "data-loading-height=\"".concat(this.props.loadingHeight, "\"") : "", "\n      ></div>\n    ");

      // https://github.com/facebook/react/issues/10923#issuecomment-338715787
      // "We won't try to manipulate the tree of a dangerouslySetInnerHTML node on the client. Even if it is wrong."
      //
      // Use dangerouslySetInnerHTML to avoid issues with hydration.
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "js-maker-enhance-wrapper",
        dangerouslySetInnerHTML: {
          __html: html
        },
        suppressHydrationWarning: true
      });
    }
  }]);
}(_react["default"].Component);
MakerEnhance.propTypes = {
  user: _propTypes["default"].string.isRequired,
  index: _propTypes["default"].oneOfType([_propTypes["default"].string, _propTypes["default"].number]),
  loadingHeight: _propTypes["default"].number
};