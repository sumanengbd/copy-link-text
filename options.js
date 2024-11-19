document.getElementById('tab-basic').addEventListener('click', () => {
    showTab('basic');
});

document.getElementById('tab-options').addEventListener('click', () => {
    showTab('options');
});

function showTab(tab) {
    document.querySelectorAll('.tab-button').forEach((button) => {
        button.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach((content) => {
        content.style.display = 'none';
    });

    document.getElementById(`tab-${tab}`).classList.add('active');
    document.getElementById(`content-${tab}`).style.display = 'block';
}

if (typeof chrome !== 'undefined' && chrome.storage) {
    chrome.storage.sync.get(['notificationsEnabled'], (result) => {
        const notificationsEnabled = result.notificationsEnabled !== undefined ? result.notificationsEnabled : true;
        document.getElementById('notification-switch').checked = notificationsEnabled;
    });

    document.getElementById('notification-switch').addEventListener('change', (event) => {
        chrome.storage.sync.set({ notificationsEnabled: event.target.checked });
    });
} else {
    console.error('chrome.storage.sync is not available.');
}
