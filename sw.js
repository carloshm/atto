const cacheName = "atto-cv7"; // Increment for every major change

self.addEventListener("install", function(event) {
    event.waitUntil(caches.open(cacheName).then(function(cache) {
        return cache.addAll([
            "/atto",
            "/atto/index.html",
            "/atto/docspopout.html",
            "/atto/style.css",
            "/atto/script.js",
            "/atto/audio.js",
            "/atto/basic.js",
            "/atto/bot.js",
            "/atto/canvas.js",
            "/atto/commands.js",
            "/atto/common.js",
            "/atto/hid.js",
            "/atto/syntax.js",
            "/atto/term.js",
            "/atto/docs.js",
            "/atto/docspopout.js",
            "/atto/docs",
            "/atto/docs/index.md",
            "/atto/docs/beginner.md",
            "/atto/docs/fromedu.md",
            "/atto/docs/frombasic.md",
            "/atto/docs/advanced.md",
            "/atto/docs/tweet.md",
            "/atto/docs/acknowledgements.md",
            "/atto/docs/courses",
            "/atto/docs/courses/index.md",
            "/atto/docs/courses/turtle.md",
            "/atto/docs/reference",
            "/atto/docs/reference/index.md",
            "/atto/docs/reference/control.md",
            "/atto/docs/reference/io.md",
            "/atto/docs/reference/functions.md",
            "/atto/docs/reference/constants.md",
            "/atto/docs/reference/lists.md",
            "/atto/docs/reference/turtle.md",
            "/atto/docs/reference/audio.md",
            "/atto/docs/reference/operators.md",
            "/atto/docs/reference/comparators.md",
            "/atto/lib/showdown.min.js",
            "/atto/lib/base2048.js",
            "/atto/lib/tone.js",
            "/atto/media/logo.svg",
            "/atto/media/logo.png",
            "/atto/media/maskable.svg",
            "/atto/media/maskable.png",
            "/atto/media/icons/close.svg",
            "/atto/media/icons/home.svg",
            "/atto/media/icons/popout.svg",
            "/atto/media/docs/turtle1.png",
            "/atto/media/docs/turtle2.png",
            "/atto/media/docs/turtle3.png",
            "/atto/media/docs/turtle4.png",
            "/atto/media/docs/turtle5.png"
        ]).then(function() {
            self.skipWaiting();
        });
    }));
});

self.addEventListener("activate", function(event) {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
    event.respondWith(caches.open(cacheName).then(function(cache) {
        return cache.match(event.request, {ignoreSearch: true});
    }).then(function(response) {
        return response || fetch(event.request);
    }));
});