chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.type === 'moodleUfrgsLogin') {
        console.log('[Moodle Buddy] Received a request to log in to MoodleUFRGS!');

        if (document.location.href.includes('errorcode=3')) {
            // I hate this hack, but I can't make refresh go to /login/login.php without triggering onUpdated, so this is going to be it for now...
            const invalid_credentials = await new Promise((resolve, _) => {
                chrome.storage.sync.get('invalid_credentials', (result) => resolve(result.invalid_credentials || false))
            });

            if (!invalid_credentials) {
                alert('[Moodle Buddy] Invalid credentials! Update them on the extension and refresh the page!');
                chrome.storage.sync.set({
                    invalid_credentials: true
                });
                return;
            }
        }

        chrome.storage.sync.set({
            invalid_credentials: false
        });

        try {
            const username = document.getElementById('text1');
            if (typeof username !== null) {
                chrome.storage.sync.get(['username_ufrgs', 'password_ufrgs'], (result) => {
                    username.value = result.username_ufrgs;
                    document.getElementById('text').value = result.password_ufrgs;
                    document.getElementById('botaoDeAcesso').children[0].click();
                });
            }

            sendResponse({success: true});
        } catch (e) {
            sendResponse({success: false});
            console.error(e);
        }
    } else if (message.type === 'moodleInfLogin') {
        console.log('[Moodle Buddy] Received a request to log in to MoodleINF!');

        if (document.getElementById('loginerrormessage') != null) {
            alert('[Moodle Buddy] Invalid credentials! Update them on the extension and refresh the page!');
            return;
        }

        try {
            const login = document.getElementsByClassName('login');
            if (login.length > 0) {
                const a = login[0].getElementsByTagName('a');
                if (a.length > 0) {
                    a[0].click();
                }
            }

            const username = document.getElementById('username');
            if (typeof username !== null) {
                chrome.storage.sync.get(['username_inf', 'password_inf'], (result) => {
                    username.value = result.username_inf;
                    document.getElementById('password').value = result.password_inf;
                    document.getElementById('loginbtn').click();
                });
            }

            sendResponse({success: true});
        } catch (e) {
            sendResponse({success: false});
            console.error(e);
        }
    } else if (message.type === 'moodleUfrgsLoginFail' || message.type === 'moodleInfLoginFail') {
        alert('[Moodle Buddy] You haven\'t set you credentials yet!');
    }
});

window.addEventListener('load', () => {
    if (window.location.href.startsWith('https://moodle.inf.ufrgs.br/mod/resource/view.php')) {
        window.location = document.querySelector('.resourceworkaround > a').href;
    } else if (window.location.href.startsWith('https://moodle.inf.ufrgs.br/mod/url/view.php')) {
        window.location = document.querySelector('.urlworkaround > a').href;
    } else if (window.location.href.startsWith('https://moodle.ufrgs.br/mod/resource/view.php')) {
        window.location = document.querySelector('.resourceworkaround > a').href;
    } else if (window.location.href.startsWith('https://moodle.ufrgs.br/mod/url/view.php')) {
        window.location = document.querySelector('.urlworkaround > a').href;
    }
});
