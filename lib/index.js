"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MakerEnhance = function (_React$Component) {
  _inherits(MakerEnhance, _React$Component);

  function MakerEnhance(props) {
    _classCallCheck(this, MakerEnhance);

    var _this = _possibleConstructorReturn(this, (MakerEnhance.__proto__ || Object.getPrototypeOf(MakerEnhance)).call(this, props));

    _this.state = {
      url: window.location.href
    };
    return _this;
  }

  _createClass(MakerEnhance, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.addScript();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var urlUpdated = false;

      if (window.location.href !== this.state.url) {
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
        url: window.location.href
      });
    }
  }, {
    key: "addScript",
    value: function addScript() {
      var script = document.querySelector("#maker-enhance-script");

      if (script || !this.props.user) {
        return this.run();
      }

      script = document.createElement("script");
      script.id = "maker-enhance-script";
      script.src = "https://app.maker.co/enhance/" + this.props.user + ".js";
      document.head.appendChild(script);
    }
  }, {
    key: "run",
    value: function run() {
      if (typeof (window.MakerEmbeds || {}).run !== "function") {
        return;
      }

      window.MakerEmbeds.run();
    }
  }, {
    key: "render",
    value: function render() {
      var index = this.props.index || 0;

      return _react2.default.createElement(
        "div",
        { className: "js-maker-enhance-wrapper" },
        _react2.default.createElement("div", {
          id: "js-maker-static-enhance-v1-218c2d7d-62da-499e-9e74-93201e1b3d56-" + index,
          className: "js-maker-enhance-static-mount",
          style: { height: "auto", width: "100%" }
        })
      );
    }
  }]);

  return MakerEnhance;
}(_react2.default.Component);

exports.default = MakerEnhance;


MakerEnhance.propTypes = {
  user: _propTypes2.default.string.isRequired
};