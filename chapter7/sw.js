self.addEventListener('install', function(event) {
  console.log('install')
  event.waitUntil(
    caches.open('app-v1').then(function(cache) {
      console.log('caching all')
      return cache.addAll([
        './app.js',
        './main.css'
      ])
    })
  )
})

self.addEventListener('fetch', function(event) {
  console.log(event);
  event.respondWith(
    caches.match(event.request).then(function(res) {
      console.log(`fetching resource ${event.request.url}`)
      if (res) {
        return res;
      } else {
        // 通过fetch方法向网络发起请求
        fetch(event.request).then(function(response) {
          return caches.open('app-v1').then(function(cache) {
            console.log(`caching new resource ${event.request.url}`)
            cache.put(event.request, response.clone());
            return response;
          })
        })
      }
    })
  )
})