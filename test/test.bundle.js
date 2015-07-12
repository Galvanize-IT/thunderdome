var context = require.context('.', true, /.+\_test\.jsx?$/);
context.keys().forEach(context);
module.exports = context;
