const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const message = require('./messageQueue');

// multipart and fs are not used anywhere for now but they're imported, must be a hint

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};
// fs.readFile('/Users/remyorans/hackreactor/hrsf132-a-synchronous-swim/server/spec/water-lg.jpg', (err, data) => {
//   console.log(exports.backgroundImageFile);
//   fs.writeFile(exports.backgroundImageFile, data, (err) => {
//     if (err) throw err;
//     console.log('The file has been saved!');
//   });
// });
module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  let directions = ['left', 'up', 'right', 'down'];
  let randomInt = Math.floor(Math.random() * 4);
  res.writeHead(200, headers);
  if (req.method === 'GET') {
    // fs.readFile(exports.backgroundImageFile, (err, data) => {
    //   res.write(data);
    // });
    let next = message.dequeue();
    if (next) {
      res.write(next);
    }

  }
  res.end();
  next(); // invoke next() at the end of a request to help with testing!
};
