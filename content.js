let copyTextLastTarget = null;

document.addEventListener('contextmenu', event => {
    const eventPath = event.composedPath();
    let isLinkOrButton = false;

    for (const node of eventPath) {
        if (node.nodeName) {
            copyTextLastTarget = node;
            isLinkOrButton = true;
            break;
        }
    }

    if (!isLinkOrButton) {
        copyTextLastTarget = null;
    }

    chrome.runtime.sendMessage({
        type: 'updateContextMenu',
        showMenu: isLinkOrButton
    });
}, true);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copy' && copyTextLastTarget != null) {
        const copiedText = copyTextLastTarget.innerText || copyTextLastTarget.textContent.trim();
        const copyTextArea = document.createElement('textarea');
        copyTextArea.style.opacity = 0;
        copyTextArea.value = copiedText;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(copyTextArea);
        sendResponse({ copiedText });
    } else {
        sendResponse({ copiedText: null });
    }
});
