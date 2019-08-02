// Entry point is needed so that the module could be required.
// The module dir path will be needed to copy resources from it.

const path = require('path');

module.exports = {
  dirname: path.join(__dirname, 'template_src'),
};
