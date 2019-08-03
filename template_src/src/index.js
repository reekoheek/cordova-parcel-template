(async () => {
  // this is workaround for parcel which using fetch api to load non js
  // dependencies
  if (location.protocol === 'file:') {
    const { fetch } = await import('whatwg-fetch');
    window.fetch = fetch;
  }

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
