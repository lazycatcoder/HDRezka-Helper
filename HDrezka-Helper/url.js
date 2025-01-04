let currentLink = null;

function extractFilmUrl() {
    const networkRequests = performance.getEntriesByType("resource");

    for (let entry of networkRequests) {
        const url = entry.name;

        if (url.includes('mp4') && !url.includes('manifest.m3u8')) {
            const filmUrl = url.split('mp4')[0] + 'mp4';

            if (filmUrl !== currentLink) {
                currentLink = filmUrl;
                console.log("New extracted link:", filmUrl);

                chrome.runtime.sendMessage({ type: "FILM_LINK_FOUND", link: filmUrl });

                performance.clearResourceTimings();
            }
        }
    }
}

function resetLink() {
    currentLink = null;

    try {
        if (chrome.runtime && chrome.runtime.sendMessage) {
            chrome.runtime.sendMessage({ type: "FILM_LINK_RESET" });
        } else {
            console.log("chrome.runtime is not available.");
        }
    } catch (error) {
        console.log("Link reset error:", error.message);
    }

    performance.clearResourceTimings();
}

function monitorNetworkRequests() {
    setInterval(() => {
        extractFilmUrl();
    }, 1000);
}

window.addEventListener('load', monitorNetworkRequests);
window.addEventListener('beforeunload', resetLink);
window.addEventListener('unload', resetLink);