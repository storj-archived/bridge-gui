//  enable runtime transpilation to use ES6/7 in node

require('babel-core/register')({
  //-- uncomment if `require`ing or `import`ing .scss files server-side
  // extensions: ['.scss']
});
