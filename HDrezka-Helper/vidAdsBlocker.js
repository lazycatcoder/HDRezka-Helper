(function () {
    const adDomains = [
        "srv.voidnetwork.cloud",
        "bestssrv.com",
        "track.adpod.in"
    ];

    function isAdUrl(url) {
        return adDomains.some((domain) => url.includes(domain));
    }

    function handleVideoAds() {
        const videos = document.querySelectorAll("video");

        videos.forEach((video) => {
            const src = video.getAttribute("src");
            if (!src) return;

            if (isAdUrl(src)) {
                console.log(`Advertising video detected: ${src}`);
                video.pause();

                if (isFinite(video.duration)) {
                    video.currentTime = video.duration;
                }

                video.src = "";
                video.remove();
                console.log("Promotional video skipped.");
            }
        });
    }

    function startAdObserver() {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0 || mutation.type === "attributes") {
                    handleVideoAds();
                }
            });
        });

        observer.observe(document.body, { childList: true, subtree: true, attributes: true });
        console.log("DOM change monitoring has been started.");
    }

    function setupVideoListeners() {
        const videos = document.querySelectorAll("video");

        videos.forEach((video) => {
            video.addEventListener("play", () => {
                console.log("Playback has started. Checking the ads...");
                handleVideoAds();
            });

            video.addEventListener("ended", () => {
                console.log("Playback complete.");
            });
        });
    }

    window.addEventListener("load", () => {
        console.log("The page is loaded. Launching handlers.");
        startAdObserver();
        setupVideoListeners();
    });
})();