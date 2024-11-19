'use strict';

chrome.runtime.onInstalled.addListener(() => {
    // Placeholder for dynamic menu creation
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'updateContextMenu') {
        if (message.showMenu) {
            chrome.contextMenus.create({
                id: "copyLinkText",
                title: "Copy Link Text",
                contexts: ["all"],
                documentUrlPatterns: ["<all_urls>"]
            });
        } else {
            chrome.contextMenus.removeAll();
        }
    }
});

// Listen for context menu item clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'copyLinkText') {
        chrome.tabs.sendMessage(tab.id, 'copy', { frameId: info.frameId }, response => {
            if (response && response.copiedText) {
                // Check the notification setting before showing a notification
                chrome.storage.sync.get(['notificationsEnabled'], (result) => {
                    const notificationsEnabled = result.notificationsEnabled !== undefined ? result.notificationsEnabled : true;

                    if (notificationsEnabled) {
                        chrome.notifications.create({
                            type: 'basic',
                            iconUrl: 'images/icon-48x48.png',
                            title: 'Copy Link Text',
                            message: `Copied: "${response.copiedText}"`,
                            silent: true // Optional: Makes the notification silent
                        });
                    }
                });
            } else {
                // Check the notification setting before showing a notification
                chrome.storage.sync.get(['notificationsEnabled'], (result) => {
                    const notificationsEnabled = result.notificationsEnabled !== undefined ? result.notificationsEnabled : true;

                    if (notificationsEnabled) {
                        chrome.notifications.create({
                            type: 'basic',
                            iconUrl: 'images/icon-48x48.png',
                            title: 'Copy Link Text',
                            message: 'No text to copy.',
                            silent: true
                        });
                    }
                });
            }
        });
    }
});