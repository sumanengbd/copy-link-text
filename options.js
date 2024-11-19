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
    chrome.storage.sync.get(['notificationsEnabled', 'mode'], (result) => {
        const notificationsEnabled = result.notificationsEnabled !== undefined ? result.notificationsEnabled : true;
        const mode = result.mode || 'link-button';
        document.getElementById('notification-switch').checked = notificationsEnabled;
        document.getElementById(`enable-${mode}`).checked = true;

        if (!result.mode) {
            chrome.storage.sync.set({ mode: 'link-button' });
        }
    });

    document.getElementById('notification-switch').addEventListener('change', (event) => {
        chrome.storage.sync.set({ notificationsEnabled: event.target.checked });
    });

    document.querySelectorAll('input[name="mode"]').forEach((radio) => {
        radio.addEventListener('change', (event) => {
            const selectedMode = event.target.id.replace('enable-', '');
            chrome.storage.sync.set({ mode: selectedMode });
        });
    });
} else {
    console.error('chrome.storage.sync is not available.');
}
