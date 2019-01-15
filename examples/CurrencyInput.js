import React, { Component } from 'react';
import { Input } from 'antd';
import InputInterceptor from 'react-input-interceptor';

class CurrencyInput extends Component {
  handleParse = formatedValue => {
    // .1, 1, 1., 1.0, 1.01
    if (/^-?\.?\d+(\.(\d+)?)?$/.test(formatedValue)) {
      return Number.parseInt(Number.parseFloat(formatedValue) * 100, 10);
    }
    return undefined;
  };

  handleFormat = (parsedValue, prevFormatedValue, currentOriginValue = '') => {
    if (
      /^-?\d+$/.test(parsedValue) &&
      Number.parseInt(parsedValue, 10) !== this.handleParse(prevFormatedValue)
    ) {
      const tailContent = /\.$/.test(currentOriginValue) ? '.' : '';

      return (
        (Number.parseInt(parsedValue, 10) / 100)
          .toFixed(2)
          // .00 => ''
          .replace(/\.0+$/, '')
          // .10 => .1
          .replace(/(.[1-9]+)0+$/, '$1') + tailContent
      );
    }

    return (
      currentOriginValue
        .replace(/[^\d.-]$/, '')
        // 1.123 => 1.12
        .replace(/(\.\d{2}).+/, '$1')
    );
  };

  render() {
    return (
      <InputInterceptor {...this.props} parse={this.handleParse} format={this.handleFormat}>
        <Input />
      </InputInterceptor>
    );
  }
}

export default CurrencyInput;
