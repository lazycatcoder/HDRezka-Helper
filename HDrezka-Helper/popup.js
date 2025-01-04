if (!window.port) {
    window.port = chrome.runtime.connect({ name: "popup" });
}

window.port.onMessage.addListener((message) => {
    const movieLinkDisplay = document.getElementById("movie-link-display");
    const placeholderImg = document.getElementById("placeholder-img");

    if (message.type === "UPDATE_LINK") {
        currentLink = message.link;

        if (currentLink && movieLinkDisplay) {
            movieLinkDisplay.innerText = currentLink;
            console.log("Link updated in popup:", currentLink);

            if (placeholderImg) {
                placeholderImg.remove();
            }
        } else if (!currentLink && movieLinkDisplay) {
            if (!placeholderImg) {
                const img = document.createElement("img");
                img.id = "placeholder-img";
                img.src = "img/img.png";
                img.alt = "";
                movieLinkDisplay.innerText = "";
                movieLinkDisplay.appendChild(img);
            }
        }
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const copyButton = document.getElementById("copy-btn");
    
    if (copyButton) {
        copyButton.addEventListener("click", () => {
            if (currentLink) {
                navigator.clipboard.writeText(currentLink).then(() => {
                    alert("Link copied successfully!");
                }).catch((err) => {
                    console.error("Error copying link:", err);
                });
            } else {
                alert("Link to the movie not found.");
            }
        });
    } else {
        console.error("Copy button not found.");
    }
});