const path = require('path');

module.exports = ({
  module, handler = 'handler',
  event = {}, context = null
}) => new Promise((resolve, reject) => require(path.resolve(module))[handler](
  event, context,
  (error, response) => error ? reject(error) : resolve(response)
));
