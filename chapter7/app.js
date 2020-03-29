if (navigator.serviceWorker) {
  navigator.serviceWorker.register('./sw.js', {scope: './'}).then(function(reg) {
    console.log(reg);
  })
  .catch(function(err) {
    console.log(err);
  })
} else {
  alert('Service Worker is not supported!')
}