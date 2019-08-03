const Bundler = require('parcel-bundler');
const express = require('express');
const path = require('path');
const fs = require('fs');
const os = require('os');

module.exports = async function (ctx) {
  if (!ctx.opts.options) {
    return;
  }

  if (!ctx.opts.options['live-reload'] && !ctx.opts.options['l']) {
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

    const bundler = new Bundler(path.join(__dirname, '../src/index.html'), {
      outDir: './www',
      publicUrl: '/',
    });

    const app = express();

    app.use(express.static(path.join(__dirname, '../platforms/android/platform_www/')));
    app.use(bundler.middleware());

    const port = await new Promise((resolve, reject) => {
      const listener = app.listen(() => {
        resolve(listener.address().port);
      });
    });

    const ipAddress = getIpAddress();

    const content = fs.readFileSync('./config.xml', 'utf8').replace(/<content.*/, `<content src="http://${ipAddress}:${port}/" />`);
    fs.writeFileSync('./config.xml', content);
  }

  console.info('-----> Parcel end');
};

function getIpAddress () {
  const ifaces = os.networkInterfaces();
  for (const key in ifaces) {
    for (const iface of ifaces[key]) {
      if (iface.family === 'IPv4' && iface.internal === false) {
        return iface.address;
      }
    }
  }
}
