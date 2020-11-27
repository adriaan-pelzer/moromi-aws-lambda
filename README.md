# moromi-aws-lambda
aws lambda plugin for moromi

## Installation
```
  yarn add moromi-aws-lambda
```

## Usage

### params:
* module: _the local filename of the lambda module to test (relative to the folder where moromi is being called from)_
* handler (default `handler`): _the handler name exported by the lambda module_
* event (default `{}`): _the event that the handler should be called with_
* context (default `null`): _the context that the handler should be called with_

## Example
Given the following lambda function:
```js
module.exports.handler = ({ Records: [{ cf: { request: {
  uri, method = 'GET', querystring = '', headers
} } }] }, context, callback) => callback(null, {
  uri,
  method,
  headers
});
```

the following moromi test will pass:
```js
{
  name: 'example aws lambda test',
  type: require('moromi-aws-lambda')
  params: {
    module: '../index.js',
    event: {
      Records: [{ cf: { request: {
        uri: '/test',
        headers: {
          host: [{ key: 'Host', value: 'example.is' }]
        }
      } } }]
    }
  },
  expected: {
    uri: '/test', method: 'GET',
   'headers.host.0.value': 'example.is'
  }
}
```
