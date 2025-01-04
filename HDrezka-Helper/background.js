let filmLink = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    try {
        if (message.type === "FILM_LINK_FOUND") {
            if (filmLink !== message.link) {
                filmLink = message.link;
                console.log("The link is saved in background.js:", filmLink);
            }
        }

        if (message.type === "FILM_LINK_RESET") {
            filmLink = null;
            console.log("Link sent to background.js");
        }
    } catch (error) {
        console.error("Error in background.js:", error.message);
    }
});

chrome.runtime.onConnect.addListener((port) => {
    if (port.name === "popup") {
        port.postMessage({ type: "UPDATE_LINK", link: filmLink });
    }
});