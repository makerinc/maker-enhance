"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MakerEnhance;
var _react = _interopRequireWildcard(require("react"));
var _MakerEnhanceClient = _interopRequireDefault(require("./MakerEnhanceClient"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function MakerEnhance(_ref) {
  var user = _ref.user,
    instanceId = _ref.instanceId,
    loadingHeight = _ref.loadingHeight;
  var scriptSrc = "https://app.maker.co/enhance/".concat(user, ".js");
  var id = "js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-".concat(instanceId || "0");
  var html = "\n    <script src=\"".concat(scriptSrc, "\" id=\"maker-enhance-script\" async></script>\n    <div\n      id=\"").concat(id, "\"\n      class=\"js-maker-enhance-static-mount\"\n      style=\"height:auto;width:100%\"\n      ").concat(loadingHeight ? "data-loading-height=\"".concat(loadingHeight, "\"") : "", "\n    ></div>\n  ");

  // Prevent rerendering of Maker iframe inside
  var render = (0, _react.useMemo)(function () {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MakerEnhanceClient["default"], {
      user: user,
      id: id,
      scriptSrc: scriptSrc
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: "js-maker-enhance-wrapper",
      dangerouslySetInnerHTML: {
        __html: html
      },
      suppressHydrationWarning: true
    }));
  }, [user, id, scriptSrc, html]);
  return render;
}