"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var InputInterceptor =
/*#__PURE__*/
function (_Component) {
  _inherits(InputInterceptor, _Component);

  function InputInterceptor(props) {
    var _this;

    _classCallCheck(this, InputInterceptor);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputInterceptor).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (e) {
      var _this$props = _this.props,
          onChange = _this$props.onChange,
          parse = _this$props.parse,
          valueChangeGetter = _this$props.valueChangeGetter;
      var value = valueChangeGetter(e);
      var parsedValue = parse(value);

      _this.setState({
        originValue: value
      }, function () {
        onChange(parsedValue);
      });
    });

    _this.state = {
      formatedValue: undefined,
      originValue: undefined
    };
    return _this;
  } // model => view, format


  _createClass(InputInterceptor, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var formatedValue = this.state.formatedValue;

      var _this$props2 = this.props,
          children = _this$props2.children,
          parse = _this$props2.parse,
          format = _this$props2.format,
          value = _this$props2.value,
          onChange = _this$props2.onChange,
          valueChangeGetter = _this$props2.valueChangeGetter,
          restProps = _objectWithoutProperties(_this$props2, ["children", "parse", "format", "value", "onChange", "valueChangeGetter"]);

      return _react.default.Children.map(children, function (child) {
        return _react.default.cloneElement(child, _objectSpread({}, restProps, {
          value: formatedValue,
          onChange: _this2.handleChange
        }));
      });
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(nextProps, prevState) {
      var nextValue = nextProps.value,
          format = nextProps.format;
      var prevFormatedValue = prevState.formatedValue,
          originValue = prevState.originValue;
      var formatedValue = format(nextValue, prevFormatedValue, originValue);
      return {
        formatedValue: formatedValue,
        originValue: originValue || formatedValue
      };
    } // view => model, parse

  }]);

  return InputInterceptor;
}(_react.Component);

_defineProperty(InputInterceptor, "propTypes", {
  children: _propTypes.default.element.isRequired,
  // value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  parse: _propTypes.default.func,
  format: _propTypes.default.func,
  valueChangeGetter: _propTypes.default.func
});

_defineProperty(InputInterceptor, "defaultProps", {
  // Will have an warning,
  // `getFieldDecorator` will override `value`, so please don't set `value` directly and use `setFieldsValue` to set it.
  // value: undefined,
  parse: function parse(formatedValue) {
    return formatedValue;
  },
  format: function format(parsedValue
  /* , prevFormatedValue, currentOriginValue */
  ) {
    return parsedValue;
  },
  valueChangeGetter: function valueChangeGetter(e) {
    return e.target.value;
  }
});

var _default = InputInterceptor;
exports.default = _default;