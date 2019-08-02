(async () => {
  await loadCordova();

  await import('./components/x-app');
})();

function loadCordova () {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'cordova.js';
    script.addEventListener('load', resolve);
    document.body.appendChild(script);
  });
}
