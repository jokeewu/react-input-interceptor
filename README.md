## react-input-interceptor

React Input component data parse and format.

### How to use?

#### Install

```shell
> npm install react-input-interceptor
```

#### Example(based on antd)

```javascript
import React, { Component } from 'react';
import { Form, Input } from 'antd';
import InputInterceptor from 'react-input-interceptor'

@Form.create()
class Example extends Component {
  // view => model
  handleParse = (value) => {
    // do something
  }

  // model => view
  handleFormat = (value) => {
    // do something
  }

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <div>
        {
          getFieldDecorator('field')(
            <InputInterceptor parse={this.handleParse} format={this.handleFormat}>
              <Input />
            </InputInterceptor>
          )
        }
      </div>
    )
  }
}
```