(function blockAds() {
    const adSelectors = [
        '.b-dwnapp.wide',
        '.global-wrapper',
        '[id^="unit-"]',
        '[id^="eas-"]',
        '.ad-branding'
    ];

    function removeAds() {
        adSelectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                console.log('Delete the element:', element);
                element.remove();
            });
        });

        const mixedText = document.querySelector('.b-post__mixedtext');
        if (mixedText) {
            const nextDiv = mixedText.nextElementSibling;
            if (nextDiv && nextDiv.tagName === 'DIV') {
                console.log('Remove the following div:', nextDiv);
                nextDiv.remove();
            }
        }
    }

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { 
                        adSelectors.forEach(selector => {
                            if (node.matches(selector) || node.querySelector(selector)) {
                                console.log('Remove a dynamically added element:', node);
                                node.remove();
                            }
                        });

                        if (node.classList && node.classList.contains('b-post__mixedtext')) {
                            const nextDiv = node.nextElementSibling;
                            if (nextDiv && nextDiv.tagName === 'DIV') {
                                console.log('Remove the following div after the dynamically added .b-post__mixedtext:', nextDiv);
                                nextDiv.remove();
                            }
                        }
                    }
                });
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    removeAds();

    const style = document.createElement('style');
    style.innerHTML = adSelectors.map(selector => `${selector} { display: none !important; }`).join('\n');
    document.head.appendChild(style);
})();