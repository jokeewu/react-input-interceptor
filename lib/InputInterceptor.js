function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputInterceptor extends Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "handleChange", e => {
      const {
        onChange,
        parse,
        valueChangeGetter
      } = this.props;
      const value = valueChangeGetter(e);
      const parsedValue = parse(value);
      this.setState({
        originValue: value
      }, () => {
        onChange(parsedValue);
      });
    });

    this.state = {
      formatedValue: undefined,
      originValue: undefined
    };
  } // model => view, format


  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      value: nextValue,
      format
    } = nextProps;
    const {
      formatedValue: prevFormatedValue,
      originValue
    } = prevState;
    const formatedValue = format(nextValue, prevFormatedValue, originValue);
    return {
      formatedValue,
      originValue: originValue || formatedValue
    };
  } // view => model, parse


  render() {
    const {
      formatedValue
    } = this.state;
    const {
      children,
      parse,
      format,
      value,
      onChange,
      valueChangeGetter,
      ...restProps
    } = this.props;
    return React.Children.map(children, child => React.cloneElement(child, { ...restProps,
      value: formatedValue,
      onChange: this.handleChange
    }));
  }

}

_defineProperty(InputInterceptor, "propTypes", {
  children: PropTypes.element.isRequired,
  // value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  parse: PropTypes.func,
  format: PropTypes.func,
  valueChangeGetter: PropTypes.func
});

_defineProperty(InputInterceptor, "defaultProps", {
  // Will have an warning,
  // `getFieldDecorator` will override `value`, so please don't set `value` directly and use `setFieldsValue` to set it.
  // value: undefined,
  parse: formatedValue => formatedValue,
  format: (parsedValue
  /* , prevFormatedValue, currentOriginValue */
  ) => parsedValue,
  valueChangeGetter: e => e.target.value
});

export default InputInterceptor;