"use strict";function deleteAllCaches(){return caches.keys().then(function(e){return Promise.all(e.map(function(e){return caches["delete"](e)}))})}var PrecacheConfig=[["/app-bb1e08d8.css","bb1e08d8492f89ef3c1318fc1df7c45d"],["/app.css","bb1e08d8492f89ef3c1318fc1df7c45d"],["/app.min-0d2c6b69.js","0d2c6b69dcfd4319f3cbba50bd790c44"],["/app.min.js","0d2c6b69dcfd4319f3cbba50bd790c44"],["/index.html","42cf4a88caaee45627c40b6d078bc04a"],["/registration.worker-93f2ad73.js","93f2ad73197e71d158480ec854512045"],["/registration.worker.js","93f2ad73197e71d158480ec854512045"],["/rev-manifest.json","52d9d11652a7df42f3af07fcb872f2f0"],["/service.worker-6ea2982a.js","6ea2982a9ce96efd471819271be30433"],["/service.worker.js","6ea2982a9ce96efd471819271be30433"]],CacheNamePrefix="sw-precache-v1--"+(self.registration?self.registration.scope:"")+"-",IgnoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var n=new URL(e);return"/"===n.pathname.slice(-1)&&(n.pathname+=t),n.toString()},populateCurrentCacheNames=function(e,t,n){var r={},a={};return e.forEach(function(e){var c=new URL(e[0],n).toString(),s=t+c+"-"+e[1];a[s]=c,r[c]=s}),{absoluteUrlToCacheName:r,currentCacheNamesToAbsoluteUrl:a}},stripIgnoredUrlParameters=function(e,t){var n=new URL(e);return n.search=n.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),n.toString()},mappings=populateCurrentCacheNames(PrecacheConfig,CacheNamePrefix,self.location),AbsoluteUrlToCacheName=mappings.absoluteUrlToCacheName,CurrentCacheNamesToAbsoluteUrl=mappings.currentCacheNamesToAbsoluteUrl;self.addEventListener("install",function(e){var t=Date.now();e.waitUntil(caches.keys().then(function(e){return Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).filter(function(t){return-1==e.indexOf(t)}).map(function(e){var n=new URL(CurrentCacheNamesToAbsoluteUrl[e]);n.search&&(n.search+="&"),n.search+="sw-precache="+t;var r=n.toString();return console.log('Adding URL "%s" to cache named "%s"',r,e),caches.open(e).then(function(t){var n=new Request(r,{credentials:"same-origin"});return fetch(n.clone()).then(function(a){return 200==a.status?t.put(n,a):(console.error("Request for %s returned a response with status %d, so not attempting to cache it.",r,a.status),caches["delete"](e))})})})).then(function(){return Promise.all(e.filter(function(e){return 0==e.indexOf(CacheNamePrefix)&&!(e in CurrentCacheNamesToAbsoluteUrl)}).map(function(e){return console.log('Deleting out-of-date cache "%s"',e),caches["delete"](e)}))})}).then(function(){"function"==typeof self.skipWaiting&&self.skipWaiting()}))}),self.clients&&"function"==typeof self.clients.claim&&self.addEventListener("activate",function(e){e.waitUntil(self.clients.claim())}),self.addEventListener("message",function(e){"delete_all"==e.data.command&&(console.log("About to delete all caches..."),deleteAllCaches().then(function(){console.log("Caches deleted."),e.ports[0].postMessage({error:null})})["catch"](function(t){console.log("Caches not deleted:",t),e.ports[0].postMessage({error:t})}))}),self.addEventListener("fetch",function(e){if("GET"==e.request.method){var t=stripIgnoredUrlParameters(e.request.url,IgnoreUrlParametersMatching),n=AbsoluteUrlToCacheName[t],r="index.html";!n&&r&&(t=addDirectoryIndex(t,r),n=AbsoluteUrlToCacheName[t]),n&&e.respondWith(caches.open(n).then(function(n){return n.keys().then(function(r){return n.match(r[0]).then(function(n){return n||fetch(e.request)["catch"](function(e){console.error('Fetch for "%s" failed: %O',t,e)})})})})["catch"](function(n){return console.error('Couldn\'t serve response for "%s" from cache: %O',t,n),fetch(e.request)}))}});