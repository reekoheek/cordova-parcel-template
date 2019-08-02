const Bundler = require('parcel-bundler');
const express = require('express');
const path = require('path');
const fs = require('fs');

module.exports = async function (ctx) {

  if (!ctx.opts.options['live-reload']) {
    console.info('-----> Parcel build www');

    const bundler = new Bundler(path.join(__dirname, '../src/index.html'), {
      outDir: './www',
      publicUrl: '/android_asset/www/',
      watch: false,
    });
    await bundler.bundle();

    const content = fs.readFileSync('./config.xml', 'utf8').replace(/<content.*/, `<content src="index.html" />`);
    fs.writeFileSync('./config.xml', content);
  } else {
    console.info('-----> Parcel start dev server');

    const port = 1234;
    const bundler = new Bundler(path.join(__dirname, '../src/index.html'), {
      outDir: './www',
      publicUrl: '/',
    });

    const app = express();

    app.use(express.static(path.join(__dirname, '../platforms/android/platform_www/')));
    app.use(bundler.middleware());
    app.listen(port);

    const content = fs.readFileSync('./config.xml', 'utf8').replace(/<content.*/, `<content src="http://192.168.3.101:${port}/" />`);
    fs.writeFileSync('./config.xml', content);
  }

  console.info('-----> Parcel end');
};
