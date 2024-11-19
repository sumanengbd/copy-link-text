let copyTextLastTarget = null;

// Detect right-click on <a> or <button>
document.addEventListener('contextmenu', event => {
    const eventPath = event.composedPath();
    let isLinkOrButton = false;

    for (const node of eventPath) {
        if (node.nodeName && (node.nodeName.toLowerCase() === 'a' || node.nodeName.toLowerCase() === 'button')) {
            copyTextLastTarget = node;
            isLinkOrButton = true;
            break;
        }
    }

    if (!isLinkOrButton) {
        copyTextLastTarget = null;
    }

    // Notify background script to update the context menu
    chrome.runtime.sendMessage({
        type: 'updateContextMenu',
        showMenu: isLinkOrButton
    });
}, true);

// Handle "Copy Link Text" action
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copy' && copyTextLastTarget != null) {
        const copiedText = copyTextLastTarget.innerText || copyTextLastTarget.textContent.trim();

        // Copy text to clipboard
        const copyTextArea = document.createElement('textarea');
        copyTextArea.style.opacity = 0;
        copyTextArea.value = copiedText;
        document.body.appendChild(copyTextArea);
        copyTextArea.select();
        document.execCommand('copy');
        document.body.removeChild(copyTextArea);

        // Send copied text back to the background script
        sendResponse({ copiedText });
    } else {
        sendResponse({ copiedText: null });
    }
});
