const path = require('path');
const fs = require('fs');
const fsPromise = require('fs/promises');


fs.access(path.resolve(__dirname, 'project-dist', 'bundle.css'), err => {
  if (err) {
    console.log('ceotcndetn ')
    createCssFile();
  } else {
    fs.unlink(path.resolve(__dirname, 'project-dist', 'bundle.css'), err => {
      if(err) throw err;
      createCssFile();
    });
  }
});

function createCssFile() {
  fsPromise.writeFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), '', err => {
    if(err) throw err;
  }).then(
    fsPromise.readdir(path.resolve(__dirname, 'styles'), {withFileTypes: true}, err => {
      if(err) throw err;
    }).then((files) => {
      files.forEach(file => {
        const ext = path.extname(path.resolve(__dirname, 'styles', file.name));
        if (ext === '.css') {
          let information;
          fs.readFile(path.resolve(__dirname, 'styles', file.name), 'utf-8', (err, data) => {
            if(err) throw err;
            information = data.toString();
            fs.appendFile(path.resolve(__dirname, 'project-dist', 'bundle.css'), information, err => {
              if(err) throw err;
            })
          });
        }
      })
    })
  )
}