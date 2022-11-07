const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

// const rimraf = require('rimraf');
// rimraf(path.resolve(__dirname, 'files-copy'), function () { console.log('done'); });

function createCopy() {
  fs.mkdir(path.resolve(__dirname, 'files-copy'), {recursive: true}, err => {
    if(err) throw err;
    fs.readdir(path.resolve(__dirname, 'files'), (err, files) => {
      if(err) throw err;
      files.forEach((file) => {
        fs.copyFile(path.resolve(__dirname, 'files', file), path.resolve(__dirname, 'files-copy', file), (err) => {
          if(err) throw err;
        })
      })
    })
  })
}

fs.stat(path.resolve(__dirname, 'files-copy'), err => {
    if (!err) {
      fs.rm(path.resolve(__dirname, 'files-copy'), {recursive: true}, err => {
        if(err) throw err;
        createCopy()
      })
    } else {
      createCopy()
    }
});












