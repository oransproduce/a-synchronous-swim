const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');


// multipart and fs are not used anywhere for now but they're imported, must be a hint

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////
// fs.readFile('/Users/Taivnaa/Desktop/hack-reactor/Week-3/hrsf132-a-synchronous-swim/server/spec/water-lg.jpg', (err, data) => {
//   console.log(exports.backgroundImageFile);
// fs.writeFile(exports.backgroundImageFile, data, (err) => {
//   console.log(data);
//   if (err) throw err;
//   console.log('The file has been saved!');
// });
// });
// fs.unlinkSync(exports.backgroundImageFile);
let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  if (req.method === 'GET') {
    console.log('req.url: ', req.url);
    // if (req.url === '/background') {
    fs.readFile('/Users/Taivnaa/Desktop/hack-reactor/Week-3/hrsf132-a-synchronous-swim/server/spec/water-sm.jpg', (err, data) => {
      console.log('data in readFile: ', data);
      if (err) {
        res.writeHead(404, headers);
        res.on('error', err => {
          console.log('Server shut down');
          res.end();
        });
      }
      res.write(data, (err) => {
        res.end(data);
      });
    });
    // } else {
    //   let next = messageQueue.dequeue();
    //   if (next){
    //     res.write(next);
    //     res.end();
    //   }
    // }
  }
  next();
  // res.end(data);

  // const shifted = messageQueue.dequeue();
  // if (shifted) {
  //   res.write(shifted);
  // }
};
// res.end(data);
// invoke next() at the end of a request to help with testing!

