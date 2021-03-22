chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const text = window.getSelection().toString();
    sendResponse({
        text
    });
});
