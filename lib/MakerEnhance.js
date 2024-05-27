"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MakerEnhance;
var _react = _interopRequireDefault(require("react"));
var _MakerEnhanceClient = _interopRequireDefault(require("./MakerEnhanceClient"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function MakerEnhance(_ref) {
  var user = _ref.user,
    index = _ref.index,
    loadingHeight = _ref.loadingHeight;
  var scriptSrc = "https://app.maker.co/enhance/".concat(user, ".js");
  var html = "\n    <script src=\"".concat(scriptSrc, "\" id=\"maker-enhance-script\" async=\"true\"></script>\n    <div\n      id=\"js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-").concat(index || 0, "\"\n      class=\"js-maker-enhance-static-mount\"\n      style=\"height:auto;width:100%\"\n      ").concat(loadingHeight ? "data-loading-height=\"".concat(loadingHeight, "\"") : "", "\n    ></div>\n  ");

  // https://github.com/facebook/react/issues/10923#issuecomment-338715787
  // "We won't try to manipulate the tree of a dangerouslySetInnerHTML node on the client. Even if it is wrong."
  //
  // Use dangerouslySetInnerHTML to avoid issues with hydration.
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_MakerEnhanceClient["default"], {
    user: user,
    index: index,
    scriptSrc: scriptSrc
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "js-maker-enhance-wrapper",
    dangerouslySetInnerHTML: {
      __html: html
    },
    suppressHydrationWarning: true
  }));
}