chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (!tab.url) return; // Ignore popup

    if (changeInfo.status === 'complete') {
        if (tab.url.includes('moodle.inf')) {
            const result = await chrome.storage.sync.get(['username_inf', 'password_inf']);
            if (typeof result.username_inf === 'undefined' || typeof result.password_inf === 'undefined') {
                chrome.tabs.sendMessage(tabId, {
                    type: 'moodleInfLoginFail'
                }, () => {
                });
                return;
            }

            console.log('Requesting MoodleINF login!');
            chrome.tabs.sendMessage(tabId, {
                type: 'moodleInfLogin'
            }, () => {
            });
        } else if (tab.url.includes('moodle.ufrgs')) {
            if (tab.url.includes("errorcode=3")) {
                const result = await chrome.storage.sync.get(['username_ufrgs', 'password_ufrgs']);
                if (typeof result.username_ufrgs === 'undefined' || typeof result.password_ufrgs === 'undefined') {
                    chrome.tabs.sendMessage(tabId, {
                        type: 'moodleUfrgsLoginFail'
                    }, () => {
                    });
                    return;
                }
            }

            console.log('Requesting MoodleUFRGS login!');
            chrome.tabs.sendMessage(tabId, {
                type: 'moodleUfrgsLogin'
            }, () => {
            });
        }
    }
})