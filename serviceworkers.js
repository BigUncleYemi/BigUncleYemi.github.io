const CACHE_NAME = 'currencyConv-v5';
const urlsToCache = [
  '/',
  '/index.html',
  '/main.css',
  '/main.js',
  'https://fonts.googleapis.com/css?family=Encode+Sans+Condensed:100,200,300,400,500,600,700|Fjalla+One',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://free.currencyconverterapi.com/api/v5/currencies'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
      }).catch((err)=>{
        return err
      })
    );
});

self.addEventListener('fetch',  event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request)
      }
    ).catch((err) => {
      return err
    })
  );
});
 
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys().then((cacheName)=>{
      return Promise.all(
        cacheName.filter((cacheName)=>{
          return cacheName.startsWith('currencyConv-') && cacheName != CACHE_NAME
        }).map((cacheName)=>{
          return caches.delete(cacheName)
        })
      )
    })
  )
})

