const fs = require('fs');
const fsPromise = require('fs/promises');
const path = require('path');

const promisDir = fsPromise.readdir(path.resolve(__dirname, 'secret-folder'), {withFileTypes: true});

promisDir.then((content) => {
  content.forEach((item) => {
    if (item.isFile()) {
      const extension = path.extname(path.resolve(__dirname, 'secret-folder', item.name));
      const nameFile = path.basename(path.resolve(__dirname, 'secret-folder', item.name), extension);
      fsPromise.stat(path.resolve(__dirname, 'secret-folder', item.name))
        .then((file) => {
          console.log(`Name: ${nameFile}, Extension: ${extension}, Size: ${file.size} bytes`);
        });
    }
  });
});