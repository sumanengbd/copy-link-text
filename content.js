let mode = 'link-button';
let copyTextLastTarget = null;

if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get(['mode'], (result) => {
        mode = result.mode || 'link-button';
    });

    chrome.storage.onChanged.addListener((changes) => {
        if (changes.mode) {
            mode = changes.mode.newValue || 'link-button';
        }
    });
}

document.addEventListener('contextmenu', (event) => {
    const eventPath = event.composedPath();
    let isTargetValid = false;

    for (const node of eventPath) {
        if (node.nodeName) {
            if ((mode === 'link-button' && (node.nodeName.toLowerCase() === 'a' || node.nodeName.toLowerCase() === 'button')) || mode === 'anywhere') {
                copyTextLastTarget = node;
                isTargetValid = true;
                break;
            }
        }
    }

    if (!isTargetValid) {
        copyTextLastTarget = null;
    }

    chrome.runtime.sendMessage({
        type: 'updateContextMenu',
        showMenu: isTargetValid
    });
}, true);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message === 'copy' && copyTextLastTarget !== null) {
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